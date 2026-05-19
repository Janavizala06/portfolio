"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect } from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  /* Close on Escape key */
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKey]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-[12px]" />

          {/* Modal container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative z-[2] w-[92vw] max-w-[900px] h-[88vh] rounded-[20px] overflow-hidden
              bg-[#0a0a14] border border-white/[0.08]
              shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_0_1px_rgba(60,120,255,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#0a0a14]/90 backdrop-blur-[10px]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-sm">
                  📄
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#f0f0f5]">Resume</div>
                  <div className="text-[11px] text-white/30">Janavi Harshadkumar Zala</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Download button */}
                <a
                  href="/resume.pdf"
                  download="Janavi_Zala_Resume.pdf"
                  className="inline-flex items-center gap-[6px] px-3.5 py-[7px] rounded-pill text-[12px] font-medium no-underline
                    bg-white/[0.06] text-white/70 border border-white/[0.08]
                    hover:bg-white/[0.1] hover:text-white transition-all duration-200"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </a>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40
                    hover:bg-white/[0.12] hover:text-white transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="w-full h-[calc(100%-60px)] bg-[#080810]">
              <iframe
                src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
                title="Resume — Janavi Zala"
                className="w-full h-full border-0"
                style={{ colorScheme: "dark" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
