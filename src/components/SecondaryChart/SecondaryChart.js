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

    if (prevProps.painterHighlight !== this.props.painterHighlight){
      // console.log(this.props.painterHighlight)
      this.higlightPainter()
    }

  }


  initVis(){
    //
    const svg = select(this.node),
          { chartClass, height, width, transition, margin, basecolor} = this.props,
          { yKey, yDomain, xMax} = this.props,
          { long } = transition,
          { chartWidth, chartHeight } = updateSvg(svg, height, width, margin),
          nested = nest().key(d => d[yKey]).entries(data).filter(d => yDomain.includes(d.key))
    
    // console.log(width, height)
    //console.log(nested)

    appendArea(svg, `${chartClass}-chart-area`, margin.left, margin.top)
    appendArea(svg, `${chartClass}-y-axis y-axis`, margin.left, margin.top)

    this.chartArea = select(`.${chartClass}-chart-area`)

    const yScale = scaleBand().range([chartHeight, 0]).domain(yDomain).paddingInner(.2).paddingOuter(.1),
          xScale = scaleLinear().range([0, chartWidth]).domain([0, xMax])

    //console.log(xScale.domain())
    svg.select(`.${chartClass}-y-axis`).call(axisRight(yScale).tickSizeOuter(0).tickSizeInner(2)).selectAll('.tick line').remove()

    const rects = this.chartArea.selectAll(`.${chartClass}-chart-rects`).data(nested)

    rects.enter()
        .append('rect')
        .attr('class',d => `${chartClass}-chart-rects` )
        .attr('x', xScale(0))
        .attr('y', d => yScale(d.key))
        .attr('width', 0)
        .attr('height', yScale.bandwidth())
        .attr('fill', basecolor)
        .on('click', this.props.handleClick)
            .merge(rects)
            .transition('rects-in')
            .duration(long)
            .attr('width', d => xScale(d.values.length))



  }

  componentRerender(prevProps){

  }

  higlightPainter(){

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
    basecolor: '#444444',
    margin :{
      top: 0,
      right: 0,
      bottom: 0,
      left: 8
    }

}

export default SecondaryChart;
