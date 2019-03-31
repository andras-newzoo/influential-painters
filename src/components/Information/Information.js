import React, { Component } from 'react';

import Carousel from './Carousel'



class Information extends Component {



  render(){
    const { painter, bio, name } = this.props


    return(
      <div>
        <Carousel
          painter = {painter}
        />
      <div id="description-container">
        <h2>{name}</h2>
        <p>{bio}</p>
      </div>

      </div>
    )
  }
}

export default Information
