import React, { Component } from 'react';
import './SecondaryChart.css';

import { scaleBand, scaleLinear } from 'd3-scale'
import { axisRight } from 'd3-axis'
import { select } from 'd3-selection'
import { nest } from 'd3-collection'
import 'd3-transition'


import data from '../../data/data.json'

import { updateSvg, appendArea } from '../chartFunctions'

class SecondaryChart extends Component {


  componentDidMount(){

    this.initVis()

  }


  componentDidUpdate(prevProps){

    // console.log(this.props.reset)
    if(this.props.reset){
      this.resetColors()
    } else if (prevProps.metric !== this.props.metric){
      this.highlightGroup()
    }


  }


  initVis(){
    //
    const svg = select(this.node),
          { chartClass, height, width, margin, darkcolor, basecolor, metric, color, reset} = this.props,
          { yKey, yDomain, xMax} = this.props,
          { chartWidth, chartHeight } = updateSvg(svg, height, width, margin),
          nested = nest().key(d => d[yKey]).entries(data).filter(d => yDomain.includes(d.key)),
          othercolor = color === undefined ? darkcolor : basecolor


    appendArea(svg, `${chartClass}-chart-area`, margin.left, margin.top)

    this.chartArea = select(`.${chartClass}-chart-area`)

    const yScale = scaleBand().range([chartHeight, 0]).domain(yDomain).paddingInner(.2).paddingOuter(.1),
          xScale = scaleLinear().range([0, chartWidth]).domain([0, xMax])


    const rects = this.chartArea.selectAll(`.${yKey}`).data(nested)

    rects.enter()
        .append('rect')
        .attr('class',d => `${yKey}` )
        .attr('x', xScale(0))
        .attr('y', d => yScale(d.key))
        .attr('width', d => xScale(d.values.length))
        .attr('height', yScale.bandwidth())
        .attr('fill', d => metric.includes(d.key) ? color : othercolor)
        .on('click', this.props.handleClick)




    appendArea(svg, `${chartClass}-y-axis y-axis`, margin.left, margin.top)
    svg.select(`.${chartClass}-y-axis`).call(axisRight(yScale).tickSizeOuter(0).tickSizeInner(2)).selectAll('.tick line').remove()
    select(`.${chartClass}-y-axis`).select('.domain').attr('stroke', othercolor)
  }

  highlightGroup(){
      const { yKey, transition, color, basecolor,darkcolor, metric } = this.props

      this.chartArea.selectAll(`.${yKey}`)
          .transition('higlightGroup')
          .duration(transition.short)
          .attr('fill', d => metric.includes(d.key) ? color : basecolor)

    select('#reset-button').style('background', darkcolor)

  }

  resetColors(){
      const { yKey, transition, darkcolor, basecolor } = this.props

      this.chartArea.selectAll(`.${yKey}`)
          .transition('reset')
          .duration(transition.short)
          .attr('fill', darkcolor)

    select('#reset-button').style('background', basecolor)
  }

  render() {
    return (
        <svg className={`${this.props.chartClass}-chart`} ref={node => this.node = node}/>
    );
  }
}

SecondaryChart.defaultProps = {
    transition: {
      long: 1000,
      short: 300
    },
    basecolor: '#cccccc',
    darkcolor: '#333333',
    margin :{
      top: 0,
      right: 0,
      bottom: 0,
      left: 8
    }

}

export default SecondaryChart;
