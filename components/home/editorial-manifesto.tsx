'use client';

import { useState } from 'react';
import { Layers, CheckCircle2, ShieldCheck, Terminal, Cpu, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function EditorialManifesto() {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      id: '01',
      tag: 'ARCHITECTURE',
      title: 'Engineered for Production, Not Just Pass Marks',
      description:
        'Every project in the VECNEX repository is authored with clean modular architecture, separation of concerns, and clean dependency manifests. No obsolete monolithic scripts or broken imports.',
      deliverables: ['Production-grade repository', 'Docker / Conda / Node configs', 'Clean code structure'],
      icon: Terminal,
    },
    {
      id: '02',
      tag: 'VERIFICATION',
      title: 'Pre-Tested Execution on Real Environments',
      description:
        'All repositories undergo testing against current operating systems, runtime libraries, and hardware targets before being published. You receive an execution video walkthrough and step-by-step setup commands.',
      deliverables: ['100% executable guarantee', 'Local setup walkthrough', 'Resolution support'],
      icon: ShieldCheck,
    },
    {
      id: '03',
      tag: 'DOCUMENTATION',
      title: 'Comprehensive IEEE Formatted Reports & Viva Decks',
      description:
        'Defending your project before external university examiners requires rigorous academic documentation. We provide 40-60 page formatted Word (.docx) and PDF reports with literature reviews, system data flows, and viva slides.',
      deliverables: ['IEEE Word & PDF reports', '15-20 slide viva presentations', 'System architecture diagrams'],
      icon: FileText,
    },
    {
      id: '04',
      tag: 'MENTORSHIP',
      title: 'Direct WhatsApp Engineering Consultation',
      description:
        'You are never left alone to debug environment errors. Our senior engineering team remains directly accessible via WhatsApp for package clarification, codebase guidance, and viva prep.',
      deliverables: ['Direct line: +91 73823 24346', 'Rapid WhatsApp turnaround', 'Custom tech adaptations'],
      icon: Cpu,
    },
  ];

  return (
    <section id="manifesto" className="relative py-24 border-b border-[#E8D2D6] overflow-hidden bg-[#F7F5EF]">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[350px] bg-[#E8D2D6]/30 pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* The Memorable Advertising Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4E8E8] border border-[#E8D2D6] text-[#111111] text-[10px] font-mono tracking-widest uppercase font-bold">
            <span>THE VECNEX STANDARD</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-[1.08] text-[#111111]">
            DON&apos;T JUST BUILD A PROJECT.{' '}
            <span className="underline decoration-[#6E263D] decoration-4 underline-offset-8 block sm:inline">
              BUILD SOMETHING THAT MATTERS.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#111111]/85 font-medium max-w-2xl mx-auto leading-relaxed">
            In an era where technology redefines every industry, your academic capstone should be an emblem of engineering mastery. We replace generic template code with rigorous, lab-verified deliverables.
          </p>
        </div>

        {/* Interactive Storytelling Pillars Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Chapter Selectors */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {pillars.map((pillar, idx) => {
              const isSelected = activeTab === idx;
              const Icon = pillar.icon;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 border flex items-start gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#6E263D] shadow-md ring-1 ring-[#6E263D]/20'
                      : 'bg-white/60 border-[#E8E5DC] hover:bg-white hover:border-[#E8D2D6]'
                  }`}
                >
                  <div
                    className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected
                        ? 'bg-[#E8D2D6] text-[#111111] border-[#6E263D]'
                        : 'bg-[#F4E8E8] text-[#111111] border-[#E8D2D6]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-[#111111]/70 uppercase font-bold">
                        PHASE {pillar.id} // {pillar.tag}
                      </span>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-[#6E263D] animate-pulse" />
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold font-heading mt-1 truncate text-[#111111]">
                      {pillar.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-Dive Architectural Panel */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-[#E8D2D6] shadow-lg flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#F4E8E8]/50 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-[#E8E5DC] pb-4">
                <span className="text-xs font-mono tracking-widest text-[#111111]/70 uppercase font-bold">
                  ENGINEERING SPECIFICATION // {pillars[activeTab].tag}
                </span>
                <span className="text-xs font-mono font-bold text-[#111111] px-2.5 py-0.5 rounded-full bg-[#F4E8E8] border border-[#E8D2D6]">
                  STANDARDS {pillars[activeTab].id}/04
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-heading text-[#111111] leading-tight">
                {pillars[activeTab].title}
              </h3>

              <p className="text-xs sm:text-sm text-[#111111]/90 leading-relaxed font-medium">
                {pillars[activeTab].description}
              </p>

              {/* Deliverable Checkpoints */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111]/70 block font-bold">
                  DELIVERABLE GUARANTEES INCLUDED
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pillars[activeTab].deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-3 rounded-xl bg-[#F7F5EF] border border-[#E8D2D6] text-xs text-[#111111]"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#6E263D] shrink-0" />
                      <span className="font-bold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Panel Actions */}
            <div className="mt-8 pt-6 border-t border-[#E8E5DC] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[10px] font-mono text-[#111111]/70 block font-bold">
                  AVAILABLE IMMEDIATELY
                </span>
                <span className="text-xs font-bold text-[#111111]">Full academic package archives</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/projects"
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-full luxury-button-accent text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Browse Catalog</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#111111]" />
                </Link>
                <Link
                  href="/custom-request"
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full luxury-button-secondary text-xs font-bold flex items-center justify-center"
                >
                  Custom Request
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
