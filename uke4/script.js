// Model
let food = 55;
let foodbarPx;
let energy = 75;
let energybarPx;
let clean = 55;
let cleanbarPx;
let sleepDuration = 0;
let isAsleep = false;
let bunnyImg = "bunny_idle.png";


view();
setInterval(bardown, 5000);
// View
function view() {
    updateBarPixels()

    document.getElementById("app").innerHTML =/*HTML*/`
    <div class="main">
        <div class="screen">
        <div class="barContainer">
            <div class="foodBox">🥕<div class="progress-bar"><div class="progress-bar-fill" style="width: ${foodbarPx}px"></div></div></div>
            <div class="foodBox">⚡<div class="progress-bar"><div class="progress-bar-fill" style="width: ${energybarPx}px"></div></div></div>
            <div class="foodBox">🧼<div class="progress-bar"><div class="progress-bar-fill" style="width: ${cleanbarPx}px"></div></div></div>
        </div>
        <div class="imgBox"><img class="img" src="${bunnyImg}"></div>
        </div>
        <div class="buttonalign">
            <button class="button"onclick="feed()">Feed</button>
            <button class="button" onclick="wash()">Wash</button>
        </div>
        <button class="button reset" onclick="reset()">Reset</button>
    </div>
    
    `
}

function updateBarPixels() {
    let maxPixelWidth = 50;
    
    foodbarPx = Math.round((food / 100) * maxPixelWidth);
    energybarPx = Math.round((energy / 100) * maxPixelWidth);
    cleanbarPx = Math.round((clean / 100) * maxPixelWidth);
}

/* end of View*/

// Controller
function feed() {
    if (food < 91) {
        food += 10;
        clean -= 15;
        energy += 5;

        if (food > 100) {
            food = 100;
        }
        if (energy > 100) {
            energy = 100;
        }
    }
    else if (food >= 91) {
        return
    }
    view();

}
/* Operator for feed, Need 10 energy per feed, feed +20? yes*/
/* skal vi bruke value eller?*/
/* endring av modell for food */

function wash() {

    if (clean < 90 && energy >= 10) {
        energy -= 10;
        clean += 20;
    }
    else if (food >= 80) {
        return
    }
    if (energy < 0) { energy = 0; }
    view();
    /* Operator for clean*/
    /* endring av modell for clean */
}

function reset() {
    /* fy faen for et latskap refresh page */
    location.reload();
}

function bardown() {

    let ConsumptionRate = 15;

    if (isAsleep) {
        ConsumptionRate = 1;

        energy += Math.ceil(Math.random() * 20);

        if (energy >= 100){
            energy = 100;
            isAsleep = false;
            bunnyImg = "bunny_idle.png";
        }
    }
    else {
        energy -= Math.ceil(Math.random() * ConsumptionRate);
    }

    food -= Math.ceil(Math.random() * ConsumptionRate);
    clean -= Math.ceil(Math.random() * ConsumptionRate);

    if (energy < 0) { 
        goToSleep();
        energy = 0; 
    }
    if (food <= 15) {
        isAsleep = true;
        bunnyImg = "bunny_sad.png";
    }
    
    if (food < 0) { 
        food = 0; 
        bunnyImg = "bunny_dead.png";
    } else if (food >= 50) {

     }
    if (clean < 0) {
         clean = 0; 
    }
    
    if (food <= 30 ||  clean <= 30) {
        bunnyImg = "bunny_sad.png";
    }

    if (food >= 60 && energy >= 50 && clean >= 60) {
        bunnyImg = "bunny_happy.png";
    }

    view();
}

function goToSleep() {
    isAsleep = true;
    bunnyImg = "bunny_sleep.png";
}