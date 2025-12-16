import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import SearchInput from "@/components/SearchInput";
import SuggestBand from "@/components/SuggestBand";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#fdf5d4] px-5 py-10">
      {/* Auth button - top right */}
      <div className="absolute top-4 right-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-5 py-2 text-sm text-[#ba326b] hover:text-[#4c222a] border border-[#ba326b]/30 hover:border-[#ba326b]/50 rounded-full transition-colors">
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
            className="w-[180px] h-auto mb-5 mx-auto"
          />
          <h1 className="text-[42px] font-extrabold text-[#ba326b] tracking-tight">
            Who&apos;s in the Band?
          </h1>
          <p className="text-[#4c222a]/70 text-base mt-2">
            Search for any artist and contribute band member info
          </p>
        </header>

        <SearchInput />
        <p className="text-[#4c222a]/70 text-base my-4">or</p>
        <SuggestBand />

        {/* Footer */}
        <footer className="mt-10 pt-6 text-center text-sm text-[#4c222a]/50 border-t border-[#ba326b]/20 w-full">
          <div className="mb-3">
            <a href="/terms" className="text-[#ba326b] mx-3 hover:underline">
              Terms of Service
            </a>
            <a href="/privacy" className="text-[#ba326b] mx-3 hover:underline">
              Privacy & Data
            </a>
          </div>
          <div className="text-[#4c222a]/50">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://knokr.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ba326b] hover:underline"
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
