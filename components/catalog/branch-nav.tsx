'use client';

import Link from 'next/link';
import { BRANCHES } from '@/lib/constants';
import { EngineeringBranch } from '@/lib/types';

interface BranchNavProps {
  activeBranch?: EngineeringBranch | 'ALL';
}

export default function BranchNav({ activeBranch = 'ALL' }: BranchNavProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
      <Link
        href="/projects"
        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
          activeBranch === 'ALL'
            ? 'bg-[#E8D2D6] text-[#111111] border-2 border-[#6E263D] shadow-sm'
            : 'bg-white text-[#111111] hover:bg-[#F4E8E8] border border-[#E8E5DC]'
        }`}
      >
        All Disciplines
      </Link>

      {BRANCHES.map((branch) => {
        const isActive = activeBranch === branch.id;
        return (
          <Link
            key={branch.id}
            href={`/branches/${branch.id}`}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-[#E8D2D6] text-[#111111] border-2 border-[#6E263D] shadow-sm'
                : 'bg-white text-[#111111] hover:bg-[#F4E8E8] border border-[#E8E5DC]'
            }`}
          >
            {branch.name}
          </Link>
        );
      })}
    </div>
  );
}
