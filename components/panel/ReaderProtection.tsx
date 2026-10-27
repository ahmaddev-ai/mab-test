"use client";

import { useEffect } from "react";

export default function ReaderProtection() {
  useEffect(() => {
    const preventContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const preventShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrlOrCmd = event.ctrlKey || event.metaKey;

      const blocked =
        key === "f12" ||
        (ctrlOrCmd && ["i", "u", "s", "p"].includes(key)) ||
        (ctrlOrCmd && event.shiftKey && ["i", "j", "c"].includes(key));

      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventShortcuts, true);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventShortcuts, true);
    };
  }, []);

  return null;
}
