import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

type MDXComponents = Record<string, React.ComponentType<ComponentPropsWithoutRef<any>>>;

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-3"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5"
      {...props}
    />
  ),
  a: ({ href, children, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="text-gray-900 dark:text-gray-100 underline hover:no-underline"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-900 dark:text-gray-100 underline hover:no-underline"
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: (props) => (
    <ul
      className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-5 space-y-2"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal pl-6 text-gray-600 dark:text-gray-400 mb-5 space-y-2"
      {...props}
    />
  ),
  li: (props) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 italic text-gray-500 dark:text-gray-500 my-6"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="text-sm px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded font-mono"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 overflow-x-auto mb-5 text-sm"
      {...props}
    />
  ),
  hr: () => (
    <hr className="border-gray-200 dark:border-gray-800 my-8" />
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="max-w-full rounded my-6" alt="" {...props} />
  ),
  strong: (props) => (
    <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props} />
  ),
  em: (props) => (
    <em className="italic" {...props} />
  ),
  table: (props) => (
    <div className="overflow-x-auto mb-5">
      <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-800" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead className="bg-gray-50 dark:bg-gray-900" {...props} />
  ),
  th: (props) => (
    <th className="px-4 py-2 font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-2 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800" {...props} />
  ),
};
