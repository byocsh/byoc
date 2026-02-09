"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostList({
  posts,
  categories,
}: {
  posts: BlogPostMeta[];
  categories: string[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`text-sm px-3 py-1 transition-colors ${
            selectedCategory === "all"
              ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-black"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          all
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-sm px-3 py-1 transition-colors ${
              selectedCategory === cat
                ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-black"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post count */}
      <p className="text-sm text-gray-500 mb-6">
        {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
      </p>

      {/* Post cards */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border border-gray-200 dark:border-gray-800 p-5 hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
              <span>{formatDate(post.date)}</span>
              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {post.category}
              </span>
              <span>{post.author}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              {post.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-gray-50 dark:bg-gray-900 text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p>no posts found in this category.</p>
        </div>
      )}
    </>
  );
}
