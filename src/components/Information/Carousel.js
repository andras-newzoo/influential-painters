import React, { Component } from 'react';

import Slider from "react-slick";

class Carousel extends Component {
  constructor(props){
    super(props)
    this.state = {
      empty: true
    }
  }

  componentDidUpdate(prevProps, prevState){

    const { painter } = this.props,
          { empty } =this.state

    if(prevProps.painter !== painter && empty === true){
      this.setState(() => ({empty: false}))
    } else if (prevProps.painter === painter && empty === false){
      this.setState(() => ({empty: true}))
    }

  }

  emptyDiv(){

    return (
      <div>
      </div>
    )
  }

  newImages(settings, painter){

    return (
      <Slider {...settings}>
         <div className='image-holder'>
           <img key={`${painter}1`} className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}1.jpg`)} />
         </div>
         <div className='image-holder'>
            <img key={`${painter}2`} className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}2.jpg`)} />
         </div>
         <div  className='image-holder'>
            <img key={`${painter}3`} className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}3.jpg`)} />
         </div>
         <div  className='image-holder'>
            <img key={`${painter}4`} className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}4.jpg`)} />
         </div>
         <div className='image-holder'>
            <img key={`${painter}5`} className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}5.jpg`)} />
         </div>
         <div className='image-holder'>
            <img key={`${painter}6`} className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}6.jpg`)} />
         </div>
       </Slider>
    )

  }

  render() {
    const { painter } = this.props,
          { empty } = this.state,
            settings = {
               dots: true,
               infinite: true,
               arrows: false,
               speed: 500,
               autoplay: true,
               autoplaySpeed: 8000,
             };

    return (
      <div id='carousel-container'>
        {empty ? this.newImages(settings, painter) : this.emptyDiv()}
      </div>
        )

  }
}

export default Carousel;
