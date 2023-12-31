
/* Deklarer og definerer variabler som vi skal bruke til funksjoner senere, 
for eksempel array som er en mapppe/gruppe for filer/variabler */
const mainInv = ["potion", "armor", "herb","ore","clover","potion2","potion3","goldore","helmet"]; /* Array Tom */

/* Deklarer og definerer hvilke aktiv bag som er åpen akkurat nå til å starte med */
var currentBag = "bagPots";


/* []; er verdien for å deklarere at det er en "Array", vi lagde disse for å lagre inn items fra inventory */
const bagPots = []; /* Array Tom */
var bagPotsCount = 0;
const bagGear = []; /* Array Tom */
var bagGearCount = 0;
const bagHerbs = []; /* Array Tom */
var bagHerbsCount = 0;
const bagOres = []; /* Array Tom */
var bagOresCount = 0;

/* Funksjon for å legge til item fra main inventory til aktiv inventory bag
   Vi sjekker hvilke bag er aktivt, og hvilke item som blir trykket på
   Så om vi får lov, så lar vi det legges til.
*/
function addItem(item,bag,fromBag) {
    /* Sjekker hvilke bag item prøver å bli lagt til, og om det er mindre enn 15 inne allerede */
    if (bag == "bagPots" && bagPotsCount < 15)
    {
        /* Hvilke item som prøver å bli lagt til */
        if (item == "potion") {
            /* Metode funksjon til å legge til en "item" til array'en vår bagPots. Som å sette inn en fil, i en mappe. */
            bagPots.push("potion");

            /* Siden vi har nå lagt til en ny item i bagpots, må vi også si til våres kode at nå er det en ny item der inne.
                Blir brukt senere for å kalkulere hvor mange tomme ruter vi må lage */
            bagPotsCount++;

            /* Kjører extra funksjonen som fjerner item fra Main inventory */
            removeItem(fromBag,item);
        }
        if (item == "potion2") {
            bagPots.push("potion2");
            bagPotsCount++;
            removeItem(fromBag,item);
        }
        if (item == "potion3") {
            bagPots.push("potion3");
            bagPotsCount++;
            removeItem(fromBag,item);
        }
    }
    else if (bag == "bagGear" && bagGearCount < 15)
    {
        if (item == "armor") {
            bagGear.push("armor");
            bagGearCount++;
            removeItem(fromBag,item);
        }
        if (item == "helmet") {
            bagGear.push("helmet");
            bagGearCount++;
            removeItem(fromBag,item);
        }
    }
    else if (bag == "bagOres"&& bagOresCount < 15)
    {
        if (item == "ore") {
            bagOres.push("ore");
            bagOresCount++;
            removeItem(fromBag,item);
        }
        if (item == "goldore") {
            bagOres.push("goldore");
            bagOresCount++;
            removeItem(fromBag,item);
        }
    }
    else if (bag == "bagHerbs" && bagHerbsCount < 15)
    {
        if (item == "herb") {
            bagHerbs.push("herb");
            bagHerbsCount++;
            removeItem(fromBag,item);
        }
        if (item == "clover") {
            bagHerbs.push("clover");
            bagHerbsCount++;
            removeItem(fromBag,item);
        }
    }
    else if (bag == 'mainInv' && mainInv.length < 16) {
        mainInv.push(item);
        removeItem(fromBag,item);
    }
    
    /* Vi kaller funksjoner til å oppdatere inventories og bag sine innhold for å vise items */
    reloadBag(currentBag);
    reloadMainInv();
}

/* Valg av bag, også må vi oppdatere hva som vises i bag */
function selectBag(bag) {

    /* Setter currentbag som vi vil jobbe med til den som er valgt */
    currentBag = bag;

    /* Oppdaterer bag sin innhold så vi kan se riktige items */
    reloadBag(bag);
}

/* For å oppdatere hva som vises i bag, blir brukt etter valg av bag også når item blir fjernet/lagt til */
function reloadBag(bag) {

    /* Sjekker hvilke bag som skal bli oppdatert */
    if (currentBag == "bagPots") {

        /* Sjekker hvor mange "item" som er i baggen */
        let invLength = bagPots.length;

        /* Nullstiller innhold til boxen */
        document.getElementById('box1').innerHTML = "";
    
        /* Gjentar kode for hver antall "item" som er i baggen */
        for (let i = 0; i < invLength; i++) {

            /* Innholdet som blir gjentatt 
                - Vi spesifiserer at koden skal bli endret ved bruk av navnet til item som er inne i baggen ved
                bruk av bagPots[i] hvor [i] betyr index eller denne iterasjonen i gjentagelsen 
            */
            document.getElementById('box1').innerHTML += /*HTML*/`
            <div class="grid-box" onClick="addItem('${bagPots[i]}','mainInv','bagPots')"><img class="img" src="res/${bagPots[i]}.png"></div>
            `;
            /* enden av gjentagelse */
        }
        
        /* Sjekker hvor mange ruter som må bli generert gjennom mattematikk ved bruk av hvor mange item vi har fra før 
            Vi vil kun vise opp til 15 items
        */
        let extraSlots = 15 - bagPotsCount;
        for (let i = 0; i < extraSlots; i++) {
            /* Gjentagelse */
            document.getElementById('box1').innerHTML += /*HTML*/`
                <div class="grid-box"></div>
            `;
            /* Slutt av gjentagelse */
        }
    }
    else if (currentBag == "bagGear") {
        let invLength = bagGear.length;
        document.getElementById('box1').innerHTML = "";
    
        for (let i = 0; i < invLength; i++) {
            document.getElementById('box1').innerHTML += /*HTML*/`
            <div class="grid-box" onClick="addItem('${bagGear[i]}','mainInv','bagGear')"><img class="img" src="res/${bagGear[i]}.png"></div>
            `;
        }
        
        let extraSlots = 15 - bagGearCount;
        for (let i = 0; i < extraSlots; i++) {
            document.getElementById('box1').innerHTML += /*HTML*/`
                <div class="grid-box"></div>
            `;
        }
    }
    else if (currentBag == "bagHerbs") {
        let invLength = bagHerbs.length;
        document.getElementById('box1').innerHTML = "";
    
        for (let i = 0; i < invLength; i++) {
            document.getElementById('box1').innerHTML += /*HTML*/`
            <div class="grid-box" onClick="addItem('${bagHerbs[i]}','mainInv','bagHerbs')"><img class="img" src="res/${bagHerbs[i]}.png"></div>
            `;
        }
        
        let extraSlots = 15 - bagHerbsCount;
        for (let i = 0; i < extraSlots; i++) {
            document.getElementById('box1').innerHTML += /*HTML*/`
                <div class="grid-box"></div>
            `;
        }

    }
    else if (currentBag == "bagOres") {

        let invLength = bagOres.length;
        document.getElementById('box1').innerHTML = "";
    
        for (let i = 0; i < invLength; i++) {
            document.getElementById('box1').innerHTML += /*HTML*/`
                <div class="grid-box" onClick="addItem('${bagOres[i]}','mainInv','bagOres')"><img class="img" src="res/${bagOres[i]}.png"></div>
            `;
        }
        
        let extraSlots = 15 - bagOresCount;
        for (let i = 0; i < extraSlots; i++) {
            document.getElementById('box1').innerHTML += /*HTML*/`
                <div class="grid-box"></div>
            `;
        }
    }
}

/* For å oppdatere hva som vises i main inv, når item blir fjernet/lagt til */
function reloadMainInv() {
    /* Sjekker hvor mange item er i main inventory */
    let invLength = mainInv.length;

    /* Nullstilling av kodeinnhold av main inventory */
    document.getElementById('mainInv').innerHTML = "";

    /* Gjentagelse for hvert antall item i main inventory */
    for (let i = 0; i < invLength; i++) {
        document.getElementById('mainInv').innerHTML += /*HTML*/`
            <div class="grid-box" onClick="addItem('${mainInv[i]}','${currentBag}','mainInv')"><img class="img" src="res/${mainInv[i]}.png"></div>
        `;
    }

    let ExtraSlots = 16 - invLength;
    for (let i = 0; i < ExtraSlots; i++) {
        document.getElementById('mainInv').innerHTML += /*HTML*/`
            <div class="grid-box"></div>
        `;
    }
}


/* Extra Funksjon */
function removeItem(bag, item) {
    if (bag == "mainInv") {
        /* Sjekker hvor mange item er i main inventory så den kan iterere gjennom alle */
        let invLength = mainInv.length;
        
        /* itererer nå gjennom alle item så den kan lese hver eneste item i array */
        for (let i = 0; i < mainInv.length; i++) {
            /* ser om den item som blir iterert er samme som den item vi leter etter */
            if (mainInv[i] === item) {
                /* splice fjerner item fra array basert på index nummer, som er [i] CurrentIteration fra array */
                mainInv.splice(i, 1);
            }
        }
    }
    if (bag == "bagPots") {
        let invLength = bagPots.length;

        for (let i = 0; i < bagPots.length; i++) {
            if (bagPots[i] === item) {
                bagPots.splice(i, 1);
                bagPotsCount--;
            }
        }
    }
    else if (bag == "bagGear") {
        let invLength = bagGear.length;
        
        for (let i = 0; i < bagGear.length; i++) {
            if (bagGear[i] === item) {
                bagGear.splice(i, 1);
                bagGearCount--;
            }
        }
    }
    else if (bag == "bagHerbs") {
        let invLength = bagHerbs.length;
        
        for (let i = 0; i < bagHerbs.length; i++) {
            if (bagHerbs[i] === item) {
                bagHerbs.splice(i, 1);
                bagHerbsCount--;
            }
        }
    }
    else if (bag == "bagOres") {

        let invLength = bagOres.length;
        
        for (let i = 0; i < bagOres.length; i++) {
            if (bagOres[i] === item) {
                bagOres.splice(i, 1);
                bagOresCount--;
            }
        }
    }

    /* Siden vi fjernet noe, så må vi reload inventories */
    reloadBag();
    reloadMainInv();
}