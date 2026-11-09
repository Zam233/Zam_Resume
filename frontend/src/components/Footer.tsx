import { downloadJson, downloadMarkdown } from '../export';
import type { Resume } from '../types';
import { Glyph } from './icons';

export function Footer({ resume }: { resume: Resume }) {
  return (
    <footer className="foot">
      <div className="foot__actions">
        <s-button type="text" onClick={() => downloadMarkdown(resume)}>
          <Glyph name="download" size={18} slot="start" />
          Markdown
        </s-button>
        <s-button type="text" onClick={() => downloadJson(resume)}>
          JSON
        </s-button>
      </div>
    </footer>
  );
}
