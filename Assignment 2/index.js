function setup() {"use strict";
    var canvas = document.getElementById('myCanvas');
    var slider = document.getElementById('slider');
    slider.value = 50;
    function draw(){
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;

        function sky(){
            context.beginPath();
            context.fillStyle = "#87CEEB";
            context.rect(0,0,200,150);
            context.fill();
        }
        function dirt(){
            context.beginPath();
            context.fillStyle = "#836539";
            context.rect(0,150,200,50)
            context.fill();
        }
        function character(){
            context.beginPath();
            context.arc(slider.value,40,30,0,2*Math.PI);
            context.fill();
            context.moveTo(slider.value,60);
            context.lineTo(slider.value,130);
            context.stroke();
        }
        function arm(){
            context.beginPath();
            context.moveTo(0,0);
            context.lineTo(30,0)
            context.stroke();
        }
        function leg(){
            context.beginPath();
            context.moveTo(0,0);
            context.lineTo(0,30);
            context.stroke();
        }

        sky();
        dirt();
        var value = slider.value-50;
        context.fillStyle = "#000000";
        context.strokeStyle = "#000000";
        character();
        context.save();
        context.translate(slider.value,75);
        context.rotate((130-value)*Math.PI/180);
        arm();
        context.translate(30,0);
        context.rotate((-75-(value/2))*Math.PI/180);
        arm();
        context.restore();
        context.save();
        context.translate(slider.value,130);
        context.rotate((-20+value)*Math.PI/180);
        leg();
        context.translate(0,30);
        context.rotate(15*Math.PI/180);
        leg();
        context.restore();
        context.translate(slider.value,130);
        context.rotate((20-value)*Math.PI/180);
        leg();
        context.translate(0,30);
        context.rotate(15*Math.PI/180);
        leg();
    }
    slider.addEventListener("input",draw);
    draw();
}
window.onload = setup;