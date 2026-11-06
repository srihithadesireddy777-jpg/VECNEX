'use client';

import { useState } from 'react';
import { CheckCircle2, ShieldCheck, Terminal, Cpu, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EditorialManifesto() {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: '01',
      tag: 'Architecture',
      title: 'Modular & Production-Ready Codebases',
      description:
        'Projects are structured with clean directory hierarchies, environment configurations, and documented dependency manifests. Ready for immediate local execution without broken imports.',
      deliverables: ['Clean code structure', 'Requirements & config files', 'Setup commands included'],
      icon: Terminal,
    },
    {
      id: '02',
      tag: 'Verification',
      title: 'Pre-Tested Execution Guarantee',
      description:
        'Each repository undergoes pre-release execution checks on current operating systems. You receive a walkthrough video guide to ensure your local setup runs without errors.',
      deliverables: ['100% executable guarantee', 'Video installation guide', 'Runtime troubleshooting'],
      icon: ShieldCheck,
    },
    {
      id: '03',
      tag: 'Documentation',
      title: 'Complete IEEE Reports & Viva Presentations',
      description:
        'Comprehensive 40-60 page formatted project documentation in Word (.docx) and PDF, complete with system architecture diagrams, literature review, and 15-20 slide viva defense decks.',
      deliverables: ['IEEE Word & PDF documentation', 'Structured viva slide deck', 'Data flow diagrams'],
      icon: FileText,
    },
    {
      id: '04',
      tag: 'Consultation',
      title: 'Direct WhatsApp Technical Support',
      description:
        'Reach out directly on WhatsApp (+91 73823 24346) for codebase walkthroughs, custom feature adjustments, or technical guidance for your seminar defense.',
      deliverables: ['Direct WhatsApp line', 'Fast turnaround support', 'Custom order adaptation'],
      icon: Cpu,
    },
  ];

  return (
    <section id="manifesto" className="relative py-12 sm:py-16 lg:py-20 border-b border-[#E8D2D6] overflow-hidden bg-[#F7F5EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Clean, Restrained Section Header (No oversized slogans or decorative underlines) */}
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-wider text-[#6E263D] font-bold block mb-2">
            Engineering Standards
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading text-[#111111] tracking-tight">
            Built for Academic Defense & Rigorous Evaluation
          </h2>
          <p className="text-xs sm:text-sm text-[#111111]/80 mt-2 font-normal leading-relaxed">
            Every deliverable is prepared to withstand scrutiny by university external examiners, featuring lab-tested codebases and publication-grade IEEE documentation.
          </p>
        </div>

        {/* Responsive Content Grid: Tab Selectors + Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Clean Chapter Selectors */}
          <div className="lg:col-span-5 flex flex-col space-y-2.5">
            {pillars.map((pillar, idx) => {
              const isSelected = activeTab === idx;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 border flex items-start gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#6E263D] shadow-sm'
                      : 'bg-white/60 border-[#E8E5DC] hover:bg-white hover:border-[#E8D2D6]'
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected
                        ? 'bg-[#E8D2D6] text-[#111111] border-[#6E263D]/40'
                        : 'bg-[#F4E8E8] text-[#111111] border-[#E8D2D6]'
                    }`}
                  >
                    <Icon className="h-4 w-4 text-[#6E263D]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono tracking-wider text-[#111111]/70 uppercase font-bold block">
                      {pillar.id} • {pillar.tag}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold font-heading mt-0.5 text-[#111111] truncate">
                      {pillar.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Specification Panel */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8D2D6] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E5DC] pb-3">
                <span className="text-xs font-mono tracking-wider text-[#6E263D] uppercase font-bold">
                  {pillars[activeTab].tag} Standard
                </span>
                <span className="text-[11px] font-mono text-[#111111]/70 font-semibold">
                  Part {pillars[activeTab].id} of 04
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#111111]">
                {pillars[activeTab].title}
              </h3>

              <p className="text-xs sm:text-sm text-[#111111]/80 leading-relaxed font-normal">
                {pillars[activeTab].description}
              </p>

              {/* Deliverable Checkpoints */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#111111]/70 block font-bold">
                  What is included:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pillars[activeTab].deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F5EF] border border-[#E8D2D6] text-xs text-[#111111]"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#6E263D] shrink-0" />
                      <span className="font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#E8E5DC] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#111111]/70 font-medium">
                Instant delivery available on all catalog packages
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/projects"
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full luxury-button-accent text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <span>Browse Catalog</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#111111]" />
                </Link>
                <Link
                  href="/custom-request"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-full luxury-button-secondary text-xs font-bold flex items-center justify-center"
                >
                  Custom Order
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
