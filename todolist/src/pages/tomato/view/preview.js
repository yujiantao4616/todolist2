// 番茄鐘介紹 輪播圖 
import React from 'react';
import { Carousel, Icon } from 'antd';

const Slider = props => {
  return <div style={{height:'516px',backgroundColor:props.bagc?'#5b92ba':'#fff',position:'relative'}} className="slider">
      <img src={require(`../../public/image/tomato${props.imgIndex}`)} alt="tupian" style={{maxHeight:'516px'}}/>
  </div>
}

class PreView extends React.Component {
  constructor(){
    super()
    this.state = {
      currentPage:1
    }
  }
  slideLeft = () =>{
    this.setState({
      currentPage:this.state.currentPage === 1 ? 1 : this.state.currentPage - 1
    })
    this.refs.slider.slick.slickPrev()
  }
  slideRight = () => {
    this.setState({
      currentPage:this.state.currentPage === 4 ? 4 : this.state.currentPage + 1
    })
    this.refs.slider.slick.slickNext()
  }
  render (){
    return <div><Carousel dots={false} ref='slider'>
              <div>
                <Slider imgIndex={'1.jpg'} bagc={true}/>
              </div>
              <div>
                <Slider imgIndex={'2.jpg'}/>
              </div>
              <div><Slider imgIndex={'3.jpg'}/></div>
              <div><Slider imgIndex={'4.gif'}/></div>
            </Carousel>
            <div className="arrow left" onClick={this.slideLeft} style={{display:this.state.currentPage === 1?'none':'block'}}><Icon type="left" /></div>
            <div className="arrow right" onClick={this.slideRight} style={{display:this.state.currentPage === 4?'none':'block'}}><Icon type="right" /></div>
            <div className="arrow right" onClick={this.props.hidePreview} style={{display:this.state.currentPage === 4?'block':'none'}}><Icon type="right" /></div>
          </div>
  }
}

export default PreView;