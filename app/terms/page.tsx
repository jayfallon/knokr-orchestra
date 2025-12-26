import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Orchestra",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <header>
        <div className="max-w-7xl mx-auto px-4 py-4 border-b border-white/20">
          <Link href="/" className="text-sm text-white hover:text-[#3399FF]">
            ← Back to search
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8 uppercase tracking-wide">
          Terms of Service
        </h1>

        <div className="space-y-6 text-white/80">
          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Orchestra, you accept and agree to be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              2. User Contributions
            </h2>
            <p>
              When you submit band member information, you grant us the right to use, modify, and display that information. You represent that your contributions are accurate to the best of your knowledge.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              3. Prohibited Conduct
            </h2>
            <p>
              You agree not to submit false, misleading, or spam content. Automated submissions are prohibited without prior authorization.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              4. Intellectual Property
            </h2>
            <p>
              The Orchestra service and its original content are owned by Knokr. User-submitted band member information becomes part of the Knokr database upon approval.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              5. Disclaimer
            </h2>
            <p>
              Orchestra is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy of user-submitted information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-2">
              6. Contact
            </h2>
            <p>
              For questions about these terms, please contact{" "}
              <a
                href="mailto:legal@knokr.com"
                className="text-white hover:text-[#3399FF]"
              >
                legal@knokr.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
