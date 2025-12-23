export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-12">
          bring your own cloud.
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-700 dark:text-gray-300">
          <p>dear friend,</p>

          <p>
            <strong>open source</strong> has transformed how we build software. 
            but there&apos;s a catch – most tools today force you into their cloud, 
            their pricing, their rules.
          </p>

          <p>
            we believe in a different approach: <strong>bring your own cloud (byoc)</strong>. 
            run powerful tools on your infrastructure. keep your data where it belongs. 
            pay only for what you use.
          </p>

          <p>
            <a href="https://byoc.sh">byoc.sh</a> is a curated directory of open source 
            tools that you can self-host. think of it as <strong>awesome-byoc</strong> – 
            a community-maintained list of the best software designed to run on your own infrastructure.
          </p>

          <p>
            we don&apos;t build these tools. we don&apos;t host them. we just help you discover them.
          </p>

          <div className="my-10 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg font-mono text-sm">
            <p className="text-gray-500 dark:text-gray-400 mb-2"># your cloud, your rules</p>
            <p>docker run -d your-favorite-tool</p>
          </div>

          <p>
            whether you&apos;re looking for databases, monitoring, CI/CD, or anything else – 
            we&apos;ve got a list of battle-tested, self-hostable alternatives to popular SaaS products.
          </p>

          <p>
            check out our <a href="/tools">tools directory</a> to find your next self-hosted solution.
          </p>

          <p>
            open source is the future. and with byoc, that future is in your hands.
          </p>

          <p className="mt-12">
            best,<br />
            <strong>the byoc community</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
