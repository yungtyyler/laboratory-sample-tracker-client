import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";
import PageSection from "@/components/layouts/PageSection";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <PageSection className="bg-white py-8 md:py-20">
        <h1 className="mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          About LIMS Sample Tracker
        </h1>
      </PageSection>

      <MaxWidthContainer className="prose prose-lg lg:prose-xl mx-auto py-16">
        <Image
          src="/profile_photo.jpg"
          alt="Tyler Varzeas"
          width={300}
          height={300}
          className="mx-auto aspect-square rounded-full object-cover object-bottom"
        />

        <h2>Meet the Creator</h2>
        <p>
          Hi, I&apos;m Tyler Varzeas, a software engineer with a background in
          chemical production and environmental toxicology. I spent one year
          working in a nanotechnology based toxicology research lab at Baylor
          University and two years as an production organic chemist at LGC
          Biosearch Technolgies. I experienced firsthand the challenges of
          tracking samples efficiently, often relying on cumbersome spreadsheets
          or overly complex systems.
        </p>
        <p>
          I created LIMS Sample Tracker because I wanted a simple, modern tool
          focused on core tracking needs for smaller teams, and to build a
          practical application showcasing full-stack development skills at the
          intersection of science and tech.
        </p>

        <h2>The Technology</h2>
        <p>This application is built with modern web technologies including:</p>
        <ul>
          <li>Next.js v.16 with React & TypeScript</li>
          <li>Tailwind CSS for styling</li>
          <li>Recharts for data visualization</li>
          <li>Backend API built using Python and the Django REST framework</li>
          <li>Front-end deployed on Vercel</li>
          <li>Back-end deployed on Render</li>
        </ul>

        <h2>Get in Touch</h2>
        <p>
          Have questions or feedback? Feel free to reach out via the{" "}
          <Link href="/contact">Contact page</Link>!
        </p>
      </MaxWidthContainer>
    </>
  );
}
