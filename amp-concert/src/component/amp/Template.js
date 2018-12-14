import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import styled, {
  withTheme,
  StyleSheetManager,
  ThemeProvider,
} from 'styled-components';

const StyledComponent = styled(() => null)({}).render().type;
const StyleSheetConsumer = new StyledComponent({}).render().type;

/**
 * Component for wrapping `template` used by AMP. There are special affordances
 * in here to deal with `styled-components`. Basically this works by rendering
 * the markup of its children to use as a template, but before doing so ensures
 * that the correct theme context is passed down from the current element into
 * the newly rendered tree. Other contexts will have to similarly be passed down
 * if they are needed.
 * https://www.ampproject.org/docs/reference/components/amp-mustache
 */
const Template = withTheme(({children, theme, ...rest}) => {
  return (
    <StyleSheetConsumer>
      {(sheet) => {
        const markup = ReactDOMServer.renderToStaticMarkup(
          <StyleSheetManager sheet={sheet}>
            <ThemeProvider theme={theme}>
              <React.Fragment>{children}</React.Fragment>
            </ThemeProvider>
          </StyleSheetManager>,
        );
        return (
          <template
            type="amp-mustache"
            dangerouslySetInnerHTML={{__html: markup}}
            {...rest}
          />
        );
      }}
    </StyleSheetConsumer>
  );
});

/**
 * Create a replaced template token. This is handy because `react` does not
 * like dealing with {} literals.
 * @param {String} id Name of token.
 * @returns {React.Element} String.
 */
Template.Token = ({id}) => `{{${id}}}`;

/**
 * Shorthand for a moustache if block.
 * @param {String} id Name of token to check against.
 * @param {React.Node} children Content to display if `id` evals to true.
 * @returns {React.Element} String.
 */
Template.If = ({children, id}) => (
  <React.Fragment>
    <Template.Token id={`#${id}`} />
    {children}
    <Template.Token id={`/${id}`} />
  </React.Fragment>
);

/**
 * Shorthand for a moustache else block.
 * @param {String} id Name of token to check against.
 * @param {React.Node} children Content to display if `id` evals to false.
 * @returns {React.Element} String.
 */
Template.Else = ({children, id}) => (
  <React.Fragment>
    <Template.Token id={`^${id}`} />
    {children}
    <Template.Token id={`/${id}`} />
  </React.Fragment>
);

Template.Loop = Template.If;

export default Template;
