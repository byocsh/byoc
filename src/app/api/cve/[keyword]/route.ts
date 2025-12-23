import { NextResponse } from "next/server";

interface CVEItem {
  id: string;
  description: string;
  severity: string;
  score: number | null;
  publishedDate: string;
  lastModifiedDate: string;
  references: string[];
}

interface NVDResponse {
  vulnerabilities: Array<{
    cve: {
      id: string;
      descriptions: Array<{ lang: string; value: string }>;
      published: string;
      lastModified: string;
      metrics?: {
        cvssMetricV31?: Array<{
          cvssData: {
            baseScore: number;
            baseSeverity: string;
          };
        }>;
        cvssMetricV2?: Array<{
          cvssData: {
            baseScore: number;
          };
          baseSeverity: string;
        }>;
      };
      references?: Array<{ url: string }>;
    };
  }>;
  totalResults: number;
}

// Simple in-memory cache with TTL
const cache = new Map<string, { data: CVEItem[]; timestamp: number; total: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function GET(
  request: Request,
  { params }: { params: Promise<{ keyword: string }> }
) {
  const { keyword } = await params;
  const decodedKeyword = decodeURIComponent(keyword);
  
  // Check cache first
  const cached = cache.get(decodedKeyword);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({
      cves: cached.data,
      total: cached.total,
      cached: true,
    });
  }

  try {
    // NVD API - search by keyword
    const nvdUrl = new URL("https://services.nvd.nist.gov/rest/json/cves/2.0");
    nvdUrl.searchParams.set("keywordSearch", decodedKeyword);
    nvdUrl.searchParams.set("resultsPerPage", "10");
    nvdUrl.searchParams.set("noRejected", "");

    const response = await fetch(nvdUrl.toString(), {
      headers: {
        "User-Agent": "byoc.sh/1.0",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      // NVD API has rate limits, return empty if rate limited
      if (response.status === 403 || response.status === 429) {
        return NextResponse.json({
          cves: [],
          total: 0,
          error: "Rate limited. Please try again later.",
        });
      }
      throw new Error(`NVD API error: ${response.status}`);
    }

    const data: NVDResponse = await response.json();

    const cves: CVEItem[] = data.vulnerabilities.map((vuln) => {
      const cve = vuln.cve;
      const description = cve.descriptions.find((d) => d.lang === "en")?.value || "";
      
      // Get CVSS score and severity
      let score: number | null = null;
      let severity = "UNKNOWN";
      
      if (cve.metrics?.cvssMetricV31?.[0]) {
        score = cve.metrics.cvssMetricV31[0].cvssData.baseScore;
        severity = cve.metrics.cvssMetricV31[0].cvssData.baseSeverity;
      } else if (cve.metrics?.cvssMetricV2?.[0]) {
        score = cve.metrics.cvssMetricV2[0].cvssData.baseScore;
        severity = cve.metrics.cvssMetricV2[0].baseSeverity || "UNKNOWN";
      }

      return {
        id: cve.id,
        description: description.length > 300 ? description.substring(0, 300) + "..." : description,
        severity,
        score,
        publishedDate: cve.published,
        lastModifiedDate: cve.lastModified,
        references: cve.references?.slice(0, 3).map((r) => r.url) || [],
      };
    });

    // Update cache
    cache.set(decodedKeyword, {
      data: cves,
      timestamp: Date.now(),
      total: data.totalResults,
    });

    return NextResponse.json({
      cves,
      total: data.totalResults,
      cached: false,
    });
  } catch (error) {
    console.error("CVE fetch error:", error);
    return NextResponse.json(
      {
        cves: [],
        total: 0,
        error: "Failed to fetch CVE data",
      },
      { status: 500 }
    );
  }
}
