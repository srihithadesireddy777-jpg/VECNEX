'use client';

import { useState, useEffect } from 'react';
import { X, MessageCircle, ArrowRight } from 'lucide-react';

const WHATSAPP_PHONE = '917382324346';
const DISPLAY_PHONE = '+91 73823 24346';
const DEFAULT_MESSAGE = encodeURIComponent(
  'Hi VECNEX Engineering! I am interested in an engineering project package. Please share details and guidance.'
);

export default function WhatsAppButton() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const dismissed =
          sessionStorage.getItem('vecnex_whatsapp_dismissed') ||
          sessionStorage.getItem('capstonia_whatsapp_dismissed');
        if (!dismissed) {
          setShowNotification(true);
        }
      } catch (_) {
        setShowNotification(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNotification(false);
    try {
      sessionStorage.setItem('vecnex_whatsapp_dismissed', 'true');
    } catch (_) {}
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${DEFAULT_MESSAGE}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Compact Notification Bubble */}
      {showNotification && (
        <div className="mb-2.5 w-[calc(100vw-2rem)] max-w-[280px] sm:max-w-xs bg-white text-[#111111] p-3.5 sm:p-4 rounded-2xl border border-[#E8D2D6] shadow-lg animate-in slide-in-from-bottom-2 fade-in duration-200">
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#E8E5DC]">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#111111]">
                Engineering Support
              </span>
            </div>
            <button
              onClick={handleDismiss}
              className="text-[#111111]/60 hover:text-[#111111] p-1 rounded-md hover:bg-[#F4E8E8] transition-colors"
              aria-label="Close notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="pt-2 space-y-1">
            <p className="text-xs text-[#111111] font-normal leading-relaxed">
              Questions about source code deliverables or IEEE documentation?
            </p>
            <p className="text-[11px] font-mono text-[#6E263D] font-bold">
              {DISPLAY_PHONE}
            </p>
          </div>

          <div className="pt-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowNotification(false)}
              className="w-full py-2 px-3.5 rounded-full bg-[#E8D2D6] hover:bg-[#F4E8E8] text-[#111111] font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 border border-[#6E263D]/30"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366] fill-[#25D366]" />
              <span>Chat on WhatsApp</span>
              <ArrowRight className="h-3 w-3 text-[#111111]" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative group">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with us on WhatsApp at ${DISPLAY_PHONE}`}
          className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 border-2 border-white"
        >
          {/* Universal WhatsApp Icon */}
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 fill-white"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M16.002 2C8.269 2 2 8.27 2 16.002c0 2.658.742 5.228 2.152 7.461L2.05 30.014l6.732-2.073A13.93 13.93 0 0 0 16.002 30C23.733 30 30 23.732 30 16.002 30 8.27 23.733 2 16.002 2zm7.644 19.832c-.32.898-1.59 1.656-2.586 1.871-.68.148-1.57.266-4.555-.973-3.816-1.586-6.28-5.46-6.473-5.715-.187-.258-1.547-2.062-1.547-3.934 0-1.871.977-2.793 1.328-3.176.352-.383.766-.48 1.023-.48.258 0 .512.004.738.016.242.012.566-.094.887.676.328.789 1.125 2.742 1.223 2.941.098.2.164.434.031.691-.133.258-.2.418-.398.652-.199.234-.418.523-.598.703-.2.2-.41.418-.176.82.234.398 1.043 1.723 2.234 2.785 1.535 1.367 2.832 1.793 3.23 1.992.398.2.633.168.867-.098.234-.266.996-1.16 1.262-1.559.266-.398.531-.332.898-.2.367.133 2.332 1.1 2.73 1.3.398.2.664.297.766.465.098.172.098.992-.223 1.89z" />
          </svg>

          {/* Status Dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        </a>

        {/* Desktop Tooltip */}
        {!showNotification && (
          <div className="hidden sm:block absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-white border border-[#E8D2D6] text-[#111111] text-xs font-mono font-bold whitespace-nowrap shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
            WhatsApp: {DISPLAY_PHONE}
          </div>
        )}
      </div>
    </div>
  );
}
