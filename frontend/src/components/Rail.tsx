import type { ReactNode } from 'react';
import type { Resume } from '../types';
import { Icon } from './icons';
import { Rich } from './Rich';

type PanelProps = {
  label: string;
  count: string;
  id?: string;
  children: ReactNode;
};

function Panel({ label, count, id, children }: PanelProps) {
  return (
    <s-card type="outlined" id={id}>
      <div className="panel__inner">
        <p className="panel__label">
          <span>{label}</span>
          <span className="panel__count">{count}</span>
        </p>
        {children}
      </div>
    </s-card>
  );
}

export function Rail({ resume }: { resume: Resume }) {
  return (
    <aside className="rail" id="skills" aria-label="技能、证书与账号">
      <Panel label="技能" count={`${resume.skills.length} 项`}>
        <div className="chips">
          {resume.skills.map((skill) => (
            <s-chip key={skill.name} type="filled">
              {skill.name}
            </s-chip>
          ))}
        </div>
      </Panel>

      <Panel label="持有证书" count={`${resume.certificates.length} 项`}>
        <ul className="rows">
          {resume.certificates.map((certificate) => (
            <li className="row" key={certificate}>
              <Icon name="check" size={15} className="row__ico" />
              <span className="row__main">
                <span className="row__title">{certificate}</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel label="使用的 AI Agent" count={`${resume.aiAgents.length} 个`}>
        <div className="agent-grid">
          {resume.aiAgents.map((agent) => (
            <span className="agent" key={agent}>
              <span className="agent__dot" aria-hidden="true" />
              {agent}
            </span>
          ))}
        </div>
      </Panel>

      <Panel label="个人账号" count={`${resume.accounts.length} 个`} id="accounts">
        <ul className="rows">
          {resume.accounts.map((account) => {
            const body = (
              <>
                <span className="row__main">
                  <span className="row__title">{account.platform}</span>
                  <span className="row__sub">
                    {account.handle}
                    {account.note ? ` · ${account.note}` : ''}
                  </span>
                </span>
                <span className="row__value">{account.followers}</span>
                {account.url ? <Icon name="external" size={12} className="row__ext" /> : null}
              </>
            );

            return (
              <li key={account.platform}>
                {account.url ? (
                  <a
                    className="row row--link"
                    href={account.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={account.url}
                    aria-label={`在新标签页打开 ${account.platform}：${account.handle}（${account.followers}）`}
                  >
                    {body}
                  </a>
                ) : (
                  <div className="row">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>

      <Panel label="其他项目" count={`${resume.otherProjects.length} 项`}>
        <ul className="mono-list">
          {resume.otherProjects.map((item) => (
            <li key={`${item.time}-${item.text}`}>
              <time>{item.time}</time>
              <span>
                <Rich>{item.text}</Rich>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </aside>
  );
}
