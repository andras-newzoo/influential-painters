
const updateSvg  = ( svg, height, width, margin) => {

  svg.attr('height', height).attr('width', width)

  const chartWidth = width - margin.left - margin.right,
        chartHeight =  height - margin.top - margin.bottom

  return { chartWidth, chartHeight }

},
appendArea = (
  area,
  className,
  left,
  top
) => {
  area.append('g')
    .attr('class', className)
    .attr('transform', `translate(${left}, ${top})`)
},
appendTitle = (
  area, className, x, y, text
) => {

  area.append('text')
        .attr('class', className)
        .attr('x', x)
        .attr('y', y)
        .attr('fill', '#33332D')
        .text(text)
        .attr('text-anchor', 'middle')
        .attr('font-size', '1rem')

},
moveTitle = (
    area, className, x
) => {
  area.select(`.${className}`).attr('x', x)
},
createUpdateXAxis = (
  axis, axisCall
) => {

  axis.transition().duration(1500).call(axisCall)
  axis.selectAll('.tick line').remove()

},
createUpdateYAxis = (
  axis, axisCall
) => {

  axis.call(axisCall).selectAll('.domain').remove()
  axis.selectAll('.domain').remove()
},
appendAxisText = (
  area, xScale, year, up, down
) => {

  area.append('line')
      .attr('stroke', '#cccccc')
      .attr('x1', xScale(year))
      .attr('x2', xScale(year))
      .attr('y1', up)
      .attr('y2', down)
      .attr('opacity', 0.5)

  area.append('text')
      .attr('fill', '#cccccc')
      .attr('x', xScale(year))
      .attr('y', up - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '.9rem')
      .text(year)

}

export { updateSvg, appendArea, appendTitle, moveTitle, createUpdateYAxis, createUpdateXAxis, appendAxisText}
