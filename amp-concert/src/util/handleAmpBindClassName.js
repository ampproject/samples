/**
 * This is a cheat code to allow `styled-components` to behave closer to the way
 * you'd expect them to in react. e.g. if you have a component that looks like
 * const Foo = styled.div` ... `; and then use <Foo className='hi'/> you would
 * expect the result to still be styled with the correct styled-components
 * class as well. Since react isn't managing the page we have to make extra
 * concessions for when `amp-bind` is jiggering with the class name. Alas.
 * @param {Object} props React-like props
 * @returns {Object} Hijacked props.
 */
const handleAmpBindClassName = (props) => {
  const newProps = {...props};
  const [injectedClassName] = /sc-.*/.exec(props.className);
  if (newProps['data-amp-bind-class']) {
    newProps['data-amp-bind-class'] = `(${
      newProps['data-amp-bind-class']
    }) + " ${injectedClassName}"`;
  }
  return newProps;
};

export default handleAmpBindClassName;
