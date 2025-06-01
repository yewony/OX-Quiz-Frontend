'use client';

import { Home, Star, User, Bell, Settings, HistoryIcon, PlusCircleIcon } from 'lucide-react';

const items = [
  { label: "카테고리", icon: Star, href: "#" },
  { label: "추가", icon: PlusCircleIcon, href: "/add" },
  { label: "홈", icon: Home, href: "/" },
  { label: "히스토리", icon: HistoryIcon, href: "#" },
  { label: "설정", icon: Settings, href: "#" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md h-16 flex justify-around items-center z-10">
      {items.map((item, index) => (
        <a key={index} href={item.href} className="flex flex-col items-center text-sm text-gray-500 hover:text-blue-600">
          <item.icon size={24} />
          <span className="text-xs">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
