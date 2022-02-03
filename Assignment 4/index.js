function setup() {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  var slider1 = document.getElementById("slider1");
  slider1.value = -25;
  var img = new Image();
  img.src = "hiker.png";
  img.onload = function () {
    draw();
  };

  function draw() {
    canvas.width = canvas.width;
    var tParam = slider1.value * 0.01;

    function moveToTx(loc, Tx) {
      var res = vec2.create();
      vec2.transformMat3(res, loc, Tx);
      context.moveTo(res[0], res[1]);
    }

    function lineToTx(loc, Tx) {
      var res = vec2.create();
      vec2.transformMat3(res, loc, Tx);
      context.lineTo(res[0], res[1]);
    }

    function drawImageToTx(loc, Tx) {
      var res = vec2.create();
      vec2.transformMat3(res, loc, Tx);
      context.drawImage(img, res[0], res[1]);
    }

    function drawObject(Tx) {
      drawImageToTx([-0.1, 0.2], Tx);
    }

    var Hermite = function (t) {
      return [
        2 * t * t * t - 3 * t * t + 1,
        t * t * t - 2 * t * t + t,
        -2 * t * t * t + 3 * t * t,
        t * t * t - t * t,
      ];
    };

    function Cubic(basis, P, t) {
      var b = basis(t);
      var result = vec2.create();
      vec2.scale(result, P[0], b[0]);
      vec2.scaleAndAdd(result, result, P[1], b[1]);
      vec2.scaleAndAdd(result, result, P[2], b[2]);
      vec2.scaleAndAdd(result, result, P[3], b[3]);
      return result;
    }

    var p0 = [0, 0];
    var d0 = [1, 2];
    var p1 = [1, 2];
    var d1 = [2, 3];
    var p2 = [3, -1];
    var d2 = [1, 1];

    var P0 = [p0, d0, p1, d1];
    var P1 = [p1, d1, p2, d2];

    var C0 = function (t_) {
      return Cubic(Hermite, P0, t_);
    };
    var C1 = function (t_) {
      return Cubic(Hermite, P1, t_);
    };

    var Ccomp = function (t) {
      if (t < 1) {
        var u = t;
        return C0(u);
      } else {
        var u = t - 1.0;
        return C1(u);
      }
    };

    function drawTrajectory(t_begin, t_end, intervals, C, Tx, color) {
      context.strokeStyle = "#362419";
      context.fillStyle = color;
      context.beginPath();
      moveToTx(C(t_begin), Tx);
      for (var i = 1; i <= intervals; i++) {
        var t =
          ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
        lineToTx(C(t), Tx);
      }
      context.stroke();
      context.fill();
    }

    function drawSky(){
      context.strokeStyle = "#87CEEB";
      context.fillStyle = "#87CEEB";
      context.beginPath();
      context.rect(0,0,400,350);
      context.stroke();
      context.fill();
    }

    function drawGround(){
      context.strokeStyle = "#567d46";
      context.fillStyle = "#567d46";
      context.beginPath();
      context.rect(0,350,400,50);
      context.stroke();
      context.fill();
    }

    function drawSun(){
      context.fillStyle = "yellow";
      context.beginPath();
      context.arc(0,0,50,0,2*Math.PI);
      context.fill();
    }

    function drawBackground(){
      drawSky();
      drawGround();
      drawSun();
      context.strokeStyle = "#5C4033";
      context.fillStyle = "#5C4033";
      context.beginPath();
      context.moveTo(50,350);
      context.lineTo(200,50);
      context.lineTo(400,350);
      context.closePath();
      context.lineWidth = 2;
      context.stroke();
      context.fill();
    }

    drawBackground();
    var mountain_to_canvas = mat3.create();
    mat3.fromTranslation(mountain_to_canvas, [50, 350]);
    mat3.scale(mountain_to_canvas, mountain_to_canvas, [150, -150]);

    drawTrajectory(0.0, 1.0, 100, C0, mountain_to_canvas, "#5C4033");
    drawTrajectory(0.0, 1.0, 100, C1, mountain_to_canvas, "#5C4033");
    var hiker_to_mountain = mat3.create();
    mat3.fromTranslation(hiker_to_mountain, Ccomp(tParam));
    var hiker_to_canvas = mat3.create();
    mat3.multiply(hiker_to_canvas, mountain_to_canvas, hiker_to_mountain);
    drawObject(hiker_to_canvas);
  }

  slider1.addEventListener("input", draw);
}
window.onload = setup;
