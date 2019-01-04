import * as React from 'react';
import styled from 'styled-components';

const AmpSocialShare = styled(
  ({className, hideFor: _h, outline: _o, ...rest}) => {
    return <amp-social-share class={className} {...rest} />;
  },
)`
  ${({hideFor}) => (hideFor ? hideFor`display: none;` : '')};
  ${({outline}) =>
    outline
      ? 'background-color: transparent; border: 1px solid #000; filter: invert(100%);'
      : 'background-color: #fff;'};
  border-radius: 100em;
  padding: 10px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.12);
  transition: opacity 0.1s ease-out, transform 0.25s ease-out;
  background-size: 20px;
  cursor: pointer;
`;

AmpSocialShare.Twitter = styled((props) => {
  return <AmpSocialShare type="twitter" {...props} />;
})`
  background-image: url('/static/icons/twitter@2x.png');
`;

AmpSocialShare.Facebook = styled((props) => {
  return (
    <AmpSocialShare
      type="facebook"
      data-param-app_id="254325784911610"
      {...props}
    />
  );
})`
  background-image: url('/static/icons/facebook@2x.png');
`;

AmpSocialShare.Email = styled((props) => {
  return <AmpSocialShare type="email" {...props} />;
})`
  background-image: url('/static/icons/mail.svg');
`;

export default AmpSocialShare;
