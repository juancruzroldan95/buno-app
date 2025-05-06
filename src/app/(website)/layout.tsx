import Footer from "./components/Footer";
import Header from "./components/Header";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
