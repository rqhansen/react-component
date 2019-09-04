import React,{Component} from 'react';
import './index.less';
import {getClientHeight} from '../assets/js/utils';

class SlidePage extends Component {

    constructor(props) {
        super(props);
        this.slidePage = React.createRef();
        this.getPageHeight = this.getPageHeight.bind(this);
    }

    getPageHeight() {
        const slidePage = this.slidePage.current;
        if(this.setHeightTimer) {
            clearTimeout(this.setHeightTimer);
        }
        this.setHeightTimer = setTimeout(() => {
            slidePage.style.height = `${getClientHeight()}px`;
        },20)
    }

    componentDidMount() {
        this.getPageHeight();
    }

    componentWillUnmount() {
        if(this.setHeightTimer) {
            clearTimeout(this.setHeightTimer);
        }
    }
    render() {
        return (
            <div className="slide-page" ref={this.slidePage}>
                {this.props.children}
            </div>
        );
    }
}

export default SlidePage