"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { GitHubIcon, ExternalLinkIcon } from "@/components/icons";
import { tools, categories, languages, licenses, starFilters, getToolLogo, getVendorLogo } from "@/data/tools";

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedLicense, setSelectedLicense] = useState("All");
  const [selectedStars, setSelectedStars] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    let result = [...tools];

    if (selectedCategory !== "all") {
      result = result.filter((tool) => tool.category === selectedCategory);
    }

    if (selectedLanguage !== "All") {
      result = result.filter((tool) => tool.language === selectedLanguage);
    }

    if (selectedLicense !== "All") {
      result = result.filter((tool) => tool.license === selectedLicense);
    }

    if (selectedStars !== "All") {
      const minStars = parseInt(selectedStars.replace("k+", "")) * 1000;
      result = result.filter((tool) => {
        const stars = parseFloat(tool.stars.replace("k", "")) * 1000;
        return stars >= minStars;
      });
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.vendors.some(
            (vendor) =>
              vendor.name.toLowerCase().includes(query) ||
              vendor.description.toLowerCase().includes(query)
          )
      );
    }

    // Sort by stars (descending)
    result.sort((a, b) => {
      const starsA = parseFloat(a.stars.replace("k", "")) * 1000;
      const starsB = parseFloat(b.stars.replace("k", "")) * 1000;
      return starsB - starsA;
    });

    return result;
  }, [selectedCategory, selectedLanguage, selectedLicense, selectedStars, searchQuery]);

  const totalTools = tools.length;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">
          products <span className="text-gray-400 text-lg">({totalTools})</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          open source products available with true BYOC deployment - vendor managed in your cloud.
        </p>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search products..."
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">License</label>
            <select
              value={selectedLicense}
              onChange={(e) => setSelectedLicense(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600"
            >
              {licenses.map((lic) => (
                <option key={lic} value={lic}>{lic}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wide mb-1 block">Stars</label>
            <select
              value={selectedStars}
              onChange={(e) => setSelectedStars(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-600"
            >
              {starFilters.map((stars) => (
                <option key={stars} value={stars}>{stars}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} found
        </p>

        {/* Tools List */}
        <div className="space-y-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="border border-gray-200 dark:border-gray-800 p-5"
            >
              {/* Tool Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <Link href={`/tools/${tool.id}`} className="flex-1 group">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={getToolLogo(tool)}
                      alt={`${tool.name} logo`}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <h2 className="text-xl font-semibold group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">{tool.name}</h2>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span>★ {tool.stars}</span>
                    <span>{tool.language}</span>
                    <span>{tool.license}</span>
                  </div>
                </Link>
                <div className="flex items-center gap-2">
                  <a
                    href={tool.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <GitHubIcon className="w-5 h-5" />
                  </a>
                  {tool.website && (
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <ExternalLinkIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* BYOC Vendors */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                  Available from {tool.vendors.length} BYOC vendor{tool.vendors.length !== 1 ? "s" : ""}:
                </p>
                <div className="space-y-2">
                  {tool.vendors.map((vendor) => (
                    <a
                      key={vendor.name}
                      href={vendor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <img
                              src={getVendorLogo(vendor)}
                              alt={`${vendor.name} logo`}
                              className="w-4 h-4 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <h3 className="text-sm font-medium">{vendor.name}</h3>
                            {vendor.pricing && (
                              <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                                {vendor.pricing}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {vendor.description}
                          </p>
                        </div>
                        <ExternalLinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p>no products found matching your criteria.</p>
            <p className="text-sm mt-2">try adjusting your filters.</p>
          </div>
        )}

        {/* Submit CTA */}
        <div className="mt-16 p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold mb-2">submit a product</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            know a great open source product with BYOC deployment that&apos;s missing?{" "}
            <a href="https://github.com/byocsh/byoc" className="underline hover:no-underline">
              open a PR on github
            </a>{" "}
            to add it.
          </p>
        </div>
      </div>
    </div>
  );
}
