import type { Profile } from '../types';
import { Icon } from './icons';
import { Rich } from './Rich';

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="hero" id="overview" aria-labelledby="hero-name">
      <div className="hero__main">
        <p className="eyebrow">
          <span>简历</span>
          <span className="eyebrow__rule" aria-hidden="true" />
          <span className="eyebrow__latin">Curriculum Vitae</span>
        </p>

        <h1 className="name" id="hero-name">
          {profile.name}
          <span className="name__latin">{profile.latin}</span>
        </h1>

        <p className="hero__meta">
          <span>{profile.age} 岁</span>
          <span className="dot" aria-hidden="true" />
          <span>{profile.status}</span>
        </p>

        <p className="hero__meta hero__meta--pin">
          <Icon name="pin" size={15} />
          <span>{profile.address}</span>
        </p>

        <div className="hero__fields">
          {profile.fields.map((field) => (
            <s-chip key={field} type="outlined">
              {field}
            </s-chip>
          ))}
        </div>

        <p className="hero__summary">
          <Rich>{profile.summary}</Rich>
        </p>
      </div>

      <div className="hero__aside">
        <div className="portrait-wrap">
          <div className="portrait">
            <img src={profile.portrait} alt={`${profile.name}的肖像`} width={156} height={156} />
          </div>
        </div>
        <span className="hero__caption">上海 · Shanghai</span>
      </div>
    </section>
  );
}
