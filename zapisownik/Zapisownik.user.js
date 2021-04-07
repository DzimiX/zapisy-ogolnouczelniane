// ==UserScript==
// @name         Zapisownik
// @version      1.0
// @description  Bot spamujący kodami grup do okienka do zapisów w edukacji.
// @match        https://edukacja.pwr.wroc.pl/EdukacjaWeb/zapisy.do*
// @grant        unsafeWindow
// ==/UserScript==

function fillKodGrupy(kod){
    document.getElementsByName("kodGrupy")[0].value = kod;
    return true;
}
function clickKodGrupy(){
    console.log("clickKodGrupy - Klikam");
    document.getElementsByName("event_ZapiszKodGrupy")[0].click();
    return true;
}
function storeTextarea(){
    var localstorage = localstorage;
    localStorage.setItem("textarea", document.getElementById("dozapisu").value);
    return true;
}
function retriveTextarea(){
    try {
        var localstorage = localstorage;
        var text = localStorage.getItem("textarea");
        if (text != ""){
            document.getElementById("dozapisu").value = text;
            return true;
        }else{
            return false;
        }
    }catch(e){
        console.log(e);
        return false;
    }
}

function setContinue(key){
    var localstorage = localstorage;
    localStorage.setItem("continue", key);
}

function checkContinue(){
    try {
        var localstorage = localstorage;
        if(localStorage.getItem("continue") == "true"){
            return true;
        } else {
            return false
        }
    }catch(e){
        console.log(e);
        return false;
    }
    return true;
}

function fetchElements(){
    try {
        var textArea = document.getElementById("dozapisu");
        var lines = textArea.value.split("\n");
        var temp = lines[0];
        fillKodGrupy(temp);
        lines.shift();
        lines.push(temp);
        textArea.value = lines.join("\n");
        storeTextarea();
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

function stop(){
    console.log("STOOOP");
    setContinue(false);
    document.getElementById("uzbrojony").innerHTML = "<b>Skrypt nieuzbrojony</b>";
    document.getElementById("uzbrojony").style.color = "green";
}

function zapisuj(){
    setContinue(true);
    document.getElementById("uzbrojony").innerHTML = "<b>Skrypt uzbrojony</b>";
    document.getElementById("uzbrojony").style.color = "yellow";
    if(gdzieJaJestem() == false){ // gdy po kliknięciem w konkretne zapisy - wtedy działaj automatycznie
        fetchElements();
        odlot();
    } else {
        storeTextarea();
        alert("Zapamiętam twoje kody kursów. MUSISZ RĘCZNIE KLIKNĄĆ w 'zapisy' w wybranych zapisach o odpowiedniej porze.")
    }
}

function odlot(){
    console.log("Za chwile kliknę");
    console
    setTimeout(() => {
        if (checkContinue() == true){
            clickKodGrupy();
            return true;
        } else {
            console.log("Coś nie pozwoliło kliknąć");
            return false;
        }
    }, timer);
}

function gdzieJaJestem(){
    if (document.getElementsByTagName("TITLE")[0].innerHTML.includes("Zapisy w semestrze") == true){
        return true;
    } else {
        return false;
    }
}

(function() {

    var main = document.createElement("div");
    main.style.width = "430px";
    main.style.height = "fit-content";
    main.style.background = "#333333";
    main.style.color = "white";
    main.style.position = "fixed";
    main.style.top = "0px";
    main.style.right = "0px";
    main.style.opacity = "98%";
    main.style.padding = "10px";
    main.innerHTML = `
<b>Zapisownik</b></br>
1. Wprowadź kod kursu(kursów) do okienka (1 kurs w jednej linijce!)</br>
2. Wciśnij przycisk "Zapisuj" - skrypt co 2 sekundy będzie próbował zapisać Cię na kolejne kursy z okienka.</br>
3. Aby przerwać działanie wciśnij przycisk "Stop". </br></br>
<b>Skrypt jedynie wprowadza kod i klika "zapisz" w pętli!</b></br>

<textarea placeholder="w01-4A&#x0a;w02-7F" oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' id='dozapisu'>
</textarea></br>

<button id='zapisuj' onclick='zapisuj()'>Zapisuj</button>
<button id='stop' onclick='stop()'>Stop</button>
    `;

    document.getElementById("GORAPORTALU").appendChild(main);

    unsafeWindow.fillKodGrupy = fillKodGrupy;
    unsafeWindow.clickKodGrupy = clickKodGrupy;
    unsafeWindow.storeTextarea = storeTextarea;
    unsafeWindow.retriveTextarea = retriveTextarea;
    unsafeWindow.setContinue = setContinue;
    unsafeWindow.checkContinue = checkContinue;
    unsafeWindow.fetchElements = fetchElements;
    unsafeWindow.stop = stop;
    unsafeWindow.zapisuj = zapisuj;
    unsafeWindow.odlot = odlot;
    unsafeWindow.gdzieJaJestem = gdzieJaJestem;
    unsafeWindow.timer = 2000;

    if(checkContinue() != true){
        setContinue(false);
        main.innerHTML +=`
</br></br> <span id='uzbrojony' style='color:green'><b>Skrypt nieuzbrojony</b></span>
`;
    } else {
        main.innerHTML +=`
</br></br> <span id='uzbrojony' style='color:yellow'><b>Skrypt uzbrojony</b></span>
`;
    }

    main.innerHTML +="</br>Delay = "+timer/1000+"s";

    if(gdzieJaJestem() == false){ // gdy po kliknięciu w konkretne zapisy - wtedy działaj automatycznie
        if(retriveTextarea() == true && checkContinue() == true){
            zapisuj();
        }
    } else {
        main.innerHTML +=`
</br></br> <span style='color:yellow'><b>Aby skrypt działał musisz RĘCZNIE przejść na wybrane zapisy.</b></span>
</br> Wprowadzenie kodów i kliknięcie zapisuj spowoduje automatyczne próby zapisywania po wejściu na zapisy (miejsce gdzie wpisujesz kod kursu w okienko).
`;
        retriveTextarea()
    }
})();

