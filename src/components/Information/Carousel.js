import React, { Component } from 'react';

import Slider from "react-slick";

class Carousel extends Component {
  constructor(props){
    super(props)
    this.state = {
      empty: false
    }
  }


  componentDidUpdate(prevProps){

    const { painter } = this.props,
          { empty } =this.state
    // console.log(prevProps.painter)

    if(prevProps.painter === undefined){
      this.setState(() => ({empty: true}))
    } else if (prevProps.painter !== painter){
      this.setState(() => ({empty: false}))
    }

    if(!empty && painter !== undefined){
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
         <div key={`${painter}1`} className='image-holder'>
           <img className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}1.jpg`)} />
         </div>
         <div key={`${painter}2`} className='image-holder'>
            <img className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}2.jpg`)} />
         </div>
         <div key={`${painter}3`} className='image-holder'>
            <img className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}3.jpg`)} />
         </div>
         <div key={`${painter}4`} className='image-holder'>
            <img className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}4.jpg`)} />
         </div>
         <div key={`${painter}5`} className='image-holder'>
            <img className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}5.jpg`)} />
         </div>
         <div key={`${painter}6`} className='image-holder'>
            <img className='carouselImage' alt={`${painter}`} src={require(`../../data/pics/${painter}/${painter}6.jpg`)} />
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
               speed: 500,
               autoplay: false
             };

    return (
      <div id='carousel-container'>
        {empty ? this.newImages(settings, painter) : this.emptyDiv()}
      </div>
        )

  }
}

export default Carousel;
