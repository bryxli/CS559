function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var slider = document.getElementById('slider');
  slider.value = 0;
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    
    function drawBG(color){ //draws sky
        context.beginPath();
        context.fillStyle = color;
        context.rect(0,0,400,400);
        context.fill();
    }

    function DrawSun(color) { //draws sun
      context.beginPath();
      context.fillStyle = color;
      context.arc(150,300,250,0,2*Math.PI);
      context.fill();   

      context.beginPath();
      context.moveTo(100,100);
      context.lineTo(100,150);
      context.moveTo(200,100);
      context.lineTo(200,150);
      context.stroke();

      context.beginPath(); //draws face
      context.fillStyle = "#e56d7e";
      if(slider.value == 1)
        context.fillStyle = "#b8696a";
      else if(slider.value == 2)
        context.fillStyle = "#8b160e";
      context.moveTo(80,210);
      context.lineTo(220,210);
      context.lineTo(170,275);
      context.lineTo(130,275);
      context.closePath();
      context.fill();
    }
    
    //color1 - sky, color2 - sun
    var color1 = "#87CEEB";
    var color2 = "yellow";
    if(slider.value == 1){
        color1 = "#3e6fd6";
        color2 = "orange";
    }
    else if(slider.value == 2){
        color1 = "#1450a3";
        color2 = "#ff4500";
    }
    drawBG(color1);
    DrawSun(color2);
  }
  slider.addEventListener("input",draw);
  draw();
}
window.onload = setup;