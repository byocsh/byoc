"use client";

import { useState } from "react";
import Link from "next/link";

export default function SubmitVendorPage() {
  const [formData, setFormData] = useState({
    vendorName: "",
    vendorUrl: "",
    vendorDescription: "",
    pricing: "",
    productName: "",
    byocDetails: "",
    contactEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateVendorJSON = () => {
    // Generate a slug from vendor name
    const slug = formData.vendorName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Generate product slug
    const productSlug = formData.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Create the vendor JSON
    const vendorData = {
      id: slug,
      name: formData.vendorName,
      url: formData.vendorUrl,
      description: formData.vendorDescription,
      pricing: formData.pricing || undefined,
      products: [productSlug]
    };
    
    // Remove undefined values
    const cleanedData = Object.fromEntries(
      Object.entries(vendorData).filter(([, v]) => v !== undefined)
    );
    
    return { slug, content: JSON.stringify(cleanedData, null, 2) };
  };

  const generateGitHubPRUrl = () => {
    const { slug, content } = generateVendorJSON();
    const filename = `src/data/vendors/${slug}.json`;
    const encodedContent = encodeURIComponent(content);
    const message = encodeURIComponent(`Add vendor: ${formData.vendorName}`);
    
    return `https://github.com/byocsh/byoc/new/main?filename=${filename}&value=${encodedContent}&message=${message}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateGitHubPRUrl();
    window.open(url, "_blank");
  };

  const isFormValid = formData.vendorName && formData.vendorUrl && formData.vendorDescription && formData.productName;

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white">
            ← back to home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">Get Listed as a Vendor</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Submit your BYOC vendor information to be listed in our directory. This will create a GitHub Pull Request for review.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="vendorName" className="block text-sm font-medium mb-2">
              Vendor Name *
            </label>
            <input
              type="text"
              id="vendorName"
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              required
              placeholder="e.g., Acme Cloud Services"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="vendorUrl" className="block text-sm font-medium mb-2">
              Website URL *
            </label>
            <input
              type="url"
              id="vendorUrl"
              name="vendorUrl"
              value={formData.vendorUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="vendorDescription" className="block text-sm font-medium mb-2">
              Description *
            </label>
            <textarea
              id="vendorDescription"
              name="vendorDescription"
              value={formData.vendorDescription}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Brief description of your BYOC offering..."
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white resize-none"
            />
          </div>

          <div>
            <label htmlFor="pricing" className="block text-sm font-medium mb-2">
              Pricing Model
            </label>
            <input
              type="text"
              id="pricing"
              name="pricing"
              value={formData.pricing}
              onChange={handleChange}
              placeholder="e.g., Pay-as-you-go, Enterprise, From $99/mo"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="productName" className="block text-sm font-medium mb-2">
              Product/Tool Supported *
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              placeholder="e.g., PostgreSQL, ClickHouse, Kafka"
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="byocDetails" className="block text-sm font-medium mb-2">
              BYOC Implementation Details
            </label>
            <textarea
              id="byocDetails"
              name="byocDetails"
              value={formData.byocDetails}
              onChange={handleChange}
              rows={4}
              placeholder="Describe how your BYOC offering works (e.g., deploys in customer's AWS/GCP account, data stays in customer VPC, etc.)"
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
