"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { categories, languages, licenses } from "@/data/tools";

export default function SubmitProductPage() {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    category: "",
    githubUrl: "",
    websiteUrl: "",
    language: "",
    license: "",
    stars: "",
    contactEmail: "",
    additionalNotes: "",
  });
  const [isFetchingRepo, setIsFetchingRepo] = useState(false);
  const [repoFetchError, setRepoFetchError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Extract owner and repo from GitHub URL
  const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
    }
    return null;
  };

  // Format stars count (e.g., 15200 -> "15.2k")
  const formatStars = (count: number): string => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count.toString();
  };

  // Fetch repo info from GitHub API
  const fetchRepoInfo = useCallback(async (url: string) => {
    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      setRepoFetchError("Invalid GitHub URL format");
      return;
    }

    setIsFetchingRepo(true);
    setRepoFetchError("");

    try {
      const response = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`);
      if (!response.ok) {
        throw new Error("Repository not found");
      }
      const data = await response.json();

      // Reset form and fill with new data from GitHub
      setFormData({
        productName: data.name || "",
        description: data.description || "",
        category: "",
        githubUrl: url,
        websiteUrl: data.homepage || "",
        language: data.language || "",
        license: data.license?.spdx_id || "",
        stars: formatStars(data.stargazers_count),
        contactEmail: "",
        additionalNotes: "",
      });
    } catch (error) {
      setRepoFetchError(error instanceof Error ? error.message : "Failed to fetch repository info");
    } finally {
      setIsFetchingRepo(false);
    }
  }, []);

  // Handle GitHub URL blur to auto-fetch
  const handleGitHubUrlBlur = () => {
    if (formData.githubUrl && parseGitHubUrl(formData.githubUrl)) {
      fetchRepoInfo(formData.githubUrl);
    }
  };

  const generateProductEntry = () => {
    // Generate a slug from product name
    const slug = formData.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Create the product entry that would be added to tools.ts
    const productEntry = `# Product Submission: ${formData.productName}

## Product Information
- **Name:** ${formData.productName}
- **Description:** ${formData.description}
- **Category:** ${formData.category}
- **GitHub:** ${formData.githubUrl}
- **Website:** ${formData.websiteUrl || "N/A"}
- **Language:** ${formData.language}
- **License:** ${formData.license}
- **Stars:** ${formData.stars || "N/A"}

## Additional Notes
${formData.additionalNotes || "N/A"}

## Contact
${formData.contactEmail || "N/A"}

---

### Code to add to src/data/tools.ts:

\`\`\`typescript
{
  id: "${slug}",
  name: "${formData.productName}",
  description: "${formData.description}",
  category: "${formData.category}",
  github: "${formData.githubUrl}",
  website: "${formData.websiteUrl || ""}",
  stars: "${formData.stars || "0"}",
  language: "${formData.language}",
  license: "${formData.license}",
  vendors: [],
},
\`\`\`
`;
    return { slug, content: productEntry };
  };

  const generateGitHubPRUrl = () => {
    const { slug, content } = generateProductEntry();
    const filename = `submissions/products/${slug}.md`;
    const encodedContent = encodeURIComponent(content);
    const message = encodeURIComponent(`Add product: ${formData.productName}`);
    
    return `https://github.com/byocsh/byoc/new/main?filename=${filename}&value=${encodedContent}&message=${message}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateGitHubPRUrl();
    window.open(url, "_blank");
  };

  const isFormValid = formData.productName && formData.description && formData.category && formData.language && formData.license;

  const filteredCategories = categories.filter(c => c !== "all");

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">
            ← back to home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">List a Product</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Submit an open source product to be listed in our directory. This will create a GitHub Pull Request for review.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">
              GitHub Repository URL <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                onBlur={handleGitHubUrlBlur}
                placeholder="https://github.com/org/repo"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
              />
              {isFetchingRepo && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            {repoFetchError && (
              <p className="text-red-500 text-xs mt-1">{repoFetchError}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Enter a GitHub URL and other fields will be auto-filled
            </p>
          </div>

          <div>
            <label htmlFor="productName" className="block text-sm font-medium mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              placeholder="e.g., PostgreSQL, ClickHouse"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Brief description of the product..."
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white resize-none"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            >
              <option value="">Select a category</option>
              {filteredCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="websiteUrl" className="block text-sm font-medium mb-2">
              Website URL
            </label>
            <input
              type="url"
              id="websiteUrl"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="language" className="block text-sm font-medium mb-2">
                Primary Language *
              </label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
              >
                <option value="">Select language</option>
                {languages.filter(l => l !== "All").map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="license" className="block text-sm font-medium mb-2">
                License *
              </label>
              <select
                id="license"
                name="license"
                value={formData.license}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
              >
                <option value="">Select license</option>
                {licenses.filter(l => l !== "All").map((lic) => (
                  <option key={lic} value={lic}>
                    {lic}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="stars" className="block text-sm font-medium mb-2">
              GitHub Stars (approximate)
            </label>
            <input
              type="text"
              id="stars"
              name="stars"
              value={formData.stars}
              onChange={handleChange}
              placeholder="e.g., 10.5k"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium mb-2">
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional information about the product, known BYOC vendors, etc."
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white resize-none"
            />
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium mb-2">
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit via GitHub
            </button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              This will open GitHub to create a Pull Request. You&apos;ll need a GitHub account to complete the submission.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
