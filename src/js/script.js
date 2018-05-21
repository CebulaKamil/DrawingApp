$(function(){
    let paint = false;
    let paint_erase = "paint";
    const canvas = $("#paint");
    const context = canvas[0].getContext('2d');
    const canvasContainer = $("#canvas-container");
    const mouse = {x: 0, y: 0};
    const erase = $("#erase");
    const resetButton = $("#reset");
    const saveButton = $("#save");
    const colorInput = $("#paintColor");
    const circle = $("#circle");

    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";
    canvasContainer.mousedown(function(e) {
        paint = true;
        context.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.moveTo(mouse.x, mouse.y); 
    });

    const reload = function() { 
        context.clearRect(0, 0, canvas[0].width, canvas[0].height);
    }

    if(localStorage.getItem("imgCanvas") != null) {
        const img = new Image();
        img.onload = function() {
            context.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    }

    canvasContainer.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if (paint == true) {
            if (paint_erase == "paint") {
                context.strokeStyle = colorInput.val();
            } else {
                context.strokeStyle = "white";
            }
            context.lineTo(mouse.x, mouse.y);
            context.stroke();
        }
    });
    
    canvasContainer.mouseup(function() {
        paint = false;
    });

    canvasContainer.mouseleave(function() {
        paint = false;
    });

    const save = function() {
        if(typeof(localStorage) != null) {
            localStorage.setItem("imgCanvas", canvas[0].toDataURL());
        }else {
            window.alert("Your browser does support local storage!");
        }
    }

    erase.click(function() {
        if(paint_erase == "paint") {
            paint_erase = "erase";
            erase.css("background-color", "red");
        }else {
            erase.css("background-color", "white");
            paint_erase = "paint";
        }
    });

    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        }
    });

    colorInput.change(function() {
        circle.css("background-color", $(this).val());
    })

    saveButton.click(save);
    resetButton.click(reload);
});