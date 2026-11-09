import type { Resume } from './types';

/**
 * Client-side exports.
 *
 * These used to live behind FastAPI (`/api/resume/markdown`, `/api/resume/file`).
 * Generating them in the browser keeps the site fully static: the same JSON that
 * was baked into the bundle at build time is the only input.
 */

const KIND_PREFIX: Record<string, string> = {
  thesis: '论文',
  award: '获奖',
  role: '任职',
  note: '',
};

export function toMarkdown(resume: Resume): string {
  const p = resume.profile;
  const out: string[] = [];

  out.push(`# ${p.name}`);
  out.push('');
  out.push([`${p.age} 岁`, p.status].join(' · '));
  out.push('');
  out.push(`联系地址：${p.address}`);
  out.push('');
  if (p.summary) {
    out.push(`> ${p.summary}`);
    out.push('');
  }

  out.push('## 技能');
  out.push('');
  out.push(resume.skills.map((s) => s.name).join('、'));
  out.push('');

  out.push('## 持有证书');
  out.push('');
  out.push(resume.certificates.join('、'));
  out.push('');

  out.push('## 使用的 AI Agent');
  out.push('');
  out.push(resume.aiAgents.join('、'));
  out.push('');

  out.push('## 个人账号');
  out.push('');
  for (const a of resume.accounts) {
    const note = a.note ? `（${a.note}）` : '';
    const link = a.url ? ` — ${a.url}` : '';
    out.push(`- ${a.platform} · ${a.handle} / ${a.followers}${note}${link}`);
  }
  out.push('');

  out.push('## 教育经历');
  out.push('');
  for (const e of resume.education) {
    const head = [e.school, e.degree, e.major].filter(Boolean).join(' | ');
    const gpa = e.gpa ? `　GPA ${e.gpa}` : '';
    out.push(`### ${head}${gpa}`);
    out.push('');
    out.push(e.period);
    out.push('');
    for (const item of e.items) {
      const prefix = KIND_PREFIX[item.kind] ?? '';
      out.push(`- ${prefix ? `${prefix}：` : ''}${item.text}`);
    }
    out.push('');
  }

  out.push('## 工作经历');
  out.push('');
  for (const x of resume.experience) {
    out.push(`### ${x.company} — ${x.role}`);
    out.push('');
    out.push(x.period);
    out.push('');
    for (const b of x.bullets) out.push(`- ${b}`);
    out.push('');
  }

  out.push('## 项目经历');
  out.push('');
  for (const pr of resume.projects) {
    out.push(`### ${pr.subtitle ? `${pr.title} —— ${pr.subtitle}` : pr.title}`);
    out.push('');
    out.push(pr.summary);
    out.push('');
    if (pr.pipeline?.length) {
      out.push(`链路：${pr.pipeline.join(' → ')}`);
      out.push('');
    }
    if (pr.link) {
      out.push(`链接：${pr.link}`);
      out.push('');
    }
  }

  out.push('## 其他项目');
  out.push('');
  for (const o of resume.otherProjects) {
    out.push(`- ${o.time}　${o.text}`);
  }
  out.push('');

  out.push('---');
  out.push('');
  out.push(`数据来源：${resume.meta.source}；整理于 ${resume.meta.updated}。${resume.meta.note}`);
  out.push('');

  return out.join('\n');
}

export function downloadText(filename: string, text: string, mime: string): void {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  // Safari needs the URL alive until the download starts.
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export const downloadMarkdown = (resume: Resume) =>
  downloadText('resume.md', toMarkdown(resume), 'text/markdown;charset=utf-8');

export const downloadJson = (resume: Resume) =>
  downloadText('resume.json', JSON.stringify(resume, null, 2), 'application/json;charset=utf-8');
