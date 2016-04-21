function slopeChart(){
    var yScale = d3.scaleLinear();
    var xScale = d3.scalePoint();
    var dotRadius = 5;
    var leftLabel = function(){ return ''; };
    var rightLabel = function(){ return ''; };
    var classer = function(){ return 'slope' }

    function chart(parent, data){
        parent.selectAll('g')
                .data(data)
            .enter()
                .append('g')
                .attr('class',classer)
                .each(function(datum){
                    var group = d3.select(this);

                    //lines
                    var lineSegments = xScale.domain().reduce(function(previousValue, currentValue, currentIndex, array){
                        if(currentIndex>0){
                            previousValue.push({
                                start:array[currentIndex-1],
                                end:currentValue
                            });
                        }
                        return previousValue;
                    }, []);

                    group.selectAll('line')
                        .data(lineSegments)
                            .enter()
                        .append('line')
                            .attr('x1', function(d){
                                return xScale(d.start);
                            })
                            .attr('x2', function(d){
                                return xScale(d.end);
                            })
                            .attr('y1', function(d){
                                return yScale(datum[d.start]);
                            })
                            .attr('y2', function(d){
                                return yScale(datum[d.end]);
                            });
                    //dots
                    if(dotRadius > 0){
                        group.selectAll('circle')
                            .data(xScale.domain())
                                .enter()
                             .append('circle')
                                .attr('r',dotRadius)
                                .attr('cx',function(d){
                                    return xScale(d)
                                })
                                .attr('cy',function(d){
                                    return yScale(datum[d])
                                });
                    }
                    //labels
                    group.selectAll('text')
                        .data(xScale.domain())
                            .enter()
                        .append('text')
                            .attr('class',function(d, i){
                                if(i==0){
                                    return 'start label';
                                }
                                if(i==xScale.domain().length-1){
                                    return 'end label';
                                }
                                return 'label';
                            })
                            .attr('x',function(d){
                                return xScale(d);
                            })
                            .attr('y',function(d){
                                return yScale(datum[d]);
                            })
                            .text(function(d,i){
                                if(i == 0) return leftLabel(datum);
                                if(i == xScale.domain().length-1) return rightLabel(datum);
                                return datum[d];
                            })
//                        console.log(datum);
                })
    }

    chart.classer = function(accessor){
        classer = accessor;
        return chart;
    }

    chart.dotRadius = function(r){
        if(isNaN(r)) return dotRadius;
        dotRadius = r;
        return chart;
    }

    chart.xScale = function(scale){
        if(!scale) return xScale;
        xScale = scale;
        return chart;
    }

    chart.yScale = function(scale){
        if(!scale) return yScale;
        yScale = scale;
        return chart;
    }

    chart.leftLabel = function(accessor){
        if(!accessor) return leftLabel;
        leftLabel = accessor;
        return chart;
    }

    chart.rightLabel = function(accessor){
        if(!accessor) return rightLabel;
        rightLabel = accessor;
        return chart;
    }

    chart.slopeColour = function(accessor){
        if(!accessor) return slopeColour;
        slopeColour = accessor;
        return chart;
    }

    return chart;
}