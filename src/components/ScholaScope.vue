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

    // Safari check for zoom function
    let ua = navigator.userAgent.toLowerCase();
    let isSafari = (ua.indexOf('safari') > -1) && (ua.indexOf('chrome') === -1);

    // SmartPhone check for node function
    let isSp =  ((navigator.userAgent.indexOf('iPhone') > 0 ||
        navigator.userAgent.indexOf('iPad') > 0) ||
        navigator.userAgent.indexOf('iPod') > 0 ||
        navigator.userAgent.indexOf('Android') > 0)

    console.log("isSp", isSp)

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

      let legendName = ["農学・環境学系", "社会科学系", "数学系", "物理系", "人文学系",
                        "自然系", "医歯薬学系", "言語・心理学系", "化学系","工学系",
                        "工学・情報", "生物学系"];

      let InitPos = [{"x":1200,"y":200}, {"x":1500,"y":1000}, {"x":800,"y":2000}, {"x":500,"y":1500}, {"x":2200,"y":1000},
                     {"x":1300,"y":0}, {"x":1200,"y":1500}, {"x":600,"y":1300}, {"x":2000,"y":700}, {"x":2800,"y":1500},
                     {"x":2000,"y":600}, {"x":600,"y":400}];

      let legendPos = [{"x":600,"y":300}, {"x":700,"y":450}, {"x":450,"y":700}, {"x":300,"y":550}, {"x":950,"y":400},
                        {"x":550,"y":100}, {"x":700,"y":550}, {"x":450,"y":600}, {"x":800,"y":400}, {"x":950,"y":600},
                        {"x":850,"y":300}, {"x":450,"y":300}];

      let legendColor = ["rgb(255,122,26)", "rgb(255,131,255)", "rgb(137,84,123)", "rgb(0,217,255)", "rgb(194,172,0)",
                         "rgb(46,150,161)", "rgb(66,211,0)"   , "rgb(255,93,149)", "rgb(0,202,144)", "rgb(209,130,86)",
                         "rgb(84,176,255)", "rgb(70,99,39)"];

      for(let i=0, l=dataSet.nodes.length; l>i; i++ ) {
        let mId = Number(dataSet.nodes[i].attributes['Modularity Class'])
         dataSet.nodes[i].color = legendColor[mId];
      }

      console.log(legendColor)

      let svg = d3.select("#myGraph");
      let g = svg.append("g");


      /* //Setting// */
      const width = 1200;
      const height = 900;

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

      /* //Static Network// */
      // for picture
      let keyDown = 0;

      let selectorBody = $("body");

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
          .attr("stroke", function(d){ return d.color})
          ;

      let node = g.append("g")
          .selectAll("circle")
          .data(dataSet.nodes)
          .enter()
          .append("g")
          .call(force.drag);

      node.append("circle")
          .attr("opacity", "0.6")
          //.attr("r", function(d,i){return Math.sqrt(d.size) * 3 + 3;})
          .attr("r", function(d){return d.size * 1.1 + 1;})
          //.attr("fill", function(d,i){return color(d.group_id)})
          .attr("fill", function(d){ return d.color})
          .attr("stroke", "#fffcf9");

      node.append("text")
          .attr("dx", "-1.0em")
          .attr("dy", "0.7em")
          .attr("font-size", ".7em")
          .attr("font-weight", "300")
          .text(function(d) { return d.id; })
          .attr("class", "nonDrag")
          .attr("opacity", "0.8")
          .attr("fill", "#352622")
          .attr({"font-family": ["ヒラギノ角ゴ ProN W3","游ゴシック体","sans-serif"]});

      for (let i=0, l=legendPos.length; l>i; i++){
        g.append("text")
            .attr("x", legendPos[i].x)
            .attr("y", legendPos[i].y)
            .text(legendName[i])
            .attr("fill", legendColor[i])
            .attr("class", "legendOff")
            .attr("id", "legend" + i)
            .attr("opacity", "0.0")
      }
      let legendForScale = $(".legendOff")
      console.log(legendForScale)

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


      if (!isSp){
        setInterval(function(){
          pos0x = (Number(dataSet.nodes[92].x) + Number(dataSet.nodes[79].x)) / 2;
          pos0y = (Number(dataSet.nodes[92].y) + Number(dataSet.nodes[79].y)) / 2;
          pos1x = (Number(dataSet.nodes[102].x) + Number(dataSet.nodes[122].x)) / 2;
          pos1y = (Number(dataSet.nodes[102].y) + Number(dataSet.nodes[122].y)) / 2;
          pos2x = (Number(dataSet.nodes[1].x) + 10);
          pos2y = (Number(dataSet.nodes[1].y) + 30);
          pos3x = (Number(dataSet.nodes[67].x) + Number(dataSet.nodes[35].x)) / 2;
          pos3y = (Number(dataSet.nodes[67].y) + Number(dataSet.nodes[35].y)) / 2;
          pos4x = (Number(dataSet.nodes[13].x) + 10);
          pos4y = (Number(dataSet.nodes[13].y) + 30);
          pos5x = (Number(dataSet.nodes[108].x) + 10);
          pos5y = (Number(dataSet.nodes[108].y) + 30);
          pos6x = (Number(dataSet.nodes[93].x) + Number(dataSet.nodes[101].x)) / 2;
          pos6y = (Number(dataSet.nodes[93].y) + Number(dataSet.nodes[101].y)) / 2;
          pos7x = (Number(dataSet.nodes[61].x) + Number(dataSet.nodes[126].x)) / 2;
          pos7y = (Number(dataSet.nodes[61].y) + Number(dataSet.nodes[126].y)) / 2;
          pos8x = (Number(dataSet.nodes[31].x) + 10);
          pos8y = (Number(dataSet.nodes[31].y) + 30);
          pos9x = (Number(dataSet.nodes[49].x) + Number(dataSet.nodes[136].x)) / 2;
          pos9y = (Number(dataSet.nodes[49].y) + Number(dataSet.nodes[136].y)) / 2;
          pos10x = (Number(dataSet.nodes[6].x) + Number(dataSet.nodes[97].x)) / 2;
          pos10y = (Number(dataSet.nodes[6].y) + Number(dataSet.nodes[97].y)) / 2;
          pos11x = (Number(dataSet.nodes[5].x) + Number(dataSet.nodes[72].x)) / 2;
          pos11y = (Number(dataSet.nodes[5].y) + Number(dataSet.nodes[72].y)) / 2;


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
        }, 100);
      }


      /* //Initial display1// */
      let initNum  = Number(location.search.split('=')[1]);
      console.log(initNum)
      if (isNaN(initNum)){
        initNum = 1
      }
      let initPos = InitPos[initNum] // 前の工程からうか取った結果(0〜11)を代入する(今initParaで行っている処理を行う)
      g.attr("transform","translate(" + -initPos.x/2  + "," +  -initPos.y/2 +")scale(2.0,2.0)");

      const initLegend = "#legend" + initNum;
      console.log(initLegend)

      //add zoom capabilities
      let zoom_handler = d3.behavior.zoom()
          .scaleExtent([0.1, 40])
          .on("zoom", zoom_actions)
          .translate([-initPos.x/2, -initPos.y/2]).scale(2.0)


      function zoom_actions(){
        g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")")
        //.translate(width / 3, height / 3);
        //console.log(d3.event.translate, d3.event.scale)
            //console.log("zoom");
        if(mouseDown===0){
          adjustLabel()
        }
      }

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
        console.log(getScale())
      }

      /* get scale value */
      function getScale(){
        let scale
        if(!isSafari){
          let scale_ = $('g').css('transform');

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

      svg.call(zoom_handler);
      adjustLabel()
      legendForScale.attr("class", "legendOff")

      // coloring selected category
      if (isSp) {
        setTimeout(() => {$(initLegend).attr("class", "legend")}, 2000)
      }else{
        $(initLegend).attr("class", "legend")
      }

      //Coloring.initColor(10)

      // to enclose node in SVG
      const wallMargin = 7.5;

      force.on("tick", function(){
        link
            .attr("x1", function(d){
              return Math.max(wallMargin, Math.min(width  - wallMargin, d.source.x));
            })
            .attr("y1", function(d){
              return Math.max(wallMargin, Math.min(height - wallMargin, d.source.y));
            })
            .attr("x2", function(d){
              return Math.max(wallMargin, Math.min(width  - wallMargin, d.target.x));
            })
            .attr("y2", function(d){
              return Math.max(wallMargin, Math.min(height - wallMargin, d.target.y));
            })

        node
        //.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; }); //because of appending "g"
            .attr("transform", function(d){
              return "translate(" + Math.max(wallMargin, Math.min(width  - wallMargin, d.x))
                  + ","
                  + Math.max(wallMargin, Math.min(height - wallMargin, d.y))
                  + ")";
            }); //because of appending "g"

        //collision detection
        node
            .each(collide(0.5));
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
          let cssText
          let cssLine
          if (type === 'color') {
            cssLine = "lineColor"
            cssNode = "nodeColor"
            cssText = "linkedNodeText"
          } else {
            cssLine = "lineColorDefault"
            cssNode = "nodeColorDefault"
            cssText = "textSizeDefault"
          }

          let nodeIndex = d.index;console.log("nodeIndex is",nodeIndex)
          let circle = $("circle");
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
              $(selectNodeSource).attr("class", cssNode)//node color
              $(selectNodeTarget).attr("class", cssNode)//node color

              let selectNodeSource2 = circle.parent().children('text')[nodeSource]//text which match source index number
              let selectNodeTarget2 = circle.parent().children('text')[nodeTarget]//text which match target index number
              $(selectNodeSource2).attr("class", cssText)//node text color
              $(selectNodeTarget2).attr("class", cssText)//node text color
            }
          }
          if (type !== 'color') {
            adjustLabel()
          }
        }

        static fade(type){
          let cssNode
          let cssText
          let cssLine
          if (type === 'colorFade') {
            cssLine = "lineColorFade"
            cssNode = "nodeColorFade"
            cssText = "nodeTextFade"
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

        static sound(type, volume){
          // ion.sound.play(type,{
          //   volume:volume // turn down
          // });
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

        static initColor_(index) {
          let nodeIndex = index;
          for (let i = 0, l = dataSet.edges.length; l > i; i++) {
            if (dataSet.edges[i].source.index === nodeIndex ||
                dataSet.edges[i].target.index === nodeIndex) {

              let lineIndex = i;

              let selectLine = d3.selectAll("line")[0][lineIndex]; //node which match index number
              $(selectLine).attr("class", "lineReturnFade")//node color

              let nodeSource = dataSet.edges[lineIndex].source.index;
              let nodeTarget = dataSet.edges[lineIndex].target.index;

              let selectNodeSource = d3.selectAll("circle")[0][nodeSource]; //node which match source index number
              let selectNodeTarget = d3.selectAll("circle")[0][nodeTarget]; //node which match target index number
              $(selectNodeSource).attr("class", "nodeReturnFade")//node color
              $(selectNodeTarget).attr("class", "nodeReturnFade")//node color
            }
          }
        }


        static initColoring(modularity) {
          let modu = modularity.toString()
          console.log(modu)
          for (let i = 0, l = dataSet.nodes.length; l > i; i++) {
            if (dataSet.nodes[i].attributes['Modularity Class'] === modu){
              let selectNodeSource = d3.selectAll("circle")[0][i];
              $(selectNodeSource).attr("class", "nodeColor");
              Coloring.initColor_(i)
            }
          }
        }
      }

      /* //Initial display2// */

      let promise = new Promise((resolve, reject) => { // #1
        resolve(Coloring.fade("colorFade"))
        console.log('#1 Coloring.fade')
        reject('error')
      })

      promise.then(() => { // #2
        return new Promise((resolve, reject) => {
          //resolve(Coloring.initColor(initPara))
          resolve(Coloring.initColoring(initNum))
          reject('error')
          console.log('#2 Coloring.initColor')
        })
      }).then(() => { // #3
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(Coloring.fade("returnFade"))
            $("circle").parent().children('text').attr("class", "smallText")
            reject('error')
            console.log('#3 Coloring.fade')

            legendForScale.attr("class", "legend")
          }, 5000)
          console.log('#3_')
        })
      }).catch(() => {
        Coloring.fade("returnFade")
        console.error('Something wrong! => Coloring.fade')
      })




      /* //Mouse action// */
      // mouse over >>> color selected node, conected node & line
      if (!isSp){
        node.on("mouseover", function(d){
          Coloring.coloring(d,'color')

          if (mouseDown === 0) {
            //Coloring.sound("mouseover", 0.1)
          }
          nodeOn = 1;
        });

        // mouse out >>> to default color
        node.on("mouseout", function(d){
          Coloring.coloring(d,'fade')
          nodeOn = 0;
        });

        // mouse down >>> to make not conected node & line fade
        node.on("mousedown", function(d){
          Coloring.fade("colorFade")
          Coloring.coloring(d,'color')
          Coloring.cursor("grabbing")
          //Coloring.sound("grabNode", 0.2)
        });

        // mouse up >>> to default color (in the case mouse up outside SVG, to defalt color)
        selectorBody.on("mouseup", function(d){
          //at first, make all node & line default
          Coloring.fade("returnFade", d)
          Coloring.cursor("grab")
          adjustLabel()
        });

        // mouse up sound
        node.on("mouseup", function(){
          //Coloring.sound("releaseNode", 0.5);
        });
        console.log("PC")
      }


      /////////////////////////////////////////////////////////////
      // for SmartPhone
      let smartPhone = 0;
      if (isSp){
        console.log(smartPhone)
        // mouse down >>> to make not conected node & line fade
        node.on("touchstart", function(d){
          if (smartPhone === 0){
            Coloring.fade("colorFade")
            Coloring.coloring(d,'color')
            Coloring.cursor("grabbing")
            //Coloring.sound("grabNode", 0.2)
            smartPhone = 1;
          }else {
            Coloring.fade("returnFade", d)
            Coloring.cursor("grab")
            adjustLabel()
            Coloring.sound("releaseNode", 0.5);
            smartPhone = 0;
          }
        });
      }
      /////////////////////////////////////////////////////////////


      /* //sound// */
      // sound setting
      // ion.sound({
      //   sounds: [{name: "opening"},
      //     {name: "mouseover"},
      //     {name: "grabNode"},
      //     {name: "releaseNode"},
      //     {name: "legend"}],
      //
      //   // main config
      //   path: "js/sound/",
      //   preload: true,
      //   multiplay: true,
      //   volume: 0.5
      // });
      //opening sound
          //Coloring.sound("opening", 0.5)
    });
  }
}
</script>

<style lang="scss">
#chart {
  //pointer-events: none;
}

#myGraph {
  position: absolute;
  width: 100%;
  height: 100%;
  //height: 40rem;
  background: #D2D7DC;
  //width: 1200px;
  //height: 900px;
  //border: 1px solid #ff8e1e;
  /*background-color: #fff5e3;*/
  /*align: center;*/
}

.node_link{
  fill: #352622;
  font-size: 0.8em;
  font-family: "ヒラギノ角ゴ ProN W3","游ゴシック体",sans-serif;
}


#description{
  text-align: center;
}

// p{
// 	margin-top: 3px;
// 	margin-bottom: 3px;
// 	margin-left: auto;
// 	margin-right: auto;
// 	width: 1200px;
// 	text-align: left;
// 	font-size: 1.0em;
// 	font-weight: 300;
// 	line-height: 150%;
// 	color: #a9a9a9;
// 	font-family: "Helvetica Neue","Arial","ヒラギノ角ゴ ProN W3","游ゴシック体",sans-serif;
// }

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
  margin-bottom: 5px;
}


/* mouseover */
.nodeColor{
  stroke: #d70035;
  stroke-width: 2;
  opacity: 0.8;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
}

.linkedNodeText{
  font-weight: 500;
  font-size: 0.85em;
  pointer-events: none;

/* animation */
  animation: animScaleNodeText 0.15s  linear;
  transform-origin: 50% 50%;
  animation-play-state:running;

}

  @keyframes animScaleNodeText {
  0% { font-size: 1.0em; }
  50% { font-size: 1.1em; }
  100% { font-size: 1.0em; }
  }


.lineColor{
  stroke: #d70035;
  opacity: 1.0;
}


/* mouseout */
.nodeColorDefault{
  opacity: 0.6;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
}

.textSizeDefault{
  pointer-events: none;
}

.lineColorDefault{
  opacity: 0.5;
}


/* click */
.nodeColorFade{
  fill: #E5E5E5;
  stroke: #bfbec5;
  opacity: 0.6;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
  transition-duration: 0.5s;
  pointer-events: none;

}

.nodeTextFade{
  opacity: 0.3;
  pointer-events: none;
  transition-duration: 0.5s;
}

.lineColorFade{
  stroke: #E5E5E5;
  opacity: 0.5;
  transition-duration: 0.5s;

}

.nodeReturnFade{
  opacity: 0.6;
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: grab;
  transition-duration: 0.5s;
}

.nodeTextReturnFade{
  opacity: 1.0;
  pointer-events: none;
  transition-duration: 0.5s;
}

.lineReturnFade{
  opacity: 0.5;
  transition-duration: 0.5s;
}


/* for text not to drag */
.nonDrag{
  pointer-events: none;
}


/* legend filter */
.filteredCircle{
    stroke-width: 0.5;

    /* bound animation */
  animation: animScaleCircle 20s  ease-out;
  transform-origin: 50% 50%;
  animation-play-state:running;

  }
  @keyframes animScaleCircle {
  0% { transform: scale(0.8, 0.8); }
  1% { transform: scale(2.2, 2.2); }
  2% { transform: scale(1.6, 1.6); }
  3% { transform: scale(2.1, 2.1); }
  4% { transform: scale(1.9, 1.9); }
  5% { transform: scale(2.0, 2.0); }
  6% { transform: scale(1.95, 1.95); }
  7% { transform: scale(2.0, 2.0); }
  8% { transform: scale(1.97, 1.97); }
  9% { transform: scale(2.0, 2.0); }
  10% { transform: scale(1.99, 1.99); }
  11% { transform: scale(2.0, 2.0); }
  100% { transform: scale(2.0, 2.0); }
  }


.filteredText{
  pointer-events: none;

  /* bound animation */
  animation: animScaleText 20s  ease-out;
  transform-origin: 50% 50%;
  animation-play-state:running;

  }
  @keyframes animScaleText {
  0% { transform: scale(0.8, 0.8); }
  1% { transform: scale(1.1, 1.1); }
  2% { transform: scale(1.0, 1.0); }
  3% { transform: scale(1.1, 1.1); }
  4% { transform: scale(1.0, 1.0); }
  5% { transform: scale(1.1, 1.1); }
  6% { transform: scale(1.05, 1.05); }
  7% { transform: scale(1.1, 1.1); }
  8% { transform: scale(1.07, 1.07); }
  9% { transform: scale(1.1, 1.1); }
  10% { transform: scale(1.09, 1.09); }
  11% { transform: scale(1.1, 1.1); }
  100% { transform: scale(1.1, 1.1); }
  }

.returnFilteredCircle{
  stroke-width: 1;

    /* animation */
  animation: animScaleCircleReturn 0.3s  ease-out;
  transform-origin: 50% 50%;
  animation-play-state:running;

  }
  @keyframes animScaleCircleReturn {
  0% { transform: scale(2.0, 2.0); }
  100% { transform: scale(1.0, 1.0); }
  }

.returnFilteredText{
  pointer-events: none;

    /* animation */
  animation: animScaleTextReturn 0.3s  ease-out;
  transform-origin: 50% 50%;
  animation-play-state:running;

  }
  @keyframes animScaleTextReturn {
  0% { transform: scale(1.1, 1.1); }
  100% { transform: scale(1.0, 1.0); }
  }


.smallText{
  opacity: 0.1;
  pointer-events: none;
}

.bigText{
  opacity: 1.0;
  pointer-events: none;
}


/* grab & grabing */

.svg_grabing{
  margin-bottom: 50px;
  cursor: -webkit-grabbing;
}


.legend {
    font-family: "ヒラギノ角ゴ ProN W3","游ゴシック体",sans-serif;
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
        ;

  /* animation */
  animation: legend 0.3s  ease-out;
  transform-origin: 50% 50%;
  animation-play-state:running;

  }
  @keyframes legend {
  0% { opacity: 0.0; }
  100% { opacity: 0.8; }
  }

.legendOff {
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
        ;
}

</style>
