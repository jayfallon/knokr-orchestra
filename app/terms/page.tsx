import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Orchestra",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d9657c] to-[#4c222a] px-5 py-10">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-[#fdf5d4]/80 hover:text-[#fdf5d4]"
        >
          ← Back
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-[#2c1418] mb-6">
            Terms of Service
          </h1>

          <div className="space-y-6 text-[#2c1418]/80">
            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using Orchestra (&quot;the Service&quot;), you
                agree to be bound by these Terms of Service. If you do not agree
                to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                2. Service Description
              </h2>
              <p>
                Orchestra is a tool that allows users to search for artists and
                contribute band member information. The Service enables users
                to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Search for artists in the Knokr database</li>
                <li>View current and past band members</li>
                <li>Submit new member information for review</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                3. User Contributions
              </h2>
              <p>
                By submitting band member information, you warrant that the
                information is accurate to the best of your knowledge. All
                submissions are subject to review before being added to the
                database.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                4. Intellectual Property
              </h2>
              <p>
                The Service and its original content, features, and
                functionality are owned by Knokr and are protected by
                international copyright, trademark, and other intellectual
                property laws.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                5. Disclaimer
              </h2>
              <p>
                The Service is provided on an &quot;as-is&quot; basis. We make
                no warranties regarding the accuracy or completeness of band
                member information. Users should verify information
                independently.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                6. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Continued
                use of the Service constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                7. Contact
              </h2>
              <p>
                For questions about these Terms, please contact{" "}
                <a
                  href="mailto:legal@knokr.com"
                  className="text-[#d9657c] hover:underline"
                >
                  legal@knokr.com
                </a>
              </p>
            </section>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-[#fdf5d4]/50">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://knokr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Knokr
          </a>
          . All rights reserved.
        </footer>
      </div>
    </div>
  );
}
