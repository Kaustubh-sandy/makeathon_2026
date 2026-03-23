"use client";

import dynamic from "next/dynamic";

// Lazy-load heavy below-fold components to reduce initial JS bundle
const Tracks = dynamic(() => import("./component/tracks"));
const TimelinePage = dynamic(() => import("./component/timeline"));
const FAQSection = dynamic(() => import("./component/faq"));
const Footer = dynamic(() => import("./component/footer"));
const OrganisingTeam = dynamic(() => import("./component/organisingTeam"));
const AnnouncementPopup = dynamic(() => import("./component/announcementPopup"), { ssr: false });

// SSR: false for WebGL/canvas components that cannot render on the server
const FloatingLines = dynamic(() => import("@/components/FloatingLines"), { ssr: false });

import Navbar from "./component/navbar";
import LandingContent from "./component/landingContent";
import AboutUs from "./component/aboutUs";

export default function Page() {
  return (
    // bg-[#00121F] matches your 'Rich Black' palette exactly
    <main className="relative min-h-screen w-full overflow-hidden bg-[#00121F] text-white selection:bg-[#18B8DA] selection:text-[#00121F]">

      {/* BACKGROUND LAYER (non-interactive) */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#00121F]">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <FloatingLines
            linesGradient={["#18b8da", "#00121f", "#00121f"]}
            animationSpeed={0.3}
            interactive
            bendRadius={12}
            bendStrength={-0.4}
            mouseDamping={0.01}
            parallax={false}
            parallaxStrength={0.1}
          />
        </div>
      </div>

      {/* CONTENT LAYER (interactive) */}
      <div className="relative z-10">
        <Navbar />

        <LandingContent />

        <section id="about" className="scroll-mt-20">
          <AboutUs />
        </section>

        {/* Placeholder sections so navbar anchors work */}
        <section id="tracks" className="scroll-mt-20 py-20 sm:py-24">
          <Tracks />
        </section>

        <section id="timeline" className="scroll-mt-20">
          <TimelinePage />
        </section>

        <section id="faqs" className="scroll-mt-20 py-20 sm:py-24">
          <FAQSection />
        </section>

        <section id="oc" className="scroll ">
          <OrganisingTeam />
        </section>

        <Footer />
      </div>

      {/* Announcement Popup */}
      <AnnouncementPopup />
    </main>
  );
}