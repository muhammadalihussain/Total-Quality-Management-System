"use client";
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";

export default function Sidebar() {
  const [menus, setMenus] = useState<any[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        const structured = buildMenuTree(data);
        setMenus(structured);
      });
  }, []);

  function buildMenuTree(data: any[]) {
    const parents = data.filter(m => !m.ParentId);

    return parents.map(parent => ({
      name: parent.Title,
      icon: getIcon(parent.Icon),
      path: parent.Url !== "#" ? parent.Url : null,
      subItems: data
        .filter(child => child.ParentId === parent.Id)
        .map(child => ({
          name: child.Title,
          path: child.Url,
          icon: getIcon(child.Icon),
        })),
    }));
  }

  function getIcon(iconName: string) {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={18} /> : null;
  }

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white p-4 shadow-2xl">

      {/* Header */}
      <div className="text-xl font-bold mb-6 px-2 tracking-wide text-blue-400">
        ⚡ My Dashboard
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menus.map((menu, i) => {
          const isOpen = openIndex === i;

          return (
            <div key={i} className="rounded-xl overflow-hidden">

              {/* Parent */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl
                           bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">{menu.icon}</span>
                  <span className="font-medium text-sm">{menu.name}</span>
                </div>

                {/* arrow */}
                {menu.subItems?.length > 0 && (
                  <span
                    className={`text-xs transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    ▶
                  </span>
                )}
              </button>

              {/* Children */}
              {isOpen && menu.subItems?.length > 0 && (
                <div className="ml-6 mt-2 border-l border-white/10 pl-4 space-y-1">
                  {menu.subItems.map((sub: any, j: number) => (
                    <a
                      key={j}
                      href={sub.path}
                      className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg
                                 text-gray-300 hover:text-white hover:bg-white/10
                                 transition-all"
                    >
                      <span className="text-blue-300">{sub.icon}</span>
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}