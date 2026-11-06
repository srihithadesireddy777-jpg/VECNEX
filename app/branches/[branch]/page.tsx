export const instant = false;

import { notFound } from 'next/navigation';
import { BRANCHES, DEMO_PROJECTS } from '@/lib/constants';
import { EngineeringBranch } from '@/lib/types';
import { normalizeProjects } from '@/lib/utils/project';
import ProjectCard from '@/components/catalog/project-card';
import BranchCard from '@/components/catalog/branch-card';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export async function generateStaticParams() {
  return BRANCHES.map((branch) => ({
    branch: branch.id,
  }));
}

export default async function BranchPage({
  params,
}: {
  params: Promise<{ branch: string }>;
}) {
  const { branch } = await params;
  const branchUpper = branch.toUpperCase() as EngineeringBranch;
  const branchInfo = BRANCHES.find((b) => b.id === branchUpper);

  if (!branchInfo) {
    notFound();
  }

  const supabase = await createClient();
  let branchProjects: any[] = [];
  try {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('branch', branchUpper)
      .eq('is_published', true);
    const dbProjects = data && data.length > 0 ? normalizeProjects(data) : [];
    const dbSlugs = new Set(dbProjects.map((p) => p.slug));
    const demoBranchProjects = normalizeProjects(DEMO_PROJECTS).filter(
      (p) => p.branch === branchUpper && !dbSlugs.has(p.slug)
    );
    branchProjects = [...dbProjects, ...demoBranchProjects];
  } catch (err) {
    console.warn('Failed to load branch projects:', err);
    branchProjects = normalizeProjects(DEMO_PROJECTS).filter((p) => p.branch === branchUpper);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-[#111111] bg-[#F7F5EF]">
      {/* Branch Banner Header */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#E8D2D6] shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4E8E8] border border-[#E8D2D6] text-[#111111] text-xs font-mono font-bold shadow-xs">
            <Compass className="h-3.5 w-3.5 text-[#6E263D]" />
            <span>{branchInfo.fullName}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-[#111111] tracking-tight">
            {branchInfo.name} Engineering Projects
          </h1>

          <p className="text-xs sm:text-sm text-[#111111]/85 leading-relaxed font-medium">
            {branchInfo.description}
          </p>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-heading text-[#111111]">
            Available {branchInfo.name} Packages ({branchProjects.length})
          </h2>
          <Link
            href="/projects"
            className="text-xs font-mono text-[#111111] hover:text-[#6E263D] transition-colors flex items-center gap-1 font-bold"
          >
            <span>All Disciplines</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#6E263D]" />
          </Link>
        </div>

        {branchProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branchProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8D2D6]">
            <p className="text-[#111111] text-sm font-bold">
              More {branchInfo.fullName} projects coming soon! Contact support for custom project development.
            </p>
          </div>
        )}
      </div>

      {/* Other Branches Grid */}
      <div className="pt-8 border-t border-[#E8E5DC] space-y-6">
        <h3 className="text-lg font-bold font-heading text-[#111111]">Explore Other Disciplines</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRANCHES.filter((b) => b.id !== branchUpper)
            .slice(0, 4)
            .map((b) => (
              <BranchCard key={b.id} branch={b} />
            ))}
        </div>
      </div>
    </div>
  );
}
