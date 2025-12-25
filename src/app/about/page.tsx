export default function About() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">
          about byoc.sh
        </h2>
        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            byoc.sh is a curated directory of open source tools that you can bring to your own cloud. we believe in the byoc paradigm - SaaS-like user experience with the control and security of self-hosting.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            why byoc.sh?
          </h3>

          <p>
            with increasing concerns around data privacy, vendor lock-in, and cloud costs, organizations are looking for alternatives to traditional SaaS. byoc.sh helps you discover tools that can be deployed in your own infrastructure while maintaining the convenience of managed services.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            our mission
          </h3>

          <p>
            we curate and maintain a directory of production-ready open source tools that support the byoc model. each tool in our directory is evaluated for:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>ease of deployment and maintenance</li>
            <li>security and compliance features</li>
            <li>active development and community support</li>
            <li>documentation quality</li>
            <li>cloud provider compatibility</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-4">
            get involved
          </h3>

          <p>
            byoc.sh is an open source project. we welcome contributions, suggestions, and feedback from the community. if you know of a great tool that should be included, or if you've built something that follows the byoc paradigm, we'd love to hear from you.
          </p>

          <p className="mt-8">
            built with ♥ by the team at <a href="https://parseable.com" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-100 hover:underline font-medium">Parseable</a>
          </p>
        </div>
      </div>
    </div>
  );
}
