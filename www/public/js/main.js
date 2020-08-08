window.onload = function () {
  //time of inactivity after which questions are displayed
  var timeLeft=100;
  //start the webgazer tracker
  webgazer
    .setRegression("ridge") /* currently must set regression and tracker */
    //.setTracker('clmtrackr')
    .setGazeListener(function (data, clock) {
      // console.log(data);
      if (data != null) {
        var x = Math.round(data.x);
        var y = Math.round(data.y);
        document.getElementById("x-coordinate").innerHTML = x;
        document.getElementById("y-coordinate").innerHTML = y;
        var resultContainer = document.getElementById("result");
        if (
          x < 0.15 * window.innerWidth ||
          x > 0.85 * window.innerWidth ||
          y < 0.15 * window.innerHeight ||
          y > 0.85 * window.innerHeight
        ) {
          resultContainer.innerHTML = "Warning! Student not paying attention";
          resultContainer.classList.remove("attentive");
          resultContainer.classList.add("warning");
        } else {
          resultContainer.innerHTML = "Student is attentive";
          resultContainer.classList.remove("warning");
          resultContainer.classList.add("attentive");
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
            "Face not detected. Please answer the questions to confirm you are present"
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
