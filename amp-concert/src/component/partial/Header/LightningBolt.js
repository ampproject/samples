import * as React from 'react';

class LightningBolt extends React.Component {
  render() {
    return (
      <svg
        width="38px"
        height="59px"
        viewBox="0 0 38 59"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <path
            d="M21.5442061,9.34074429 L2.92832442,12.6347976 C1.84065163,12.8272597 1.11493999,13.8650141 1.30740211,14.9526869 C1.35246038,15.2073274 1.44647357,15.4508132 1.58423508,15.6696597 L10.8263433,30.3515768 C11.4147786,31.2863589 11.134009,32.5211706 10.1992268,33.1096059 C10.0014228,33.2341215 9.78332354,33.3230004 9.55483024,33.3722079 L4.58968846,34.4414838 C3.50987521,34.6740287 2.82302847,35.7379051 3.05557334,36.8177184 C3.12989505,37.1628284 3.2942391,37.4821176 3.53190957,37.743149 L21.0919294,57.0291654 C21.8355755,57.8459054 23.1005184,57.9051597 23.9172584,57.1615136 C24.4248994,56.6993038 24.659987,56.0090208 24.5399719,55.3330521 L21.9614446,40.8098459 C21.7710842,39.7376667 22.4734801,38.7102328 23.5416286,38.4984219 L27.1874286,37.7754696 C28.2709014,37.5606199 28.9750596,36.5081215 28.7602098,35.4246486 C28.759972,35.423449 28.759733,35.4222495 28.7594929,35.4210503 L23.8537738,10.9175319 C23.640372,9.85161377 22.6146474,9.15133127 21.5442061,9.34074429 Z"
            id="path-1"
          />
          <filter
            x="-23.1%"
            y="-12.6%"
            width="169.9%"
            height="132.4%"
            filterUnits="objectBoundingBox"
            id="filter-2"
          >
            <feOffset
              dx="3"
              dy="4"
              in="SourceAlpha"
              result="shadowOffsetOuter1"
            />
            <feGaussianBlur
              stdDeviation="3"
              in="shadowOffsetOuter1"
              result="shadowBlurOuter1"
            />
            <feColorMatrix
              values="0 0 0 0 1   0 0 0 0 0   0 0 0 0 0.337254902  0 0 0 0.12 0"
              type="matrix"
              in="shadowBlurOuter1"
            />
          </filter>
          <filter
            x="-14.5%"
            y="-7.9%"
            width="152.7%"
            height="123.0%"
            filterUnits="objectBoundingBox"
            id="filter-3"
          >
            <feGaussianBlur
              stdDeviation="1"
              in="SourceAlpha"
              result="shadowBlurInner1"
            />
            <feOffset
              dx="3"
              dy="3"
              in="shadowBlurInner1"
              result="shadowOffsetInner1"
            />
            <feComposite
              in="shadowOffsetInner1"
              in2="SourceAlpha"
              operator="arithmetic"
              k2="-1"
              k3="1"
              result="shadowInnerInner1"
            />
            <feColorMatrix
              values="0 0 0 0 0.556919227   0 0 0 0 0.454016817   0 0 0 0 0.837239583  0 0 0 1 0"
              type="matrix"
              in="shadowInnerInner1"
            />
          </filter>
        </defs>
        <g
          id="Symbols"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Header_Olga"
            transform="translate(1.000000, -8.000000)"
            fillRule="nonzero"
          >
            <g id="Group-5">
              <g id="Path-2">
                <use
                  fill="black"
                  fillOpacity="1"
                  filter="url(#filter-2)"
                  xlinkHref="#path-1"
                />
                <use fill="#4C2F9B" xlinkHref="#path-1" />
                <use
                  fill="black"
                  fillOpacity="1"
                  filter="url(#filter-3)"
                  xlinkHref="#path-1"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default LightningBolt;
