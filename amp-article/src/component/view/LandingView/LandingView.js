import * as React from 'react';
import styled from 'styled-components';

import Header from '/component/partial/Header';
import Footer from '/component/partial/Footer';
import Intro from './section/Intro';
import Education from './section/Education';
import Work from './section/Work';
import Spending from './section/Spending';
import Relationships from './section/Relationships';
import Sleep from './section/Sleep';
import Food from './section/Food';
import Comments from './section/Comments';

import FloatingButtons from '/component/base/FloatingButtons';

const Wrapper = styled.div`
  max-width: 100vw;
`;

class LandingView extends React.Component {
  render() {
    return (
      <Wrapper id="page-top">
        <Header />
        <Intro />
        <Education />
        <Work />
        <Spending />
        <Relationships />
        <Sleep />
        <Food />
        <Comments />
        <Footer />
        <FloatingButtons />
      </Wrapper>
    );
  }
}

export default LandingView;
