'use client';

import Image from 'next/image';

/**
 * SectionSeparator using the EXL yellow arrow-line brand asset.
 * Sits between major page sections as a visual divider.
 */
export default function SectionSeparator({
  flip = false,
  className = '',
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#0A0A0A',
        padding: '0',
        lineHeight: 0,
        display: 'flex',
        alignItems: 'center',
        transform: flip ? 'scaleX(-1)' : 'none',
      }}
    >
      <Image
        src="/yellow-line.png"
        alt=""
        width={1920}
        height={12}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          opacity: 0.85,
        }}
        unoptimized
      />
    </div>
  );
}
