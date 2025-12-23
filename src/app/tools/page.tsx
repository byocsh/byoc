"use client";

import Link from "next/link";
import { useState } from "react";

interface Tool {
  name: string;
  description: string;
  category: string;
  github: string;
  website?: string;
}

const categories = [
  "all",
  "databases",
  "analytics",
  "monitoring",
  "ci-cd",
  "communication",
  "storage",
  "auth",
];

const tools: Tool[] = [
  {
    name: "PostgreSQL",
    description: "The world's most advanced open source relational database.",
    category: "databases",
    github: "https://github.com/postgres/postgres",
    website: "https://www.postgresql.org/",
  },
  {
    name: "ClickHouse",
    description: "Fast open-source column-oriented database for real-time analytics.",
    category: "analytics",
    github: "https://github.com/ClickHouse/ClickHouse",
    website: "https://clickhouse.com/",
  },
  {
    name: "Prometheus",
    description: "Monitoring system and time series database.",
    category: "monitoring",
    github: "https://github.com/prometheus/prometheus",
    website: "https://prometheus.io/",
  },
  {
    name: "Grafana",
    description: "Open source analytics and monitoring solution.",
    category: "monitoring",
    github: "https://github.com/grafana/grafana",
    website: "https://grafana.com/",
  },
  {
    name: "Gitea",
    description: "Painless self-hosted all-in-one software development service.",
    category: "ci-cd",
    github: "https://github.com/go-gitea/gitea",
    website: "https://gitea.io/",
  },
  {
    name: "Drone",
    description: "Container-native continuous delivery platform.",
    category: "ci-cd",
    github: "https://github.com/harness/drone",
    website: "https://www.drone.io/",
  },
  {
    name: "Mattermost",
    description: "Open source platform for secure collaboration.",
    category: "communication",
    github: "https://github.com/mattermost/mattermost",
    website: "https://mattermost.com/",
  },
  {
    name: "MinIO",
    description: "High-performance, S3 compatible object storage.",
    category: "storage",
    github: "https://github.com/minio/minio",
    website: "https://min.io/",
  },
  {
    name: "Keycloak",
    description: "Open source identity and access management.",
    category: "auth",
    github: "https://github.com/keycloak/keycloak",
    website: "https://www.keycloak.org/",
  },
  {
    name: "Plausible",
    description: "Simple, privacy-friendly alternative to Google Analytics.",
    category: "analytics",
    github: "https://github.com/plausible/analytics",
    website: "https://plausible.io/",
  },
];

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = selectedCategory === "all" 
    ? tools 
    : tools.filter((tool) => tool.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          tools directory.
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          a curated list of open source tools you can self-host. your cloud, your rules.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm px-3 py-1 border rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-900 dark:border-gray-100"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.name}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-semibold">{tool.name}</h2>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {tool.description}
                  </p>
                  <div className="flex gap-4 text-sm">
                    <Link
                      href={tool.github}
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github →
                    </Link>
                    {tool.website && (
                      <Link
                        href={tool.website}
                        className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        website →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="font-semibold mb-2">submit a tool</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            know a great self-hostable tool that&apos;s missing from our list? 
            <a href="https://github.com/byocsh/byoc" className="ml-1">open a PR on github</a> to add it.
          </p>
        </div>
      </div>
    </div>
  );
}
