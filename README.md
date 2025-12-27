# byoc.sh

> A curated directory of open source products with true BYOC (Bring Your Own Cloud) deployment options.

[![Website](https://img.shields.io/badge/visit-byoc.sh-black)](https://byoc.sh)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## What is BYOC?

**BYOC = Bring Your Own Cloud**

The BYOC paradigm is based on a simple idea: vendor deploys, upgrades, and operates. Buyer keeps their data, compliance, cloud spend, and exit options. The goal is to enable the best of both worlds - SaaS convenience with self-hosting control.

### BYOC ≠ Self Hosting

BYOC looks a lot like self-hosting - software runs in buyer's infrastructure, buyer has full control over data, compliance, and cloud costs. But there is a key difference: vendor is responsible for deploying, upgrading, and operating the software. This important differentiation is what makes BYOC a viable software delivery model.

### Why BYOC?

- **Data Sovereignty** - Keep your sensitive data in your own cloud
- **Compliance Control** - Meet regulatory requirements with ease
- **Cost Transparency** - Direct visibility and control over cloud spend
- **No Vendor Lock-in** - Retain full exit options and data portability
- **Agent Ready** - Perfect for LLM applications requiring unencumbered access to domain-specific data
- **Security** - Enforce your own security policies while vendors focus on application security

## About This Project

**byoc.sh** is a community-maintained directory of open source products that offer true BYOC deployment options. We help you discover products that can be deployed and managed by vendors in your own cloud infrastructure.

We don't build these tools. We don't host them. We just help you discover them.

## Features

- **Product Directory** - Browse 30+ open source products across multiple categories
- **Vendor Listings** - Discover vendors offering BYOC deployment for each product
- **Advanced Filtering** - Filter by category, language, license, and GitHub stars
- **Search** - Quickly find products by name or description
- **Submit Products** - Easy form to submit new products via GitHub PR

## Tech Stack

- **Framework** - [Next.js 16](https://nextjs.org/) with App Router
- **Language** - [TypeScript](https://www.typescriptlang.org/)
- **Styling** - [Tailwind CSS 4](https://tailwindcss.com/)
- **Data** - JSON-based product and vendor data
- **Deployment** - Static site generation

## Getting Started

### Prerequisites

- Node.js 18+ or npm/pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/byocsh/byoc.git
cd byoc

# Install dependencies
npm install
# or
pnpm install

# Generate data index
npm run generate-data

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate-data` - Generate data index from JSON files

## Project Structure

```
byoc/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page with manifesto
│   │   ├── tools/                # Product listings
│   │   ├── vendors/              # Vendor listings
│   │   ├── submit/               # Submission forms
│   │   └── about/                # About page
│   ├── components/               # React components
│   └── data/
│       ├── products/             # Product JSON files
│       ├── vendors/              # Vendor JSON files
│       └── index.ts              # Auto-generated data index
├── scripts/
│   └── generate-data-index.cjs   # Data index generator
└── public/                       # Static assets
```

## Contributing

We welcome contributions! Here are ways you can help:

### Add a Product

1. Visit [byoc.sh/submit/product](https://byoc.sh/submit/product) and fill out the form
2. The form will generate a JSON file and open GitHub to create a PR
3. Or manually create a JSON file in `src/data/products/` (see [GET-LISTED.md](GET-LISTED.md))

### Add a Vendor

1. Visit [byoc.sh/submit/vendor](https://byoc.sh/submit/vendor) and fill out the form
2. The form will generate a JSON file and open GitHub to create a PR
3. Or manually create a JSON file in `src/data/vendors/` (see [GET-LISTED.md](GET-LISTED.md))

### Product JSON Format

```json
{
  "id": "product-slug",
  "name": "Product Name",
  "description": "Brief description of the product.",
  "category": "databases",
  "github": "https://github.com/org/repo",
  "website": "https://product.com",
  "stars": "15.2k",
  "language": "Go",
  "license": "Apache-2.0",
  "vendors": ["vendor-id-1", "vendor-id-2"]
}
```

### Vendor JSON Format

```json
{
  "id": "vendor-slug",
  "name": "Vendor Name",
  "url": "https://vendor.com/byoc",
  "description": "BYOC deployment details and features.",
  "pricing": "Enterprise Plan",
  "products": ["product-id-1", "product-id-2"]
}
```

See [GET-LISTED.md](GET-LISTED.md) for detailed instructions.

## Data Management

Product and vendor data is stored in individual JSON files and automatically indexed at build time:

1. Add/edit JSON files in `src/data/products/` or `src/data/vendors/`
2. Run `npm run generate-data` to update the index
3. The build process automatically generates the index

## Categories

- **databases** - Relational and NoSQL databases
- **analytics** - Data analytics and warehousing
- **observability** - Monitoring, logging, and tracing
- **devops** - CI/CD, infrastructure, and deployment tools
- **streaming** - Data streaming and message queues
- **vector-db** - Vector databases for AI/ML applications

## License

ISC License - see [LICENSE](LICENSE) file for details.

## Community

- **Website** - [byoc.sh](https://byoc.sh)
- **GitHub** - [github.com/byocsh/byoc](https://github.com/byocsh/byoc)
- **Issues** - [github.com/byocsh/byoc/issues](https://github.com/byocsh/byoc/issues)
- **Newsletter** - Subscribe on [byoc.sh](https://byoc.sh)

## Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Loops](https://loops.so/) - Newsletter management
- [Google Favicons API](https://www.google.com/s2/favicons) - Logo fallbacks

---

**The BYOC paradigm is key for data-conscious enterprises. If you're buying software, ask for BYOC. If you're building software, offer BYOC.**

Open source is the future. And with BYOC, that future is in your hands.
