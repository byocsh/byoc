#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const productsDir = path.join(dataDir, 'products');
const vendorsDir = path.join(dataDir, 'vendors');

// Get all JSON files from a directory
function getJsonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

const products = getJsonFiles(productsDir);
const vendors = getJsonFiles(vendorsDir);

// Generate import name from filename (e.g., "aws-rds" -> "awsRds")
function toImportName(filename) {
  return filename.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Generate the index.ts content
const indexContent = `// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// Run 'pnpm generate-data' to regenerate this file

// Import all product JSON files
${products.map(p => `import ${toImportName(p)} from './products/${p}.json';`).join('\n')}

// Import all vendor JSON files
${vendors.map(v => `import ${toImportName(v)} from './vendors/${v}.json';`).join('\n')}

// Types
export interface VendorData {
  id: string;
  name: string;
  url: string;
  description: string;
  pricing?: string;
  logo?: string;
  products: string[];
}

export interface ProductData {
  id: string;
  name: string;
  description: string;
  category: string;
  github?: string;
  website?: string;
  stars?: string;
  language?: string;
  license?: string;
  logo?: string;
  vendors: string[];
}

// Legacy types for backward compatibility
export interface Vendor {
  name: string;
  url: string;
  description: string;
  pricing?: string;
  logo?: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  github: string;
  website?: string;
  stars: string;
  language: string;
  license: string;
  logo?: string;
  vendors: Vendor[];
}

// Raw data arrays
export const productsData: ProductData[] = [
  ${products.map(p => toImportName(p)).join(',\n  ')}
] as ProductData[];

export const vendorsData: VendorData[] = [
  ${vendors.map(v => toImportName(v)).join(',\n  ')}
] as VendorData[];

// Create vendor lookup map
const vendorMap = new Map<string, VendorData>();
vendorsData.forEach(v => vendorMap.set(v.id, v));

// Convert to legacy format (Tool with embedded Vendor[])
export const tools: Tool[] = productsData.map(product => ({
  id: product.id,
  name: product.name,
  description: product.description,
  category: product.category,
  github: product.github || '',
  website: product.website,
  stars: product.stars || '0',
  language: product.language || '',
  license: product.license || '',
  logo: product.logo,
  vendors: product.vendors
    .map(vendorId => vendorMap.get(vendorId))
    .filter((v): v is VendorData => v !== undefined)
    .map(v => ({
      name: v.name,
      url: v.url,
      description: v.description,
      pricing: v.pricing,
      logo: v.logo,
    })),
}));

// Categories and filters
export const categories = [
  "all",
  "databases",
  "analytics",
  "observability",
  "devops",
  "streaming",
  "vector-db",
];

export const languages = ["All", "Go", "TypeScript", "Rust", "Python", "Java", "C++", "Elixir", "PHP", "C#", "Ruby", "Scala"];
export const licenses = ["All", "Apache-2.0", "MIT", "AGPL-3.0", "GPL-3.0", "BSD-3-Clause", "MPL-2.0", "BSL", "SSPL", "PostgreSQL", "GPL-2.0"];
export const starFilters = ["All", "50k+", "20k+", "10k+", "5k+", "1k+"];

// Helper functions
export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.id === slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug);
}

export function getVendorById(id: string): VendorData | undefined {
  return vendorMap.get(id);
}

export function getProductById(id: string): ProductData | undefined {
  return productsData.find(p => p.id === id);
}

// Helper function to extract domain from URL
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace('www.', '');
  } catch {
    return '';
  }
}

// Helper function to generate logo URL from domain or company URL
export function getLogoUrl(url: string, fallbackName?: string): string {
  const domain = extractDomain(url);
  if (!domain) return '';
  return \`https://www.google.com/s2/favicons?domain=\${domain}&sz=128\`;
}

// Helper function to get vendor logo
export function getVendorLogo(vendor: Vendor): string {
  if (vendor.logo) return vendor.logo;
  return getLogoUrl(vendor.url, vendor.name);
}

// Helper function to get tool logo
export function getToolLogo(tool: Tool): string {
  if (tool.logo) return tool.logo;
  return getLogoUrl(tool.website || tool.github, tool.name);
}
`;

// Write the generated index.ts
fs.writeFileSync(path.join(dataDir, 'index.ts'), indexContent);
console.log('Generated src/data/index.ts with:');
console.log(`  - ${products.length} products`);
console.log(`  - ${vendors.length} vendors`);
