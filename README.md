# byoc.sh

> A curated directory of open source tools you can self-host. Your cloud, your rules.

## About

**byoc.sh** is a community-maintained list of the best self-hostable software. Think of it as **awesome-byoc** – a directory to help you discover open source tools designed to run on your own infrastructure.

We don't build these tools. We don't host them. We just help you discover them.

## Why BYOC?

- **No vendor lock-in** – Run tools on your infrastructure
- **Data ownership** – Keep your data where it belongs
- **Cost control** – Pay only for what you use
- **Privacy** – Your data stays with you

## Getting Started

```bash
# Clone the repo
git clone https://github.com/byocsh/byoc.git
cd byoc

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Tech Stack

- [Next.js](https://nextjs.org/) – React framework
- [Tailwind CSS](https://tailwindcss.com/) – Styling
- [TypeScript](https://www.typescriptlang.org/) – Type safety

## Contributing

Know a great self-hostable tool that's missing from our list? We'd love to add it!

1. Fork the repository
2. Add your tool to `src/app/tools/page.tsx`
3. Submit a pull request

### Tool Format

```typescript
{
  name: "Tool Name",
  description: "Brief description of what the tool does.",
  category: "databases", // or: analytics, monitoring, ci-cd, communication, storage, auth
  github: "https://github.com/org/repo",
  website: "https://tool-website.com", // optional
}
```

## License

ISC

---

**Open source is the future. And with BYOC, that future is in your hands.**
