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

    if (prevProps.metri !== this.props.metric){
      this.highlightGroup()
    }


  }


  initVis(){
    //
    const svg = select(this.node),
          { chartClass, height, width, margin, basecolor, metric, color} = this.props,
          { yKey, yDomain, xMax} = this.props,
          { chartWidth, chartHeight } = updateSvg(svg, height, width, margin),
          nested = nest().key(d => d[yKey]).entries(data).filter(d => yDomain.includes(d.key))

    // console.log(width, height)
    //console.log(nested)

    appendArea(svg, `${chartClass}-chart-area`, margin.left, margin.top)

    this.chartArea = select(`.${chartClass}-chart-area`)

    const yScale = scaleBand().range([chartHeight, 0]).domain(yDomain).paddingInner(.2).paddingOuter(.1),
          xScale = scaleLinear().range([0, chartWidth]).domain([0, xMax])

    // console.log(metric)

    const rects = this.chartArea.selectAll(`.${yKey}`).data(nested)

    rects.enter()
        .append('rect')
        .attr('class',d => `${yKey}` )
        .attr('x', xScale(0))
        .attr('y', d => yScale(d.key))
        .attr('width', d => xScale(d.values.length))
        .attr('height', yScale.bandwidth())
        .attr('fill', d => metric.includes(d.key) ? color : basecolor)
        .on('click', this.props.handleClick)

    appendArea(svg, `${chartClass}-y-axis y-axis`, margin.left, margin.top)
    svg.select(`.${chartClass}-y-axis`).call(axisRight(yScale).tickSizeOuter(0).tickSizeInner(2)).selectAll('.tick line').remove()

  }

  highlightGroup(){
      const { yKey, transition, color, basecolor, metric } = this.props

      this.chartArea.selectAll(`.${yKey}`)
          .transition('higlightGroup')
          .duration(transition.short)
          .attr('fill', d => metric.includes(d.key) ? color : basecolor)

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
    basecolor: '#cccccc',
    margin :{
      top: 0,
      right: 0,
      bottom: 0,
      left: 8
    }

}

export default SecondaryChart;
