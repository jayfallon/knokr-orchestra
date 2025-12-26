import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import SuggestBand from "@/components/SuggestBand";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-10">
      {/* Auth button - top right */}
      <div className="absolute top-4 right-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-5 py-2 text-sm text-white hover:text-[#3399FF] border border-white/30 hover:border-[#3399FF] rounded-full transition-colors">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
          />
        </SignedIn>
      </div>

      <div className="w-full max-w-[500px] flex flex-col items-center pt-10">
        {/* Header */}
        <header className="text-center mb-8">
          <Image
            src="/knokr.svg"
            alt="Knokr"
            width={180}
            height={40}
            className="mb-5 mx-auto"
            priority
          />
          <h1 className="text-[42px] font-extrabold text-white tracking-tight">
            Orchestra
          </h1>
          <p className="text-white/70 text-base mt-2">
            Search for any artist and contribute band member info
          </p>
        </header>

        <SearchInput />
        <p className="text-white/70 text-base my-4">or</p>
        <SuggestBand />

        {/* Footer */}
        <footer className="mt-10 pt-6 text-center text-sm text-white/50 border-t border-white/20 w-full">
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
        </footer>
      </div>
    </div>
  );
}
