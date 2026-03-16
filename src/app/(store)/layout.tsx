import { Navbar } from "@/components/shell/navbar";
import { AnnouncementBar } from "@/components/shell/announcement-bar";
import { Footer } from "@/components/shell/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { PageTransition } from "@/components/shell/page-transition";
import { MobileBottomNav } from "@/components/shell/mobile-bottom-nav";

const ANNOUNCEMENT = "Free shipping on orders over $75. Ships in 2 to 4 business days";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar message={ANNOUNCEMENT} />
        <Navbar />
      </div>
      <main className="pt-[90px] min-h-screen pb-16 md:pb-0">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <CartDrawer />
      <MobileBottomNav />
    </>
  );
}
