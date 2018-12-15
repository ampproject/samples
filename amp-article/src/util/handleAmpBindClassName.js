export const handleAmpBindClassName = (props) => {
  const newProps = {...props};
  const [injectedClassName] = /sc-.*/.exec(props.className);
  if (newProps['data-amp-bind-class']) {
    newProps['data-amp-bind-class'] = `(${
      newProps['data-amp-bind-class']
    }) + " ${injectedClassName}"`;
  }
  return newProps;
};
