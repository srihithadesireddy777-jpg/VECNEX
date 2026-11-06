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
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-16 sm:pb-20 text-[#111111] bg-[#F7F5EF] relative overflow-hidden">
      
      {/* 1. CLEAN HERO SECTION */}
      <CinematicHero totalProjects={allPublished.length} />

      {/* 2. RESTRAINED ENGINEERING STANDARDS */}
      <EditorialManifesto />

      {/* 3. FEATURED PROJECTS SHOWCASE */}
      <CinematicShowcase projects={spotlightProjects} />

      {/* 4. DISCIPLINE NAVIGATION & TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E8D2D6] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading text-[#111111]">
                Engineering Disciplines
              </h2>
              <p className="text-xs text-[#111111]/75 font-normal">
                Explore project packages categorized by engineering department
              </p>
            </div>
            <Link
              href="/projects"
              className="text-xs font-mono text-[#111111] hover:text-[#6E263D] transition-colors flex items-center gap-1 font-bold self-start sm:self-auto"
            >
              <span>View All Projects ({allPublished.length})</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#6E263D]" />
            </Link>
          </div>

          <BranchNav activeBranch="ALL" />
        </div>
      </section>

      {/* 5. ACADEMIC DEPARTMENTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-[#6E263D] font-bold block mb-1">
            Academic Domains
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#111111]">
            Engineering Departments
          </h2>
          <p className="text-xs sm:text-sm text-[#111111]/75 mt-1 font-normal">
            Choose your branch to view pre-tested projects with IEEE documentation and viva slides.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {BRANCHES.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      </section>

      {/* 6. REPOSITORY CATALOG PREVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#6E263D] font-bold block mb-1">
              Popular Catalog Entries
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#111111]">
              Trending Engineering Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-[#111111] hover:text-[#6E263D] transition-colors flex items-center gap-1 font-bold self-start sm:self-auto"
          >
            <span>Full Catalog ({allPublished.length})</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#6E263D]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {(featuredProjects || []).length > 0 ? (
            featuredProjects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-[#E8D2D6]">
              <p className="text-sm font-bold text-[#111111]">No featured projects found.</p>
              <Link
                href="/projects"
                className="mt-3 inline-flex items-center gap-1.5 px-5 py-2 rounded-full luxury-button-accent text-xs font-bold"
              >
                Browse Catalog <ArrowRight className="h-3.5 w-3.5 text-[#111111]" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 7. PACKAGE DELIVERABLES BREAKDOWN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E8D2D6] shadow-xs">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6E263D] font-bold block mb-1">
              Included Deliverables
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#111111]">
              Everything Needed for Final Viva Defense
            </h2>
            <p className="text-xs sm:text-sm text-[#111111]/75 mt-1 font-normal">
              Every package comes complete with tested source code, documentation, and presentation materials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] border border-[#E8E5DC] flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center shrink-0">
                <Download className="h-4 w-4 text-[#6E263D]" />
              </div>
              <div>
                <h4 className="font-bold text-[#111111] text-xs sm:text-sm font-heading">Tested Source Code (ZIP)</h4>
                <p className="text-xs text-[#111111]/75 mt-0.5 font-normal leading-relaxed">
                  Modular codebases with configuration files, requirements.txt, and setup instructions.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] border border-[#E8E5DC] flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center shrink-0">
                <FileText className="h-4 w-4 text-[#6E263D]" />
              </div>
              <div>
                <h4 className="font-bold text-[#111111] text-xs sm:text-sm font-heading">IEEE Project Report (.docx & PDF)</h4>
                <p className="text-xs text-[#111111]/75 mt-0.5 font-normal leading-relaxed">
                  40-60 page formatted report with literature review, data flow, architecture diagrams, and references.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] border border-[#E8E5DC] flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center shrink-0">
                <Award className="h-4 w-4 text-[#6E263D]" />
              </div>
              <div>
                <h4 className="font-bold text-[#111111] text-xs sm:text-sm font-heading">Viva Presentation (.pptx)</h4>
                <p className="text-xs text-[#111111]/75 mt-0.5 font-normal leading-relaxed">
                  Structured 15-20 slide presentation decks designed for university external examiners.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F5EF] border border-[#E8E5DC] flex items-start gap-3.5">
              <div className="h-9 w-9 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center shrink-0">
                <Video className="h-4 w-4 text-[#6E263D]" />
              </div>
              <div>
                <h4 className="font-bold text-[#111111] text-xs sm:text-sm font-heading">Execution Video & Setup Guide</h4>
                <p className="text-xs text-[#111111]/75 mt-0.5 font-normal leading-relaxed">
                  Screen-recorded setup walkthrough for easy installation and error-free execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. REFINED CUSTOM R&D CALL-TO-ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E8D2D6] shadow-xs text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#6E263D] font-bold block">
              Custom Engineering Orders
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#111111] tracking-tight">
              Have a Specific Project Requirement?
            </h2>

            <p className="text-xs sm:text-sm text-[#111111]/80 font-normal leading-relaxed">
              Our engineering mentors build custom implementations based on specific IEEE base papers, unique datasets, and custom technology stacks.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/custom-request"
                className="w-full sm:w-auto px-6 py-3 rounded-full luxury-button-accent font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Request Custom Project</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#111111]" />
              </Link>

              <a
                href="https://wa.me/917382324346?text=Hi%20VECNEX%20Engineering!%20I%20have%20a%20custom%20project%20idea%20I%20want%20to%20discuss."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F4E8E8] hover:bg-[#E8D2D6] text-[#111111] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#E8D2D6] transition-colors"
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
