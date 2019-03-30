import React, { Component } from 'react';
import './App.css';

import data from './data/data.json'
import colors from './data/colors.js'
import title from './img/title.png'

import SecondaryChartContainer from './components/SecondaryChart/SecondaryChartContainer'
import MainChart from './components/MainChart/MainChart'

import Slider from "react-slick";

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      painter : 'alfredsisley',
      colorPicker: 1,
    }
  }

  handleMainChartClick = (d) => {
      let colorPicker = Math.floor(Math.random() * colors.length)
      this.setState(() => ({
            painter: d.id,
            colorPicker: colorPicker}))
    //  console.log(this.state)

  }

  formatData(raw){
    raw.forEach(d => {
      d.id = d.name.toLowerCase().replace(/[ -]/g,"")
    })
    return raw
  }



  render() {
    const { painter, colorPicker } = this.state,
          color = colors[colorPicker],
          settings = {
             dots: true,
             infinite: true,
             speed: 500
           };

    this.formatData(data)
    data.sort((a,b) => a.start - b.start)
    // console.log(data)

    return (
      <div className="App">
        <div id="main-chart-container">
          <MainChart
            data = {data}
            width = {1400}
            height = {700}
            painterHighlight = {painter}
            handleClick = {this.handleMainChartClick}
            color = {color}
          />
        </div>
        <div id="header-container">
          <img id='title-img' src={title} alt="Title - Who Gave Colour to Our History"></img>
        </div>
        <div id="text-container">
        </div>
        <div id="secondary-chart-container">
          <SecondaryChartContainer

          />
        </div>
        <div id="credit-container">
        </div>
        <div id="information-container">
          <div id='carousel-container'>
          <Slider {...settings}>
             <div key={`${painter}1`} className='image-holder'>
               <img className='carouselImage' alt={`${painter}`} src={require(`./data/pics/${painter}/${painter}1.jpg`)} />
             </div>
             <div key={`${painter}2`} className='image-holder'>
                <img className='carouselImage' alt={`${painter}`} src={require(`./data/pics/${painter}/${painter}2.jpg`)} />
             </div>
             <div key={`${painter}3`} className='image-holder'>
                <img className='carouselImage' alt={`${painter}`} src={require(`./data/pics/${painter}/${painter}3.jpg`)} />
             </div>
             <div key={`${painter}4`} className='image-holder'>
                <img className='carouselImage' alt={`${painter}`} src={require(`./data/pics/${painter}/${painter}4.jpg`)} />
             </div>
             <div key={`${painter}5`} className='image-holder'>
                <img className='carouselImage' alt={`${painter}`} src={require(`./data/pics/${painter}/${painter}5.jpg`)} />
             </div>
             <div key={`${painter}6`} className='image-holder'>
                <img className='carouselImage' alt={`${painter}`} src={require(`./data/pics/${painter}/${painter}6.jpg`)} />
             </div>
           </Slider>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
