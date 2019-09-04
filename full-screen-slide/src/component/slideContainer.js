import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {getWholeCssProperty,getClientHeight} from '../assets/js/utils.js';
import './index.less';

class SlideContainer extends Component {
    constructor(props) {
        super(props);
        //当前索引
        this.currPageIndex = 0;
        this.totalPage = 0;
        this.slideContainer = React.createRef();
        this.slideTime = this.props.transformTime || 0.6;
        this.doAfterSlide = this.doAfterSlide.bind(this);
    }

    componentDidMount() {
        this.container = this.slideContainer.current;
        setTimeout(() =>{
            this.viewHeight = getClientHeight();
            this.totalPage = parseInt(this.container.getBoundingClientRect().height / this.viewHeight);
        },20)

        this.transformProperty = getWholeCssProperty('transform');
        this.transitionProperty = getWholeCssProperty('transition');
        this.container.style[this.transformProperty] = 'translate3d(0,0,0)';
        this.addSlideEvent();
    }

    render() {
        return (
            <div className="slide-container" ref={this.slideContainer}>
                {this.props.children}
            </div>
        );
    }

    touchstart(e) {
        const touches = e.touches[0];
        this.startX = touches.pageX;
        this.startY = touches.pageY;
    }
    
    touchmove(e) {
        e.preventDefault();
    }
    
    touchend(e) {
        const changedTouches = e.changedTouches[0];
        const endX = changedTouches.pageX;
        const endY = changedTouches.pageY;
        const slideDiffX = endX - this.startX;
        const slideDiffY = endY - this.startY;
        if(slideDiffY === 0) { //非滑动
            return
        }
        if(Math.abs(slideDiffX) > Math.abs(slideDiffY)) { //水平滑动
            return; 
        }
        if(Math.abs(slideDiffY) < 100) { //垂直滑动较小距离
            return;
        }
        if(endY - this.startY < 0) { //上滑
            this.goDown();
            return;
        }
        this.goUp();
    }

    //往下滚动
    goUp() {
        let transformY = this.getTranslateY();
        if(transformY < 0) {
            this.setTranslateY(transformY + this.viewHeight);
            this.currPageIndex--;
            if(this.currPageIndex < 0) {
                this.currPageIndex = 0;
            }
            this.doAfterSlide();
        }
    }

    //往上滚动
    goDown() {
        let {height} = this.container.getBoundingClientRect();
        let transformY = this.getTranslateY();
        if(height + transformY > this.viewHeight) {
            this.setTranslateY(transformY - this.viewHeight);
            this.currPageIndex++;
            if(this.currPageIndex >= this.totalPage) {
                this.currPageIndex--;
            }
            this.doAfterSlide();
        }
    }

    doAfterSlide() {
        if(this.slideTimer) {
            clearTimeout(this.slideTimer);
        }
        this.slideTimer = setTimeout(() => {
            this.props.onAfterSlide(this.currPageIndex);
        },this.slide)
    }
    
    setTranslateY(offSetY) {
        this.container.style[this.transformProperty] = `translate3d(0,${offSetY}px,0)`;
        this.container.style[this.transitionProperty] = `all ${this.slideTime}s`;
    }

    getTranslateY() {
        let transformY = +this.container.style[this.transformProperty].split(',')[1].trim().slice(0,-2);
        if(transformY === 0) {
            this.currPageIndex = 0;
        }
        return transformY;
    }

    addSlideEvent() {
        this.container.addEventListener('touchstart',(e) =>{
            this.touchstart(e);
        },false);
        this.container.addEventListener('touchmove',(e) =>{
            this.touchmove(e);
        },false);
        this.container.addEventListener('touchend',(e) =>{
            this.touchend(e);
        },false)
    }
}

SlideContainer.propTypes = {
    transformTime: PropTypes.number,
    onAfterSlide: PropTypes.func
}



export default SlideContainer