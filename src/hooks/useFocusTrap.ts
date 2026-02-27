"use client";

import { useEffect, useRef } from "react";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Trap focus inside a container (e.g. dialog/offcanvas). When active, Tab cycles
 * through focusable elements inside the container only.
 */
export function useFocusTrap(active: boolean, options?: { initialFocusRef?: React.RefObject<HTMLElement | null> }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!active || typeof document === "undefined") return;

    const el = containerRef.current;
    if (!el) return;

    const focusables = Array.from<HTMLElement>(el.querySelectorAll(FOCUSABLE)).filter(
      (node) => !node.hasAttribute("disabled") && node.getAttribute("aria-hidden") !== "true",
    );

    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (options?.initialFocusRef?.current) {
      options.initialFocusRef.current.focus();
    } else {
      first.focus();
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const target = document.activeElement as HTMLElement | null;
      if (!target || !el.contains(target)) return;

      if (e.shiftKey) {
        if (target === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (target === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active, options?.initialFocusRef]);

  return containerRef;
}
