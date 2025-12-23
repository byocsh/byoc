import { NextResponse } from "next/server";

interface CVEItem {
  id: string;
  description: string;
  severity: string;
  score: number | null;
  publishedDate: string;
  lastModifiedDate: string;
  references: string[];
  fixedVersions: string[];
  affectedPackages: string[];
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

interface OSVResponse {
  vulns?: Array<{
    id: string;
    affected?: Array<{
      package?: {
        name: string;
        ecosystem: string;
      };
      ranges?: Array<{
        type: string;
        events: Array<{ introduced?: string; fixed?: string }>;
      }>;
    }>;
  }>;
}

// Simple in-memory cache with TTL
const cache = new Map<string, { data: CVEItem[]; timestamp: number; total: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

// Fetch fix information from OSV.dev for a specific CVE
async function fetchOSVData(cveId: string): Promise<{ fixedVersions: string[]; affectedPackages: string[] }> {
  try {
    const response = await fetch(`https://api.osv.dev/v1/vulns/${cveId}`, {
      headers: { "User-Agent": "byoc.sh/1.0" },
    });
    
    if (!response.ok) {
      return { fixedVersions: [], affectedPackages: [] };
    }
    
    const data = await response.json();
    const fixedVersions: string[] = [];
    const affectedPackages: string[] = [];
    
    if (data.affected) {
      for (const affected of data.affected) {
        if (affected.package?.name) {
          const pkgName = `${affected.package.ecosystem}/${affected.package.name}`;
          if (!affectedPackages.includes(pkgName)) {
            affectedPackages.push(pkgName);
          }
        }
        
        if (affected.ranges) {
          for (const range of affected.ranges) {
            // Only use SEMVER or ECOSYSTEM ranges (not GIT which has commit hashes)
            if (range.type === "GIT") continue;
            
            for (const event of range.events || []) {
              if (event.fixed) {
                const fixedStr = String(event.fixed);
                // Only include if it looks like a version (contains a dot or is semver-like)
                if (fixedStr.includes(".") && !fixedVersions.includes(fixedStr)) {
                  fixedVersions.push(fixedStr);
                }
              }
            }
          }
        }
      }
    }
    
    return { fixedVersions: fixedVersions.slice(0, 5), affectedPackages: affectedPackages.slice(0, 5) };
  } catch {
    return { fixedVersions: [], affectedPackages: [] };
  }
}

// Query OSV.dev by package name to get vulnerabilities with fix info
async function fetchOSVByPackage(packageName: string, ecosystem: string = "npm"): Promise<CVEItem[]> {
  try {
    const response = await fetch("https://api.osv.dev/v1/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "byoc.sh/1.0",
      },
      body: JSON.stringify({
        package: { name: packageName, ecosystem },
      }),
    });

    if (!response.ok) {
      return [];
    }

    const data: OSVResponse = await response.json();
    if (!data.vulns) return [];

    return data.vulns
      .filter((vuln) => vuln.id.startsWith("CVE-") || vuln.id.startsWith("GHSA-"))
      .slice(0, 10)
      .map((vuln) => {
        const fixedVersions: string[] = [];
        const affectedPackages: string[] = [];

        for (const affected of vuln.affected || []) {
          if (affected.package?.name) {
            const pkgName = `${affected.package.ecosystem}/${affected.package.name}`;
            if (!affectedPackages.includes(pkgName)) {
              affectedPackages.push(pkgName);
            }
          }

          for (const range of affected.ranges || []) {
            if (range.type === "GIT") continue;
            for (const event of range.events || []) {
              if (event.fixed) {
                const fixedStr = String(event.fixed);
                if (fixedStr.includes(".") && !fixedVersions.includes(fixedStr)) {
                  fixedVersions.push(fixedStr);
                }
              }
            }
          }
        }

        return {
          id: vuln.id,
          description: "",
          severity: "UNKNOWN",
          score: null,
          publishedDate: "",
          lastModifiedDate: "",
          references: [],
          fixedVersions: fixedVersions.slice(0, 5),
          affectedPackages: affectedPackages.slice(0, 3),
        };
      });
  } catch {
    return [];
  }
}

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

    // Also query OSV directly by package name for better fix info
    const osvPackageVulns = await fetchOSVByPackage(decodedKeyword);
    const osvFixMap = new Map<string, { fixedVersions: string[]; affectedPackages: string[] }>();
    for (const vuln of osvPackageVulns) {
      osvFixMap.set(vuln.id, {
        fixedVersions: vuln.fixedVersions,
        affectedPackages: vuln.affectedPackages,
      });
    }

    // Sort by published date (latest first)
    const sortedVulns = data.vulnerabilities.sort(
      (a, b) => new Date(b.cve.published).getTime() - new Date(a.cve.published).getTime()
    );

    // Fetch OSV data for each CVE to get fix information
    const cves: CVEItem[] = await Promise.all(
      sortedVulns.map(async (vuln) => {
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

        // Check OSV package query first, then fall back to CVE lookup
        let fixedVersions: string[] = [];
        let affectedPackages: string[] = [];
        
        const osvData = osvFixMap.get(cve.id);
        if (osvData && (osvData.fixedVersions.length > 0 || osvData.affectedPackages.length > 0)) {
          fixedVersions = osvData.fixedVersions;
          affectedPackages = osvData.affectedPackages;
        } else {
          // Fall back to individual CVE lookup
          const fetchedData = await fetchOSVData(cve.id);
          fixedVersions = fetchedData.fixedVersions;
          affectedPackages = fetchedData.affectedPackages;
        }

        return {
          id: cve.id,
          description: description.length > 300 ? description.substring(0, 300) + "..." : description,
          severity,
          score,
          publishedDate: cve.published,
          lastModifiedDate: cve.lastModified,
          references: cve.references?.slice(0, 3).map((r) => r.url) || [],
          fixedVersions,
          affectedPackages,
        };
      })
    );

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
