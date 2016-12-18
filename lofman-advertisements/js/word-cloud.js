const translateCenter = (x,y) => "translate("+ x/2 + "," + y/2 + ")"

const wordCloud = (words) => {
    d3.select("#d3-word-cloud")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", translateCenter(layout.size()[0],layout.size()[1]))
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"  })
        .style("font-family", "Roboto")
        .style("fill", "#333333")
        .attr("text-anchor", "middle")
        .attr("transform", (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
          .text(function(d) { return d.text  })
}

const layout = d3.layout.cloud()
    .rotate(0)
    .words([
      "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this"]
      .map((d) => { return ({text: d, size: 10 + Math.random() * 90, test: "haha"})})
    )
    .on("end", wordCloud)

layout.start()
