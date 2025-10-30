import { FaCheckSquare } from "react-icons/fa";
import { BiBarChart, BiTestTube } from "react-icons/bi";
import Link from "next/link";
import PageSection from "@/components/layouts/PageSection";

const CREATOR = "Tyler Varzeas";

export default function Home() {
  return (
    <>
      <PageSection className="bg-linear-to-r from-blue-50 to-indigo-100 py-20 text-center lg:py-32">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
          Simplify Your Lab Workflow
        </h2>
        <p className="mb-8 text-lg text-gray-600 md:text-xl">
          Track samples effortlessly, manage statuses, and visualize your
          progress with our intuitive LIMS-lite solution.
        </p>
        <Link
          href="/register"
          className="bg-primary hover:bg-primary-dark rounded-md px-8 py-3 text-lg font-medium text-white transition"
        >
          Get Started Free
        </Link>
      </PageSection>

      {/* Features Section */}
      <PageSection className="bg-white py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="text-center">
            <BiTestTube className="text-primary mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-xl font-semibold">Sample Tracking</h3>
            <p className="text-gray-600">
              Easily register and monitor samples throughout their lifecycle.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <FaCheckSquare className="text-primary mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-xl font-semibold">Status Management</h3>
            <p className="text-gray-600">
              Update sample statuses (Received, Processing, etc.) with a clear
              audit trail.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <BiBarChart className="text-primary mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-xl font-semibold">Data Visualization</h3>
            <p className="text-gray-600">
              Understand your lab&apos;s throughput and bottlenecks at a glance.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/features" className="text-primary hover:underline">
            Learn more about features &rarr;
          </Link>
        </div>
      </PageSection>

      {/* Testimonial Section */}
      <PageSection className="bg-gray-50 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote className="text-xl text-gray-700 italic md:text-2xl">
            &ldquo;As a former chemist, I built the LIMS I always wished
            existed.&rdquo;
          </blockquote>
          <p className="mt-4 font-semibold text-gray-800">
            - <strong className="text-lg">{CREATOR}</strong>, <em>Creator</em>
          </p>
        </div>
      </PageSection>

      {/* Final CTA Section */}
      <PageSection className="py-16 text-center lg:py-24">
        <h4 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          Ready to streamline your lab work?
        </h4>
        <p className="mb-8 text-lg text-gray-600">
          Sign up today and start managing your samples in minutes.
        </p>
        <Link
          href="/register"
          className="bg-primary hover:bg-primary-dark rounded-md px-8 py-3 text-lg font-medium text-white transition"
        >
          Sign Up for Free
        </Link>
      </PageSection>
    </>
  );
}
