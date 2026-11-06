export const instant = false;

import { formatINR } from '@/lib/utils/currency';
import { normalizeProjects } from '@/lib/utils/project';
import { Shield, Plus, Database, TrendingUp, Layers } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { DEMO_PROJECTS } from '@/lib/constants';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  let projects: any[] = [];
  try {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data && data.length > 0) {
      projects = normalizeProjects(data);
    } else {
      projects = normalizeProjects(DEMO_PROJECTS);
    }
  } catch (err) {
    console.warn('Failed to load admin projects:', err);
    projects = normalizeProjects(DEMO_PROJECTS);
  }

  const totalRevenue = 148900;
  const totalOrders = 84;
  const totalProjects = projects?.length || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 text-[#111111]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8D2D6] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] flex items-center justify-center text-[#6E263D]">
              <Shield className="h-4 w-4" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight text-[#111111]">
              VECNEX Admin Console
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#111111]/75 mt-1 font-normal">
            Manage repository catalog, track academic inquiries & manage student deliverables.
          </p>
        </div>

        <button className="px-5 py-2.5 rounded-full luxury-button-primary text-[#111111] text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm">
          <Plus className="h-4 w-4 text-[#6E263D]" />
          <span>Upload New Project</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-[#E8D2D6] shadow-[0_10px_30px_rgba(110,38,61,0.04)] space-y-2">
          <div className="flex items-center justify-between text-[#111111]/70">
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Invoiced Value</span>
            <TrendingUp className="h-4 w-4 text-[#6E263D]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-[#111111]">
            {formatINR(totalRevenue)}
          </div>
          <span className="text-[11px] text-[#111111]/70 font-normal block">
            Direct & verified WhatsApp student packages
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8D2D6] shadow-[0_10px_30px_rgba(110,38,61,0.04)] space-y-2">
          <div className="flex items-center justify-between text-[#111111]/70">
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Completed Deliveries</span>
            <Layers className="h-4 w-4 text-[#6E263D]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-[#111111]">{totalOrders}</div>
          <span className="text-[11px] text-[#111111]/70 font-normal block">
            Verified student packages fulfilled
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8D2D6] shadow-[0_10px_30px_rgba(110,38,61,0.04)] space-y-2">
          <div className="flex items-center justify-between text-[#111111]/70">
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Catalog Repositories</span>
            <Database className="h-4 w-4 text-[#6E263D]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-[#111111]">{totalProjects}</div>
          <span className="text-[11px] text-[#111111]/70 font-normal block">
            Across 5 engineering disciplines
          </span>
        </div>
      </div>

      {/* Projects Management Table */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8D2D6] shadow-[0_10px_30px_rgba(110,38,61,0.04)] space-y-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#111111]">
            Active Catalog Projects
          </h2>
          <span className="text-xs font-mono text-[#111111]/60 font-semibold">
            Total {projects.length} Entries
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F5EF] text-[#111111]/80 uppercase tracking-widest font-mono text-[10px] border-b border-[#E8D2D6]">
              <tr>
                <th className="p-3.5 font-bold">Project Title</th>
                <th className="p-3.5 font-bold">Branch</th>
                <th className="p-3.5 font-bold">Scope</th>
                <th className="p-3.5 font-bold">Price</th>
                <th className="p-3.5 font-bold">Downloads</th>
                <th className="p-3.5 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D2D6]/60 text-[#111111] font-normal">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-[#F4E8E8]/40 transition-colors">
                  <td className="p-3.5 font-bold text-[#111111] max-w-xs truncate">
                    {project.title}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F4E8E8] border border-[#E8D2D6] text-[#111111] font-mono text-[10px] font-bold">
                      {project.branch}
                    </span>
                  </td>
                  <td className="p-3.5 text-[#111111]/70 font-mono text-[11px] font-semibold">
                    {project.category === 'MAJOR_FINAL_YEAR' ? 'Major' : 'Mini'}
                  </td>
                  <td className="p-3.5 font-bold font-mono text-[#111111]">
                    {formatINR(project.discounted_price_inr || project.price_inr)}
                  </td>
                  <td className="p-3.5 text-[#111111]/70 font-mono font-semibold">
                    {project.download_count}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F4E8E8] text-[#111111] border border-[#6E263D]/30 font-mono text-[10px] font-bold">
                      Published
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
