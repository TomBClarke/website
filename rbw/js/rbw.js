// Setup

var delayStart = 5000;
var delay = 5000;
var altDelay = 50;
var fadeTime = 3000;
var us = [];
var headsOn = false;

function setup() {
    pulse(currentThread); 
    setTimeout(showMain, delayStart);
    
    $('#speedSwitch').change(function() {
        changeSpeed();
    });
    
    $('#headSwitch').change(function() {
        toggleHeads();
    });
    
    $.ajax({
        url: 'img/us/us.json',
        dataType: 'json',
        success: function (us_raw) {
            us = us_raw.us;
            // loadGraph();
        }
    });
}

// Background and UI

var currentThread = 0;

function showMain() {
    $('#title').fadeOut(fadeTime);
    $('#controlPanel').fadeIn(fadeTime);
    $('#graph').fadeIn(fadeTime);
}

function pulse(myThreadNumber) {
    if (myThreadNumber != currentThread)
        return;
    
    var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    $('body').animate( { backgroundColor: hue }, delay);
    
    setTimeout(function() { pulse(myThreadNumber); }, delay);
}

function changeSpeed() {
    var tempDelay = delay;
    delay = altDelay;
    altDelay = tempDelay;
    $('body').stop();
    currentThread++;
    pulse(currentThread);
    
    var tempSlowness = slowness;
    slowness = altSlowness;
    altSlowness = tempSlowness;
}

function toggleHeads() {
    if (headsOn) {
        $('#graph').empty();
    } else {
        loadGraph();
    }
    
    headsOn = !headsOn;
}

// D3

var nodes = [];
var force;
var height = window.innerHeight;
var width = window.innerWidth;
var radius = Math.min(height / 10, width / 10);
var circleEdgeWidth = radius / 5;
var color = d3.scale.category20b();
var pathToPics = 'img/us/';
var slowness = 5000;
var altSlowness = 100;

function loadGraph() {
    nodes = us;
    
    force = d3.layout.force().gravity(0.01).charge(-30).size([width, height]);
    var svg = d3.select('#graph').append('svg');
    force.nodes(nodes).start();
    
    var node = svg.selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'gnode');
    
    var defs = svg.append('defs').attr('id', 'imgdefs')

    us.forEach(function (i) {
        var pattern = defs.append('pattern')
            .attr('id', 'pattern-' + i.colour)
            .attr('height', 1)
            .attr('width', 1)
            .attr('x', 0)
            .attr('y', 0);
    
        pattern.append('image')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', radius * 2)
            .attr('width', radius * 2)
            .attr('xlink:href', pathToPics + i.img);
    });
    
    var circle = node.append('circle')
        .attr('class', 'node')
        .attr('r', radius)
        .attr('fill', function(d) { return 'url(#pattern-' + d.colour + ')'; })
        .style('stroke', function(d) { return d.colour; })
        .style('stroke-width', circleEdgeWidth)
        .call(force.drag);
    
    force.on('tick', tick);
}

function collide(node) {
    var r = radius + circleEdgeWidth,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;
    return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
            var x = node.x - quad.point.x,
                y = node.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = radius * 2 + circleEdgeWidth;
            if (l < r) {
                l = (l - r) / l * 0.5;
                node.x -= x *= l;
                node.y -= y *= l;
                quad.point.x += x;
                quad.point.y += y;
            }
        }
        
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
}

function tick(e) {
    var q = d3.geom.quadtree(nodes),
        i = 0,
        n = nodes.length;

    while (++i < n) q.visit(collide(nodes[i]));

    for(var i = 0; i < nodes.length; i++) {
        nodes[i].x = boundPosition(nodes[i].x, 0, width);
        nodes[i].y = boundPosition(nodes[i].y, 0, height);
    }

    d3.selectAll('circle').transition().ease('linear').duration(slowness)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });
    
    force.nodes(nodes).start();
}

function boundPosition(value, min, max) {
    return Math.max(Math.min(value, max), min);
}
