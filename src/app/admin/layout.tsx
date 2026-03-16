import Link from "next/link";
import { LogOut } from "lucide-react";

const adminNav = [
  { label: "Overview", href: "/admin" },
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Signups", href: "/admin/signups" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-border bg-secondary/30 px-4 py-8 flex flex-col">
        <p className="text-sm font-bold tracking-widest uppercase mb-8 px-3">SHUCK Admin</p>
        <nav className="flex flex-col gap-1 flex-1">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <form action="/api/admin/auth/logout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </aside>

      {/* Main */}
      <main className="flex-1 px-8 py-10 overflow-auto">{children}</main>
    </div>
  );
}
