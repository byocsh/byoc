"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getToolById } from "@/data/tools";
import { GitHubIcon, ExternalLinkIcon } from "@/components/icons";

export default function ToolDetailPage() {
  const params = useParams();
  const tool = getToolById(params.id as string);

  if (!tool) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-2xl font-bold mb-4">Tool not found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The tool you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/tools" className="underline hover:no-underline">
            ← back to tools
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <Link href="/tools" className="hover:text-gray-900 dark:hover:text-white">
            tools
          </Link>
          {" / "}
          <span className="text-gray-900 dark:text-white">{tool.name.toLowerCase()}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{tool.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {tool.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={tool.github}
                target="_blank"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <GitHubIcon className="w-6 h-6" />
              </Link>
              {tool.website && (
                <Link
                  href={tool.website}
                  target="_blank"
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <ExternalLinkIcon className="w-6 h-6" />
                </Link>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800">{tool.category}</span>
            <span>★ {tool.stars}</span>
            <span>{tool.language}</span>
            <span>{tool.license}</span>
          </div>
        </div>

        {/* Managed Vendors Section */}
        <section>
          <h2 className="text-xl font-bold mb-2">managed hosting providers</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            don&apos;t want to self-host? these vendors offer managed {tool.name} services.
          </p>

          {tool.vendors.length > 0 ? (
            <div className="space-y-4">
              {tool.vendors.map((vendor) => (
                <Link
                  key={vendor.name}
                  href={vendor.url}
                  target="_blank"
                  className="block border border-gray-200 dark:border-gray-800 p-5 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{vendor.name}</h3>
                        {vendor.pricing && (
                          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                            {vendor.pricing}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {vendor.description}
                      </p>
                    </div>
                    <ExternalLinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-gray-200 dark:border-gray-800 p-8 text-center">
              <p className="text-gray-500 mb-2">no managed providers listed yet.</p>
              <p className="text-gray-400 text-sm">
                know a vendor?{" "}
                <a href="https://github.com/byocsh/byoc" className="underline hover:no-underline">
                  submit a PR
                </a>
              </p>
            </div>
          )}
        </section>

        {/* Self-host Section */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-2">self-host it yourself</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            prefer full control? deploy {tool.name} on your own infrastructure.
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center gap-4 mb-4">
              <Link
                href={tool.github}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
              >
                <GitHubIcon className="w-4 h-4" />
                view source on github
              </Link>
              {tool.website && (
                <Link
                  href={tool.website}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  <ExternalLinkIcon className="w-4 h-4" />
                  official documentation
                </Link>
              )}
            </div>
            <p className="text-gray-500 text-sm">
              check the official documentation for installation guides, docker images, and deployment options.
            </p>
          </div>
        </section>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link href="/tools" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">
            ← back to all tools
          </Link>
        </div>
      </div>
    </div>
  );
}
