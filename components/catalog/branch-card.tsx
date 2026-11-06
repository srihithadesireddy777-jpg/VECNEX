'use client';

import Link from 'next/link';
import { BranchInfo } from '@/lib/constants';
import { ArrowRight, Code, Server, Brain, Cpu, Database } from 'lucide-react';

interface BranchCardProps {
  branch: BranchInfo;
}

export default function BranchCard({ branch }: BranchCardProps) {
  const getBranchIcon = (id: string) => {
    switch (id) {
      case 'CSE':
        return <Code className="h-5 w-5 text-[#6E263D]" />;
      case 'IT':
        return <Server className="h-5 w-5 text-[#6E263D]" />;
      case 'AI_DS':
        return <Brain className="h-5 w-5 text-[#6E263D]" />;
      case 'AIML':
        return <Cpu className="h-5 w-5 text-[#6E263D]" />;
      case 'CSE_DS':
        return <Database className="h-5 w-5 text-[#6E263D]" />;
      default:
        return <Code className="h-5 w-5 text-[#6E263D]" />;
    }
  };

  return (
    <Link
      href={`/branches/${branch.id}`}
      className="group p-6 rounded-2xl bg-white border border-[#E8E5DC] hover:border-[#E8D2D6] shadow-sm hover:shadow-xl hover:shadow-[#6E263D]/5 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-[#F4E8E8] border border-[#E8D2D6] group-hover:border-[#6E263D]/40 transition-colors">
            {getBranchIcon(branch.id)}
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#F7F5EF] border border-[#E8E5DC] text-[#111111]">
            {branch.name}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold font-heading text-[#111111] group-hover:text-[#6E263D] transition-colors">
          {branch.fullName}
        </h3>
        <p className="mt-2 text-xs font-medium leading-relaxed line-clamp-3 text-[#111111]/80">
          {branch.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[#E8E5DC] flex items-center justify-between text-xs font-bold text-[#111111] group-hover:text-[#6E263D]">
        <span>Explore {branch.name} Projects</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform text-[#6E263D]" />
      </div>
    </Link>
  );
}
