"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { GitHubIcon, ExternalLinkIcon } from "@/components/icons";
import { tools, categories, languages, licenses, starFilters } from "@/data/tools";

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedLicense, setSelectedLicense] = useState("All");
  const [selectedStars, setSelectedStars] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = useMemo(() => {
    let result = tools;

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
          tool.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [selectedCategory, selectedLanguage, selectedLicense, selectedStars, searchQuery]);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          tools directory.
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          a curated list of open source tools you can self-host. your cloud, your rules.
        </p>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search tools..."
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
        <div className="space-y-4">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="block border border-gray-200 dark:border-gray-800 p-5 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-lg font-semibold">{tool.name}</h2>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {tool.category}
                    </span>
                    {tool.vendors.length > 0 && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                        {tool.vendors.length} managed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {tool.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span>★ {tool.stars}</span>
                    <span>{tool.language}</span>
                    <span>{tool.license}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(tool.github, "_blank");
                    }}
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <GitHubIcon className="w-5 h-5" />
                  </span>
                  {tool.website && (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(tool.website, "_blank");
                      }}
                      className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      <ExternalLinkIcon className="w-5 h-5" />
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p>no tools found matching your criteria.</p>
            <p className="text-sm mt-2">try adjusting your filters.</p>
          </div>
        )}

        {/* Submit CTA */}
        <div className="mt-16 p-6 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold mb-2">submit a tool</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            know a great self-hostable tool that&apos;s missing from our list?{" "}
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
