"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment: string) => {
    // Special cases if needed, but simple capitalize and replace dash with space works for most
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="container mx-auto px-5 sm:px-6 py-4 pb-2 sm:py-5">
      <nav className="flex text-sm sm:text-[15px] text-[#6b7280] whitespace-nowrap overflow-x-auto hide-scrollbar">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          
          // Map '/products' to '/shop' to avoid 404
          let path = segments.slice(0, index + 1).join("/");
          if (path === "products") {
            path = "shop";
          }
          const href = `/${path}`;

          return (
            <div key={href} className="flex items-center">
              <span className="mx-2 sm:mx-2.5 text-gray-300">/</span>
              {isLast ? (
                <span className="font-medium text-[#002f6c]">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link href={href} className="hover:text-primary transition-colors">
                  {formatSegment(segment)}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
