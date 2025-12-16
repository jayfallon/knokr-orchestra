import Link from "next/link";

export const metadata = {
  title: "Privacy & Data | Orchestra",
};

export default function PrivacyPage() {
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
            Privacy & Data
          </h1>

          <div className="space-y-6 text-[#2c1418]/80">
            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                Information We Collect
              </h2>
              <p>When you use Orchestra, we may collect:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>
                  <strong>Submissions:</strong> Band member information you
                  submit for review
                </li>
                <li>
                  <strong>IP Address:</strong> Used for rate limiting to prevent
                  abuse
                </li>
                <li>
                  <strong>Usage Data:</strong> Basic analytics about how the
                  Service is used
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                How We Use Your Information
              </h2>
              <p>
                Submitted band member information is reviewed by our team and,
                if approved, added to the Knokr artist database. IP addresses
                are used solely for rate limiting and are not shared with third
                parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                Data Sharing
              </h2>
              <p>
                <strong>We do not sell your data.</strong> Approved band member
                contributions become part of the public Knokr database and may
                be displayed on knokr.com.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                Your Rights
              </h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Request information about data we hold about you</li>
                <li>Request deletion of your submissions</li>
                <li>Opt out of any data collection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                Security
              </h2>
              <p>
                We implement encrypted connections (HTTPS) and secure database
                access controls to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                Third-Party Services
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Railway for hosting and database services</li>
                <li>AWS CloudFront for content delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-[#2c1418] mb-2">
                Contact
              </h2>
              <p>
                For privacy inquiries or data requests, please contact{" "}
                <a
                  href="mailto:privacy@knokr.com"
                  className="text-[#d9657c] hover:underline"
                >
                  privacy@knokr.com
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
