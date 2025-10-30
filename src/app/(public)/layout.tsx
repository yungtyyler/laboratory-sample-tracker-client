import "@/app/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
