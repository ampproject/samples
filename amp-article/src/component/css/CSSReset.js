import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  a,
abbr,
address,
article,
aside,
audio,
b,
big,
blockquote,
body,
canvas,
caption,
cite,
code,
del,
details,
div,
em,
figcaption,
figure,
footer,
h1,
h2,
h3,
h4,
h5,
h6,
header,
html,
i,
iframe,
img,
label,
legend,
li,
mark,
menu,
nav,
ol,
p,
pre,
section,
small,
span,
strong,
sub,
summary,
sup,
time,
tr,
u,
ul,
var,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}

article,
aside,
canvas,
figcaption,
figure,
footer,
header,
main,
output,
section {
  display: block;
}

button {
  appearance: none;
  background: none;
  border-color: currentColor;
  border-style: none;
  border-width: medium;
  border-radius: 0;
  margin: 0;
  padding: 0;
  color: inherit;
  font-style: inherit;
  font-variant: inherit;
  font-weight: inherit;
  font-stretch: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  vertical-align: baseline;
}

body {
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
  &::before, &::after {
    content: "";
    display: none;
  }
}

a:link {
  text-decoration: none;
}
a:link, a:visited, a:hover, a:active {
  color: inherit;
}

*, *:before, *:after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
}

html, body, * {
  font-family: Roboto;
}

body {
  background: #000;
}

:focus {
  outline: none;
}
`;
