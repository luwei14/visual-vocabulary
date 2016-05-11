
function makeChart(data,stylename,media,plotpadding,legAlign,yAlign){

    var titleYoffset = d3.select("#"+media+"Title").node().getBBox().height
    var subtitleYoffset=d3.select("#"+media+"Subtitle").node().getBBox().height;

    // return the series names from the first row of the spreadsheet
    var seriesNames = Object.keys(data[0]).filter(function(d){ return d != 'date'; });
    //Select the plot space in the frame from which to take measurements
    var frame=d3.select("#"+media+"chart")
    var plot=d3.select("#"+media+"plot")

    var yOffset=d3.select("#"+media+"Subtitle").style("font-size");
    yOffset=Number(yOffset.replace(/[^\d.-]/g, ''));
    
    //Get the width,height and the marginins unique to this chart
    var w=plot.node().getBBox().width;
    var h=plot.node().getBBox().height;
    var margin=plotpadding.filter(function(d){
        return (d.name === media);
      });

    margin=margin[0].margin[0]
    var colours=stylename.linecolours;
    var plotWidth = w-(margin.left+margin.right);
    var plotHeight = h-(margin.top+margin.bottom);
    var outerRadius


    // console.log(plotWidth,colours,plotHeight,data)
    // console.log(margin)
    //you now have a chart area, inner margin data and colour palette - with titles pre-rendered

    // plot.append("rect")
        // .attr("x",margin.left)
        // .attr("y",margin.top)
        // .attr("width",plotWidth)
        // .attr("height",plotHeight)
        // .attr("fill",colours[0])
     

    var radius = Math.min(plotWidth, plotHeight) / 3;
    var color = d3.scale.ordinal()
        .range(["#AF516C","#EFB1AF","#D7706C","#76ACB8","#81D0E6","#4E86B6", "#B8B1A9"]);

    var plot = d3.select("#"+ media + "arc")
        .data(data)
        .enter()
        .append("g")
        .attr(function innerRadius(data) {
                      return x.innerRadius
                    })

        .attr(function outerRadius(data) {
                      return x.outerRadius
                    }) 

        function padRadius(innerRadius, outerRadius) {
                      return Math.sqrt(innerRadius * innerRadius + outerRadius * outerRadius);
                    }

        function startAngle(data) {
                      return data.startAngle;
                    }
        function endAngle(d) {
                      return data.endAngle;
                    }
        function padAngle(d) {
                      return data.padAngle;
                    }



        // .startAngle(0);
        // .endAngle(0);
 




      
    
    

}