import * as React from 'react';
import styled from 'styled-components';
import glob from 'fast-glob';
import path from 'path';

const root = path.dirname(require.resolve('mdi-react/EmailTickIcon'));
const icons = {};
glob.sync(path.join(root, '*Icon.js')).forEach((item) => {
  icons[path.basename(item, '.js')] = require(item);
});

const kebabCase = (str) => {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\W/g, (m) => (/[À-ž]/.test(m) ? m : '-'))
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, (m) => m)
    .toLowerCase();
};

const iconMap = {};
Object.keys(icons).forEach((icon) => {
  iconMap[kebabCase(icon).replace(/-icon$/, '')] = icons[icon];
});

class Icon extends React.Component {
  render() {
    const {name, ...rest} = this.props;
    const RealIcon = iconMap[name];
    if (!RealIcon) {
      return null;
    }
    return <RealIcon {...rest} />;
  }
}

export default styled(Icon)``;
