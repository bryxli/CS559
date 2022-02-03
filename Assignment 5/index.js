function setup() {
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");
  var slider1 = document.getElementById("slider1");
  slider1.value = 5;
  var slider2 = document.getElementById("slider2");
  slider2.value = 30;

  function draw() {
    canvas.width = canvas.width;
    var viewAngle = slider1.value * 0.02 * Math.PI;

    function moveToTx(loc, Tx) {
      var res = vec3.create();
      vec3.transformMat4(res, loc, Tx);
      context.moveTo(res[0], res[1]);
    }

    function lineToTx(loc, Tx) {
      var res = vec3.create();
      vec3.transformMat4(res, loc, Tx);
      context.lineTo(res[0], res[1]);
    }

    function drawRobot(color, Tx) {
      var legl_to_canvas = mat4.create();
      mat4.fromTranslation(legl_to_canvas, [-5, -32, 0]);
      mat4.multiply(legl_to_canvas, Tx, legl_to_canvas);
      drawLeg(color, legl_to_canvas);

      var legr_to_canvas = mat4.create();
      mat4.fromTranslation(legr_to_canvas, [2, -32, 0]);
      mat4.multiply(legr_to_canvas, Tx, legr_to_canvas);
      drawLeg(color, legr_to_canvas);

      var body_to_canvas = mat4.create();
      mat4.fromTranslation(body_to_canvas, [-2, 0, 6.5]);
      mat4.multiply(body_to_canvas, legl_to_canvas, body_to_canvas);

      var arml_to_canvas = mat4.create();
      mat4.fromTranslation(arml_to_canvas, [0, 14, 0]);
      mat4.rotateZ(arml_to_canvas, arml_to_canvas, (-100 * Math.PI) / 180);
      mat4.multiply(arml_to_canvas, body_to_canvas, arml_to_canvas);
      drawArm(color, arml_to_canvas);

      var armr1_to_canvas = mat4.create();
      mat4.fromTranslation(armr1_to_canvas, [15, 14, 0]);
      mat4.rotateZ(
        armr1_to_canvas,
        armr1_to_canvas,
        (slider2.value * Math.PI) / 180
      );
      mat4.scale(armr1_to_canvas, armr1_to_canvas, [0.5, 1, 1]);
      mat4.multiply(armr1_to_canvas, body_to_canvas, armr1_to_canvas);

      var armr2_to_canvas = mat4.create();
      mat4.fromTranslation(armr2_to_canvas, [15, 0, 0]);
      mat4.rotateZ(armr2_to_canvas, armr2_to_canvas, (50 * Math.PI) / 180);
      mat4.multiply(armr2_to_canvas, armr1_to_canvas, armr2_to_canvas);

      drawBody(color, body_to_canvas);

      var neck_to_canvas = mat4.create();
      mat4.fromTranslation(neck_to_canvas, [6.5, 17, -6.5]);
      mat4.multiply(neck_to_canvas, body_to_canvas, neck_to_canvas);
      drawNeck(color, neck_to_canvas);

      var head_to_canvas = mat4.create();
      mat4.fromTranslation(head_to_canvas, [-5, 3, 5]);
      mat4.multiply(head_to_canvas, neck_to_canvas, head_to_canvas);
      drawHead(color, head_to_canvas);

      drawArm(color, armr1_to_canvas);
      drawArm(color, armr2_to_canvas);
    }

    function drawHead(color, Tx) {
      context.strokeStyle = "black";
      context.fillStyle = color;
      context.beginPath();
      moveToTx([0, 0, 0], Tx);
      lineToTx([12, 0, 0], Tx);
      lineToTx([12, 12, 0], Tx);
      lineToTx([0, 12, 0], Tx);
      lineToTx([0, 0, 0], Tx); //front face
      context.fill();
      moveToTx([0, 0, 0], Tx);
      lineToTx([0, 0, -12], Tx);
      lineToTx([12, 0, -12], Tx);
      lineToTx([12, 0, 0], Tx); //bottom face
      context.fill();
      moveToTx([0, 0, 0], Tx);
      lineToTx([0, 12, 0], Tx);
      lineToTx([0, 12, -12], Tx);
      lineToTx([0, 0, -12], Tx); //left face
      context.fill();
      moveToTx([12, 0, 0], Tx);
      lineToTx([12, 12, 0], Tx);
      lineToTx([12, 12, -12], Tx);
      lineToTx([12, 0, -12], Tx); //right face
      context.fill();
      moveToTx([0, 12, -12], Tx);
      lineToTx([12, 12, -12], Tx);
      lineToTx([12, 12, 0], Tx);
      lineToTx([0, 12, 0], Tx); //top face
      context.fill();
      context.stroke();
    }

    function drawNeck(color, Tx) {
      context.strokeStyle = "black";
      context.fillStyle = color;
      context.beginPath();
      moveToTx([0, 0, 0], Tx);
      lineToTx([2, 0, 0], Tx);
      lineToTx([2, 3, 0], Tx);
      lineToTx([0, 3, 0], Tx);
      lineToTx([0, 0, 0], Tx); //front face
      context.fill();
      moveToTx([0, 0, 0], Tx);
      lineToTx([0, 0, -2], Tx);
      lineToTx([2, 0, -2], Tx);
      lineToTx([2, 0, 0], Tx); //bottom face
      context.fill();
      moveToTx([0, 0, 0], Tx);
      lineToTx([0, 3, 0], Tx);
      lineToTx([0, 3, -2], Tx);
      lineToTx([0, 0, -2], Tx); //left face
      context.fill();
      moveToTx([2, 0, 0], Tx);
      lineToTx([2, 3, 0], Tx);
      lineToTx([2, 3, -2], Tx);
      lineToTx([2, 0, -2], Tx); //right face
      context.fill();
      moveToTx([0, 3, -2], Tx);
      lineToTx([2, 3, -2], Tx);
      lineToTx([2, 3, 0], Tx);
      lineToTx([0, 3, 0], Tx); //top face
      context.fill();
      context.stroke();
    }

    function drawBody(color, Tx) {
      context.strokeStyle = "black";
      context.fillStyle = color;
      context.beginPath();
      moveToTx([0, 0, 0], Tx);
      lineToTx([15, 0, 0], Tx);
      lineToTx([15, 17, 0], Tx);
      lineToTx([0, 17, 0], Tx);
      lineToTx([0, 0, 0], Tx); //front face
      context.fill();
      moveToTx([0, 0, 0], Tx);
      lineToTx([0, 0, -15], Tx);
      lineToTx([15, 0, -15], Tx);
      lineToTx([15, 0, 0], Tx); //bottom face
      context.fill();
      moveToTx([0, 0, 0], Tx);
      lineToTx([0, 17, 0], Tx);
      lineToTx([0, 17, -15], Tx);
      lineToTx([0, 0, -15], Tx); //left face
      context.fill();
      moveToTx([15, 0, 0], Tx);
      lineToTx([15, 17, 0], Tx);
      lineToTx([15, 17, -15], Tx);
      lineToTx([15, 0, -15], Tx); //right face
      context.fill();
      moveToTx([0, 17, -15], Tx);
      lineToTx([15, 17, -15], Tx);
      lineToTx([15, 17, 0], Tx);
      lineToTx([0, 17, 0], Tx); //top face
      context.fill();
      context.stroke();
    }

    function drawLeg(color, Tx) {
      context.strokeStyle = "black";
      context.fillStyle = color;
      context.beginPath();
      moveToTx([0, 0, 0], Tx);
      lineToTx([4, 0, 0], Tx);
      lineToTx([4, -15, 0], Tx);
      lineToTx([0, -15, 0], Tx);
      lineToTx([0, 0, 0], Tx);
      context.fill();
      moveToTx([0, 0, 0], Tx);
      lineToTx([0, 0, -4], Tx);
      lineToTx([4, 0, -4], Tx);
      lineToTx([4, 0, 0], Tx);
      context.fill();
      moveToTx([0, 0, 0], Tx);
      lineToTx([0, -15, 0], Tx);
      lineToTx([0, -15, -4], Tx);
      lineToTx([0, 0, -4], Tx);
      context.fill();
      moveToTx([4, 0, 0], Tx);
      lineToTx([4, -15, 0], Tx);
      lineToTx([4, -15, -4], Tx);
      lineToTx([4, 0, -4], Tx);
      context.fill();
      moveToTx([0, -15, -4], Tx);
      lineToTx([4, -15, -4], Tx);
      lineToTx([4, -15, 0], Tx);
      lineToTx([0, -15, 0], Tx);
      context.fill();
      context.stroke();
    }

    function drawArm(color, Tx) {
      context.strokeStyle = "black";
      context.fillStyle = color;
      context.beginPath();
      moveToTx([0, 0, 0], Tx);
      lineToTx([15, 0, 0], Tx);
      lineToTx([15, -4, 0], Tx);
      lineToTx([0, -4, 0], Tx);
      lineToTx([0, 0, 0], Tx);
      context.fill();
      moveToTx([0, 0, 0], Tx);
      lineToTx([0, 0, -15], Tx);
      lineToTx([15, 0, -15], Tx);
      lineToTx([15, 0, 0], Tx);
      context.fill();
      moveToTx([0, 0, 0], Tx);
      lineToTx([0, -4, 0], Tx);
      lineToTx([0, -4, -15], Tx);
      lineToTx([0, 0, -15], Tx);
      context.fill();
      moveToTx([15, 0, 0], Tx);
      lineToTx([15, -4, 0], Tx);
      lineToTx([15, -4, -15], Tx);
      lineToTx([15, 0, -15], Tx);
      context.fill();
      moveToTx([0, -4, -15], Tx);
      lineToTx([15, -4, -15], Tx);
      lineToTx([15, -4, 0], Tx);
      lineToTx([0, -4, 0], Tx);
      context.fill();
      context.stroke();
    }

    var Tviewport = mat4.create();
    mat4.fromTranslation(Tviewport, [200, 150, 0]);
    mat4.scale(Tviewport, Tviewport, [100, -100, 1]);

    var Tprojection = mat4.create();
    mat4.ortho(Tprojection, -10, 10, -10, 10, -1, 1);

    var tVP_PROJ = mat4.create();
    mat4.multiply(tVP_PROJ, Tviewport, Tprojection);

    var locCamera = vec3.create();
    var distCamera = 40.0;
    locCamera[0] = distCamera * Math.sin(viewAngle);
    locCamera[1] = 10;
    locCamera[2] = distCamera * Math.cos(viewAngle);
    var locTarget = vec3.fromValues(0, 0, 0);
    var vecUp = vec3.fromValues(0, 1, 0);
    var TlookAt = mat4.create();
    mat4.lookAt(TlookAt, locCamera, locTarget, vecUp);

    var tVP_PROJ_CAM = mat4.create();
    mat4.multiply(tVP_PROJ_CAM, tVP_PROJ, TlookAt);
    drawRobot("gray", tVP_PROJ_CAM);
  }

  slider1.addEventListener("input", draw);
  slider2.addEventListener("input", draw);
  draw();
}
window.onload = setup;
