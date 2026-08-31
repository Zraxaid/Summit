"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// A one-time, full-screen intro on page load: the screen starts solid dark,
// the mark slowly fades in, then the whole overlay fades away to reveal the
// page underneath. Skipped entirely under prefers-reduced-motion.
//
// Rendered via a portal straight into document.body rather than in place —
// the sticky header's backdrop-filter creates its own compositing layer
// that can paint above a same-tree position:fixed descendant regardless of
// z-index, so this needs to be a genuine DOM sibling of the whole app root
// to reliably sit on top of everything, header included.
export function IntroSplash() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(!reduceMotion);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setTimeout(() => setShow(false), 2600);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {show ? (
        <motion.div
          className="intro-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <motion.div
            className="intro-splash-mark"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          >
            <Image src="/images/summit-mark.png" alt="" width={400} height={392} priority />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
