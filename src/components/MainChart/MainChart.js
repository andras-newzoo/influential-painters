import React, { Component } from 'react';
import './MainChart.css';

import { scaleBand, scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import 'd3-transition'

import { updateSvg, appendArea } from '../chartFunctions'

class MainChart extends Component {


  componentDidMount(){
    this.initVis()
  }


  componentDidUpdate(prevProps){


    if (prevProps.painterHighlight !== this.props.painterHighlight){
      // console.log(this.props.painterHighlight)
      this.higlightPainter()
    }

  }


  initVis(){

    const svg = select(this.node),
          { data, width, height, margin, transition , basecolor} = this.props,
          { long } = transition,
          { chartWidth, chartHeight } = updateSvg(svg, height, width, margin)

    // console.log(chartWidth)

    appendArea(svg, 'main-chart-area', 0, 0)

    this.chartArea = svg.select('.main-chart-area')

    this.xScale = scaleLinear().range([0, chartWidth]).domain([1265, 1990])
    this.widthScale = scaleLinear().range([0, chartWidth]).domain([0, 725])
    this.yScale = scaleBand().range([chartHeight, 0]).domain(data.map(d => d.name)).padding(.1)

    const rects = this.chartArea.selectAll('.main-chart-rects').data(data),
          texts = this.chartArea.selectAll('.main-chart-text').data(data)

    rects.enter()
        .append('rect')
        .attr('class',d => `main-chart-rects` )
        .attr('x', d => this.xScale(d.start))
        .attr('y', d => this.yScale(d.name))
        .attr('width', d => this.widthScale(d.age))
        .attr('height', this.yScale.bandwidth())
        .attr('fill', basecolor)
        .attr('rx', 7)
        .on('click', this.props.handleClick)

    texts.enter()
        .append('text')
        .attr('class',d => `main-chart-text` )
        .attr('x', d => this.xScale(d.start) +  this.widthScale(d.age/2))
        .attr('y', d => this.yScale(d.name) + this.yScale.bandwidth()/2)
        .attr('dy', 3)
        .attr('fill', '#fff')
        .attr('text-anchor', 'middle')
        .text(d => d.shortName)



  }

  higlightPainter(){

    const { painterHighlight, transition, basecolor, color } = this.props

    this.chartArea.selectAll('.main-chart-rects')
          .transition('painter-higlight')
          .duration(transition.short)
          .attr('fill', d => painterHighlight === d.id ? color : basecolor )



  }

  render() {
    return (
        <svg ref={node => this.node = node}/>
    );
  }
}

MainChart.defaultProps = {
    transition: {
      long: 1000,
      short: 300
    },
    basecolor: '#444444',
    margin :{
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }

}

export default MainChart;
