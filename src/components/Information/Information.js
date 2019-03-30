import React, { Component } from 'react';

import Carousel from './Carousel'



class Information extends Component {



  render(){
    const { painter } = this.props


    return(
      <div>
        <Carousel
          painter = {painter}
        />
        
      </div>
    )
  }
}

export default Information
