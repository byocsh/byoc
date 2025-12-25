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

export const categories = [
  "all",
  "databases",
  "analytics",
  "observability",
  "devops",
  "streaming",
  "vector-db",
];

export const languages = ["All", "Go", "TypeScript", "Rust", "Python", "Java", "C++", "Elixir", "PHP", "C#", "Ruby"];
export const licenses = ["All", "Apache-2.0", "MIT", "AGPL-3.0", "GPL-3.0", "BSD-3-Clause", "MPL-2.0"];
export const starFilters = ["All", "50k+", "20k+", "10k+", "5k+", "1k+"];

export const tools: Tool[] = [
  // Databases
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "The world's most advanced open source relational database.",
    category: "databases",
    github: "https://github.com/postgres/postgres",
    website: "https://www.postgresql.org/",
    stars: "15.2k",
    language: "C++",
    license: "PostgreSQL",
    vendors: [
      { name: "AWS RDS", url: "https://aws.amazon.com/rds/postgresql/", description: "Runs in your AWS VPC with managed operations by AWS.", pricing: "Pay-as-you-go" },
    ],
  },
  {
    id: "pocketbase",
    name: "PocketBase",
    description: "Open source backend in a single file with realtime database and auth.",
    category: "databases",
    github: "https://github.com/pocketbase/pocketbase",
    website: "https://pocketbase.io/",
    stars: "41.2k",
    language: "Go",
    license: "MIT",
    vendors: [
      { name: "Railway", url: "https://railway.app/", description: "BYOC available in Enterprise tier - deploy in your cloud.", pricing: "Enterprise" },
      { name: "Elestio", url: "https://elest.io/", description: "Bring your own VM from any provider, Elestio manages the software.", pricing: "From $17/mo" },
    ],
  },
  // Analytics
  {
    id: "clickhouse",
    name: "ClickHouse",
    description: "Fast open-source column-oriented database for real-time analytics.",
    category: "analytics",
    github: "https://github.com/ClickHouse/ClickHouse",
    website: "https://clickhouse.com/",
    stars: "37.8k",
    language: "C++",
    license: "Apache-2.0",
    vendors: [
      { name: "ClickHouse Cloud", url: "https://clickhouse.com/cloud", description: "True BYOC on AWS - all data in your VPC, ClickHouse manages operations.", pricing: "Pay-as-you-go" },
      { name: "Altinity", url: "https://altinity.com/", description: "Deploy and manage ClickHouse in your AWS, GCP, or Azure account.", pricing: "Contact sales" },
      { name: "DoubleCloud", url: "https://double.cloud/", description: "Managed ClickHouse in your AWS or GCP account (service winding down).", pricing: "Pay-as-you-go" },
    ],
  },
  // Monitoring
  {
    id: "prometheus",
    name: "Prometheus",
    description: "Monitoring system and time series database for metrics.",
    category: "monitoring",
    github: "https://github.com/prometheus/prometheus",
    website: "https://prometheus.io/",
    stars: "55.6k",
    language: "Go",
    license: "Apache-2.0",
    vendors: [
      { name: "Grafana Cloud", url: "https://grafana.com/products/cloud/", description: "Enterprise BYOC - full Grafana Cloud region in your AWS/GCP account.", pricing: "Enterprise" },
      { name: "AWS Managed Prometheus", url: "https://aws.amazon.com/prometheus/", description: "Runs in your AWS account with managed operations.", pricing: "Pay-as-you-go" },
    ],
  },
  {
    id: "grafana",
    name: "Grafana",
    description: "Open source analytics and interactive visualization platform.",
    category: "monitoring",
    github: "https://github.com/grafana/grafana",
    website: "https://grafana.com/",
    stars: "65.2k",
    language: "TypeScript",
    license: "AGPL-3.0",
    vendors: [
      { name: "Grafana Cloud", url: "https://grafana.com/products/cloud/", description: "Enterprise BYOC - full Grafana Cloud region in your AWS/GCP account.", pricing: "Enterprise" },
    ],
  },
  {
    id: "uptime-kuma",
    name: "Uptime Kuma",
    description: "Fancy self-hosted monitoring tool like Uptime Robot.",
    category: "monitoring",
    github: "https://github.com/louislam/uptime-kuma",
    website: "https://uptime.kuma.pet/",
    stars: "60.5k",
    language: "TypeScript",
    license: "MIT",
    vendors: [
      { name: "Railway", url: "https://railway.app/", description: "BYOC available in Enterprise tier - deploy in your cloud.", pricing: "Enterprise" },
      { name: "Elestio", url: "https://elest.io/", description: "Bring your own VM from any provider, Elestio manages the software.", pricing: "From $17/mo" },
    ],
  },
  // DevOps
  {
    id: "drone",
    name: "Drone",
    description: "Container-native continuous delivery platform built on Docker.",
    category: "devops",
    github: "https://github.com/harness/drone",
    website: "https://www.drone.io/",
    stars: "32.1k",
    language: "Go",
    license: "Apache-2.0",
    vendors: [
      { name: "Harness", url: "https://harness.io/", description: "BYOC deployment option - Harness manages CI/CD in your cloud.", pricing: "Contact sales" },
    ],
  },
  {
    id: "coolify",
    name: "Coolify",
    description: "Open-source & self-hostable Heroku / Netlify / Vercel alternative.",
    category: "devops",
    github: "https://github.com/coollabsio/coolify",
    website: "https://coolify.io/",
    stars: "35.2k",
    language: "PHP",
    license: "Apache-2.0",
    vendors: [
      { name: "Coolify Cloud", url: "https://coolify.io/", description: "True BYOC - bring your servers, Coolify manages deployments from control plane.", pricing: "From $5/mo" },
    ],
  },
  // More Databases
  {
    id: "cockroachdb",
    name: "CockroachDB",
    description: "Cloud-native distributed SQL database that survives disasters.",
    category: "databases",
    github: "https://github.com/cockroachdb/cockroach",
    website: "https://www.cockroachlabs.com/",
    stars: "30.1k",
    language: "Go",
    license: "Apache-2.0",
    vendors: [
      { name: "CockroachDB Cloud", url: "https://www.cockroachlabs.com/product/cloud/bring-your-own-cloud/", description: "BYOC on AWS, GCP, Azure - you control infrastructure while CockroachDB manages operations.", pricing: "Usage-based" },
    ],
  },
  {
    id: "cassandra",
    name: "Apache Cassandra",
    description: "Distributed NoSQL database designed for scalability and high availability.",
    category: "databases",
    github: "https://github.com/apache/cassandra",
    website: "https://cassandra.apache.org/",
    stars: "9.0k",
    language: "Java",
    license: "Apache-2.0",
    vendors: [
      { name: "Instaclustr", url: "https://www.instaclustr.com/platform/managed-apache-cassandra/", description: "Run managed Cassandra in your AWS, GCP, or Azure account with custom networking.", pricing: "Via AWS/Azure Marketplace" },
      { name: "ScaleGrid", url: "https://scalegrid.io/cassandra.html", description: "Managed Cassandra clusters in your cloud with full admin access and SSH.", pricing: "From $6/mo + infrastructure" },
    ],
  },
  {
    id: "mysql",
    name: "MySQL",
    description: "The world's most popular open source database.",
    category: "databases",
    github: "https://github.com/mysql/mysql-server",
    website: "https://www.mysql.com/",
    stars: "11.0k",
    language: "C++",
    license: "GPL-2.0",
    vendors: [
      { name: "ScaleGrid", url: "https://help.scalegrid.io/docs/getting-started-bring-your-own-cloud-plans", description: "Fully managed MySQL in your AWS, Azure, GCP, or OCI account with SSH access.", pricing: "From $6/mo + infrastructure" },
      { name: "Aiven", url: "https://aiven.io/mysql", description: "Managed MySQL with BYOC across AWS, GCP, Azure.", pricing: "Contact sales" },
      { name: "Instaclustr", url: "https://www.instaclustr.com/", description: "Managed MySQL in your cloud account.", pricing: "Via AWS/Azure Marketplace" },
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description: "The most popular NoSQL database for modern applications.",
    category: "databases",
    github: "https://github.com/mongodb/mongo",
    website: "https://www.mongodb.com/",
    stars: "26.5k",
    language: "C++",
    license: "SSPL",
    vendors: [
      { name: "ScaleGrid", url: "https://help.scalegrid.io/docs/getting-started-bring-your-own-cloud-plans", description: "Managed MongoDB in your AWS, Azure, GCP, or OCI account with full control.", pricing: "From $6/mo + infrastructure" },
    ],
  },
  {
    id: "redis",
    name: "Redis",
    description: "In-memory data structure store used as database, cache, and message broker.",
    category: "databases",
    github: "https://github.com/redis/redis",
    website: "https://redis.io/",
    stars: "67.0k",
    language: "C++",
    license: "BSD-3-Clause",
    vendors: [
      { name: "Redis Cloud", url: "https://redis.io/docs/latest/operate/rc/subscriptions/bring-your-own-cloud/", description: "BYOC on AWS with Active-Active geo-replication in your VPC.", pricing: "License + management fee" },
      { name: "ScaleGrid", url: "https://help.scalegrid.io/docs/getting-started-bring-your-own-cloud-plans", description: "Managed Redis in your cloud account with full SSH and admin access.", pricing: "From $6/mo + infrastructure" },
      { name: "Instaclustr", url: "https://www.instaclustr.com/", description: "Managed Redis in your cloud infrastructure.", pricing: "Via AWS/Azure Marketplace" },
    ],
  },
  {
    id: "singlestore",
    name: "SingleStore",
    description: "Real-time distributed SQL database for data-intensive applications.",
    category: "databases",
    github: "https://github.com/singlestore-labs",
    website: "https://www.singlestore.com/",
    stars: "0.5k",
    language: "C++",
    license: "Apache-2.0",
    vendors: [
      { name: "SingleStore Helios", url: "https://docs.singlestore.com/cloud/getting-started-with-singlestore-helios/helios-byoc/", description: "BYOC on AWS - data never leaves your VPC, zero public IPs or inbound ports.", pricing: "Contact sales" },
    ],
  },
  // Streaming
  {
    id: "kafka",
    name: "Apache Kafka",
    description: "Distributed event streaming platform for high-performance data pipelines.",
    category: "streaming",
    github: "https://github.com/apache/kafka",
    website: "https://kafka.apache.org/",
    stars: "29.0k",
    language: "Java",
    license: "Apache-2.0",
    vendors: [
      { name: "Confluent Cloud", url: "https://www.confluent.io/learn/bring-your-own-cloud/", description: "WarpStream BYOC - diskless Kafka in your VPC with data in your object storage. 80% more cost-effective.", pricing: "Pay for writes + storage only" },
      { name: "Aiven", url: "https://aiven.io/kafka", description: "Managed Kafka with BYOC - Sophos saved 30-40% on costs with Aiven BYOC.", pricing: "Contact sales" },
      { name: "Instaclustr", url: "https://www.instaclustr.com/", description: "Managed Kafka clusters in your cloud account.", pricing: "Via AWS/Azure Marketplace" },
    ],
  },
  {
    id: "redpanda",
    name: "Redpanda",
    description: "Kafka-compatible streaming platform written in C++ with no ZooKeeper.",
    category: "streaming",
    github: "https://github.com/redpanda-data/redpanda",
    website: "https://redpanda.com/",
    stars: "9.6k",
    language: "C++",
    license: "BSL",
    vendors: [
      { name: "Redpanda Cloud", url: "https://www.redpanda.com/product/bring-your-own-cloud-byoc", description: "BYOC on AWS, GCP, Azure - you own data plane, Redpanda manages control plane. Up to 4 GB/s throughput.", pricing: "Via AWS/GCP Marketplace" },
    ],
  },
  {
    id: "pulsar",
    name: "Apache Pulsar",
    description: "Cloud-native distributed messaging and streaming platform.",
    category: "streaming",
    github: "https://github.com/apache/pulsar",
    website: "https://pulsar.apache.org/",
    stars: "14.3k",
    language: "Java",
    license: "Apache-2.0",
    vendors: [
      { name: "StreamNative", url: "https://streamnative.io/deployment/byoc", description: "BYOC² (Cloud + Compute) for Pulsar and Kafka on AWS, GCP, Azure. Also offers Managed Flink BYOC.", pricing: "Compute + Storage Units hourly" },
    ],
  },
  {
    id: "flink",
    name: "Apache Flink",
    description: "Stateful computations over data streams for real-time analytics.",
    category: "streaming",
    github: "https://github.com/apache/flink",
    website: "https://flink.apache.org/",
    stars: "24.2k",
    language: "Java",
    license: "Apache-2.0",
    vendors: [
      { name: "Ververica", url: "https://www.ververica.com/blog/introducing-byoc-deployment", description: "Managed Flink BYOC on AWS (GA Jan 2025) with Zero Trust security.", pricing: "Via AWS Marketplace" },
      { name: "StreamNative", url: "https://streamnative.io/deployment/byoc", description: "Managed Flink BYOC launched 2024 on AWS, GCP, Azure.", pricing: "Contact sales" },
    ],
  },
  {
    id: "airbyte",
    name: "Airbyte",
    description: "Open-source data integration platform for ELT pipelines.",
    category: "streaming",
    github: "https://github.com/airbytehq/airbyte",
    website: "https://airbyte.com/",
    stars: "16.0k",
    language: "Python",
    license: "MIT",
    vendors: [
      { name: "Airbyte Cloud", url: "https://airbyte.com/product/platform", description: "Hybrid BYOC - data plane in your infrastructure, control plane managed by Airbyte. Sensitive data never leaves your VPC.", pricing: "Contact sales" },
    ],
  },
  {
    id: "nifi",
    name: "Apache NiFi",
    description: "Easy-to-use data ingestion and distribution system for data routing.",
    category: "streaming",
    github: "https://github.com/apache/nifi",
    website: "https://nifi.apache.org/",
    stars: "4.9k",
    language: "Java",
    license: "Apache-2.0",
    vendors: [
      { name: "Snowflake Openflow", url: "https://docs.snowflake.com/en/user-guide/data-integration/openflow/setup-openflow-byoc", description: "BYOC launched June 2025 - NiFi runtimes in your AWS VPC for data integration without data leaving your network.", pricing: "Contact Snowflake" },
    ],
  },
  // Vector Databases
  {
    id: "milvus",
    name: "Milvus",
    description: "Open-source vector database for AI applications and similarity search.",
    category: "vector-db",
    github: "https://github.com/milvus-io/milvus",
    website: "https://milvus.io/",
    stars: "31.0k",
    language: "Go",
    license: "Apache-2.0",
    vendors: [
      { name: "Zilliz Cloud", url: "https://zilliz.com/bring-your-own-cloud", description: "Industry-first comprehensive BYOC for vector DB (upgraded Feb 2025, GCP GA June 2025). Data in your VPC with root access.", pricing: "Can use cloud credits" },
    ],
  },
  {
    id: "weaviate",
    name: "Weaviate",
    description: "Open-source vector database with hybrid search capabilities.",
    category: "vector-db",
    github: "https://github.com/weaviate/weaviate",
    website: "https://weaviate.io/",
    stars: "11.8k",
    language: "Go",
    license: "BSD-3-Clause",
    vendors: [
      { name: "Weaviate Cloud", url: "https://weaviate.io/deployment/byoc", description: "BYOC on AWS, GCP, Azure with managed Kubernetes. CloudFormation templates for easy AWS deployment.", pricing: "Premium tier" },
    ],
  },
  {
    id: "qdrant",
    name: "Qdrant",
    description: "High-performance vector database with advanced filtering.",
    category: "vector-db",
    github: "https://github.com/qdrant/qdrant",
    website: "https://qdrant.tech/",
    stars: "21.5k",
    language: "Rust",
    license: "Apache-2.0",
    vendors: [
      { name: "Qdrant Cloud", url: "https://qdrant.tech/cloud/", description: "Hybrid Cloud BYOC - most flexible deployment on any cloud, on-prem, or edge with Kubernetes-native architecture.", pricing: "Bring your cluster" },
    ],
  },
  {
    id: "pinecone",
    name: "Pinecone",
    description: "Vector database purpose-built for machine learning applications.",
    category: "vector-db",
    github: "https://github.com/pinecone-io",
    website: "https://www.pinecone.io/",
    stars: "0.2k",
    language: "Python",
    license: "Apache-2.0",
    vendors: [
      { name: "Pinecone", url: "https://www.pinecone.io/product/bring-your-own-cloud/", description: "BYOC on AWS and GCP - dedicated data plane in your VPC with Terraform deployment. Private endpoint connectivity.", pricing: "Dedicated Plan" },
    ],
  },
  {
    id: "turbopuffer",
    name: "Turbopuffer",
    description: "Fast vector database for real-time semantic search.",
    category: "vector-db",
    github: "https://github.com/turbopuffer",
    website: "https://turbopuffer.com/",
    stars: "0.1k",
    language: "Go",
    license: "Apache-2.0",
    vendors: [
      { name: "Turbopuffer", url: "https://turbopuffer.com/docs/byoc", description: "BYOC on AWS, GCP, Azure via Kubernetes - deployed within hours with Terraform configs. Data encrypted at rest in your cloud storage.", pricing: "Enterprise plan" },
    ],
  },
  // Observability
  {
    id: "opensearch",
    name: "OpenSearch",
    description: "Open-source search and analytics suite derived from Elasticsearch.",
    category: "observability",
    github: "https://github.com/opensearch-project/OpenSearch",
    website: "https://opensearch.org/",
    stars: "9.8k",
    language: "Java",
    license: "Apache-2.0",
    vendors: [
      { name: "Aiven", url: "https://aiven.io/opensearch", description: "Managed OpenSearch with BYOC on AWS (GA), GCP, Azure. La Redoute migrated to Azure BYOC.", pricing: "Contact sales" },
      { name: "Instaclustr", url: "https://www.instaclustr.com/", description: "Managed OpenSearch in your cloud account.", pricing: "Via AWS/Azure Marketplace" },
    ],
  },
  // Real-Time Analytics
  {
    id: "pinot",
    name: "Apache Pinot",
    description: "Real-time distributed OLAP datastore for user-facing analytics.",
    category: "analytics",
    github: "https://github.com/apache/pinot",
    website: "https://pinot.apache.org/",
    stars: "5.5k",
    language: "Java",
    license: "Apache-2.0",
    vendors: [
      { name: "StarTree", url: "https://startree.ai/products/startree-cloud/", description: "BYOC on AWS, GCP - data plane in your VPC. 2025 added BYOK (Bring Your Own Kubernetes) for deeper control.", pricing: "Custom SLAs" },
    ],
  },
  {
    id: "druid",
    name: "Apache Druid",
    description: "Real-time analytics database for fast slice-and-dice analytics.",
    category: "analytics",
    github: "https://github.com/apache/druid",
    website: "https://druid.apache.org/",
    stars: "13.5k",
    language: "Java",
    license: "Apache-2.0",
    vendors: [
      { name: "Imply", url: "https://imply.io/product/imply-cloud", description: "Enterprise Hybrid deployment - run Druid in your AWS VPC with Imply management.", pricing: "Contact sales" },
    ],
  },
  // Data Platform / Multi-service
  {
    id: "databricks",
    name: "Databricks",
    description: "Unified analytics platform for big data and AI built on Apache Spark.",
    category: "analytics",
    github: "https://github.com/databricks",
    website: "https://www.databricks.com/",
    stars: "3.0k",
    language: "Scala",
    license: "Apache-2.0",
    vendors: [
      { name: "Databricks", url: "https://docs.databricks.com/aws/en/security/network/classic/customer-managed-vpc", description: "Customer-managed VPC on AWS, Azure, GCP - data plane in your VPC, control plane managed by Databricks.", pricing: "Enterprise tier" },
    ],
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.id === slug || tool.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug);
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

  // Try multiple logo services in order
  // 1. Google Favicon service - most reliable
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

// Helper function to get vendor logo
export function getVendorLogo(vendor: Vendor): string {
  if (vendor.logo) return vendor.logo;
  return getLogoUrl(vendor.url, vendor.name);
}

// Helper function to get tool logo
export function getToolLogo(tool: Tool): string {
  // Prefer explicit logo, then website, then github
  if (tool.logo) return tool.logo;
  return getLogoUrl(tool.website || tool.github, tool.name);
}
