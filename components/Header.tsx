"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "#home", label: "Trang chủ" },
  { href: "#about", label: "Câu chuyện" },
  { href: "#services", label: "Dịch vụ & Dự án" },
  { href: "#contact", label: "Liên hệ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Sticky header effect
      setScrolled(window.scrollY > 80);

      // Active section highlight
      const y = window.scrollY + 120;
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const id = el.getAttribute("id");
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (y >= top && y < top + height && id) {
          setActiveId(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`site-header-vip${scrolled ? " scrolled" : ""}`}>
      <a href="#home" className="logo-vip" onClick={(e) => handleNavClick(e, "#home")}>
        <Image
          src="/image/logo.png"
          alt="BỜ KINH"
          width={180}
          height={72}
          style={{ height: "72px", width: "auto" }}
          priority
        />
      </a>

      <nav className="nav-vip">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={activeId === item.href.slice(1) ? "active" : ""}
            onClick={(e) => handleNavClick(e, item.href)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
