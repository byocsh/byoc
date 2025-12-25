export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-6">
          the byoc manifesto
        </h2>
        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
          <h3 className="font-semibold mb-6">
            byoc = bring your own cloud
          </h3>

          <p>
            the byoc paradigm is based on a simple idea - SaaS like user experience, with the control and security of self hosting. with true byoc, vendor deploys, upgrades, and operates. buyer keeps their data, compliance, cloud spend, and exit options.
          </p>

          <h3 className="font-semibold mb-6">
            byoc ≠ self hosting
          </h3>

          <p>
            self hosting forces buyer to take on operational burden, and vendor to support a wide variety of environments. byoc allows 
          </p>

          <h3 className="font-semibold mb-6">
            LLMs are just the beginning
          </h3>

          <p>
            the byoc model is especially important for LLM applications, where data privacy, compliance, and cloud costs are critical. but byoc is not limited to LLMs - it applies to any software where data control matters.
          </p>

          <h3 className="font-semibold mb-6">
            data has gravity
          </h3>

          <p>
            as organizations grow, their data inevitably accumulates in a few major clouds. moving data is expensive, slow, and risky. byoc lets buyers leverage existing cloud investments, while still getting the benefits of SaaS.
          </p>

          <h3 className="font-semibold mb-6">
            security is a shared responsibility
          </h3>
          
          <p>
            security is only as strong as its weakest link. byoc lets buyers enforce their own security policies, while vendors can focus on securing the application itself.
          </p>

          <h3 className="font-semibold mb-6">
            /fin/
          </h3>
          <p>
            byoc is the future of software delivery for the data conscious enterprise. it combines the best of both worlds - SaaS convenience with self hosting control. 
          </p>

          <p className="font-semibold">
            if you're buying software, ask for byoc. if you're building software, offer byoc. 
          </p>
        </div>
      </div>
    </div>
  );
}
