export const instant = false;

import Link from 'next/link';
import { BRANCHES, DEMO_PROJECTS } from '@/lib/constants';
import BranchCard from '@/components/catalog/branch-card';
import BranchNav from '@/components/catalog/branch-nav';
import ProjectCard from '@/components/catalog/project-card';
import { normalizeProjects } from '@/lib/utils/project';
import {
  ArrowRight,
  Download,
  Award,
  Video,
  FileText,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import CinematicHero from '@/components/home/cinematic-hero';
import EditorialManifesto from '@/components/home/editorial-manifesto';
import CinematicShowcase from '@/components/home/cinematic-showcase';

export default async function HomePage() {
  const supabase = await createClient();
  let allPublished: any[] = [];
  try {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('is_published', true);
    const dbProjects = data && data.length > 0 ? normalizeProjects(data) : [];
    const dbSlugs = new Set(dbProjects.map((p) => p.slug));
    const fallbackProjects = normalizeProjects(DEMO_PROJECTS).filter((p) => !dbSlugs.has(p.slug));
    allPublished = [...dbProjects, ...fallbackProjects];
  } catch (error) {
    console.warn('Failed to load projects:', error);
    allPublished = normalizeProjects(DEMO_PROJECTS);
  }

  const featuredProjects = allPublished.filter((p) => p.is_featured);
  const spotlightProjects = featuredProjects.length > 0 ? featuredProjects : allPublished;

  return (
    <div className="space-y-24 pb-24 text-[#111111] bg-[#F7F5EF] relative overflow-hidden">
      {/* 1. CINEMATIC "ENGINEERING IN MOTION" HERO WITH 3D METALLIC SCULPTURE */}
      <CinematicHero totalProjects={allPublished.length} />

      {/* 2. BOLD EDITORIAL ADVERTISING MANIFESTO: "DON'T JUST BUILD A PROJECT. BUILD SOMETHING THAT MATTERS." */}
      <EditorialManifesto />

      {/* 3. IMMERSIVE FEATURED-PROJECT ADVERTISING STAGE (Using Actual Project Data) */}
      <CinematicShowcase projects={spotlightProjects} />

      {/* 4. HORIZONTAL DISCIPLINE NAVIGATION & TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-white border border-[#E8D2D6] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-[#111111]">
                Engineering Disciplines
              </h2>
              <p className="text-xs text-[#111111]/80 font-medium">
                Filter verified packages categorized by academic department and specialization
              </p>
            </div>
            <Link
              href="/projects"
              className="text-xs font-mono text-[#111111] hover:text-[#6E263D] transition-colors flex items-center gap-1 font-bold"
            >
              <span>View All ({allPublished.length})</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#6E263D]" />
            </Link>
          </div>

          <BranchNav activeBranch="ALL" />
        </div>
      </section>

      {/* 5. ACADEMIC DEPARTMENTS CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111]/70 block mb-2 font-bold">
            ACADEMIC DOMAINS
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold font-heading text-[#111111]">
            Specialized Engineering Departments
          </h2>
          <p className="text-xs sm:text-sm text-[#111111]/80 mt-2 font-medium">
            Select your discipline to access pre-verified project deliverables and IEEE paper references.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BRANCHES.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      </section>

      {/* 6. REPOSITORY CATALOG PREVIEWS (White Cards with Burgundy Accents) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111]/70 block mb-1 font-bold">
              PORTFOLIO SELECTION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-[#111111]">
              Trending Engineering Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="mt-4 md:mt-0 text-xs font-mono text-[#111111] hover:text-[#6E263D] transition-colors flex items-center gap-1 font-bold"
          >
            <span>Full Catalog ({allPublished.length})</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#6E263D]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(featuredProjects || []).length > 0 ? (
            featuredProjects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-[#E8D2D6]">
              <p className="text-sm font-bold text-[#111111]">No featured projects found.</p>
              <Link
                href="/projects"
                className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full luxury-button-accent text-xs font-bold"
              >
                Browse Catalog <ArrowRight className="h-4 w-4 text-[#111111]" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 7. COMPREHENSIVE VIVA PACKAGE GUARANTEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E8D2D6] shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111]/70 block mb-2 font-bold">
              VERIFIED ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-[#111111] leading-tight mb-6">
              Complete Viva Submission & Defense Deliverables
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#E8E5DC] flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center text-[#111111] shrink-0">
                  <Download className="h-5 w-5 text-[#6E263D]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111111] text-sm font-heading">Tested Source Code (ZIP)</h4>
                  <p className="text-xs text-[#111111]/80 mt-1 font-medium leading-relaxed">
                    Modular, documented codebases with requirements.txt or package.json configurations.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#E8E5DC] flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center text-[#111111] shrink-0">
                  <FileText className="h-5 w-5 text-[#6E263D]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111111] text-sm font-heading">IEEE Project Report (.docx & PDF)</h4>
                  <p className="text-xs text-[#111111]/80 mt-1 font-medium leading-relaxed">
                    40-60 page formatted report with abstract, data flow, architecture diagrams, and references.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#E8E5DC] flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center text-[#111111] shrink-0">
                  <Award className="h-5 w-5 text-[#6E263D]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111111] text-sm font-heading">Seminar Viva Presentation (.pptx)</h4>
                  <p className="text-xs text-[#111111]/80 mt-1 font-medium leading-relaxed">
                    Structured 15-20 slide presentation decks designed for university external viva examiners.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7F5EF] border border-[#E8E5DC] flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center text-[#111111] shrink-0">
                  <Video className="h-5 w-5 text-[#6E263D]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#111111] text-sm font-heading">Execution Video & Setup Guide</h4>
                  <p className="text-xs text-[#111111]/80 mt-1 font-medium leading-relaxed">
                    Detailed runtime walkthrough and environment setup guide for seamless execution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SOPHISTICATED BURGUNDY & IVORY CALL-TO-ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-white via-[#F4E8E8] to-[#E8D2D6] text-center relative overflow-hidden border-2 border-[#E8D2D6] shadow-xl">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8D2D6] text-[#111111] text-xs font-mono font-bold shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#6E263D]" />
              <span>BESPOKE R&D CONSULTING</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#111111] tracking-tight">
              Have an idea?
            </h2>

            <p className="text-base sm:text-xl text-[#111111] font-bold leading-relaxed">
              Let&apos;s engineer something extraordinary.
            </p>

            <p className="text-xs sm:text-sm text-[#111111]/80 font-medium max-w-lg mx-auto">
              Our engineering mentors work with you to develop custom algorithms, specific IEEE base papers, and production stacks tailored to your semester requirements.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/custom-request"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#F7F5EF] text-[#111111] font-black text-xs sm:text-sm flex items-center justify-center gap-2 border-2 border-[#6E263D] shadow-md transition-all"
              >
                <span>Submit Custom Order</span>
                <ArrowRight className="h-4 w-4 text-[#111111]" />
              </Link>

              <a
                href="https://wa.me/917382324346?text=Hi%20VECNEX%20Engineering!%20I%20have%20a%20custom%20project%20idea%20I%20want%20to%20engineer."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#E8D2D6] hover:bg-[#F4E8E8] text-[#111111] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#6E263D]/40 transition-all shadow-xs"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366] fill-[#25D366]" />
                <span>Chat with Mentor on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
