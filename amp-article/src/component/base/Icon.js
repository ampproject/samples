import * as React from 'react';
import * as Icons from 'react-feather';

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
Object.keys(Icons).forEach((icon) => {
  iconMap[kebabCase(icon)] = Icons[icon];
});

class Icon extends React.Component {
  render() {
    const {name, ...rest} = this.props;
    const FeatherIcon = iconMap[name];
    if (!FeatherIcon) {
      return null;
    }
    return <FeatherIcon {...rest} />;
  }
}

export default Icon;
