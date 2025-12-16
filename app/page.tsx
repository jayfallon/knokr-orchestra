import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import SearchInput from "@/components/SearchInput";
import SuggestBand from "@/components/SuggestBand";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#d9657c] to-[#621827] px-5 py-10">
      {/* Auth button - top right */}
      <div className="absolute top-4 right-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-sm text-[#fdf5d4]/80 hover:text-[#fdf5d4] border border-[#fdf5d4]/30 hover:border-[#fdf5d4]/50 rounded-lg transition-colors">
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
          <img
            src="/knokr.svg"
            alt="Knokr"
            className="w-[180px] h-auto mb-5 drop-shadow-lg mx-auto"
          />
          <h1 className="text-[42px] font-extrabold text-[#fdf5d4] tracking-tight">
            Who&apos;s in the Band?
          </h1>
          <p className="text-[#fdf5d4]/80 text-base mt-2">
            Search for any artist and contribute band member info
          </p>
        </header>

        <SearchInput />
        <SuggestBand />

        {/* Footer */}
        <footer className="mt-10 pt-6 text-center text-sm text-[#fdf5d4]/60 border-t border-[#2c1418]/10 w-full">
          <div className="mb-3">
            <a href="/terms" className="text-[#fdf5d4]/80 mx-3 hover:underline">
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="text-[#fdf5d4]/80 mx-3 hover:underline"
            >
              Privacy & Data
            </a>
          </div>
          <div className="text-[#fdf5d4]/50">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://knokr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#fdf5d4]/70 hover:underline"
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
