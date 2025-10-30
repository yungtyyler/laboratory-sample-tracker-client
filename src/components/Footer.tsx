import Link from "next/link";
import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-400">
      <MaxWidthContainer>
        <div className="flex flex-col items-center justify-between gap-8 py-12 md:flex-row">
          <div>
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} LIMS Sample Tracker.
            </p>
            <p className="mt-1 text-xs">
              Built by a scientist, for scientists.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
            <Link href="/" className="text-sm hover:text-white">
              Home
            </Link>
            <Link href="/features" className="text-sm hover:text-white">
              Features
            </Link>
            <Link href="/about" className="text-sm hover:text-white">
              About
            </Link>
            <Link href="/pricing" className="text-sm hover:text-white">
              Pricing
            </Link>
            <Link href="/contact" className="text-sm hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </MaxWidthContainer>
    </footer>
  );
}
