import { useEffect, useRef } from 'react';
import { Glyph } from './icons';
import { useScrolled } from '../hooks';
import type { Theme } from '../hooks';
import type { SectionId, SectionMeta } from '../types';

type Props = {
  active: SectionId;
  onSelect: (id: SectionId) => void;
  theme: Theme;
  onToggleTheme: () => void;
  sections: SectionMeta[];
};

type ValueElement = HTMLElement & { value?: string };

export function TopBar({ active, onSelect, theme, onToggleTheme, sections }: Props) {
  const tabRef = useRef<HTMLElement | null>(null);
  const scrolled = useScrolled();

  // Keep the Sober tab indicator in sync with the section currently in view.
  useEffect(() => {
    const tab = tabRef.current as ValueElement | null;
    if (tab && tab.value !== active) tab.value = active;
  }, [active]);

  // `change` is a custom event dispatched by s-tab, so it is bound natively.
  useEffect(() => {
    const tab = tabRef.current as ValueElement | null;
    if (!tab) return;
    const handler = () => {
      if (tab.value) onSelect(tab.value as SectionId);
    };
    tab.addEventListener('change', handler);
    return () => tab.removeEventListener('change', handler);
  }, [onSelect]);

  return (
    <header className="topbar" data-stuck={scrolled}>
      <div className="shell topbar__inner">
        <nav className="topbar__nav" aria-label="章节导航">
          <s-tab ref={tabRef} mode="scrollable">
            {sections.map((section) => (
              <s-tab-item key={section.id} value={section.id} aria-label={section.label}>
                <span slot="text">{section.short}</span>
              </s-tab-item>
            ))}
          </s-tab>
        </nav>

        <div className="topbar__actions">
          <s-tooltip align="bottom">
            <s-icon-button slot="trigger" aria-label="打印或存为 PDF" onClick={() => window.print()}>
              <Glyph name="print" size={21} />
            </s-icon-button>
            打印 / PDF
          </s-tooltip>

          <s-tooltip align="bottom">
            <s-icon-button
              slot="trigger"
              aria-label={theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'}
              onClick={onToggleTheme}
            >
              <s-icon name={theme === 'dark' ? 'light_mode' : 'dark_mode'} />
            </s-icon-button>
            {theme === 'dark' ? '浅色' : '深色'}
          </s-tooltip>
        </div>
      </div>
    </header>
  );
}

