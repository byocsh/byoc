import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BlogPostList } from "@/components/blog-post-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - BYOC",
  description:
    "Insights, guides, and tutorials on BYOC (Bring Your Own Cloud) tools, self-hosting, and open source infrastructure.",
  openGraph: {
    title: "Blog - BYOC",
    description:
      "Insights, guides, and tutorials on BYOC tools, self-hosting, and open source infrastructure.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold mb-2">blog</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          insights on BYOC, self-hosting, and open source infrastructure.
        </p>

        <BlogPostList posts={posts} categories={categories} />
      </div>
    </div>
  );
}
