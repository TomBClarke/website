var arrowkeys = [false, false, false, false],
    shootkeys = [false, false, false, false];

var BUTTON_DELAY = 300;

var KEY_LEFT  = 37,
    KEY_UP    = 38,
    KEY_RIGHT = 39,
    KEY_DOWN  = 40,
    KEY_W = 87,
    KEY_A = 65,
    KEY_S = 83,
    KEY_D = 68;

var move_left,
    move_up,
    move_right,
    move_down,
    shoot_left,
    shoot_up,
    shoot_right,
    shoot_down;
    

var lastX = 0,
    lastY = 0;
    
function verted() {
    move_left  = KEY_LEFT;
    move_up    = KEY_UP;
    move_right = KEY_RIGHT;
    move_down  = KEY_DOWN;
    shoot_left  = KEY_A;
    shoot_up    = KEY_W;
    shoot_right = KEY_D;
    shoot_down  = KEY_S;
}

function inverted() {
    move_left  = KEY_A;
    move_up    = KEY_W;
    move_right = KEY_D;
    move_down  = KEY_S;
    shoot_left  = KEY_LEFT;
    shoot_up    = KEY_UP;
    shoot_right = KEY_RIGHT;
    shoot_down  = KEY_DOWN;
}

function registerInputs() {
    verted();
    
    var main = document.getElementById("main");
    main.onkeydown = function(e) {
        var now = Date.now();
        switch (e.keyCode) {
            case shoot_left:
                shootkeys[0] = true;
                if (now - lastY > BUTTON_DELAY)
                    shootkeys[1] = shootkeys[3] = false;
                lastX = now;
                shootkeys[2] = false;
                break;
            case shoot_up:
                shootkeys[1] = true;
                if (now - lastX > BUTTON_DELAY)
                    shootkeys[0] = shootkeys[2] = false;
                lastY = now;
                shootkeys[3] = false;
                break;
            case shoot_right:
                shootkeys[2] = true;
                if (now - lastY > BUTTON_DELAY)
                    shootkeys[1] = shootkeys[3] = false;
                lastX = now;
                shootkeys[0] = false;
                break;
            case shoot_down:
                shootkeys[3] = true;
                if (now - lastX > BUTTON_DELAY)
                    shootkeys[0] = shootkeys[2] = false;
                lastY = now;
                shootkeys[1] = false;
                break;
            case move_left:
                arrowkeys[0] = true;
                break;
            case move_up:
                arrowkeys[1] = true;
                break;
            case move_right:
                arrowkeys[2] = true;
                break;
            case move_down:
                arrowkeys[3] = true;
                break;
        }
    };

    main.onkeyup = function(e) {
        switch (e.keyCode) {
            case move_left:
                arrowkeys[0] = false;
                break;
            case move_up:
                arrowkeys[1] = false;
                break;
            case move_right:
                arrowkeys[2] = false;
                break;
            case move_down:
                arrowkeys[3] = false;
                break;
        }
    };
    
    document.getElementById("inverted").onclick = function(e) {
        if (this.checked) {
            inverted();
        } else {
            verted();
        }
    };
}