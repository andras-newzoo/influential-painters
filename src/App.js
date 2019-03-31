import React, { Component } from 'react';
import './App.css';

import data from './data/data.json'
import colors from './data/colors.js'
import title from './img/title.png'

import { select} from 'd3-selection'

import { Dropdown } from 'semantic-ui-react'

import SecondaryChartContainer from './components/SecondaryChart/SecondaryChartContainer'
import MainChart from './components/MainChart/MainChart'
import Information from './components/Information/Information'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      painter : 'none' ,
      name: '',
      colorPicker: 1,
      metric: 'none',
      metricKey: 'none',
      secondaryChartMetric: ['none'],
      bio: '',
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
            secondaryChartMetric: painterMetrics,
            bio: d.bio,
            name: d.name}))
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

  handleMainDropDown = (event, {value}) => {

    const d = data.filter(d => d.id === value),
          colorPicker = this.colorPickerFunction(),
          painterMetrics = []

    painterMetrics.push(d[0].age)
    painterMetrics.push(d[0].movement)
    painterMetrics.push(d[0].nationality)
    painterMetrics.push(d[0].paintings)

    this.setState(() => ({
          painter: value,
          metric: 'none',
          metricKey: 'none',
          colorPicker: colorPicker,
          secondaryChartMetric: painterMetrics,
          bio: d[0].bio,
          name: d[0].name}))
  }

  handleNationalityDropdown = (event, {value}) => {
    let colorPicker = this.colorPickerFunction()

    this.setState(() => ({
          metric: value,
          metricKey: 'nationality',
          colorPicker: colorPicker,
          painter: 'none',
          secondaryChartMetric: []}))
  }

  handleMovementDropDown = (event, {value}) => {
    let colorPicker = this.colorPickerFunction()

    this.setState(() => ({
          metric: value,
          metricKey: 'movement',
          colorPicker: colorPicker,
          painter: 'none',
          secondaryChartMetric: []}))
  }

  formatData(raw){
    raw.forEach(d => {
      d.id = d.name.toLowerCase().replace(/[ -]/g,"")
      d.years = d.end - d.start
      d.key = d.name
      d.text = d.name
      d.value = d.name.toLowerCase().replace(/[ -]/g,"")
    })
    return raw
  }



  render() {
    const { painter, colorPicker, metric, metricKey, secondaryChartMetric, bio, name } = this.state,
          color = colors[colorPicker],
          dropdownData = [...data]

    this.formatData(data)
    data.sort((a,b) => a.start - b.start)
    //console.log(secondaryChartMetric)

    dropdownData.sort((a,b) => a.key.localeCompare(b.key))

    return (
      <div className="App">
        <div id="main-chart-container">
          <MainChart
            data = {data}
            width = {1400}
            height = {720}
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
          <p>Discover the life of some of the greatest painters of the Western culture from the 13th up until  the 20th century!</p>
          <Dropdown onChange={this.handleMainDropDown}
            placeholder='Search for a painter...'
            fluid
            selection
            search
            options={dropdownData}
          />
        </div>
        <div id="secondary-chart-container">
            <SecondaryChartContainer

              handleClick = {this.handleSecondaryChartClick}

              color = {color}
              metric = {[...secondaryChartMetric]}

              handleNationalityDropDown = {this.handleNationalityDropdown}
              handleMovementDropDown = {this.handleMovementDropDown}

            />
        </div>
        <div id="credit-container">
        </div>
        <div id="information-container">
          { painter === 'none' ? <div></div> : <Information
            painter = {painter}
            bio = {bio}
            name = {name}
          />}
        </div>
      </div>
    );
  }
}

export default App;
