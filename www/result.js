const init=function(e){
   
    var res=JSON.parse(localStorage.getItem('hey'));
console.log(res.length);
console.log(res[1]);

    document.getElementById("no_att").innerHTML=res[(res.length)-2];
    document.getElementById("t_no_att").innerHTML=res[(res.length)-1];
    res.pop();
    res.pop();
    var n=res.length;
    var datapoints=[];
    for (var i = 0; i < n; i++) {
        datapoints.push({
          y: res[i]
        });
      }
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Attention Span"
        },
        axisY:{
            includeZero: false,
            title:"Attention Status"
        },
        axisX:{
            title:"Time in Deciseconds"
        },
        data: [{        
            type: "line",
              indexLabelFontSize: 16,
            dataPoints:datapoints
        }]
    });
    chart.render();
    
}



document.addEventListener('DOMContentLoaded',function(){init();});