import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-modal-title"
            aria-describedby="confirm-modal-desc"
            className="relative w-full max-w-md bg-surface border border-white/15 clip-corner-both p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top danger accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1 text-text-dim hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Warning Icon */}
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 mb-5">
              <AlertTriangle className="w-6 h-6" />
            </div>

            {/* Heading & Content */}
            <div className="space-y-2 mb-6">
              <span className="font-mono text-[10px] text-red-400 tracking-widest uppercase block">
                TACTICAL PURGE WARNING // IRREVERSIBLE
              </span>
              <h3
                id="confirm-modal-title"
                className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide"
              >
                Reset the tournament?
              </h3>
              <p
                id="confirm-modal-desc"
                className="text-text-muted text-sm font-sans leading-relaxed"
              >
                This will remove all registered squads and generated round-robin fixtures from the Atlas cloud database.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 bg-surface-card border border-white/10 text-text-muted hover:text-white font-mono text-xs tracking-wider uppercase clip-corner-tl transition-colors"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs tracking-wider uppercase clip-corner-tr transition-all duration-200 shadow-lg shadow-red-900/40"
              >
                PURGE TOURNAMENT
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
