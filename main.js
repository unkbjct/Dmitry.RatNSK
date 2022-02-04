var 
    //canvas variables
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    animStatus = false,
    animFrame,
    rgbMoveStatus,
    gravityStatus,
    closeSpaceStatus,

    //settings (in html) variables
    settings_turn = document.querySelector('.settings-button'),
    modalSettings = document.querySelector('.settings-modal'),
    settingsCurrent = false,
    saveButton = document.querySelector('.button-save');


// open modal settings
settings_turn.onclick = function(){
    if (settingsCurrent == false) { 
        modalSettings.classList.add('_active-visibile');
        settings_turn.style.transform = 'rotate(360deg)'
        settingsCurrent = true;
    }else {
        modalSettings.classList.remove('_active-visibile');
        settings_turn.style.transform = 'rotate(0deg)'
        settingsCurrent = false;
    }
}

// save changies canvas in html
saveButton.onclick = function(){

    w = canvas.width = document.documentElement.clientWidth;
    h = canvas.height = document.documentElement.clientHeight;

    countElement = Number(document.getElementById('countElement').value);
    vertical_speed = Number(document.getElementById('vertical_speed').value);
    horizontal_speed = Number(document.getElementById('horizontal_speed').value);
    height_elem = Number(document.getElementById('height').value);
    width_elem = Number(document.getElementById('width').value);
    rgbMoveCheck = document.getElementById('rgbMove');
    if (rgbMoveCheck.checked) {
        rgbMoveStatus = true;
    }else {
        rgbMoveStatus = false;
    }
    gravityCheck = document.getElementById('gravity');
    if (gravityCheck.checked) {
        gravityStatus = true;
    }else {
        gravityStatus = false;
    }
    closeSpaceCheck = document.getElementById('closeSpace');
    if (closeSpaceCheck.checked) {
        closeSpaceStatus = true;
    }else {
        closeSpaceStatus = false;
    }

    //restart animation
    ctx.clearRect(0, 0, w, h);
    window.cancelAnimationFrame(animFrame);
    Lines.splice(0, Lines.length)
    animFrame = requestAnimationFrame(anim);
    anim(); 
    window.cancelAnimationFrame(animFrame);
}

// function to random number
function random(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}   

//CANVAS START -----------------------------------------------
class line {
    constructor(x, y, velX, velY, width, height, colorStage) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.width = width;
        this.height = height;
        this.colorStage = colorStage;
    }
    draw() {
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'hsl(' + this.colorStage + ', 80%, 50%)';
        ctx.closePath();
        ctx.fill();
    }
    update(){
        if (closeSpaceStatus == false) {
            if (this.x > w + this.width && horizontal_speed > 0) {
                this.x = 0 - this.width;
                // this.colorStage = 0;
            }
            if (this.x < 0 - this.width + 1 && horizontal_speed < 0) {
                this.x = w + this.width;
            }
            if (this.y > h && vertical_speed < 0) { 
                this.y = 0;
                this.velY = -vertical_speed;
            }
            if (this.y > h && vertical_speed > 0) {
                this.velY = vertical_speed;
                this.y = 0 - this.height;
            }
            if (this.y < 0 && vertical_speed < 0) { 
                this.y = h;
                this.velY = vertical_speed;
            }
        }else if (closeSpaceStatus == true){
            if (this.x + this.width > w || this.x < 1) {
                this.velX = -this.velX;
            }
            if (this.y + this.height > h || this.y < 1) { 
                this.velY = -this.velY;
            }
        }
        if (rgbMoveStatus == true) {
            this.color = 'hsl(' + Number(this.colorStage += 2) + ', 100%, 50%)';
        }
        if (gravityStatus == true) {
            this.velY += .05;
        }
        this.x += this.velX;
        this.y += this.velY;
    }
}

var Lines = [];
// animation
function anim(){
    // ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0, 0, 0, .2)';
    ctx.fillRect(0, 0, w, h);

    let count = countElement,
        x = 0,
        color = 360;
    while (Lines.length <= count) {
        x += w / count;
        color -= 360 / count;
        var Line = new line(x, random(0, h), horizontal_speed, vertical_speed, width_elem, height_elem, color);
        Lines.push(Line);
    }

    for (var i = 0; i < Lines.length; i++) {
        Lines[i].draw();
        Lines[i].update();
    }
    animFrame = requestAnimationFrame(anim);
}
//CANVAS END -----------------------------------------------