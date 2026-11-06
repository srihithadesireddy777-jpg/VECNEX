'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BRANCHES, DEMO_PROJECTS } from '@/lib/constants';
import { EngineeringBranch, Project } from '@/lib/types';
import ProjectCard from '@/components/catalog/project-card';
import { normalizeProjects } from '@/lib/utils/project';
import { Search, SlidersHorizontal, RotateCcw, Filter, ArrowUpDown, Compass } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedBranches, setSelectedBranches] = useState<EngineeringBranch[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.from('projects').select('*').eq('is_published', true);
        const dbProjects = data && data.length > 0 ? normalizeProjects(data as Project[]) : [];
        const dbSlugs = new Set(dbProjects.map((p) => p.slug));
        const fallbackProjects = normalizeProjects(DEMO_PROJECTS).filter((p) => !dbSlugs.has(p.slug));
        setProjects([...dbProjects, ...fallbackProjects]);
      } catch (err) {
        console.warn('Failed to load database projects, using demo catalog:', err);
        setProjects(normalizeProjects(DEMO_PROJECTS));
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const toggleBranch = (branchId: EngineeringBranch) => {
    setSelectedBranches((prev) =>
      prev.includes(branchId) ? prev.filter((b) => b !== branchId) : [...prev, branchId]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedBranches([]);
    setSelectedCategory('ALL');
    setSortBy('featured');
  };

  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesSearch =
          searchQuery === '' ||
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.tech_stack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesBranch =
          selectedBranches.length === 0 || selectedBranches.includes(project.branch);

        const matchesCategory =
          selectedCategory === 'ALL' || project.category === selectedCategory;

        return matchesSearch && matchesBranch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
        if (sortBy === 'title_desc') return b.title.localeCompare(a.title);
        return 0;
      });
  }, [projects, searchQuery, selectedBranches, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-[#111111] bg-[#F7F5EF]">
      {/* Catalog Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8D2D6] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4E8E8] border border-[#E8D2D6] text-[#111111] text-[10px] font-mono uppercase tracking-widest mb-3 font-bold">
            <Compass className="h-3 w-3 text-[#6E263D]" />
            <span>REPOSITORY CATALOG</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-[#111111]">
            Engineering Projects Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#111111]/80 mt-2 font-medium">
            Verified deliverable packages with tested source code, formatted IEEE reports, and viva slides.
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-full luxury-button-accent text-xs font-bold"
        >
          <SlidersHorizontal className="h-4 w-4 text-[#111111]" />
          <span>Filters ({filteredProjects.length})</span>
        </button>
      </div>

      {/* Grid Layout: Left Sidebar + Right Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Filter Sidebar (White Luxury Card) */}
        <aside
          className={`lg:block bg-white p-6 rounded-3xl border border-[#E8D2D6] shadow-sm space-y-6 ${
            mobileFiltersOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#E8E5DC] pb-4">
            <h3 className="text-sm font-bold font-heading text-[#111111] flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#6E263D]" />
              <span>Filter Projects</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs font-mono text-[#111111]/70 hover:text-[#6E263D] flex items-center gap-1 cursor-pointer transition-colors font-bold"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#111111] block font-bold">
              Search by Keyword
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#111111]/60 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Topic, tech, branch..."
                className="w-full pl-9 pr-3 py-2 bg-[#F7F5EF] border border-[#E8E5DC] rounded-xl text-xs font-bold text-[#111111] placeholder-[#111111]/40 focus:outline-none focus:border-[#6E263D]"
              />
            </div>
          </div>

          {/* Branch Filter */}
          <div className="space-y-3 pt-4 border-t border-[#E8E5DC]">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#111111] block font-bold">
              Department
            </label>
            <div className="space-y-2">
              {BRANCHES.map((branch) => {
                const count = projects.filter((p) => p.branch === branch.id).length;
                return (
                  <label
                    key={branch.id}
                    className="flex items-center justify-between text-xs text-[#111111] font-medium cursor-pointer hover:text-[#6E263D] group"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedBranches.includes(branch.id)}
                        onChange={() => toggleBranch(branch.id)}
                        className="rounded border-[#E8D2D6] text-[#6E263D] focus:ring-0 h-4 w-4 cursor-pointer"
                      />
                      <span className="font-bold">{branch.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#111111]/60 group-hover:text-[#6E263D] font-bold">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-3 pt-4 border-t border-[#E8E5DC]">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#111111] block font-bold">
              Project Scope
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-[#111111] font-bold cursor-pointer hover:text-[#6E263D]">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'ALL'}
                  onChange={() => setSelectedCategory('ALL')}
                  className="border-[#E8D2D6] text-[#6E263D] focus:ring-0 h-4 w-4 cursor-pointer"
                />
                <span>All Projects</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-[#111111] font-bold cursor-pointer hover:text-[#6E263D]">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'MAJOR_FINAL_YEAR'}
                  onChange={() => setSelectedCategory('MAJOR_FINAL_YEAR')}
                  className="border-[#E8D2D6] text-[#6E263D] focus:ring-0 h-4 w-4 cursor-pointer"
                />
                <span>Major Final Year Projects</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-[#111111] font-bold cursor-pointer hover:text-[#6E263D]">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'MINI_PROJECT'}
                  onChange={() => setSelectedCategory('MINI_PROJECT')}
                  className="border-[#E8D2D6] text-[#6E263D] focus:ring-0 h-4 w-4 cursor-pointer"
                />
                <span>Mini Projects</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Catalog Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8D2D6] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Quick Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'ALL'
                    ? 'bg-[#E8D2D6] text-[#111111] border-2 border-[#6E263D]'
                    : 'bg-[#F7F5EF] text-[#111111] hover:bg-[#F4E8E8] border border-[#E8E5DC]'
                }`}
              >
                All Packages
              </button>
              <button
                onClick={() =>
                  setSelectedCategory(selectedCategory === 'MAJOR_FINAL_YEAR' ? 'ALL' : 'MAJOR_FINAL_YEAR')
                }
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'MAJOR_FINAL_YEAR'
                    ? 'bg-[#E8D2D6] text-[#111111] border-2 border-[#6E263D]'
                    : 'bg-[#F7F5EF] text-[#111111] hover:bg-[#F4E8E8] border border-[#E8E5DC]'
                }`}
              >
                Major Projects
              </button>
              <button
                onClick={() =>
                  setSelectedCategory(selectedCategory === 'MINI_PROJECT' ? 'ALL' : 'MINI_PROJECT')
                }
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === 'MINI_PROJECT'
                    ? 'bg-[#E8D2D6] text-[#111111] border-2 border-[#6E263D]'
                    : 'bg-[#F7F5EF] text-[#111111] hover:bg-[#F4E8E8] border border-[#E8E5DC]'
                }`}
              >
                Mini Projects
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#6E263D]" />
              <span className="text-xs font-mono text-[#111111] font-bold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F7F5EF] border border-[#E8E5DC] text-[#111111] text-xs rounded-xl font-bold p-2 focus:outline-none focus:border-[#6E263D] cursor-pointer"
              >
                <option value="featured" className="bg-white text-[#111111]">Featured Projects</option>
                <option value="title_asc" className="bg-white text-[#111111]">Title: A to Z</option>
                <option value="title_desc" className="bg-white text-[#111111]">Title: Z to A</option>
              </select>
            </div>
          </div>

          <div className="text-xs font-mono text-[#111111] flex items-center justify-between px-1 font-bold">
            <span>
              DISPLAYING <strong className="text-[#6E263D]">{filteredProjects.length}</strong> VERIFIED PACKAGES
            </span>
          </div>

          {/* Projects Cards Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#E8D2D6] space-y-4 shadow-sm">
              <p className="text-[#111111] text-sm font-bold">
                No engineering projects match the current search filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 luxury-button-accent rounded-full text-xs font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-28 text-center text-[#111111] space-y-4 bg-[#F7F5EF]">
          <div className="animate-spin h-8 w-8 border-2 border-[#6E263D] border-t-transparent rounded-full mx-auto" />
          <p className="text-xs font-mono text-[#111111] font-bold">LOADING VECNEX REPOSITORY...</p>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
