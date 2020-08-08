var t=0;
var x_array=[0,1];
var time=0;
var time_com=0;
var total_time=0;
var time2=0;
var time_com2=0;
var total_time2=0;
window.onload = function () {
  //time of inactivity after which questions are displayed
  var timeLeft = 100;
  //start the webgazer tracker
  webgazer
    .setRegression("ridge") /* currently must set regression and tracker */
    //.setTracker('clmtrackr')
    .setGazeListener(function (data, clock) {
      // console.log(data);
      // Requiring fs module in which
      // writeFile function is defined.
      if (data != null) {
        var x = Math.round(data.x);
        var y = Math.round(data.y);
        console.log(x);
        document.getElementById("x-coordinate").innerHTML = x;
        document.getElementById("y-coordinate").innerHTML = y;
        var resultContainer = document.getElementById("result");
        if (
          x < 0.15 * window.innerWidth ||
          x > 0.85 * window.innerWidth ||
          y < 0.15 * window.innerHeight ||
          y > 0.85 * window.innerHeight
        ) {
          t++;
          x_array.push(0);
          resultContainer.innerHTML = "Warning! Student not paying attention";
          resultContainer.classList.remove("attentive");
          resultContainer.classList.add("warning");
        } else {
          t=0;
          x_array.push(1);
          resultContainer.innerHTML = "Student is attentive";
          resultContainer.classList.remove("warning");
          resultContainer.classList.add("attentive");
        }
        if(t>=50){
          console.log("showing sheet");
          document.getElementById("myModal").style.display = "block";
          time =new Date().getTime();

        }
      } else {
        timeLeft--;
        console.log(timeLeft);
        if (timeLeft == -1) {
          timeLeft = 100;
          doSomething();
        }

        function doSomething() {
          alert(
            "Face not detected. Please confirm you Presence."
          );
        }
      }
    })
    .begin()
    .showPredictionPoints(
      true
    ); /* shows a square every 100 milliseconds where current prediction is */

  //Set up the webgazer video feedback.
  var setup = function () {
    //Set up the main canvas. The main canvas is used to calibrate the webgazer.
    var canvas = document.getElementById("plotting_canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "fixed";
  };
  var nw=document.getElementById("cc");
  nw.onclick=function(){
    x_array.push(time_com);
    x_array.push(total_time);
    localStorage.setItem('hey',JSON.stringify(x_array));
window.document.location='./result.html';
  };


  {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
      modal.style.display = "none";
      if(new Date().getTime()-time>100){
        time_com++;
        total_time=total_time + new Date().getTime()-time;
            }
    }
    
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        if(new Date().getTime()-time>100){
          time_com++;
          total_time=total_time + new Date().getTime()-time;
              }
      }
    }
  }
  function checkIfReady() {
    if (webgazer.isReady()) {
      setup();
    } else {
      setTimeout(checkIfReady, 100);
    }
  }
  setTimeout(checkIfReady, 100);
};

// Kalman Filter defaults to on. Can be toggled by user.
window.applyKalmanFilter = true;

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

window.onbeforeunload = function () {
  webgazer.end();
};

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
function Restart() {
  document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
  ClearCalibration();
  PopUpInstruction();
}

/**
 * Show the graph
 */