import React, { Component } from 'react';
import './App.css';

import data from './data/data.json'
import colors from './data/colors.js'
import title from './img/title.png'

import MainChart from './components/MainChart/MainChart'



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      painter : '',
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
      d.id = d.name.replace(/[ -]/g,"")
    })
    return raw
  }



  render() {
    const { painter, colorPicker } = this.state,
          color = colors[colorPicker]

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
          <img id='title-img' src={title}></img>
        </div>
        <div id="secondary-chart-container">
        </div>
        <div id="credit-container">
        </div>
        <div id="information-container">
        </div>
      </div>
    );
  }
}

export default App;
