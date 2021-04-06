<html>
<head>
    <title>Ułatwiacz zapisów</title>
    <link rel="stylesheet" href="zapisy.css">
</head>
<body>
    <div id="main">
        <div id="left">
            <div id="wybor">
                <button class="buttonMenu" onclick="showFilters()">Filtrowanie kursów</button>
                <button class="buttonMenu" onclick="showSetScheudle()">Ustaw swój plan</button>
                <button class="buttonMenu" onclick="showMarked()">Oznaczone kursy</button>
                <button class="buttonMenu" onclick="showSettings()">Ustawienia</button>
                <button class="buttonMenu" onclick="showInfo()">Informacje</button>

                <span style="margin-left: 5px;">Pokazano: </span><span id="iloscPokazanychKursow">0</span>
                <span>z </span><span id="iloscWszystkichKursow">0</span>
                <span>kursów, wolnych miejsc: </span><span id="iloscWolnychMiejsc">0</span>
            </div>

            <table id="mainTable">
                <th>
                    <td><b>Kod kursu</b></td>
                    <td><b>Kod grupy</b></td>
                    <td><input onkeypress="updateInterface()" placeholder="Nazwa" id="in_nazwa"></input></td>
                    <td><b>Termin</b></td>
                    <td><input onkeypress="updateInterface()" placeholder="Prowadzący" id="in_prowadzacy"></input></td>
                    <td><b>Wolne</br>miejsca</b></td>
                    <td><b>ZZU</b></td>
                    <td><b>Stacjonarne</b></td>
                    <td><b>Stopień</b></td>
                    <td><b>Uwagi</b></td>
                    <td><b>Szczegóły</b></td>
                </th>
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://www.akz.pwr.edu.pl/katalog_zap.html");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

$ret = curl_exec($ch);

curl_close($ch);


$ret = strip_tags($ret,'<table><tr><td><br>');
$ret = strstr($ret, '	<tr class="gradeX">');
$ret = strstr($ret, '		<tr>', true);

if(strlen($ret) < 1000){
    echo("<div style='font-size: medium; color: red; background-color: yellow; margin: 10px; padding: 10px;'>Wystąpił problem z pobraniem kursów...</br> Ponowna próba za 3 sekundy...</div>
    <script>
        document.getElementById('mainTable').style.display = 'none'; 
        function reload(){
            location.reload(true);
          }
          setInterval(reload,3000);
    </script>");
} else {
    echo($ret);
}

?>
            </table>
        </div>
        <div id="right">
            <div id="pn" class="slider">
                <span class="description"><b>Poniedziałek</b></span>
                <div id="dynamic-pn"></div>
            </div>
            <div id="wt" class="slider">
                <span class="description"><b>Wtorek</b></span>
                <div id="dynamic-wt"></div>
            </div>
            <div id="sr" class="slider">
                <span class="description"><b>Środa</b></span>
                <div id="dynamic-sr"></div>
            </div>
            <div id="cz" class="slider">
                <span class="description"><b>Czwartek</b></span>
                <div id="dynamic-cz"></div>
            </div>
            <div id="pt" class="slider">
                <span class="description"><b>Piątek</b></span>
                <div id="dynamic-pt"></div>
            </div>
            <div id="h75" class="hour"><span>7:30</span><hr></div>
            <div id="h80" class="hour"><span>8:00</span><hr></div>
            <div id="h85" class="hour"><span>8:30</span><hr></div>
            <div id="h90" class="hour"><span>9:00</span><hr></div>
            <div id="h95" class="hour"><span>9:30</span><hr></div>
            <div id="h100" class="hour"><span>10:00</span><hr></div>
            <div id="h105" class="hour"><span>10:30</span><hr></div>
            <div id="h110" class="hour"><span>11:00</span><hr></div>
            <div id="h115" class="hour"><span>11:30</span><hr></div>
            <div id="h120" class="hour"><span>12:00</span><hr></div>
            <div id="h125" class="hour"><span>12:30</span><hr></div>
            <div id="h130" class="hour"><span>13:00</span><hr></div>
            <div id="h135" class="hour"><span>13:30</span><hr></div>
            <div id="h140" class="hour"><span>14:00</span><hr></div>
            <div id="h145" class="hour"><span>14:30</span><hr></div>
            <div id="h150" class="hour"><span>15:00</span><hr></div>
            <div id="h155" class="hour"><span>15:30</span><hr></div>
            <div id="h160" class="hour"><span>16:00</span><hr></div>
            <div id="h165" class="hour"><span>16:30</span><hr></div>
            <div id="h170" class="hour"><span>17:00</span><hr></div>
            <div id="h175" class="hour"><span>17:30</span><hr></div>
            <div id="h180" class="hour"><span>18:00</span><hr></div>
            <div id="h185" class="hour"><span>18:30</span><hr></div>
            <div id="h190" class="hour"><span>19:00</span><hr></div>
            <div id="h195" class="hour"><span>19:30</span><hr></div>
            <div id="h200" class="hour"><span>20:00</span><hr></div>
            <div id="h205" class="hour"><span>20:30</span><hr></div>
        </div>

    </div>

    <div id="filtry" class="modal">
        <div class="modal-pos">
            <div class="modal-header">
                <span onclick="hideFilters()" class="close">&times;</span>
                <h2>Filtry</h2>
            </div>
            <div class="modal-body">
                Wybierz interesujące cię kursy.</br>
                (W celu odfiltrowania kolizji z twoimi zajęciami ustaw swój plan.)
                </br></br>

                <input onclick="updateInterface()" type="checkbox" id="cb_ukryjPelne" name="cb_ukryjPelne" checked/>
                <label for="cb_ukryjPelne"> - ukryj pełne kursy</label></br></br>

                Filtrowanie na podstawie nazwy kursu lub prowadzącego odbywa się bezpośrednio w tabeli.</br></br>

                Typ kursu:
                <ul>
                    <input onclick="updateInterface()" type="checkbox" id="cb_lektoraty" name="cb_lektoraty" checked/>
                    <label for="cb_lektoraty"> - lektoraty [L*...]</label></br>
                    <input onclick="updateInterface()" type="checkbox" id="cb_sport" name="cb_sport" checked/>
                    <label for="cb_sport"> - sport [v*... lub w*...]</label></br>
                    <input onclick="updateInterface()" type="checkbox" id="cb_humanistyczne" name="cb_humanistyczne" checked/>
                    <label for="cb_humanistyczne"> - humanistyczne [H*...]</label></br>
                </ul>

                Stopień studiów:
                <ul>
                    <input onclick="updateInterface()" type="checkbox" id="cb_stopien1" name="cb_stopien1" checked/>
                    <label for="cb_stopien1"> - I stopień (lub łączone)</label></br>
                    <input onclick="updateInterface()" type="checkbox" id="cb_stopien2" name="cb_stopien2"/>
                    <label for="cb_stopien2"> - II stopień (lub łączone)</label></br>
                </ul>

                Godziny ZZU:
                <ul>
                    <input onclick="updateInterface()" type="checkbox" id="cb_godziny15" name="cb_godziny15" checked/>
                    <label for="cb_godziny15"> - 15 godzin</label></br>
                    <input onclick="updateInterface()" type="checkbox" id="cb_godziny30" name="cb_godziny30" checked/>
                    <label for="cb_godziny30"> - 30 godzin</label></br>
                    <input onclick="updateInterface()" type="checkbox" id="cb_godziny45" name="cb_godziny45" checked/>
                    <label for="cb_godziny45"> - 45 godzin</label></br>
                    <input onclick="updateInterface()" type="checkbox" id="cb_godziny60" name="cb_godziny60" checked/>
                    <label for="cb_godziny60"> - 60 godzin</label></br>
                </ul>
            </div>
        </div>
    </div>

    <div id="ustawPlan" class="modal">
        <div class="modal-pos">
            <div class="modal-header">
                <span onclick="hideSetScheudle()" class="close">&times;</span>
                <h2>Ustawianie Planu</h2>
            </div>
            <div class="modal-body">
                <span>Każdy blok zajęć w nowej linii!</span></br>

                Wprowadź dane na podstawie wzorca:</br></br>
                <textarea id="modalCode" style="width: 560px; height: 250px; resize: none;" placeholder='"wt","9:15","11:00","Optoelektronika I<br/><b>DŁUGA</b>"'>

                </textarea></br></br>
                Lub wykorzystaj formularz:</br>

                <select name="dzienUP" id="dzienUP">
                    <option selected value="">Wybierz dzień</option>
                    <option value="pn">Poniedziałek</option>
                    <option value="wt">Wtorek</option>
                    <option value="sr">Środa</option>
                    <option value="cz">Czwartek</option>
                    <option value="pt">Piątek</option>
                </select>
                <input style="width: 45px" name="godzinaRozpoczeciaUP" id="godzinaRozpoczeciaUP" placeholder="7:30"></input>
                <input style="width: 45px" name="godzinaZakonczeniaUP" id="godzinaZakonczeniaUP" placeholder="9:00"></input>
                <input style="width: 315px" name="komentarzUP" id="komentarzUP" placeholder="Optoelektronika I<br/><b>DŁUGA</b>"></input></b></br>
                <button onclick="addModalCode()">Dodaj blok do siatki</button>
                </br></br><button onclick="editStaticBlockCode()">Zapisz zmiany</button>
                
            </div>
        </div>
    </div>

    <div id="ustawienia" class="modal">
        <div class="modal-pos">
            <div class="modal-header">
                <span onclick="hideSettings()" class="close">&times;</span>
                <h2>Ustawienia</h2>
            </div>
            <div class="modal-body">
                <!--
                Motyw graficzny:</br>
                <select>
                    <option>Jasny</option>
                    <option>Ciemny</option>
                </select>
                </br></br>
                -->
                Usuń wszystkie przechowywane informacje:</br>
                <button onclick="reset()">Usuń!</button>
            </div>
        </div>
    </div>

    <div id="informacje" class="modal">
        <div class="modal-pos">
            <div class="modal-header">
                <span onclick="hideInfo()" class="close">&times;</span>
                <h2>Informacje</h2>
            </div>
            <div class="modal-body">
                Ideą tej aplikacji jest usprawnienie procesu zapisu na kursy ogólnouczelniane.</br></br>
                Wszystkie widoczne zasoby pobierane są ze strony <a href="http://www.akz.pwr.edu.pl">http://www.akz.pwr.edu.pl</a>, a autor aplikacji nie ma wpływu na pobierane treści ani wyświetlaną zawartość poza przetwarzaniem końcowym mającym na celu zwiększenie czytelności zgodnie z założeniem działania aplikacji. 
                </br></br>
                W celu sprawniejszego działania aplikacji zalecane jest doinstalowanie wtyczki obsługującej userscripty i dodanie do niej <a href="/zapisownik/zapisownik.user.js">skryptu do zapisów</a>.
                </br></br>
                Kod źródłowy dostępny na <a href="https://github.com/DzimiX/zapisy-ogolnouczelniane">githubie</a>.
                </br></br>
                Maciej Dzimira 2021
            </div>
        </div>
    </div>

    <div id="oznaczone" class="modal">
        <div class="modal-pos">
            <div class="modal-header">
                <span onclick="hideMarked()" class="close">&times;</span>
                <h2>Oznaczone kursy</h2>
            </div>
            <div id="oznaczone-body" class="modal-body">
                <textarea id="zapisownik-connect"></textarea>
            </div>
        </div>
    </div>

    <div id="szczegoly" class="modal">
        <div class="modal-pos">
            <div class="modal-header">
                <span onclick="hideDetails()" class="close">&times;</span>
                <h2>Szczegóły kursu</h2>
            </div>
            <div class="modal-body">
                <label for="szczegoly_kodKursu">Kod kursu:</label></br>
                <input class="szczegolyKursu" id="szczegoly_kodKursu" name="szczegoly_kodKursu"/></br>

                <label for="szczegoly_kodGrupy">Kod grupy:</label></br>
                <input class="szczegolyKursu" id="szczegoly_kodGrupy" name="szczegoly_kodGrupy"/></br>

                <label for="szczegoly_nazwaKursu">Nazwa kursu:</label></br>
                <input class="szczegolyKursu" id="szczegoly_nazwaKursu" name="szczegoly_nazwaKursu"/></br>

                <label for="szczegoly_terminKursu">Termin kursu:</label></br>
                <input class="szczegolyKursu" id="szczegoly_terminKursu" name="szczegoly_terminKursu"/></br>

                <label for="szczegoly_prowadzacy">Prowadzący:</label></br>
                <input class="szczegolyKursu" id="szczegoly_prowadzacy" name="szczegoly_prowadzacy"/></br>

                <label for="szczegoly_wolneMiejsca">Wolne miejsca:</label></br>
                <input class="szczegolyKursu" id="szczegoly_wolneMiejsca" name="szczegoly_wolneMiejsca"/></br>

                <label for="szczegoly_zzu">ZZU:</label></br>
                <input class="szczegolyKursu" id="szczegoly_zzu" name="szczegoly_zzu"/></br>

                <label for="szczegoly_stacjonarnie">Stacjonarnie:</label></br>
                <input class="szczegolyKursu" id="szczegoly_stacjonarnie" name="szczegoly_stacjonarnie"/></br>

                <label for="szczegoly_poziomStudiow">Poziom studiów:</label></br>
                <input class="szczegolyKursu" id="szczegoly_poziomStudiow" name="szczegoly_poziomStudiow"/></br>

                <label for="szczegoly_komentarz">Komentarz:</label></br>
                <textarea style="height: 100px" class="szczegolyKursu" id="szczegoly_komentarz" name="szczegoly_komentarz"></textarea>
            </div>
        </div>
    </div>

    <script src="zapisy.js"></script>

</body>
</html>