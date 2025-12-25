// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// Run 'pnpm generate-data' to regenerate this file

// Import all product JSON files
import airbyte from './products/airbyte.json';
import cassandra from './products/cassandra.json';
import clickhouse from './products/clickhouse.json';
import cockroachdb from './products/cockroachdb.json';
import coolify from './products/coolify.json';
import databricks from './products/databricks.json';
import drone from './products/drone.json';
import druid from './products/druid.json';
import flink from './products/flink.json';
import grafana from './products/grafana.json';
import kafka from './products/kafka.json';
import milvus from './products/milvus.json';
import mongodb from './products/mongodb.json';
import mysql from './products/mysql.json';
import nifi from './products/nifi.json';
import opensearch from './products/opensearch.json';
import pinecone from './products/pinecone.json';
import pinot from './products/pinot.json';
import pocketbase from './products/pocketbase.json';
import postgresql from './products/postgresql.json';
import prometheus from './products/prometheus.json';
import pulsar from './products/pulsar.json';
import qdrant from './products/qdrant.json';
import redis from './products/redis.json';
import redpanda from './products/redpanda.json';
import singlestore from './products/singlestore.json';
import turbopuffer from './products/turbopuffer.json';
import uptimeKuma from './products/uptime-kuma.json';
import weaviate from './products/weaviate.json';

// Import all vendor JSON files
import airbyteCloud from './vendors/airbyte-cloud.json';
import aiven from './vendors/aiven.json';
import altinity from './vendors/altinity.json';
import awsManagedPrometheus from './vendors/aws-managed-prometheus.json';
import awsRds from './vendors/aws-rds.json';
import clickhouseCloud from './vendors/clickhouse-cloud.json';
import cockroachdbCloud from './vendors/cockroachdb-cloud.json';
import confluentCloud from './vendors/confluent-cloud.json';
import coolifyCloud from './vendors/coolify-cloud.json';
import databricksByoc from './vendors/databricks-byoc.json';
import doublecloud from './vendors/doublecloud.json';
import elestio from './vendors/elestio.json';
import grafanaCloud from './vendors/grafana-cloud.json';
import harness from './vendors/harness.json';
import imply from './vendors/imply.json';
import instaclustr from './vendors/instaclustr.json';
import parseableInc from './vendors/parseable-inc.json';
import pineconeByoc from './vendors/pinecone-byoc.json';
import qdrantCloud from './vendors/qdrant-cloud.json';
import railway from './vendors/railway.json';
import redisCloud from './vendors/redis-cloud.json';
import redpandaCloud from './vendors/redpanda-cloud.json';
import scalegrid from './vendors/scalegrid.json';
import singlestoreHelios from './vendors/singlestore-helios.json';
import snowflakeOpenflow from './vendors/snowflake-openflow.json';
import startree from './vendors/startree.json';
import streamnative from './vendors/streamnative.json';
import turbopufferByoc from './vendors/turbopuffer-byoc.json';
import ververica from './vendors/ververica.json';
import weaviateCloud from './vendors/weaviate-cloud.json';
import zillizCloud from './vendors/zilliz-cloud.json';

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
  airbyte,
  cassandra,
  clickhouse,
  cockroachdb,
  coolify,
  databricks,
  drone,
  druid,
  flink,
  grafana,
  kafka,
  milvus,
  mongodb,
  mysql,
  nifi,
  opensearch,
  pinecone,
  pinot,
  pocketbase,
  postgresql,
  prometheus,
  pulsar,
  qdrant,
  redis,
  redpanda,
  singlestore,
  turbopuffer,
  uptimeKuma,
  weaviate
] as ProductData[];

export const vendorsData: VendorData[] = [
  airbyteCloud,
  aiven,
  altinity,
  awsManagedPrometheus,
  awsRds,
  clickhouseCloud,
  cockroachdbCloud,
  confluentCloud,
  coolifyCloud,
  databricksByoc,
  doublecloud,
  elestio,
  grafanaCloud,
  harness,
  imply,
  instaclustr,
  parseableInc,
  pineconeByoc,
  qdrantCloud,
  railway,
  redisCloud,
  redpandaCloud,
  scalegrid,
  singlestoreHelios,
  snowflakeOpenflow,
  startree,
  streamnative,
  turbopufferByoc,
  ververica,
  weaviateCloud,
  zillizCloud
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
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
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
