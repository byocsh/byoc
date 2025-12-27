# Getting Listed on byoc.sh

Thank you for your interest in listing your product or BYOC offering on byoc.sh! This guide will walk you through the process.

## Table of Contents

- [Quick Start](#quick-start)
- [Listing a Product](#listing-a-product)
- [Listing a BYOC Vendor](#listing-a-byoc-vendor)
- [Manual Submission Process](#manual-submission-process)
- [Product Requirements](#product-requirements)
- [Vendor Requirements](#vendor-requirements)
- [Review Process](#review-process)
- [FAQ](#faq)

## Quick Start

The easiest way to get listed is through our web forms:

1. **For Products** - Visit [byoc.sh/submit/product](https://byoc.sh/submit/product)
2. **For Vendors** - Visit [byoc.sh/submit/vendor](https://byoc.sh/submit/vendor)

Both forms will auto-generate the required JSON and create a GitHub Pull Request for you.

## Listing a Product

### Option 1: Web Form (Recommended)

1. Navigate to [byoc.sh/submit/product](https://byoc.sh/submit/product)
2. Fill in your product details:
   - GitHub URL (optional, but will auto-fill other fields)
   - Product name
   - Description
   - Category
   - Website URL
   - Primary language
   - License
   - GitHub stars (approximate)
   - Contact email
3. Click "Submit via GitHub" to create a PR

### Option 2: Manual Submission

1. Fork the [byoc repository](https://github.com/byocsh/byoc)
2. Create a new JSON file in `src/data/products/` named `your-product.json`
3. Use the template below
4. Submit a Pull Request

#### Product JSON Template

```json
{
  "id": "your-product",
  "name": "Your Product Name",
  "description": "A brief, compelling description of what your product does and its key features.",
  "category": "databases",
  "github": "https://github.com/yourorg/yourproduct",
  "website": "https://yourproduct.com",
  "stars": "15.2k",
  "language": "Go",
  "license": "Apache-2.0",
  "vendors": []
}
```

#### Product Field Descriptions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `id` | Yes | Unique slug identifier (lowercase, hyphenated) | `"postgresql"` |
| `name` | Yes | Official product name | `"PostgreSQL"` |
| `description` | Yes | Brief description (100-200 chars) | `"Advanced open source relational database"` |
| `category` | Yes | One of: `databases`, `analytics`, `observability`, `devops`, `streaming`, `vector-db` | `"databases"` |
| `github` | No | GitHub repository URL | `"https://github.com/postgres/postgres"` |
| `website` | No | Official website URL | `"https://www.postgresql.org/"` |
| `stars` | No | GitHub stars (approximate, with 'k' suffix) | `"14.5k"` |
| `language` | No | Primary programming language | `"C"` |
| `license` | No | SPDX license identifier | `"PostgreSQL"` |
| `logo` | No | Custom logo URL (otherwise auto-generated) | `"https://example.com/logo.png"` |
| `vendors` | Yes | Array of vendor IDs offering BYOC (initially empty) | `[]` |

## Listing a BYOC Vendor

### Option 1: Web Form (Recommended)

1. Navigate to [byoc.sh/submit/vendor](https://byoc.sh/submit/vendor)
2. Fill in your BYOC offering details:
   - Select the product(s) you offer BYOC deployment for
   - Vendor name (company/service name)
   - BYOC offering URL
   - Description of your BYOC deployment
   - Pricing information
   - Contact email
3. Click "Submit via GitHub" to create a PR

### Option 2: Manual Submission

1. Fork the [byoc repository](https://github.com/byocsh/byoc)
2. Create a new JSON file in `src/data/vendors/` named `your-vendor.json`
3. Update the corresponding product JSON file(s) to include your vendor ID
4. Use the template below
5. Submit a Pull Request

#### Vendor JSON Template

```json
{
  "id": "your-vendor-byoc",
  "name": "Your Vendor Name",
  "url": "https://yourvendor.com/byoc",
  "description": "BYOC deployment on AWS, GCP, and Azure. Fully managed with automated upgrades, monitoring, and 24/7 support. Private VPC deployment with Terraform.",
  "pricing": "Enterprise Plan",
  "products": ["product-id-1", "product-id-2"]
}
```

#### Vendor Field Descriptions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `id` | Yes | Unique slug identifier (lowercase, hyphenated) | `"aiven-postgresql"` |
| `name` | Yes | Vendor/company name | `"Aiven"` |
| `url` | Yes | Direct URL to BYOC offering page | `"https://aiven.io/byoc"` |
| `description` | Yes | Detailed description of BYOC offering (200-300 chars) | `"Fully managed BYOC on AWS, GCP, and Azure with automated operations"` |
| `pricing` | No | Pricing tier or plan name | `"Business Plan"`, `"Enterprise"`, `"Contact Sales"` |
| `logo` | No | Custom logo URL (otherwise auto-generated) | `"https://example.com/logo.png"` |
| `products` | Yes | Array of product IDs you offer BYOC for | `["postgresql", "kafka"]` |

#### Important: Link Products and Vendors

When adding a vendor, you must update the corresponding product files:

1. Add your vendor ID to the product's `vendors` array:

```json
{
  "id": "postgresql",
  "name": "PostgreSQL",
  "vendors": ["aiven", "your-vendor-byoc"]
}
```

## Manual Submission Process

### Step-by-Step Instructions

1. **Fork the Repository**
   ```bash
   # Fork via GitHub UI, then clone
   git clone https://github.com/yourusername/byoc.git
   cd byoc
   ```

2. **Create a New Branch**
   ```bash
   git checkout -b add-your-product-or-vendor
   ```

3. **Add Your JSON File(s)**
   - For products: `src/data/products/your-product.json`
   - For vendors: `src/data/vendors/your-vendor.json`
   - Update product files to link vendors

4. **Test Locally**
   ```bash
   npm install
   npm run generate-data  # Generate the data index
   npm run dev            # Test locally at http://localhost:3000
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add [Your Product/Vendor Name]"
   git push origin add-your-product-or-vendor
   ```

6. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Provide a clear title and description
   - Link to any relevant documentation

## Product Requirements

To be listed, products must:

1. **Be Open Source** - Must have a public repository with an OSI-approved license
2. **Have BYOC Option** - At least one vendor must offer true BYOC deployment (or coming soon)
3. **Be Production Ready** - Mature enough for production use
4. **Be Self-Deployable** - Technically possible to deploy in customer's cloud
5. **Be Actively Maintained** - Regular updates and community engagement

### What Qualifies as BYOC?

True BYOC means:
- ✅ Software runs in customer's cloud account
- ✅ Vendor handles deployment, upgrades, and operations
- ✅ Customer retains data ownership and control
- ✅ Customer can audit and control infrastructure
- ❌ NOT just "managed hosting" in vendor's cloud
- ❌ NOT just "docker image you can self-host"

## Vendor Requirements

To be listed as a BYOC vendor, you must:

1. **Offer True BYOC** - Deploy and manage software in customer's cloud
2. **Handle Operations** - Responsible for deployments, upgrades, monitoring
3. **Have Documentation** - Publicly accessible documentation about your BYOC offering
4. **Be Available** - Active offering (not just "coming soon") or clear timeline
5. **Support Open Source** - Only list vendors for open source products

### Good BYOC Description Examples

✅ **Good**: "BYOC deployment on AWS and GCP via Terraform. Automated upgrades, monitoring, and 24/7 support. Data stays in your VPC with private endpoints."

✅ **Good**: "Deploy in your Azure account with full vendor management. Includes automated backups, scaling, and security patches."

❌ **Bad**: "We offer great support!" (Not specific about BYOC features)

❌ **Bad**: "Contact us for pricing" (Use this for pricing field, not description)

## Review Process

1. **Automated Checks** - PR will trigger build and validation
2. **Manual Review** - Maintainers review for quality and accuracy
3. **Feedback** - We may request changes or additional information
4. **Approval** - Once approved, changes are merged
5. **Deployment** - Site automatically rebuilds and deploys

### Review Criteria

- JSON syntax is valid
- All required fields are present
- Links are working
- Description is clear and accurate
- Product is genuinely open source
- BYOC offering is legitimate
- No spam or low-quality submissions

## FAQ

### How long does review take?

Typically 1-3 business days for straightforward submissions. Complex cases may take longer.

### Can I list multiple products?

Yes! Submit a separate JSON file for each product.

### Can I list multiple BYOC offerings from the same vendor?

Yes! Create separate vendor files if offerings differ significantly (e.g., different products or cloud providers).

### What if my product doesn't have a BYOC vendor yet?

You can still list the product with an empty `vendors` array. However, having at least one BYOC vendor is preferred.

### Can I update my listing later?

Yes! Submit a PR with updates to your JSON file anytime.

### What if my product doesn't fit the existing categories?

Open an issue to discuss adding a new category. We're open to expansion.

### Can I add a custom logo?

Yes! Add a `logo` field with a URL to your logo. Otherwise, we auto-generate logos from favicons.

### Do you accept paid sponsorships or featured listings?

Currently, all listings are equal and free. We may introduce featured listings in the future.

### My PR was rejected. Why?

Common reasons:
- Not actually open source
- Not a true BYOC offering (just managed hosting)
- Incomplete or inaccurate information
- Broken links
- Spam or low-quality submission

### Can I list a closed-source product?

No, byoc.sh is specifically for open source products with BYOC options.

### How do I remove or update a listing?

Submit a PR with the changes or open an issue requesting removal.

## Need Help?

- **Questions** - Open an [issue](https://github.com/byocsh/byoc/issues)
- **Bugs** - Report via [GitHub issues](https://github.com/byocsh/byoc/issues)
- **Discussions** - Start a [discussion](https://github.com/byocsh/byoc/discussions)

## Examples

### Complete Product Example

```json
{
  "id": "clickhouse",
  "name": "ClickHouse",
  "description": "Fast open-source column-oriented database for real-time analytics and data warehousing.",
  "category": "analytics",
  "github": "https://github.com/ClickHouse/ClickHouse",
  "website": "https://clickhouse.com/",
  "stars": "38.2k",
  "language": "C++",
  "license": "Apache-2.0",
  "vendors": ["clickhouse-cloud-byoc", "altinity-cloud"]
}
```

### Complete Vendor Example

```json
{
  "id": "clickhouse-cloud-byoc",
  "name": "ClickHouse Cloud",
  "url": "https://clickhouse.com/cloud/byoc",
  "description": "BYOC deployment on AWS with automated scaling, backups, and monitoring. Deployed via Terraform in customer's VPC with dedicated compute.",
  "pricing": "Dedicated Plan",
  "products": ["clickhouse"]
}
```

---

Thank you for contributing to byoc.sh! Together, we're building the definitive directory of open source products with BYOC deployment options.
