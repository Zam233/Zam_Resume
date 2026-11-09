import { Icon } from './icons';
import { Rich } from './Rich';
import type { Education, Experience, Project } from '../types';

export function EducationSection({ education }: { education: Education[] }) {
  return (
    <section className="sec" id="education" aria-labelledby="education-title">
      <div className="sec__head">
        <span className="sec__index">01</span>
        <h2 className="sec__title" id="education-title">
          教育经历
        </h2>
        <span className="sec__latin">Education</span>
      </div>

      {education.map((entry) => (
        <article className="edu" key={entry.school + entry.period}>
          <div className="edu__when">
            {entry.current && <span className="edu__pill">在读</span>}
            <span>{entry.period}</span>
          </div>

          <div>
            <h3 className="edu__school">
              <Rich>{entry.school}</Rich>
            </h3>

            <p className="edu__degree">
              <span>{entry.degree}</span>
              {entry.major ? (
                <>
                  <span className="dot" aria-hidden="true" />
                  <span>{entry.major}</span>
                </>
              ) : null}
              {entry.gpa ? (
                <span className="edu__gpa">
                  GPA <b>{entry.gpa}</b>
                </span>
              ) : null}
            </p>

            <ul className="notes">
              {entry.items.map((item, index) => (
                <li key={`${item.kind}-${index}`} data-kind={item.kind}>
                  <Rich>{item.text}</Rich>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section className="sec" id="experience" aria-labelledby="experience-title">
      <div className="sec__head">
        <span className="sec__index">02</span>
        <h2 className="sec__title" id="experience-title">
          工作经历
        </h2>
        <span className="sec__latin">Experience</span>
      </div>

      {experience.map((job) => (
        <article className="job" key={job.company + job.period}>
          <div className="job__top">
            <div>
              <h3 className="job__company">
                <Rich>{job.company}</Rich>
              </h3>
              <p className="job__role">{job.role}</p>
            </div>
            <span className="job__period">{job.period}</span>
          </div>

          <ul className="job__list">
            {job.bullets.map((bullet, index) => (
              <li key={index}>
                <Rich>{bullet}</Rich>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className="sec" id="projects" aria-labelledby="projects-title">
      <div className="sec__head">
        <span className="sec__index">03</span>
        <h2 className="sec__title" id="projects-title">
          项目经历
        </h2>
        <span className="sec__latin">Projects</span>
      </div>

      {projects.map((project) => (
        <article className="proj" key={project.title}>
          <div className="proj__head">
            <h3 className="proj__title">
              <Rich>{project.title}</Rich>
            </h3>
            {project.subtitle ? <span className="proj__sub">{project.subtitle}</span> : null}
          </div>

          <p className="proj__summary">
            <Rich>{project.summary}</Rich>
          </p>

          {project.pipeline?.length ? (
            <ol className="pipeline" aria-label="智能体协作链路">
              {project.pipeline.map((step, index) => (
                <li className="pipeline__item" key={step}>
                  <span className="pipeline__step">{step}</span>
                  {index < project.pipeline!.length - 1 ? (
                    <Icon name="arrow" size={12} className="pipeline__arrow" />
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}

          <div className="proj__foot">
            {project.tags?.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
            {project.link ? (
              <a className="proj__link" href={project.link} target="_blank" rel="noreferrer noopener">
                <Icon name="external" size={13} />
                {project.linkLabel ?? project.link}
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </section>
  );
}
