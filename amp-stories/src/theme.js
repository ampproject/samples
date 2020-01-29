/**
 * Theme
 * Color names from http://chir.ag/projects/name-that-color/
 *
 * Usage:
 *
 *  const Item = styled.div`color: ${({theme}) => theme.colors.purpleHeart};`;
 */
const theme = {
  colors: {
    white: '#fff',
    black: '#000',
    teal: '#A1DFE1',
    green: '#78A768',
    pink: '#FFE1DD',
    rose: '#FF005B',
    yellow: '#FFF5DD',
    orange: '#F79932',
    violet: '#B9BEF3',
    purple: '#230545',

    // Story Colors
    storiesRed: '#F34E4E',
    storiesPink: '#FFEFEF',
    storiesOrange: '#FFA12E',
    storiesBkOrange: '#FFF8E9',
    storiesBlue: '#4F79FF',
    storiesBkBlue: '#EDF0FF',
    storiesLightBlue: '#4BC3FF',
    storiesBkLightBlue: '#EBF8FF',
    storiesLolliPink: '#FF4F89',
    storiesBkLolliPink: '#FFECF2',
    storiesGreen: '#84C641',
    storiesBkGreen: '#F2FBED',
  },
  fonts: {
    logo: 'Abril Fatface',
    body: 'Roboto',
  },
};

export default theme;
