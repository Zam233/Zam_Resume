import { useEffect, useRef } from 'react';
import { Icon } from './icons';
import type { SectionId, SectionMeta } from '../types';
import type { IconName } from './icons';

type ValueElement = HTMLElement & { value?: string };

const NAV_ICONS: Record<SectionId, IconName> = {
  overview: 'home',
  education: 'school',
  experience: 'briefcase',
  projects: 'layers',
  skills: 'grid',
  accounts: 'user',
};

type Props = {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  sections: SectionMeta[];
};

export function BottomNav({ active, onSelect, sections }: Props) {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const nav = navRef.current as ValueElement | null;
    if (nav && nav.value !== active) nav.value = active;
  }, [active]);

  useEffect(() => {
    const nav = navRef.current as ValueElement | null;
    if (!nav) return;
    const handler = () => {
      if (nav.value) onSelect(nav.value as SectionId);
    };
    nav.addEventListener('change', handler);
    return () => nav.removeEventListener('change', handler);
  }, [onSelect]);

  return (
    <div className="bottom-nav">
      <nav aria-label="章节导航（移动端）">
        <s-navigation ref={navRef} mode="bottom">
          {sections.map((section) => (
            <s-navigation-item key={section.id} value={section.id}>
              <Icon slot="icon" name={NAV_ICONS[section.id]} />
              <span slot="text">{section.short}</span>
            </s-navigation-item>
          ))}
        </s-navigation>
      </nav>
    </div>
  );
}
