import type { SectionId, SectionMeta } from './types';

export const SECTIONS: SectionMeta[] = [
  { id: 'overview', label: '概览', latin: 'Overview', short: '概览' },
  { id: 'education', label: '教育经历', latin: 'Education', short: '教育' },
  { id: 'experience', label: '工作经历', latin: 'Experience', short: '工作' },
  { id: 'projects', label: '项目经历', latin: 'Projects', short: '项目' },
  { id: 'skills', label: '技能、证书与账号', latin: 'Skills', short: '技能' },
  { id: 'accounts', label: '账号与其他项目', latin: 'Accounts', short: '账号' },
];

const RAIL_SECTIONS = new Set<SectionId>(['skills', 'accounts']);

/**
 * On wide screens the skills/accounts panels live in a side column that is
 * always on screen next to the reading column, so they are content rather than
 * navigation targets there. Narrow screens stack that column below the text and
 * therefore get the full list.
 */
export const BACKBONE_SECTIONS: SectionMeta[] = SECTIONS.filter(
  (section) => !RAIL_SECTIONS.has(section.id),
);
