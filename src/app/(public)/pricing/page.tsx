import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";
import PageSection from "@/components/layouts/PageSection";
import Link from "next/link";

const PricingPage = () => {
  return (
    <>
      <PageSection className="bg-white py-12 text-center md:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Start for free. Grow when you&apos;re ready.
        </p>
      </PageSection>

      <MaxWidthContainer className="py-16">
        {/* Adjust grid for more plans later */}
        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-1">
          {" "}
          {/* Free Tier */}
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg leading-6 font-semibold text-gray-900">
              Free
            </h2>
            <p className="mt-4">
              <span className="text-4xl font-bold tracking-tight text-gray-900">
                $0
              </span>
              <span className="text-base font-semibold text-gray-600">
                /month
              </span>
            </p>
            <p className="mt-6 text-gray-600">
              Perfect for individuals and small teams getting started.
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li className="flex gap-x-3">✓ Core Sample Tracking</li>
              <li className="flex gap-x-3">✓ Status Updates & Audit Log</li>
              <li className="flex gap-x-3">✓ Dashboard Visualizations</li>
              <li className="flex gap-x-3">✓ Up to 3 Users</li>
              <li className="flex gap-x-3">✓ Up to 500 Samples</li>
            </ul>
            <Link
              href="/register"
              className="bg-primary hover:bg-primary-dark mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition"
            >
              Get Started Free
            </Link>
          </div>
          {/* Optional: Pro Tier Placeholder */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8">
            <h2 className="text-lg leading-6 font-semibold text-gray-900">
              Pro (Coming Soon)
            </h2>
            <p className="mt-4 text-4xl font-bold tracking-tight text-gray-500">
              $TBD
              <span className="text-base font-semibold text-gray-400">
                /month
              </span>
            </p>
            <p className="mt-6 text-gray-600">For growing labs needing more.</p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li>✓ Everything in Free, plus:</li>
              <li>✓ Unlimited Users</li>
              <li>✓ Unlimited Samples</li>
            </ul>
            <button
              disabled
              className="mt-8 block w-full cursor-not-allowed rounded-md bg-gray-300 px-3 py-2 text-center text-sm font-semibold text-gray-500"
            >
              Coming Soon
            </button>
          </div>
        </div>
      </MaxWidthContainer>
    </>
  );
};

export default PricingPage;
