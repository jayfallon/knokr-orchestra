import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy & Data | Orchestra",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/20">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-white hover:text-[#3399FF]">
            ← Back to search
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8 uppercase tracking-wide">
          Privacy & Data
        </h1>

        <div className="space-y-6 text-white/80">
            <section>
              <h2 className="text-lg font-semibold text-white mb-2">
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
              <h2 className="text-lg font-semibold text-white mb-2">
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
              <h2 className="text-lg font-semibold text-white mb-2">
                Data Sharing
              </h2>
              <p>
                <strong>We do not sell your data.</strong> Approved band member
                contributions become part of the public Knokr database and may
                be displayed on knokr.com.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">
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
              <h2 className="text-lg font-semibold text-white mb-2">
                Security
              </h2>
              <p>
                We implement encrypted connections (HTTPS) and secure database
                access controls to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">
                Third-Party Services
              </h2>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Railway for hosting and database services</li>
                <li>AWS CloudFront for content delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-2">
                Contact
              </h2>
              <p>
                For privacy inquiries or data requests, please contact{" "}
                <a
                  href="mailto:privacy@knokr.com"
                  className="text-white hover:text-[#3399FF]"
                >
                  privacy@knokr.com
                </a>
              </p>
            </section>
          </div>
      </main>

      <Footer />
    </div>
  );
}
