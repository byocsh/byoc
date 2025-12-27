export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-6">
          <h2 className="text-2xl font-semibold">
            the byoc manifesto
          </h2>

          {/* Email Signup CTA */}
          <div className="flex-shrink-0 md:w-80">
            <div className="newsletter-form-container">
              <form
                className="newsletter-form"
                action="https://app.loops.so/api/newsletter-form/cmcjcbtcu0nmiyt0i2ammwru0"
                method="POST"
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '8px' }}
              >
                <input
                  className="newsletter-form-input"
                  placeholder="you@example.com"
                  required
                  type="email"
                  name="newsletter-form-input"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgb(0, 0, 0)',
                    fontSize: '14px',
                    margin: '0',
                    flex: '1',
                    minWidth: '0',
                    background: 'rgb(255, 255, 255)',
                    border: '1px solid rgb(209, 213, 219)',
                    boxSizing: 'border-box',
                    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    height: '38px'
                  }}
                />
                <button
                  type="submit"
                  className="newsletter-form-button"
                  style={{
                    background: 'rgb(0, 0, 0)',
                    fontSize: '14px',
                    color: 'rgb(255, 255, 255)',
                    fontFamily: 'Inter, sans-serif',
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    height: '38px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: '9px 17px',
                    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '20px',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: '0'
                  }}
                >
                  subscribe
                </button>
                <button
                  type="button"
                  className="newsletter-loading-button"
                  style={{
                    background: 'rgb(0, 0, 0)',
                    fontSize: '14px',
                    color: 'rgb(255, 255, 255)',
                    fontFamily: 'Inter, sans-serif',
                    display: 'none',
                    whiteSpace: 'nowrap',
                    height: '38px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: '9px 17px',
                    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px',
                    borderRadius: '6px',
                    textAlign: 'center',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '20px',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: '0'
                  }}
                >
                  please wait...
                </button>
              </form>

              <div className="newsletter-success" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <p className="newsletter-success-message" style={{ fontFamily: 'Inter, sans-serif', color: 'rgb(0, 0, 0)', fontSize: '14px' }}>
                  thanks! you&apos;re now subscribed
                </p>
              </div>

              <div className="newsletter-error" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <p className="newsletter-error-message" style={{ fontFamily: 'Inter, sans-serif', color: 'rgb(185, 28, 28)', fontSize: '14px' }}>
                  oops! something went wrong, please try again
                </p>
              </div>

              <button
                className="newsletter-back-button"
                type="button"
                style={{
                  color: '#6b7280',
                  font: '14px, Inter, sans-serif',
                  margin: '10px auto',
                  textAlign: 'center',
                  display: 'none',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                &larr; back
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
          <h3 className="font-semibold mb-6">
            byoc = bring your own cloud
          </h3>

          <p>
            the byoc paradigm is based on a simple idea - vendor deploys, upgrades, and operates. buyer keeps their data, compliance, cloud spend, and exit options. the goal is to enable the best of both worlds - saas convenience with self hosting control.
          </p>

          <h3 className="font-semibold mb-6">
            byoc ≠ self hosting
          </h3>

          <p>
            byoc looks a lot like self hosting - software runs in buyer's infrastructure, buyer has full control over data, compliance, and cloud costs. but there is a key difference - vendor is responsible for deploying, upgrading, and operating the software. this important differentiation is what makes byoc a viable software delivery model.
          </p>

          <h3 className="font-semibold mb-6">
            byoc is agent ready
          </h3>

          <p>
            the byoc model is especially important for LLM applications, where unencumbered access to domain specific data is critical. byoc enables buyers to keep their sensitive data in their own cloud, while leverage agentic workflows for various use cases.
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
            byoc is a key paradigm for software delivery for the data conscious enterprise. if you're buying software, ask for byoc. if you're building software, offer byoc.
          </p>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        function submitHandler(event) {
          event.preventDefault();
          var container = event.target.parentNode;
          var form = container.querySelector(".newsletter-form");
          var formInput = container.querySelector(".newsletter-form-input");
          var success = container.querySelector(".newsletter-success");
          var errorContainer = container.querySelector(".newsletter-error");
          var errorMessage = container.querySelector(".newsletter-error-message");
          var backButton = container.querySelector(".newsletter-back-button");
          var submitButton = container.querySelector(".newsletter-form-button");
          var loadingButton = container.querySelector(".newsletter-loading-button");

          const rateLimit = () => {
            errorContainer.style.display = "flex";
            errorMessage.innerText = "Too many signups, please try again in a little while";
            submitButton.style.display = "none";
            formInput.style.display = "none";
            backButton.style.display = "block";
          }

          var time = new Date();
          var timestamp = time.valueOf();
          var previousTimestamp = localStorage.getItem("loops-form-timestamp");

          if (previousTimestamp && Number(previousTimestamp) + 60000 > timestamp) {
            rateLimit();
            return;
          }
          localStorage.setItem("loops-form-timestamp", timestamp);

          submitButton.style.display = "none";
          loadingButton.style.display = "flex";

          var formBody = "userGroup=&mailingLists=&source="
            + encodeURIComponent("byoc.sh newsletter")
            + "&email="
            + encodeURIComponent(formInput.value);

          fetch(event.target.action, {
            method: "POST",
            body: formBody,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
            .then((res) => [res.ok, res.json(), res])
            .then(([ok, dataPromise, res]) => {
              if (ok) {
                success.style.display = "flex";
                form.reset();
              } else {
                dataPromise.then(data => {
                  errorContainer.style.display = "flex";
                  errorMessage.innerText = data.message
                    ? data.message
                    : res.statusText;
                });
              }
            })
            .catch(error => {
              if (error.message === "Failed to fetch") {
                rateLimit();
                return;
              }
              errorContainer.style.display = "flex";
              if (error.message) errorMessage.innerText = error.message;
              localStorage.setItem("loops-form-timestamp", '');
            })
            .finally(() => {
              formInput.style.display = "none";
              loadingButton.style.display = "none";
              backButton.style.display = "block";
            });
        }

        function resetFormHandler(event) {
          var container = event.target.parentNode;
          var formInput = container.querySelector(".newsletter-form-input");
          var success = container.querySelector(".newsletter-success");
          var errorContainer = container.querySelector(".newsletter-error");
          var errorMessage = container.querySelector(".newsletter-error-message");
          var backButton = container.querySelector(".newsletter-back-button");
          var submitButton = container.querySelector(".newsletter-form-button");

          success.style.display = "none";
          errorContainer.style.display = "none";
          errorMessage.innerText = "Oops! Something went wrong, please try again";
          backButton.style.display = "none";
          formInput.style.display = "flex";
          submitButton.style.display = "flex";
        }

        var formContainers = document.getElementsByClassName("newsletter-form-container");

        for (var i = 0; i < formContainers.length; i++) {
          var formContainer = formContainers[i]
          var handlersAdded = formContainer.classList.contains('newsletter-handlers-added')
          if (handlersAdded) continue;
          formContainer
            .querySelector(".newsletter-form")
            .addEventListener("submit", submitHandler);
          formContainer
            .querySelector(".newsletter-back-button")
            .addEventListener("click", resetFormHandler);
          formContainer.classList.add("newsletter-handlers-added");
        }
      `}} />
    </div>
  );
}
