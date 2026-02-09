import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/components/mdx-components";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.meta.title} - BYOC Blog`,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <Link
            href="/blog"
            className="hover:text-gray-900 dark:hover:text-white"
          >
            blog
          </Link>
          {" / "}
          <span className="text-gray-900 dark:text-white">
            {post.meta.title.toLowerCase()}
          </span>
        </div>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.meta.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span>{formatDate(post.meta.date)}</span>
            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
              {post.meta.category}
            </span>
            <span>{post.meta.author}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {post.meta.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-gray-50 dark:bg-gray-900 text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <article className="prose-byoc">
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/blog"
            className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            ← back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}
