export const instant = false;

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BRANCHES, DEMO_PROJECTS } from '@/lib/constants';
import { normalizeProject } from '@/lib/utils/project';
import RazorpayButton from '@/components/checkout/razorpay-button';
import { createAdminClient } from '@/lib/supabase/admin';
import {
  FileText,
  FileCode,
  Presentation,
  CheckCircle2,
  MessageCircle,
  Video,
  ChevronRight,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

export async function generateStaticParams() {
  const slugs = new Set<string>();
  try {
    const supabase = createAdminClient();
    const { data: projects, error } = await supabase.from('projects').select('slug');
    if (!error && projects) {
      projects.forEach((project) => {
        if (project.slug) slugs.add(project.slug);
      });
    }
  } catch (error) {
    console.warn('generateStaticParams error:', error);
  }

  DEMO_PROJECTS.forEach((project) => {
    if (project.slug) slugs.add(project.slug);
  });

  return Array.from(slugs).map((slug) => ({
    slug,
  }));
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let rawProject = null;

  try {
    const supabase = createAdminClient();
    const { data } = await supabase.from('projects').select('*').eq('slug', slug).maybeSingle();
    rawProject = data;
  } catch (err) {
    console.warn('Failed to fetch project from database:', err);
  }

  if (!rawProject) {
    const demo = DEMO_PROJECTS.find((p) => p.slug === slug);
    if (demo) {
      rawProject = demo;
    } else {
      notFound();
    }
  }

  const project = normalizeProject(rawProject);
  const branchInfo = BRANCHES.find((b) => b.id === project.branch);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-[#111111] bg-[#F7F5EF]">
      {/* Header Breadcrumb & Title */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#111111] font-bold">
          <Link href="/projects" className="hover:text-[#6E263D] transition-colors">
            Projects
          </Link>
          <ChevronRight className="h-3 w-3 text-[#6E263D]" />
          <Link href={`/branches/${project.branch}`} className="hover:text-[#6E263D] transition-colors">
            {branchInfo?.name || project.branch}
          </Link>
          <ChevronRight className="h-3 w-3 text-[#6E263D]" />
          <span className="truncate max-w-sm sm:max-w-md">{project.title}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#E8D2D6] text-[#111111] border border-[#6E263D]/30 shadow-xs">
            {branchInfo?.fullName || project.branch}
          </span>
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-white text-[#111111] border border-[#E8D2D6] shadow-xs">
            {project.category === 'MAJOR_FINAL_YEAR' ? 'Major Final Year Project' : 'Mini Project'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-heading text-[#111111] leading-tight">
          {project.title}
        </h1>
      </div>

      {/* Main Grid: Left Column (Preview & Details), Right Column (Sticky Purchase Box) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-8">
          {/* Media Preview Image */}
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-white border border-[#E8D2D6] shadow-lg">
            <Image
              src={project.thumbnail_url}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Description Section */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8D2D6] space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#111111] font-bold">
              <FileText className="h-4 w-4 text-[#6E263D]" />
              <span>Project Abstract & System Architecture</span>
            </div>
            <h2 className="text-xl font-bold font-heading text-[#111111]">Project Overview</h2>
            <p className="text-xs sm:text-sm text-[#111111]/90 leading-relaxed whitespace-pre-line font-medium">
              {project.full_description}
            </p>
          </div>

          {/* Tech Stack Breakdown */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8D2D6] space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#111111] font-bold">
              <Terminal className="h-4 w-4 text-[#6E263D]" />
              <span>Core Tech Stack</span>
            </div>
            <h2 className="text-xl font-bold font-heading text-[#111111]">Technologies & Frameworks</h2>
            <div className="flex flex-wrap gap-2 pt-1">
              {(project.tech_stack || []).map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] text-xs font-mono font-bold text-[#111111]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8D2D6] space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#111111] font-bold">
              <ShieldCheck className="h-4 w-4 text-[#6E263D]" />
              <span>Verification Guarantee</span>
            </div>
            <h2 className="text-xl font-bold font-heading text-[#111111]">Deliverable Package Contents</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 bg-[#F7F5EF] rounded-2xl border border-[#E8E5DC]">
                <FileCode className="h-5 w-5 text-[#6E263D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#111111] font-heading">Source Code ZIP Archive</h4>
                  <p className="text-xs text-[#111111]/80 mt-0.5 font-medium">
                    Complete executable project folder with all scripts, configuration, and dependencies.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#F7F5EF] rounded-2xl border border-[#E8E5DC]">
                <FileText className="h-5 w-5 text-[#6E263D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#111111] font-heading">IEEE Project Report (.docx & PDF)</h4>
                  <p className="text-xs text-[#111111]/80 mt-0.5 font-medium">
                    Includes Abstract, Literature Survey, System Design, Data Flow Diagrams, Test Cases, and References.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#F7F5EF] rounded-2xl border border-[#E8E5DC]">
                <Presentation className="h-5 w-5 text-[#6E263D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#111111] font-heading">PPT Presentation Deck (.pptx)</h4>
                  <p className="text-xs text-[#111111]/80 mt-0.5 font-medium">
                    Ready 15-20 slide presentation deck structured for university external viva examiners.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-[#F7F5EF] rounded-2xl border border-[#E8E5DC]">
                <Video className="h-5 w-5 text-[#6E263D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#111111] font-heading">Video Demo & Execution Guide</h4>
                  <p className="text-xs text-[#111111]/80 mt-0.5 font-medium">
                    Step-by-step video demonstration and installation instructions for running the project on your laptop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Deliverable & Order Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-white space-y-6 border-2 border-[#E8D2D6] shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111] block font-bold">
                  DELIVERABLE PACKAGE
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#F4E8E8] text-[#6E263D] border border-[#E8D2D6]">
                  VERIFIED
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#111111]">
                Source Code, IEEE Report & Viva PPT
              </h3>
              <p className="text-xs text-[#111111]/80 font-medium mt-1">
                Direct WhatsApp Order • Instant Deliverables & Support
              </p>
            </div>

            {/* Direct WhatsApp Purchase / Order Button */}
            <RazorpayButton
              projectId={project.id}
              projectTitle={project.title}
              priceInr={project.discounted_price_inr || project.price_inr}
            />

            {/* Deliverables Checklist */}
            <div className="space-y-2.5 pt-4 border-t border-[#E8E5DC] text-xs text-[#111111] font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#6E263D]" />
                <span>Verified Source Code (ZIP)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#6E263D]" />
                <span>Formatted IEEE Project Report (.docx/PDF)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#6E263D]" />
                <span>Seminar PPT Presentation Deck</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#6E263D]" />
                <span>Execution Video & Setup Guide</span>
              </div>
            </div>

            <div className="p-3 bg-[#F4E8E8] rounded-2xl border border-[#E8D2D6] text-center text-[11px] text-[#111111] font-mono flex items-center justify-center gap-2 font-bold">
              <MessageCircle className="h-4 w-4 text-[#25D366] fill-[#25D366]" />
              <span>Direct WhatsApp Delivery • +91 73823 24346</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
