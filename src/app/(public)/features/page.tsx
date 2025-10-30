import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";
import PageSection from "@/components/layouts/PageSection";
import Image from "next/image";
import Link from "next/link";

const FeaturesPage = () => {
  return (
    <>
      <PageSection className="bg-white py-12 text-center md:py-20">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Features of LIMS Sample Tracker
        </h2>
        <p className="mx-auto mt-4 w-full max-w-2xl text-lg text-gray-600">
          Built to be simple and effective for small labs and research teams.
        </p>
      </PageSection>
      <MaxWidthContainer className="space-y-16 py-16">
        {/* Feature 1: Sample Management */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Complete Sample Management
            </h3>
            <p className="mt-4 text-gray-600">
              Register new samples with unique IDs, view them in a clear table,
              and update their status through the entire lab process from
              &apos;Received&apos; to &apos;Complete&apos;.
            </p>
          </div>
          <Link
            href={"/log_visualization.png"}
            target="_blank"
            className="hover:animate-wiggle"
          >
            <Image
              src={`/log_visualization.png`}
              alt="Log Visualization"
              width={2234}
              height={574}
              className="w-full object-cover"
            />
          </Link>
        </div>

        {/* Feature 2: Data Visualization */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <Link
            href={"/data_visualization.png"}
            target="_blank"
            className="hover:animate-wiggle"
          >
            <Image
              src={`/data_visualization.png`}
              alt="Data Visualization"
              width={2246}
              height={840}
              className="order-last w-full object-cover md:order-first"
            />
          </Link>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Insightful Dashboard Visualizations
            </h3>
            <p className="mt-4 text-gray-600">
              Quickly understand your lab&apos;s workload with charts showing
              sample status breakdowns and daily completion throughput over the
              last 7 days.
            </p>
          </div>
        </div>

        {/* Feature 3: Audit Trails */}
        {/* ... similar structure ... */}

        {/* Feature 4: Secure Auth */}
        {/* ... similar structure ... */}
      </MaxWidthContainer>

      <PageSection className="bg-gray-50 py-16 text-center lg:py-24">
        <h4 className="mb-4 text-3xl font-bold text-gray-900">
          Ready to Get Started?
        </h4>
        <Link
          href="/register"
          className="bg-primary hover:bg-primary-dark mt-6 inline-block rounded-md px-8 py-3 text-lg font-medium text-white transition"
        >
          Sign Up for Free
        </Link>
      </PageSection>
    </>
  );
};

export default FeaturesPage;
