function setup() {"use strict";
    var canvas = document.getElementById('myCanvas');
    var slider = document.getElementById('slider');
    slider.value = 50;
    function draw(){
        var context = canvas.getContext('2d');
        canvas.width = canvas.width;

        function moveToTx(x,y,Tx){
            var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.moveTo(res[0],res[1]);
        }

        function lineToTx(x,y,Tx){
            var res=vec2.create(); vec2.transformMat3(res,[x,y],Tx); context.lineTo(res[0],res[1]);
        }

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
        function character(Tx){
            context.beginPath();
            context.arc(slider.value,40,30,0,2*Math.PI);
            context.fill();
            moveToTx(0,0,Tx);
            lineToTx(0,70,Tx);
            context.stroke();
        }
        function arm(Tx){
            context.beginPath();
            moveToTx(0,0,Tx);
            lineToTx(30,0,Tx)
            context.stroke();
        }
        function leg(Tx){
            context.beginPath();
            moveToTx(0,0,Tx);
            lineToTx(0,30,Tx);
            context.stroke();
        }

        sky();
        dirt();
        var value = slider.value-50;
        context.fillStyle = "#000000";
        context.strokeStyle = "#000000";

        var body_to_canvas = mat3.create();
        mat3.fromTranslation(body_to_canvas,[slider.value,60]);
        character(body_to_canvas);

        var arm_to_body = mat3.create();
        mat3.fromTranslation(arm_to_body,[0,15]);
        mat3.rotate(arm_to_body,arm_to_body,(130-value)*Math.PI/180);
        var arm_to_canvas = mat3.create();
        mat3.multiply(arm_to_canvas,body_to_canvas,arm_to_body);
        arm(arm_to_canvas);

        var arm1_to_arm = mat3.create();
        mat3.fromTranslation(arm1_to_arm,[30,0]);
        mat3.rotate(arm1_to_arm,arm1_to_arm,(-75-(value/2))*Math.PI/180);
        var arm1_to_canvas = mat3.create();
        mat3.multiply(arm1_to_canvas,arm_to_canvas,arm1_to_arm);
        arm(arm1_to_canvas);

        var leg_to_body = mat3.create();
        mat3.fromTranslation(leg_to_body,[0,70]);
        mat3.rotate(leg_to_body,leg_to_body,(-20+value)*Math.PI/180);
        var leg_to_canvas = mat3.create();
        mat3.multiply(leg_to_canvas,body_to_canvas,leg_to_body);
        leg(leg_to_canvas);

        var leg1_to_leg = mat3.create();
        mat3.fromTranslation(leg1_to_leg,[0,30]);
        mat3.rotate(leg1_to_leg,leg1_to_leg,15*Math.PI/180);
        var leg1_to_canvas = mat3.create();
        mat3.multiply(leg1_to_canvas,leg_to_canvas,leg1_to_leg);
        leg(leg1_to_canvas);

        var leg2_to_body = mat3.create();
        mat3.fromTranslation(leg2_to_body,[0,70]);
        mat3.rotate(leg2_to_body,leg2_to_body,(20-value)*Math.PI/180);
        var leg2_to_canvas = mat3.create();
        mat3.multiply(leg2_to_canvas,body_to_canvas,leg2_to_body);
        leg(leg2_to_canvas);

        var leg3_to_canvas = mat3.create();
        mat3.multiply(leg3_to_canvas,leg2_to_canvas,leg1_to_leg);
        leg(leg3_to_canvas);
    }
    slider.addEventListener("input",draw);
    draw();
}
window.onload = setup;