import styled from 'styled-components';
import {rem} from 'polished';
import {TextHighlightBanner as CommonBanner} from '/component/base/TextHighlight';

export const TextHighlightBanner = styled(CommonBanner).attrs({
  color: 'storiesBkLolliPink',
  backgroundColor: 'storiesLolliPink',
})``;

export const TextHighlightBannerLg = styled(CommonBanner).attrs({
  color: 'storiesBkLolliPink',
  backgroundColor: 'storiesLolliPink',
})`
  font-size: ${rem(55)};
`;

export const TextLg = styled.div`
  font-size: ${rem(55)};
  font-weight: 700;
  color: ${({theme}) => theme.colors.storiesLolliPink};
`;

export const Button = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  &:active,
  &:hover,
  &:link,
  &:visited,
  & {
    color: ${({inverted, theme}) =>
      inverted ? theme.colors.white : theme.colors.storiesLolliPink};
    font-weight: 700;
  }

  font-size: ${rem(16)};
  background-color: ${({inverted, theme}) =>
    inverted ? theme.colors.storiesLolliPink : 'transparent'};
  border: 2px solid ${({theme}) => theme.colors.storiesLolliPink};
  height: 54px;
`;
