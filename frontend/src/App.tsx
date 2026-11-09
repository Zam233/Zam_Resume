import { useCallback, useMemo } from 'react';
import { resume } from './data';
import { useMediaQuery, useScrollSpy, useTheme } from './hooks';
import { BACKBONE_SECTIONS, SECTIONS } from './sections';
import type { SectionId } from './types';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Rail } from './components/Rail';
import { EducationSection, ExperienceSection, ProjectsSection } from './components/Sections';
import { TopBar } from './components/TopBar';

export default function App() {
  const { theme, toggle } = useTheme();
  const wide = useMediaQuery('(min-width: 1000px)');
  const navSections = wide ? BACKBONE_SECTIONS : SECTIONS;
  const navIds = useMemo(() => navSections.map((section) => section.id), [navSections]);
  const { active, go } = useScrollSpy(navIds);

  const handleSelect = useCallback((id: SectionId) => go(id), [go]);

  return (
    <s-page theme={theme}>
      <a className="skip-link" href="#education">
        跳到正文
      </a>

      <TopBar
        active={active}
        onSelect={handleSelect}
        theme={theme}
        onToggleTheme={toggle}
        sections={navSections}
      />

      <main className="shell">
        <Hero profile={resume.profile} />

        <div className="layout">
          <div className="column">
            <EducationSection education={resume.education} />
            <ExperienceSection experience={resume.experience} />
            <ProjectsSection projects={resume.projects} />
          </div>

          <Rail resume={resume} />
        </div>

        <Footer resume={resume} />
      </main>

      <div className="page-foot-space" aria-hidden="true" />
      <BottomNav active={active} onSelect={handleSelect} sections={navSections} />
    </s-page>
  );
}
