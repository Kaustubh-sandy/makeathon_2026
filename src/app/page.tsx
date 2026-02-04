import Navbar from "./component/navbar";
import LandingContent from "./component/landingContent";
import AboutUs from "./component/aboutUs";
import Tracks from "./component/tracks";
import FAQSection from "./component/faq";
import Footer from "./component/footer";
import TimelinePage from "./component/timeline";
import FloatingLines from "@/components/FloatingLines";


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

        <Footer />
      </div>

    </main>
  );
}