"use client";

import dynamic from "next/dynamic";

const TargetCursor = dynamic(() => import("@/components/TargetCursor"), { ssr: false });

export default function ClientCursor() {
  return (
    <TargetCursor
      targetSelector={
        'button, input[type="button"], input[type="submit"], [role="button"], .cursor-target'
      }
      spinDuration={2}
      hideDefaultCursor={true}
      parallaxOn={true}
      hoverDuration={0.2}
    />
  );
}
