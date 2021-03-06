/* global describe, expect, test */
import React from 'react';
import { render } from 'react-testing-library';

import ListItemTitle from '../ListItemTitle';

describe('<ListItemTitle />', () => {
  test('should render an <p> tag', () => {
    const {
      container: { firstChild },
    } = render(<ListItemTitle />);
    expect(firstChild.tagName).toEqual('P');
  });

  test('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<ListItemTitle />);
    expect(firstChild.hasAttribute('class')).toBe(true);
  });

  test('should adopt a valid attribute', () => {
    const id = 'test';
    const {
      container: { firstChild },
    } = render(<ListItemTitle id={id} />);
    expect(firstChild.id).toEqual(id);
  });

  test('should not adopt an invalid attribute', () => {
    const {
      container: { firstChild },
    } = render(<ListItemTitle attribute="test" />);
    expect(firstChild.hasAttribute('attribute')).toBe(false);
  });
});
