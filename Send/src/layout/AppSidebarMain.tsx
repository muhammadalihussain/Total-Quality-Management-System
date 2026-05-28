"use client";
import { useEffect, useState } from "react";
import * as Icons from "lucide-react"; // or your icon library

export default function Sidebar() {
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/menu")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        const structured = buildMenuTree(data);
        setMenus(structured);
      });
  }, []);

  // 🔥 Convert flat DB → nested structure
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
          icon: getIcon(child.Icon)
        }))
    }));
  }

  // 🔥 Dynamic icon mapping
  function getIcon(iconName: string) {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent size={18} /> : null;
  }

  return (
    <div className="p-4">
      {menus.map((menu, i) => (
        <div key={i} className="mb-3">
          
          {/* Parent */}
          <div className="flex items-center gap-2 font-semibold">
            {menu.icon}
            {menu.name}
          </div>

          {/* Children */}
          {menu.subItems?.map((sub: any, j: number) => (
            <a
              key={j}
              href={sub.path}
              className="block ml-6 text-sm hover:text-blue-500"
            >
              {sub.name}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}