"use client";

import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function PageBreadcrumb({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <div className="flex items-center justify-between mb-4">

     <nav className="flex items-center text-sm text-gray-500">
  {items.map((item, index) => (
    <div key={index} className="flex items-center">

      {index > 0 && (
        <span className="mx-2 text-gray-300">›</span>
      )}

      {item.href ? (
        <Link
          href={item.href}
          className="hover:text-blue-600 transition"
        >
          {item.label}
        </Link>
      ) : (
        <span className="text-gray-800 font-semibold">
          {item.label}
        </span>
      )}

    </div>
  ))}
</nav>

    </div>
  );
}