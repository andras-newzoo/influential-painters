import React, { Component } from 'react';
import './App.css';

import data from './data/data.json'
import colors from './data/colors.js'
import title from './img/title.png'

import { select} from 'd3-selection'

import SecondaryChartContainer from './components/SecondaryChart/SecondaryChartContainer'
import MainChart from './components/MainChart/MainChart'
import Information from './components/Information/Information'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      painter : 'none' ,
      colorPicker: 1,
      metric: 'none',
      metricKey: 'none',
      secondaryChartMetric: ['none'],
    }
  }

  colorPickerFunction(){
    let color = Math.floor(Math.random() * colors.length)
    return color
  }

  handleMainChartClick = (d) => {
      let colorPicker = this.colorPickerFunction(),
          painterMetrics = []

      painterMetrics.push(d.age)
      painterMetrics.push(d.movement)
      painterMetrics.push(d.nationality)
      painterMetrics.push(d.paintings)

      this.setState(() => ({
            painter: d.id,
            metric: 'none',
            metricKey: 'none',
            colorPicker: colorPicker,
            secondaryChartMetric: painterMetrics}))
      //console.log(this.state)
  }

  handleSecondaryChartClick = (d, i, n) => {
      let colorPicker = this.colorPickerFunction(),
          metricKey = select(n[i]).attr('class')

      this.setState(() => ({
            metric: d.key,
            metricKey: metricKey,
            colorPicker: colorPicker,
            painter: 'none',
            secondaryChartMetric: [d.key]}))
  }

  formatData(raw){
    raw.forEach(d => {
      d.id = d.name.toLowerCase().replace(/[ -]/g,"")
      d.years = d.end - d.start
    })
    return raw
  }



  render() {
    const { painter, colorPicker, metric, metricKey, secondaryChartMetric } = this.state,
          color = colors[colorPicker]

    this.formatData(data)
    data.sort((a,b) => a.start - b.start)
    //console.log(secondaryChartMetric)

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
            metric = {metric}
            metricKey = {metricKey}
          />
        </div>
        <div id="header-container">
          <img id='title-img' src={title} alt="Title - Who Gave Colour to Our History"></img>
        </div>
        <div id="text-container">
        </div>
        <div id="secondary-chart-container">
            <SecondaryChartContainer


              handleClick = {this.handleSecondaryChartClick}

              color = {color}
              metric = {[...secondaryChartMetric]}

            />
        </div>
        <div id="credit-container">
        </div>
        <div id="information-container">
          { painter === 'none' ? <div></div> : <Information
            painter = {painter}
          />}
        </div>
      </div>
    );
  }
}

export default App;
