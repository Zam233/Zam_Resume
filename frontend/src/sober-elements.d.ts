/**
 * Sober registers its components as custom elements at import time, so JSX has
 * no static knowledge of them. They are declared loosely here: attributes and
 * properties on `<s-*>` tags are set imperatively or read back from the element
 * instance, which keeps the third-party surface out of the typed React tree.
 */
import 'react';

type SoberElement = any;

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      's-page': SoberElement;
      's-appbar': SoberElement;
      's-avatar': SoberElement;
      's-card': SoberElement;
      's-chip': SoberElement;
      's-button': SoberElement;
      's-icon': SoberElement;
      's-icon-button': SoberElement;
      's-tab': SoberElement;
      's-tab-item': SoberElement;
      's-navigation': SoberElement;
      's-navigation-item': SoberElement;
      's-tooltip': SoberElement;
      's-divider': SoberElement;
      's-badge': SoberElement;
      's-skeleton': SoberElement;
      's-empty': SoberElement;
      's-ripple': SoberElement;
    }
  }
}
