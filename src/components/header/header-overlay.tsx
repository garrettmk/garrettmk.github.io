'use client';

import clsx from "clsx";
import Link from "next/link";
import { HTMLAttributes, useEffect } from "react";
import { createPortal } from "react-dom";
import { HeaderNavItem } from "./header-nav-item";
import { HeaderNavMenuButton } from "./header-nav-menu-button";

export type HeaderOverlayProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onIsOpenChange: (isOpen: boolean) => void;
};

export function HeaderOverlay(props: HeaderOverlayProps) {
  const { className, isOpen, onIsOpenChange, ...divProps } = props;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isOpen) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "";
    }
  });

  if (typeof window === 'undefined') 
    return null;
  else
    return createPortal(
      <div
        className={clsx(
          "md:hidden fixed h-screen w-screen z-50", 
          "bg-slate-900 bg-opacity-70 backdrop-blur-[16px]",
          "flex flex-row items-center justify-between p-8",
          "transition-all duration-300 ease-in-out",
          isOpen ? "top-0 opacity-100" : "-top-full opacity-0",
        )}
        onClick={() => onIsOpenChange?.(!isOpen)}
        {...divProps}
      >
        <Link href="/">
          <h1 className="text-3xl font-bold text-green-300">GM</h1>
        </Link>
        <nav className={clsx(
          "block transition-all duration-300 ease-in-out",
        )}>
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center group/nav-list">
            <HeaderNavItem href="/" exact>About</HeaderNavItem>
            <HeaderNavItem href="/projects">Projects</HeaderNavItem>
            <HeaderNavItem href="/posts">Blog</HeaderNavItem>
            <HeaderNavItem href="/contact">Contact</HeaderNavItem>
          </ul>
        </nav>
        <HeaderNavMenuButton
          className="md:hidden"
          onClick={() => onIsOpenChange?.(!isOpen)}
        />
      </div>,
      window.document.body
    );
}