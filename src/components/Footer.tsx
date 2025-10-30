import Link from "next/link";
import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-400">
      <MaxWidthContainer>
        <div className="flex flex-col items-center justify-between gap-8 py-12 md:flex-row">
          <div>
            <p className="text-sm">
              &copy; {new Date().getFullYear()} LIMS Sample Tracker. All rights
              reserved.
            </p>
            <p className="mt-1 text-xs">
              Built by a scientist, for scientists.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-sm hover:text-white">
              Home
            </Link>
            <Link href="#" className="text-sm hover:text-white">
              Features
            </Link>
            <Link href="#" className="text-sm hover:text-white">
              About
            </Link>
          </div>
        </div>
      </MaxWidthContainer>
    </footer>
  );
}
