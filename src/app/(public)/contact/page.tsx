import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";
import PageSection from "@/components/layouts/PageSection";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact",
  },
};

const ContactPage = () => {
  return (
    <>
      <PageSection className="bg-white py-12 text-center md:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Have questions, feedback, or need support? Get in touch!
        </p>
      </PageSection>

      <MaxWidthContainer className="py-16">
        <div className="mx-auto max-w-lg">
          <ContactForm />
          <p className="mt-8 text-center text-gray-600">
            Or email us directly at:{" "}
            <a
              href="mailto:tvarzeas@limsly.com"
              className="text-primary hover:underline"
            >
              tvarzeas@limsly.com
            </a>
          </p>
        </div>
      </MaxWidthContainer>
    </>
  );
};

export default ContactPage;
