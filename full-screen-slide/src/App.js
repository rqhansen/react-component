import React from 'react';
import {SlideContainer,SlidePage} from './component/index';
import './App.css';

function App() {
  //currIndex 当前屏的索引
  function afterSlide(currIndex) {
    console.log(currIndex);
  }
  return (
    <div className="app">
      <SlideContainer onAfterSlide={afterSlide}>
          <SlidePage>
            第一屏
          </SlidePage>
          <SlidePage>
            第二屏
          </SlidePage>
          <SlidePage>
            第三屏
          </SlidePage>
      </SlideContainer>
    </div>
  );
}

export default App;
