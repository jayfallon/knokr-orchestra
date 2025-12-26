import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 pt-6 pb-6 text-center text-sm text-white/50 border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-3">
          <Link href="/terms" className="text-white mx-3 hover:text-[#3399FF]">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-white mx-3 hover:text-[#3399FF]">
            Privacy & Data
          </Link>
        </div>
        <div className="text-white/50">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://knokr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#3399FF]"
          >
            Knokr
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
