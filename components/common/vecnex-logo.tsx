import React from 'react';

interface VecnexLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export default function VecnexLogo({
  className = '',
  size = 'md',
  showWordmark = true,
}: VecnexLogoProps) {
  const iconSizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-12 w-12',
  };

  const textSizes = {
    sm: 'text-base tracking-[0.2em]',
    md: 'text-xl tracking-[0.22em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.25em]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Abstract Geometric Engineering Glyph - Burgundy Luxury */}
      <div
        className={`relative ${iconSizes[size]} shrink-0 rounded-xl bg-gradient-to-b from-[#FFFFFF] via-[#F4E8E8] to-[#E8D2D6] p-[1.5px] shadow-sm border border-[#6E263D]/30 group-hover:border-[#6E263D] transition-all duration-300`}
      >
        <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center overflow-hidden relative shadow-inner">
          {/* Subtle Ambient Reflector */}
          <div className="absolute inset-0 bg-radial from-[#F4E8E8] via-transparent to-transparent opacity-80" />

          {/* Precision Faceted Vector Prism with Deep Burgundy Accents */}
          <svg
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4/5 h-4/5 drop-shadow-sm"
          >
            {/* Left Wing Facet - Blush Burgundy / Platinum */}
            <path
              d="M6 8L18 29L14 16L6 8Z"
              fill="url(#burgundyFacetLeft)"
              stroke="#6E263D"
              strokeWidth="0.8"
            />
            {/* Right Wing Facet - Soft Champagne / Deep Burgundy */}
            <path
              d="M30 8L18 29L22 16L30 8Z"
              fill="url(#burgundyFacetRight)"
              stroke="#6E263D"
              strokeWidth="0.8"
            />
            {/* Center Core Ridge - Deep Burgundy Accent */}
            <path
              d="M18 7L22 16L18 29L14 16L18 7Z"
              fill="url(#burgundyCore)"
              stroke="#111111"
              strokeWidth="0.8"
            />
            {/* Precision Apex Chevron */}
            <path
              d="M12 11L18 19L24 11"
              stroke="#111111"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="burgundyFacetLeft" x1="6" y1="8" x2="18" y2="29" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F4E8E8" />
                <stop offset="0.6" stopColor="#E8D2D6" />
                <stop offset="1" stopColor="#E8E5DC" />
              </linearGradient>
              <linearGradient id="burgundyFacetRight" x1="30" y1="8" x2="18" y2="29" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E8D2D6" />
                <stop offset="0.6" stopColor="#E8E5DC" />
                <stop offset="1" stopColor="#F7F5EF" />
              </linearGradient>
              <linearGradient id="burgundyCore" x1="18" y1="7" x2="18" y2="29" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6E263D" />
                <stop offset="0.5" stopColor="#8A324E" />
                <stop offset="1" stopColor="#4A1828" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Black Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={`font-black font-heading text-[#111111] ${textSizes[size]}`}
              style={{ letterSpacing: '0.18em' }}
            >
              VECNEX
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded-[4px] bg-[#F4E8E8] border border-[#E8D2D6] text-[9px] font-mono tracking-widest text-[#111111] uppercase font-bold">
              STUDIO
            </span>
          </div>
          <span className="text-[10px] tracking-wider text-[#111111]/70 font-medium -mt-0.5">
            Engineering Marketplace
          </span>
        </div>
      )}
    </div>
  );
}
