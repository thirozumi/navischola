<template lang="pug">
  #chart
    svg#myGraph
</template>

<script>
import $ from "../assets/scripts/jquery.min.js"
import d3 from "../assets/scripts/d3.min.js"
import "../assets/scripts/d3-legend.js"

export default {
  name: 'ScholaScope',
  data () {
    return {
      title_primary: 'Schola Scope',
      title_secondary: '学問分野相関図',
    }
  },
  mounted: function() {

    // SmartPhone check for node function
    let isSp =  ((navigator.userAgent.indexOf('iPhone') > 0 ||
                  navigator.userAgent.indexOf('iPad') > 0) ||
                  navigator.userAgent.indexOf('iPod') > 0 ||
                  navigator.userAgent.indexOf('Android') > 0)

    //console.log("isSp", isSp)


    d3.json("/assets/data/data.json", function(error, data){
      let dataSet = data;
      for(let e=0, l1=dataSet.edges.length; l1>e; e++ ) {
        let indexS
        let indexT
        let nColor
        for(let n=0, l2=dataSet.nodes.length; l2>n; n++ ) {
          if(dataSet.nodes[n].id===dataSet.edges[e].source) {
            indexS = n
            nColor = dataSet.nodes[n].color
          }
          if(dataSet.nodes[n].id===dataSet.edges[e].target) {
            indexT = n
          }
        }
        dataSet.edges[e].source = indexS
        dataSet.edges[e].target = indexT
        dataSet.edges[e].color  = nColor
      }

        /*
        for(var n=0, l2=dataSet.nodes.length; l2>n; n++ ) {
            console.log(dataSet.nodes[n].attributes)
        }
        */

      /* Checking if mouse button down or not? */
      // default : up
      let mouseDown = 0;
      document.body.onmousedown = function() {
        mouseDown = 1;
      }
        document.body.onmouseup = function() {
          mouseDown = 0;
      }

      let nodeOn = 1;

      /* //Legend// */

      /*
      let legendName = ["農学・環境学系", "社会科学系", "数学系", "物理系", "人文学系",
                        "自然系", "医歯薬学系", "言語・心理学系", "化学系","工学系",
                        "工学・情報", "生物学系"];
      */

      let legendName = ["医歯薬学", "情報学", "人文学", "生物学", "社会科学",
                        "数物系科学", "総合理工", "環境学", "化学","複合領域",
                        "農学", "工学"];

      /*
      let InitPos = [{"x":1200,"y":200}, {"x":1500,"y":1000}, {"x":800,"y":2000}, {"x":500,"y":1500}, {"x":2200,"y":1000},
                     {"x":1300,"y":0}, {"x":1200,"y":1500}, {"x":600,"y":1300}, {"x":2000,"y":700}, {"x":2800,"y":1500},
                     {"x":2000,"y":600}, {"x":600,"y":400}];
      */

      let legendPos = [{"x":780,"y":600}, {"x":370,"y":750}, {"x":600,"y":600}, {"x":450,"y":300}, {"x":790,"y":345},
                       {"x":370,"y":575}, {"x":410,"y":640}, {"x":470,"y":185}, {"x":550,"y":800}, {"x":700,"y":700},
                       {"x":570,"y":410}, {"x":1000,"y":620}];

      let legendColor = ["rgb(255,122,26)", "rgb(255,131,255)", "rgb(137,84,123)", "rgb(0,217,255)", "rgb(194,172,0)",
                         "rgb(46,150,161)", "rgb(66,211,0)"   , "rgb(255,93,149)", "rgb(0,202,144)", "rgb(209,130,86)",
                         "rgb(84,176,255)", "rgb(70,99,39)"];

      let InitNodeId = [69, 1, 110, 30, 27, 126, 135, 2, 68, 32, 98, 42];

      /*
      let legendColor = ["#1a305e", "#1a305e", "#1a305e", "#1a305e", "#1a305e",
                         "#1a305e", "#1a305e", "#1a305e", "#1a305e", "#1a305e",
                         "#1a305e", "#1a305e"];
      */

      for(let i=0, l=dataSet.nodes.length; l>i; i++ ) {
        //let mId = Number(dataSet.nodes[i].attributes['Modularity Class'])
        let mId = Number(dataSet.nodes[i]['attributes.Modularity Class'])
         dataSet.nodes[i].color = legendColor[mId];
      }

      let svg = d3.select("#myGraph");
      let g = svg.append("g");


      /* //Setting// */
      //const width = 1200;
      //const height = 900;
      //let width = d3.select("#myGraph")[0][0]['clientWidth']
      //let height = d3.select("#myGraph")[0][0]['clientHeight']

      let width = $('#myGraph').width();
      let height = $('#myGraph').height();

      const force = d3.layout.force()
          .nodes(dataSet.nodes)
          .links(dataSet.edges)
          .size([width, height]) //The center of gravity:[x/2, y/2]
          .linkDistance(120)
          .linkStrength(0.8)
          .gravity(0.40)
          .charge(-700)
          .friction(0.80)
          .start();


      /* //Continually move// */
      //d3.timer(function(){
      //    force.alpha(0.1);
      //});

      /* //Static Network// */
      // for picture
      let selectorBody = $("body");

      // for Test code
      ///////////////////////////////////////////////////////////////////
      /*
      let keyDown = 0;
      selectorBody.on("keydown", function(){
        if (keyDown===0){
          force.stop(); //force レイアウトの計算を終了
          node.each(function(d){ d.fixed = true })
          keyDown = 1
        }else{
          force.start(); //force レイアウトの計算を終了
          node.each(function(d){ d.fixed = false })
          keyDown = 0
        }
      });
      */
      ///////////////////////////////////////////////////////////////////

      /* //Drawing// */
      // default node opacity:0.6
      // default line opacity:0.5

      let link = g.append("g")
          .selectAll("line")
          .data(dataSet.edges)
          .enter()
          .append("line")
          .attr("opacity", "0.5")
          .attr("stroke-width", function(d){ return Math.sqrt(d.size) + d.size * 0.1})
          //.attr("stroke", function(d){ return color(d.group_id)})
          //.attr("stroke", function(d){ return d.color})
          .attr("stroke", "#ffffff")
          ;

      let node = g.append("g")
          .selectAll("circle")
          .data(dataSet.nodes)
          .enter()
          .append("g")
          .call(force.drag);

      node.append("circle")
          .attr("opacity", "0.5")
          //.attr("r", function(d,i){return Math.sqrt(d.size) * 3 + 3;})
          .attr("r", function(d){return d.size * 1.1 + 1;})
          //.attr("fill", function(d,i){return color(d.group_id)})
          //.attr("fill", function(d){ return d.color})
          .attr("fill", "#ffffff");

      node.append("text")
          .attr("dx", "-1.0em")
          .attr("dy", "0.7em")
          .attr("font-size", ".7em")
          .attr("font-weight", "300")
          .text(function(d) { return d.id; })
          .attr("class", "nonDrag")
          .attr("opacity", "1.0")
          .attr("fill", "#1a305e")
          .attr({"font-family": ["Helvetica Neue", "Helvetica", "Arial", "YuGothic", "Yu Gothic", "游ゴシック体", "游ゴシック", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "ＭＳ ゴシック", "MS Gothic", "sans-serif"]});

      for (let i=0, l=legendPos.length; l>i; i++){
        g.append("text")
            .attr("x", legendPos[i].x)
            .attr("y", legendPos[i].y)
            .text(legendName[i])
            //.attr("fill", legendColor[i])
            .attr("fill", "#1a305e")
            .attr("class", "legendOff")
            .attr("id", "legend" + i)
            .attr("opacity", "0.0")
      }
      let legendForScale = $(".legendOff")

      let pos0x, pos0y;
      let pos1x, pos1y;
      let pos2x, pos2y;
      let pos3x, pos3y;
      let pos4x, pos4y;
      let pos5x, pos5y;
      let pos6x, pos6y;
      let pos7x, pos7y;
      let pos8x, pos8y;
      let pos9x, pos9y;
      let pos10x, pos10y;
      let pos11x, pos11y;


      //if (!isSp){

      /*
      let cnt = 0;
      let run = 0;


      window.addEventListener('keydown', (eve) => {
        if (eve.key === 'Escape'){
          run = 0
        }else {
          run = 1
        }  }, false);
      */

      //let cnt = 0;
      let simulateTextPosision = function() {
        if (force.alpha() > 0.01){
          pos0x = (dataSet.nodes[69].x + dataSet.nodes[111].x) / 2;
          pos0y = (dataSet.nodes[69].y + dataSet.nodes[111].y) / 2;
          pos1x = (dataSet.nodes[1].x + dataSet.nodes[86].x) / 2;
          pos1y = (dataSet.nodes[1].y + dataSet.nodes[86].y) / 2;
          pos2x = (dataSet.nodes[110].x + dataSet.nodes[82].x) / 2;
          pos2y = (dataSet.nodes[110].y + dataSet.nodes[82].y) / 2;
          pos3x = (dataSet.nodes[30].x + dataSet.nodes[99].x) / 2;
          pos3y = (dataSet.nodes[30].y + dataSet.nodes[99].y) / 2;
          pos4x = (dataSet.nodes[27].x + dataSet.nodes[87].x) / 2;
          pos4y = (dataSet.nodes[27].y + dataSet.nodes[87].y) / 2;
          pos5x = (dataSet.nodes[126].x + dataSet.nodes[20].x) / 2;
          pos5y = (dataSet.nodes[126].y + dataSet.nodes[20].y) / 2;
          pos6x = (dataSet.nodes[135].x + dataSet.nodes[63].x) / 2;
          pos6y = (dataSet.nodes[135].y + dataSet.nodes[63].y) / 2;
          pos7x = (dataSet.nodes[2].x);
          pos7y = (dataSet.nodes[2].y + 10);
          pos8x = (dataSet.nodes[68].x + dataSet.nodes[104].x) / 2;
          pos8y = (dataSet.nodes[68].y + dataSet.nodes[104].y) / 2;
          pos9x = (dataSet.nodes[32].x + dataSet.nodes[102].x) / 2;
          pos9y = (dataSet.nodes[32].y + dataSet.nodes[102].y) / 2;
          pos10x = (dataSet.nodes[98].x + dataSet.nodes[66].x) / 2;
          pos10y = (dataSet.nodes[98].y + dataSet.nodes[66].y) / 2;
          pos11x = (dataSet.nodes[42].x + dataSet.nodes[83].x) / 2;
          pos11y = (dataSet.nodes[42].y + dataSet.nodes[83].y) / 2;


          /*
          if (cnt%10===0 && run){
            console.log("X", pos0x, Number(dataSet.nodes[69].x), Number(dataSet.nodes[111].x))
            console.log("Y", pos0y, Number(dataSet.nodes[69].y), Number(dataSet.nodes[111].y))
            //console.log(cnt)
          }
          */


          $("#legend0").attr("x", function(){ return pos0x})
              .attr("y", function(){ return pos0y});
          $("#legend1").attr("x", function(){ return pos1x})
              .attr("y", function(){ return pos1y});
          $("#legend2").attr("x", function(){ return pos2x})
              .attr("y", function(){ return pos2y});
          $("#legend3").attr("x", function(){ return pos3x})
              .attr("y", function(){ return pos3y});
          $("#legend4").attr("x", function(){ return pos4x})
              .attr("y", function(){ return pos4y});
          $("#legend5").attr("x", function(){ return pos5x})
              .attr("y", function(){ return pos5y});
          $("#legend6").attr("x", function(){ return pos6x})
              .attr("y", function(){ return pos6y});
          $("#legend7").attr("x", function(){ return pos7x})
              .attr("y", function(){ return pos7y});
          $("#legend8").attr("x", function(){ return pos8x})
              .attr("y", function(){ return pos8y});
          $("#legend9").attr("x", function(){ return pos9x})
              .attr("y", function(){ return pos9y});
          $("#legend10").attr("x", function(){ return pos10x})
              .attr("y", function(){ return pos10y});
          $("#legend11").attr("x", function(){ return pos11x})
              .attr("y", function(){ return pos11y});

          //console.log('simulateTextPosision', force.alpha())
        }
        //cnt = cnt+1;
      }

      //let cnt = 0;
      //let run = 1;
      /*
      window.addEventListener('keydown', (eve) => {
        run = eve.key !== 'Escape';
      }, false);



    cconsole.log('GO', force.alpha())


      /* //Initial display1// */
      //console.log(location.search.split('='), location.search.split('=')[1])
      //let initModu  = Number(location.search.split('&')[0].split('=')[1]);
      let initModu = Number(location.href.split('/')[4])
      let initNum  = InitNodeId[initModu];
      let initPos;
      let scaleVal = width / 1200 * 1.05; //svgサイズに応じてズーム度合いを変更
      let tx, ty, tscale;
      let displayNodeDuration;
      let displayLegendDuration;
      if (isNaN(initModu)||(initModu%1)!==0||initModu<0||initModu>11){
        initPos = {"x":width,"y":height};
        //initPos = InitPos[1]
        //scaleVal = 1.1;
        if (isSp){
          displayLegendDuration = 2000;
        }else{
          displayLegendDuration = 0;
        }
        displayNodeDuration = 0;
      }else{
        initPos = {"x":width,"y":height};//InitPos[initModu] //前の工程からうか取った結果(0〜11)を代入する(今initParaで行っている処理を行う)
        //scaleVal = 1.1
        displayNodeDuration = 10000;
        displayLegendDuration = 0;
      }

      //tx = -width/2 * (scaleVal-1) + (width/2 - initPos.x/2) * (scaleVal-1);
      //ty = -height/2 * (scaleVal-1) + (height/2 - initPos.y/2) * (scaleVal-1);
      tx = -initPos.x/2 * (scaleVal-1);
      ty = -initPos.y/2 * (scaleVal-1);
      tscale = "scale(" + scaleVal +"," + scaleVal + ")";
      g.attr("transform","translate(" +  tx + "," + ty +")" + tscale); //中で計算するとエラーになる

      const initLegend = "#legend" + initModu;

      //add zoom capabilities (for non-Sp)
      let zoom = d3.behavior.zoom()
          .scaleExtent([0.1, 40])
          .on("zoom", zoom_actions)
          .translate([tx, ty]).scale(scaleVal)


      function zoom_actions(){
        //g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
        g.attr("transform", "translate(" + zoom.translate() + ")scale(" + zoom.scale() + ")")
        if(mouseDown===0 && smartPhone===0){
          adjustLabel()
        }
      }

      // http://bl.ocks.org/linssen/7352810
      function interpolateZoom (translate, scale) {
        let self = this;
        let iTranslate;
        let iScale;
        return d3.transition().duration(350).tween("zoom", function () {
          iTranslate = d3.interpolate(zoom.translate(), translate)
          iScale = d3.interpolate(zoom.scale(), scale)
          return function (t) {
            zoom.scale(iScale(t))
                .translate(iTranslate(t));
            zoom_actions();
          };
        });
      }

      function zoomClick() {
        let clicked = d3.event.target,
            direction = 1,
            factor = 0.2,
            target_zoom = 1,
            center = [width / 2, height / 2],
            extent = zoom.scaleExtent(),
            translate = zoom.translate(),
            translate0 = [],
            l = [],
            view = {x: translate[0], y: translate[1], k: zoom.scale()};

        d3.event.preventDefault();
        direction = (this.id === 'zoomIn') ? 1 : -1;
        target_zoom = zoom.scale() * (1 + factor * direction);

        if (target_zoom < extent[0] || target_zoom > extent[1]) { return false; }

        translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
        view.k = target_zoom;
        l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];

        view.x += center[0] - l[0];
        view.y += center[1] - l[1];

        interpolateZoom([view.x, view.y], view.k);
      }

      d3.selectAll('.zoomButton').on('click', zoomClick);



      //adjust label to show or hide dependent on scale
      function adjustLabel(){
        //Zoom functions
        const size1 = 1.99;
        const size2 = 5.00;

        if(getScale()<size1) {
          $("circle").parent().children('text').attr("class", "smallText")
          legendForScale.attr("class", "legend")
        }
        else if(size1<=getScale() && getScale()<size2){
          $("circle").parent().children('text').attr("class", "smallText")
          legendForScale.attr("class", "legendOff")
        }
        else{
          $("circle").parent().children('text').attr("class", "bigText")
          //legendForScale.attr("class", "legendOff")
        }
        // console.log(getScale(), g.attr("transform"))
      }

      // call zoom function
      /*
      if (!isSp){
        svg.call(zoom)
            .on("wheel.zoom", null)
            .on("dblclick.zoom", null);
      }else{
        svg.call(zoom)
            .on("wheel.zoom", null)
            .on("dblclick.zoom", null)
            .on("touchcancel.zoom", null)
            //.on("touchstart.zoom", null);
        console.log('sp')
      }
      */


      /*var lastTouch = 0;
      document.addEventListener('touchend', event => {
        console.log('db-tap')
        var now = window.performance.now();
        if (now - lastTouch <= 500) {
          console.log('prvent')
          event.preventDefault();
        }
        lastTouch = now;
      }, true);
      */


      let last_touch_time = undefined;
      let touchstart = function() {
        let touch_time = d3.event.timeStamp;
        if (touch_time-last_touch_time < 300 && d3.event.touches.length===1) {
          d3.event.stopPropagation();
          last_touch_time = undefined;
          return;
        }
        last_touch_time = touch_time;
      };



      svg.call(zoom)
          //.on("wheel.zoom", null)
          //.on("dblclick.zoom", null);

      //d3.select('.background').on('touchstart.zoom', touchstart);
      //svg.on('touchstart.zoom', touchstart);


      document.addEventListener('touchstart', event => {
        if (event.touches.length > 1) {
          console.log('touchstart2')
          event.preventDefault();
        }
      }, true);


      let lastTouch = 0;
      document.addEventListener('touchend', event => {
        const now = window.performance.now();
        if (now - lastTouch <= 300) {
          event.preventDefault();
        }
        lastTouch = now;
      }, true);



      /* get scale value */
      function getScale(){
        let scale
        let scale_ = $('g').css('transform');
        if(scale_ !== "none"){


          //to decompose matrix
          let values = scale_.split("(")[1];
          values = values.split(")")[0];
          values = values.split(",");
          let aa = values[0];
          let bb = values[1];

          scale = Math.sqrt(aa*aa + bb*bb);
        }
        else{
          scale = 1.0;
        }return scale;
      }

      adjustLabel()
      legendForScale.attr("class", "legendOff")

      // to enclose node in SVG
      const wallMargin = 7.5;

      force.on("tick", function(){
        link
            .attr("x1", function(d){return d.source.x})
            .attr("y1", function(d){return d.source.y})
            .attr("x2", function(d){return d.target.x})
            .attr("y2", function(d){return d.target.y})

        node
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; }); //because of appending "g"


        //collision detection
        node
            .each(collide(0.5));

        simulateTextPosision();

      });


      /* //Collision detection// */
      // to prevent from overrapping
      const radiusCallision = 20;
      function collide(alpha){
        let quadtree = d3.geom.quadtree(dataSet.nodes);
        return function(d) {
          let rb = 2 * radiusCallision,
              nx1 = d.x - rb,
              nx2 = d.x + rb,
              ny1 = d.y - rb,
              ny2 = d.y + rb;
          quadtree.visit(function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
              let x = d.x - quad.point.x,
                  y = d.y - quad.point.y,
                  l = Math.sqrt(x * x + y * y);
              if (l < rb) {
                l = (l - rb) / l * alpha;
                d.x -= x *= l;
                d.y -= y *= l;
                quad.point.x += x;
                quad.point.y += y;
              }
            }
            return x1 > nx2
                || x2 < nx1
                || y1 > ny2
                || y2 < ny1;
          });
        };
      }

      class Coloring {
        static coloring(d, type) {
          let cssNode
          let cssNodeSame
          let cssNodeDiff
          let cssText
          let cssLine
          if (type === 'color') {
            cssLine = "lineColor"
            cssNodeSame = "nodeColorSame"
            cssNodeDiff = "nodeColorDiff"
            cssText = "linkedNodeText"
          } else {
            cssLine = "lineColorDefault"
            cssNode = "nodeColorDefault"
            cssText = "textSizeDefault"
          }

          let nodeIndex = d.index;  // console.log("nodeIndex is",nodeIndex)
          let circle = $("circle");
          if (type === 'color') {
            Coloring.sameModu(d['attributes.Modularity Class'])
          }
          for (let i = 0, l = dataSet.edges.length; l > i; i++) {
            if (dataSet.edges[i].source.index === nodeIndex ||
                dataSet.edges[i].target.index === nodeIndex) {

              let lineIndex = i;

              let selectLine = d3.selectAll("line")[0][lineIndex]; //node which match index number
              $(selectLine).attr("class", cssLine)//node color

              let nodeSource = dataSet.edges[lineIndex].source.index;
              let nodeTarget = dataSet.edges[lineIndex].target.index;

              let selectNodeSource = d3.selectAll("circle")[0][nodeSource]; //node which match source index number
              let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget]; //node which match target index number
              if (type === 'color'){
                if (dataSet.edges[lineIndex].source['attributes.Modularity Class'] ===
                    dataSet.edges[lineIndex].target['attributes.Modularity Class']){
                  $(selectNodeSource).attr("class", cssNodeSame)//node color
                  $(selectNodeTarget).attr("class", cssNodeSame)//node color
                }else{
                  $(selectNodeSource).attr("class", cssNodeDiff)//node color
                  $(selectNodeTarget).attr("class", cssNodeDiff)//node color
                }

              }else{
                $(selectNodeSource).attr("class", cssNode)//node color
                $(selectNodeTarget).attr("class", cssNode)//node color
              }

              let selectNodeSource2 = circle.parent().children('text')[nodeSource]//text which match source index number
              let selectNodeTarget2 = circle.parent().children('text')[nodeTarget]//text which match target index number
              $(selectNodeSource2).attr("class", cssText)//node text color
              $(selectNodeTarget2).attr("class", cssText)//node text color
            }
          }
          if (type === 'color') {
            $(d3.selectAll("circle")[0][nodeIndex]).attr("class", cssNodeSame)//node color
            //Coloring.sameModu(d['attributes.Modularity Class'])
          }
          if (type !== 'color') {
            adjustLabel()
          }

          return nodeIndex;
        }

        static sameModu(modularity) {
          for (let i = 0, l = dataSet.nodes.length; l > i; i++) {
            if (dataSet.nodes[i]['attributes.Modularity Class'] === modularity) {
              let selectNodeSource = d3.selectAll("circle")[0][i];
              $(selectNodeSource).attr("class", "nodeColorSameNonConnection");

              let selectNodeSource2 = $("circle").parent().children('text')[i]//text which match source index number
              $(selectNodeSource2).attr("class", "linkedNodeText")//node text color
            }
          }
        }

        static legend(d){
          let legendID = d['attributes.Modularity Class'];
          $(".legend").attr("class", "notSelectedLegend")
          $(".legendOff").attr("class", "notSelectedLegend")
          $(".selectedLegend").attr("class", "notSelectedLegend")
          $(".notSelectedLegend").attr("class", "notSelectedLegend")
          $("#legend" + legendID).attr("class", "selectedLegend")
          //$(".legend").addClass("notSelectedLegend")
          //$("#legend" + legendID).removeClass('selectedLegend').addClass("selectedLegend")
        }


        static fade(type){
          let cssNode
          let cssText
          let cssLine
          if (type === 'colorFade') {
            cssLine = "lineColorFade"
            cssText = "nodeTextFade"
            cssNode = "nodeColorFade"
          } else {
            cssLine = "lineReturnFade"
            cssNode = "nodeReturnFade"
            cssText = "nodeTextReturnFade"
          }

          let circle = $("circle");
          circle.attr("class", cssNode)
          $("line").attr("class", cssLine)
          circle.parent().children('text').attr("class", cssText)
    /*
          if (type === 'returnFadeNode' ){
            if (nodeOn === 1){
              console.log(d.index)
              Coloring.coloring(d,'color')
            }
          }
    */
        }

        static cursor(type){
          let grabType
          if (type === 'grabbing') {
            grabType = "grabbing"
          } else {
            grabType = "auto"
          }

          //grabbing
          let circle = $("circle");
          circle.css({"cursor": ["-webkit-" + type]});
          circle.css({"cursor": ["-moz-" + type]});
          circle.css({"cursor": [type]});

          let body = $("body");
          body.css({"cursor": ["-webkit-" + grabType]});
          body.css({"cursor": ["-moz-" + grabType]});
          body.css({"cursor": [grabType]});
        }

        static initColor(index) {
          let nodeIndex = index;
          let circle = $("circle");
          for (let i = 0, l = dataSet.edges.length; l > i; i++) {
            if (dataSet.edges[i].source.index === nodeIndex ||
                dataSet.edges[i].target.index === nodeIndex) {

              let lineIndex = i;

              let selectLine = d3.selectAll("line")[0][lineIndex]; //node which match index number
              $(selectLine).attr("class", "lineColor")//node color

              let nodeSource = dataSet.edges[lineIndex].source.index;
              let nodeTarget = dataSet.edges[lineIndex].target.index;

              let selectNodeSource = d3.selectAll("circle")[0][nodeSource]; //node which match source index number
              let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget]; //node which match target index number
              $(selectNodeSource).attr("class", "nodeColor")//node color
              $(selectNodeTarget).attr("class", "nodeColor")//node color

              let selectNodeSource2 = circle.parent().children('text')[nodeSource]//text which match source index number
              let selectNodeTarget2 = circle.parent().children('text')[nodeTarget]//text which match target index number
              $(selectNodeSource2).attr("class", "linkedNodeText")//node text color
              $(selectNodeTarget2).attr("class", "linkedNodeText")//node text color
            }
          }
        }

        // if index is undefined, nodes aren't colored.
        static initColor_(index) {
          let nodeIndex = index;
          let circle = $("circle");
          Coloring.sameModu(initModu)
          for (let i = 0, l = dataSet.edges.length; l > i; i++) {
            if (dataSet.edges[i].source.index === nodeIndex ||
                dataSet.edges[i].target.index === nodeIndex) {

              let lineIndex = i;

              let selectLine = d3.selectAll("line")[0][lineIndex]; //node which match index number
              $(selectLine).attr("class", "lineColor")//node color

              let nodeSource = dataSet.edges[lineIndex].source.index;
              let nodeTarget = dataSet.edges[lineIndex].target.index;

              let selectNodeSource = d3.selectAll("circle")[0][nodeSource]; //node which match source index number
              let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget]; //node which match target index number

              if (dataSet.edges[lineIndex].source['attributes.Modularity Class'] ===
                  dataSet.edges[lineIndex].target['attributes.Modularity Class']){
                $(selectNodeSource).attr("class", "nodeColorSame")//node color
                $(selectNodeTarget).attr("class", "nodeColorSame")//node color
              }else{
                $(selectNodeSource).attr("class", "nodeColorDiff")//node color
                $(selectNodeTarget).attr("class", "nodeColorDiff")//node color
              }
              $(d3.selectAll("circle")[0][nodeIndex]).attr("class", "nodeColorSame")//node color


              let selectNodeSource2 = circle.parent().children('text')[nodeSource]//text which match source index number
              let selectNodeTarget2 = circle.parent().children('text')[nodeTarget]//text which match target index number
              $(selectNodeSource2).attr("class", "linkedNodeText")//node text color
              $(selectNodeTarget2).attr("class", "linkedNodeText")//node text color
            }
          }
        }

        /*
        static initColoring(modularity) {
          console.log('initColoring now')
          //let modu = modularity//.toString()
          //console.log(modu)
          for (let i = 0, l = dataSet.nodes.length; l > i; i++) {
            //if (dataSet.nodes[i].attributes['Modularity Class'] === modu){
            if (dataSet.nodes[i]['attributes.Modularity Class'] === modularity){
              let selectNodeSource = d3.selectAll("circle")[0][i];
              $(selectNodeSource).attr("class", "nodeColor");
              Coloring.initColor_(i) // 対象のmodularityとつながっているnodeに色付け
            }
          }
        }
        */
      }

      /* //Mouse action// */
      // mouse over >>> color selected node, conected node & line
      if (!isSp){
        node.on("mouseover", function(d){
          Coloring.coloring(d,'color')
          Coloring.legend(d);
          nodeOn = 1;

          //console.log(d['attributes.Modularity Class'], d.index,  d.id, event.pageX , event.pageY)
        });

        // mouse out >>> to default color
        node.on("mouseout", function(d){
          //Coloring.coloring(d,'fade')
          Coloring.fade("colorFade")
          $(".notSelectedLegend").attr("class", "selectedLegend")
          nodeOn = 0;
        });

        // mouse down >>> to make not conected node & line fade
        node.on("mousedown", function(d){
          /*
          Coloring.fade("colorFade")
          Coloring.coloring(d,'color')
          Coloring.cursor("grabbing")
          */
        });

        // mouse up >>> to default color (in the case mouse up outside SVG, to defalt color)
        selectorBody.on("mouseup", function(d){
          /*
          //at first, make all node & line default
          Coloring.fade("returnFade", d)
          Coloring.cursor("grab")
          adjustLabel()
          */
        });
      }



      /////////////////////////////////////////////////////////////
      // for SmartPhone
      let smartPhone = 0;
      let nodeIndex;
      if (isSp){

        let touchmove = 0
        svg.on("touchmove", function(){
          touchmove = 1
        });

        svg.on("touchend", function(){
          if (touchmove === 0){
            Coloring.fade("colorFade")
            $(".notSelectedLegend").attr("class", "selectedLegend")
          }
          touchmove = 0
        });


        node.on("touchstart", function(d){
            console.log(d.index,  d.id, d['attributes.Modularity Class'])
            Coloring.fade("colorFade")
            nodeIndex = Coloring.coloring(d,'color')
            Coloring.legend(d);
            smartPhone = 1;
            d3.event.stopPropagation();

        });

        node.on("touchend", function(){
            d3.event.stopPropagation();

        });

      }

      setTimeout(() => {
        force.stop(); //force レイアウトの計算を終了
        node.each(function(d){
          //d.fixed = true
        })
      }, 10000)

      /////////////////////////////////////////////////////////////

      // add reset function mainly for sp
      /*
      d3.selectAll('#reset').on('click', reset);
      function reset(){
        scaleVal = 1.1;
        tx = -initPos.x/2 * (scaleVal-1);
        ty = -initPos.y/2 * (scaleVal-1);
        interpolateZoom([tx, ty], scaleVal);

        Coloring.fade("returnFade")

        smartPhone = 0;
      }
      */

      // coloring selected category
      if (isSp) {
        setTimeout(() => {$(initLegend).attr("class", "legend")}, 2000)
      }else{
        $(initLegend).attr("class", "legend")
      }


      /* //Initial display2// */
      let promise = new Promise((resolve) => { // #1
        resolve(Coloring.fade("colorFade"))
      })
      promise.then(() => { // #2
        //resolve(Coloring.initColor(initPara))
        //resolve(Coloring.initColoring(initNum))
        Coloring.initColor_(initNum)
      }).then(() => { // #3
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(Coloring.fade("returnFade"))
            $("circle").parent().children('text').attr("class", "smallText")
            //legendForScale.attr("class", "legend")
          }, displayNodeDuration)
        })
      }).then(() => { // #3
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(legendForScale.attr("class", "legend"))
          }, displayLegendDuration)
        })
      }).catch(() => {
        Coloring.fade("returnFade")
        console.error('Something wrong! => Coloring.fade')
      })

    });
  }
}
</script>

<style lang="scss">
#myGraph {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #D2D7DC;
  z-index: 1;
}

// body{
// 	background-color: #d2d7dc;
// }

#myScope text {
	cursor: default;
	pointer-events: none;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	 user-select: none;
}

.node_link{
  fill: #1a305e;
  font-size: 0.8em;
	text-align: left;
  // font-family: "Helvetica Neue", "Helvetica", "Arial", "YuGothic", "Yu Gothic", "游ゴシック体", "游ゴシック", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "ＭＳ ゴシック", "MS Gothic", sans-serif;
}

#description{
	text-align: center;
}

#name{
	margin-top: 3px;
	margin-bottom: 30px;
	margin-left: auto;
	margin-right: auto;
	width: 1200px;
	text-align: center;
	font-size: 0.8em;
	font-weight: 300;
	line-height: 150%;
	color: #a9a9a9;
	font-family: "Helvetica Neue","Arial",sans-serif;
}

svg{
	//margin-bottom: 5px;
}

/* mouseover */
.nodeColorSame{
	fill: #35828b;
	opacity: 1.0;
}

.nodeColorSameNonConnection{
	fill: #66a3b8;
	opacity: 1.0;
}

.nodeColorDiff{
	fill: #ec6546;
	opacity: 1.0;
}

.linkedNodeText{
	font-weight: 500;
	font-size: 0.85em;
	pointer-events: none;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	 user-select: none;
}


.lineColor{
	stroke: #35828b;
	opacity: 1.0;
}


/* mouseout */
.nodeColorDefault{
	opacity: 0.5;
}

.textSizeDefault{
	pointer-events: none;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.lineColorDefault{
	opacity: 0.5;
}

/*
html, css{
  touch-action:pan-y;
}
*/

/* click */
.nodeColorFade{
	fill: #ffffff;
	opacity: 0.5;
	transition-duration: 0.5s;
}

.nodeColorFadeSp{
	fill: #ffffff;
	opacity: 0.5;
	transition-duration: 0.5s;
}

.nodeTextFade{
	opacity: 0.15;
	pointer-events: none;
	transition-duration: 0.5s;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.lineColorFade{
	stroke: #ffffff;
	opacity: 0.5;
	transition-duration: 0.5s;

}

.nodeReturnFade{
	opacity: 0.5;
	transition-duration: 0.5s;
}

.nodeTextReturnFade{
	opacity: 1.0;
	pointer-events: none;
	transition-duration: 0.5s;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.lineReturnFade{
	opacity: 0.5;
	transition-duration: 0.5s;
}


/* for text not to drag */
.nonDrag{
	pointer-events: none;
}


.smallText{
	opacity: 0.1;
  pointer-events: none;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.bigText{
	opacity: 1.0;
  pointer-events: none;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}


/* grab & grabing */

.svg_grabing{
	margin-bottom: 50px;
}


.legend {
	pointer-events: none;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	font-family: "Helvetica Neue", "Helvetica", "Arial", "YuGothic", "Yu Gothic", "游ゴシック体", "游ゴシック", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "ＭＳ ゴシック", "MS Gothic", sans-serif;
	opacity: 0.8;
	font-size: 1.5em;
	font-weight: 700;
	padding: 50px 0;
	text-shadow:
		0 2px 0 #ffffff,
		2px 0 0 #ffffff,
		0 -2px 0 #ffffff,
		-2px 0 0 #ffffff,
		-2px -2px 0 #ffffff,
		2px -2px 0 #ffffff,
		-2px 2px 0 #ffffff,
		2px 2px 0 #ffffff
;}

.legendOff {
	pointer-events: none;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	opacity: 0.0;
	font-size: 1.5em;
	font-weight: 700;
	padding: 50px 0;
	text-shadow:
		0 2px 0 #ffffff,
		2px 0 0 #ffffff,
		0 -2px 0 #ffffff,
		-2px 0 0 #ffffff,
		-2px -2px 0 #ffffff,
		2px -2px 0 #ffffff,
		-2px 2px 0 #ffffff,
        2px 2px 0 #ffffff
;}


.selectedLegend {
	pointer-events: none;
	cursor: default;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	font-family: "Helvetica Neue", "Helvetica", "Arial", "YuGothic", "Yu Gothic", "游ゴシック体", "游ゴシック", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "ＭＳ ゴシック", "MS Gothic", sans-serif;
	opacity: 0.8;
	font-size: 1.5em;
	font-weight: 700;
	padding: 50px 0;
	text-shadow:
		0 2px 0 #ffffff,
		2px 0 0 #ffffff,
		0 -2px 0 #ffffff,
		-2px 0 0 #ffffff,
		-2px -2px 0 #ffffff,
		2px -2px 0 #ffffff,
		-2px 2px 0 #ffffff,
		2px 2px 0 #ffffff
;}

.notSelectedLegend {
	pointer-events: none;
	user-select: none;
	-webkit-touch-callout: none;
	opacity: 0.4;
	font-size: 1.5em;
	font-weight: 700;
	padding: 50px 0;
	text-shadow:
		0 2px 0 #ffffff,
		2px 0 0 #ffffff,
		0 -2px 0 #ffffff,
		-2px 0 0 #ffffff,
		-2px -2px 0 #ffffff,
		2px -2px 0 #ffffff,
		-2px 2px 0 #ffffff,
		2px 2px 0 #ffffff
;}
</style>
