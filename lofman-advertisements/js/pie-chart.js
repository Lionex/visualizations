// (Int, Int) -> String
const translate = R.curry((x,y) => {
    return "translate(" + x + "," + y + ")"
})

// [{label:String, count:Int}]
const dataset =
    [ { label: 'Abulia'    , count: 10 }
    , { label: 'Betelgeuse', count: 20 }
    , { label: 'Cantaloupe', count: 30 }
    , { label: 'Dijkstra'  , count: 40 }
    ]

const sortData = R.sortBy(R.prop('count'))

const width  = d3.select("#d3-pie-chart").node()
    .parentNode
    .getBoundingClientRect()
    .width
const height = Math.max(width/3, 256)

const radius = 0.9*Math.min(width, height)/2

const color = "#a82c5d"
const transparency = d3.scaleLinear()
    .domain([0,dataset.length])
    .range([0.2,1])

var pieCharts = d3.select("#d3-pie-chart")
    .attr("width", width)
    .attr("height", height)
    .append('g')
    .attr('transform', translate(width/2,height/2))

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

const pie = d3.pie()
    .value((d) => d.count)
    .sort(null)

var path = pieCharts.selectAll("path")
    .data(pie(sortData(dataset)))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', color)
    .attr('opacity', (d,i) => transparency(i))
