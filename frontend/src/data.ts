import raw from '../../backend/data/resume.json';
import type { Resume } from './types';

/**
 * The résumé JSON is baked into the bundle at build time — no runtime API, so
 * the built `dist/` is pure static files and runs anywhere (GitHub Pages,
 * object storage, a USB stick).
 *
 * `backend/data/resume.json` stays the single source of truth: edit it, then
 * rebuild. In `npm run dev` Vite watches the file and hot-reloads.
 */
export const resume = raw as unknown as Resume;

/**
 * Asset references inside the JSON may be written either absolute
 * (`/assets/portrait.png`) or relative (`./assets/portrait.png`). The static
 * build is base-relative, so absolute ones are rewritten to `./` here — that
 * keeps the file easy to hand-edit without breaking a GitHub Pages subpath.
 */
if (resume.profile.portrait.startsWith('/assets/')) {
  resume.profile.portrait = `.${resume.profile.portrait}`;
}
