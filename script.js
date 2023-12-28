  
  let graphData;
  let changeData=null
 const create=(e)=>{

   
   let myData=null;
   let canvas=null
   
   myData= document.getElementById("myData").value; 
   changeData=document.getElementById("myData").value; 
   document.getElementById("myData").value=null; 


   //if the data is vaid then it shall be parsed
if(myData==null||myData==undefined||myData==""){
    alert("Invalid input")
}
else{
//converts data into int from string
    var resultArray = myData.split(",").map(function(item) {
      return parseInt(item, 10); 
    });

 let graphData=resultArray

   
let height=350
let width=document.getElementById("graph").offsetWidth-50
//remover
d3.select("#graph").selectAll("*").remove()
//canvas
 canvas=d3.select("#graph")
 .style("margin-top","40px")
.append("svg")
.attr("height",height)
.attr("width",width)
.style("display","block")
.style("box-sizing","content-box")
.style("background","#1b3b4f")
.style("color","white")
.style("margin","auto")
.append("g")
.attr("transform", "translate(30,50 )")
.style("overflow" ,"auto")


// scales
let yScale=d3.scaleLinear()
.domain([0,d3.max(graphData)])
.domain([d3.min(graphData)-1,d3.max(graphData)])
.range([height/2,0]);
//axis
var yAxis = d3.axisLeft(yScale);
//magic here
canvas.selectAll("rect")
.data(graphData)
.enter().append("rect")
.attr("x",(d,i)=>{return i*((width/graphData.length)-5)}) 

    .attr('width',()=>(width/graphData.length)-5)
    .attr("y", d => yScale(0))  //reason for upside down graph
    .attr("height", (d) => height/2-yScale(0))
    .style('fill', 'white')
   

    console.log("not waiting");

    canvas.append("g")
    .style("color","white")
    .attr("transform","translate(-5,0)")
    .call(yAxis)

    //animation for it this is for transition animation
    canvas.selectAll("rect")
    .transition()
    .duration(800)
    .attr("y", d => yScale(d))
    .attr("height",(d) => height/2-yScale(d))
    .delay((d,i) => {console.log(i); return i*150})
    //output string
    let output=document.getElementById("outputSpan")
output.innerHTML=`
<center>
<h2>your data</h2>
<div id="mydiv"> Data =${graphData}
<br>
max value=${d3.max(graphData)}

<br>
min value=${d3.min(graphData)}
<br>
</div>
</center>


`    
}
   }
  const change=()=>{
    document.getElementById("myData").value=changeData; 
  }