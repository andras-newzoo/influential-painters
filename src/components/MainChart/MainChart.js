import React, { Component } from 'react';
import './MainChart.css';

import { scaleBand, scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import 'd3-transition'

import { updateSvg, appendArea, appendAxisText } from '../chartFunctions'

class MainChart extends Component {


  componentDidMount(){
    this.initVis()
  }


  componentDidUpdate(prevProps){
    //
    // console.log(this.props.painterHighlight)
    // console.log(prevProps.painterHighlight)

    if(this.props.reset){
      this.resetColors()
    } else if (this.props.color !== prevProps.color
              || this.props.painterHighlight !== prevProps.painterHighlight
              || this.props.metricKey !== 'none'){

        if (this.props.metric === 'none'){
          this.higlightPainter()
        }

        if (this.props.metric !== 'none'){
              this.higlightGroup()
        }
    }
  }


  initVis(){

    const svg = select(this.node),
          { data, width, height, margin , darkcolor, basecolor} = this.props,
          { chartWidth, chartHeight } = updateSvg(svg, height, width, margin)

    // console.log(chartWidth)

    appendArea(svg, 'main-chart-area', 0, 0)

    this.chartArea = svg.select('.main-chart-area')

    this.xScale = scaleLinear().range([0, chartWidth]).domain([1265, 1990])
    this.widthScale = scaleLinear().range([0, chartWidth]).domain([0, 725])
    this.yScale = scaleBand().range([chartHeight, 0]).domain(data.map(d => d.name)).padding(.1)

    const rects = this.chartArea.selectAll('.main-chart-rects').data(data),
          texts = this.chartArea.selectAll('.main-chart-text').data(data)

    appendAxisText(this.chartArea, this.xScale, 1800, 380, 720)
    appendAxisText(this.chartArea, this.xScale, 1900, 15, 720)
    appendAxisText(this.chartArea, this.xScale, 1700, 460, 720)
    appendAxisText(this.chartArea, this.xScale, 1600, 460, 720)
    appendAxisText(this.chartArea, this.xScale, 1500, 550, 720)
    appendAxisText(this.chartArea, this.xScale, 1400, 650, 720)
    appendAxisText(this.chartArea, this.xScale, 1300, 680, 720)

    rects.enter()
        .append('rect')
        .attr('class',d => `main-chart-rects` )
        .attr('x', d => this.xScale(d.start))
        .attr('y', d => this.yScale(d.name))
        .attr('width', d => this.widthScale(d.years))
        .attr('height', this.yScale.bandwidth())
        .attr('fill', darkcolor)
        .attr('rx', 7)
        .on('click', this.props.handleClick)

    texts.enter()
        .append('text')
        .attr('class',d => `main-chart-text` )
        .attr('x', d => this.xScale(d.start) +  this.widthScale(d.years/2))
        .attr('y', d => this.yScale(d.name) + this.yScale.bandwidth()/2)
        .attr('dy', 3)
        .attr('fill', '#fff')
        .attr('text-anchor', 'middle')
        .text(d => d.shortName)

        select('.domain').attr('stroke', darkcolor)

  }

  higlightPainter(){

    const { painterHighlight, transition, basecolor, color } = this.props
    // console.log(painterHighlight)
    this.chartArea.selectAll('.main-chart-rects')
          .transition('painter-highlight')
          .duration(transition.short)
          .attr('fill', d => painterHighlight === d.id ? color : basecolor )


    select('.domain').transition('painter-highlight')
    .duration(transition.short).style('stroke', basecolor)
  }

  higlightGroup(){

    const { transition, basecolor, color, metric, metricKey } = this.props

    this.chartArea.selectAll('.main-chart-rects')
          .transition('group-highlight')
          .duration(transition.short)
          .attr('fill', d => metric === d[metricKey] ? color : basecolor )

    select('.domain').transition('group-highlight')
    .duration(transition.short).style('stroke', basecolor)
  }

  resetColors(){
    const { transition, darkcolor } = this.props

    this.chartArea.selectAll('.main-chart-rects')
          .transition('reset')
          .duration(transition.short)
          .attr('fill', darkcolor )

    select('.domain').style('stroke', darkcolor)
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
    basecolor: '#cccccc',
    darkcolor: '#333333',
    margin :{
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    }

}

export default MainChart;
