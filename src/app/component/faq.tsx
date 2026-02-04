"use client";
import React, { useState, useMemo } from "react";
import { ChevronRight, Terminal, Users, Zap, HelpCircle, Code } from "lucide-react";

type FAQCategory = "general" | "technical" | "logistics" | "rewards";

type FAQ = {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
  tags: string[];
};

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("general");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Placeholder FAQ data - User will replace with actual content
  const faqData = useMemo<FAQ[]>(() => [
    {
      id: "GEN-001",
      category: "general",
      question: "What is SELECT Makeathon 2026?",
      answer: "SELECT Makeathon 2026 is a 36 hour innovation-driven hackathon organized by SELECT where students collaborate in teams to design, prototype, and present technology-based solutions to real-world problems using hardware, software, AI/ML, IoT, and robotics.",
      tags: ["about", "hackathon", "innovation"],
    },
    {
      id: "TECH-001",
      category: "technical",
      question: "Is this a hackathon or a makeathon?",
      answer: "This is a Makeathon-style Hackathon, meaning: You are encouraged to build physical prototypes + software solutions. There is a strong focus on hardware + AI + IoT + real-world engineering problems.",
      tags: ["format", "hardware", "software"],
    },
    {
      id: "LOG-001",
      category: "logistics",
      question: "Where will the event be conducted?",
      answer: "The event will be conducted offline and the VENUE REVEALED SOON.",
      tags: ["venue", "location", "offline"],
    },
    {
      id: "GEN-002",
      category: "general",
      question: "What is the team size?",
      answer: "A team must contain 3-5 members.",
      tags: ["team", "size", "members"],
    },
    {
      id: "GEN-003",
      category: "general",
      question: "Can we bring our own idea?",
      answer: "Yes! Original ideas are welcome as long as they align with the hackathon theme.",
      tags: ["ideas", "innovation", "originality"],
    },
    {
      id: "GEN-004",
      category: "general",
      question: "Can team members be from different colleges?",
      answer: "Yes! Cross-college teams are allowed and encouraged.",
      tags: ["team", "collaboration", "cross-college"],
    },
    {
      id: "TECH-002",
      category: "technical",
      question: "Will hardware components be provided?",
      answer: "Yes, hardware components are available and free of cost! However they are not for keeps and will be taken back after the hackathon.",
      tags: ["hardware", "components", "resources"],
    },
    {
      id: "GEN-005",
      category: "general",
      question: "How much do we need to pay?",
      answer: "For all the VIT students its FREE, however external participants need to pay 500 per person.",
      tags: ["fees", "cost", "registration"],
    },
    {
      id: "LOG-002",
      category: "logistics",
      question: "Will we get food?",
      answer: "Yes! Food and other refreshments will be provided to you for free of cost through out the hackathon.",
      tags: ["food", "refreshments", "meals"],
    },
    {
      id: "TECH-003",
      category: "technical",
      question: "Will intermediate evaluations be conducted?",
      answer: "Yes, multiple mentor checkpoints and review rounds will be conducted.",
      tags: ["evaluation", "mentorship", "reviews"],
    },
    {
      id: "TECH-004",
      category: "technical",
      question: "Is presentation mandatory?",
      answer: "Yes. Each team must demo and pitch their project during the final evaluation.",
      tags: ["presentation", "pitch", "demo"],
    },
    {
      id: "REW-001",
      category: "rewards",
      question: "Will all participants get certificates?",
      answer: "Yes, all registered participants who complete the hackathon will receive certificates.",
      tags: ["certificates", "recognition", "participation"],
    },
    {
      id: "LOG-003",
      category: "logistics",
      question: "Will accommodation be provided?",
      answer: "Yes, limited accommodation facilities will be provided for outstation participants.",
      tags: ["accommodation", "stay", "outstation"],
    },
    {
      id: "GEN-006",
      category: "general",
      question: "Is team selection based on screening?",
      answer: "Yes. Teams will be shortlisted based on idea quality, innovation, and feasibility.",
      tags: ["selection", "screening", "shortlist"],
    },
    {
      id: "GEN-007",
      category: "general",
      question: "Who can participate?",
      answer: "It is open to Students, Researchers, and Professionals.",
      tags: ["eligibility", "participants", "students"],
    },
  ], []);

  const categories = useMemo(
    () => [
      { id: "general" as FAQCategory, label: "General", icon: <HelpCircle className="w-4 h-4" />, count: faqData.filter(f => f.category === "general").length },
      { id: "technical" as FAQCategory, label: "Technical", icon: <Code className="w-4 h-4" />, count: faqData.filter(f => f.category === "technical").length },
      { id: "logistics" as FAQCategory, label: "Logistics", icon: <Users className="w-4 h-4" />, count: faqData.filter(f => f.category === "logistics").length },
      { id: "rewards" as FAQCategory, label: "Rewards", icon: <Zap className="w-4 h-4" />, count: faqData.filter(f => f.category === "rewards").length },
    ],
    [faqData]
  );

  const filteredFAQs = useMemo(() => {
    return faqData.filter((faq) => faq.category === activeCategory);
  }, [activeCategory, faqData]);

  return (
    <div className="relative min-h-screen w-full  py-0 px-4 overflow-hidden">
      {/* Circuit board background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="faq-circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M10 10 L10 30 L30 30 L30 50 M50 20 L70 20 M20 60 L20 70" stroke="#18B8DA" strokeWidth="0.5" fill="none" />
              <circle cx="10" cy="10" r="1.5" fill="#18B8DA" />
              <circle cx="30" cy="30" r="1.5" fill="#18B8DA" />
              <circle cx="50" cy="20" r="1.5" fill="#18B8DA" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faq-circuit)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-[#18B8DA]" />
            <span className="text-[#18B8DA]/70 text-sm font-mono tracking-[0.3em] uppercase">
              Knowledge Base v2.0
            </span>
          </div>
          <h1 className="text-white text-5xl md:text-6xl font-ethnocentric mb-4 tracking-tight">
            FAQ
          </h1>

        </div>

        {/* Control Panel */}
        <div className="mb-8 space-y-4">
          {/* Category Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative p-4 border transition-all ${activeCategory === category.id
                  ? "border-[#18B8DA] bg-[#001820]"
                  : "border-[#18B8DA]/20 bg-[#001018] hover:border-[#18B8DA]/40"
                  }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`${activeCategory === category.id ? "text-[#18B8DA]" : "text-[#18B8DA]/50"}`}>
                    {category.icon}
                  </div>
                  <span className={`text-sm font-mono uppercase tracking-wider ${activeCategory === category.id ? "text-white" : "text-white/60"
                    }`}>
                    {category.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold font-mono ${activeCategory === category.id ? "text-[#18B8DA]" : "text-white/40"
                    }`}>
                    {category.count}
                  </span>
                  <span className="text-xs text-white/40 uppercase tracking-wider">Queries</span>
                </div>

                {/* Active indicator */}
                {activeCategory === category.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#18B8DA]" />
                )}
              </button>
            ))}
          </div>
        </div>


        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredFAQs.map((faq) => (
            <div
              key={faq.id}
              className={`border transition-all ${expandedId === faq.id
                ? "border-[#18B8DA] bg-[#001820] lg:col-span-2"
                : "border-[#18B8DA]/30 bg-[#001018] hover:border-[#18B8DA]/50"
                }`}
            >
              {/* Question Header */}
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full text-left p-5 flex items-start gap-4 group"
              >
                {/* ID Badge */}
                <div className="shrink-0 pt-1">
                  <div className={`w-12 h-12 border flex items-center justify-center transition-colors ${expandedId === faq.id ? "border-[#18B8DA] bg-[#18B8DA]/10" : "border-[#18B8DA]/30"
                    }`}>
                    <span className={`text-sm font-mono font-bold ${expandedId === faq.id ? "text-[#18B8DA]" : "text-white/60"
                      }`}>
                      {faq.id.split("-")[1]}
                    </span>
                  </div>
                </div>

                {/* Question */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className={`font-semibold text-base leading-tight transition-colors ${expandedId === faq.id ? "text-[#18B8DA]" : "text-white group-hover:text-[#18B8DA]"
                      }`}>
                      {faq.question}
                    </h3>
                    <ChevronRight className={`w-5 h-5 shrink-0 text-[#18B8DA] transition-transform ${expandedId === faq.id ? "rotate-90" : ""
                      }`} />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {faq.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 border border-[#18B8DA]/20 text-xs font-mono text-[#18B8DA]/60 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* Answer Panel */}
              {expandedId === faq.id && (
                <div className="px-5 pb-5 pl-19">
                  <div className="border-l-2 border-[#18B8DA]/40 pl-6 py-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Terminal className="w-3 h-3 text-[#18B8DA]/60" />
                      <span className="text-xs font-mono text-[#18B8DA]/50 uppercase tracking-wider">
                        Response
                      </span>
                    </div>
                    <p className="text-white/80 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}