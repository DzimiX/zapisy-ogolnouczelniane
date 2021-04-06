let sliderHeight = 0;
let smallestStep = 0;
let divWidth = 0;

let dynamicBlock = []; 
dynamicBlock.push(["dynamic-pn",0,0,0]);
dynamicBlock.push(["dynamic-wt",0,0,0]);
dynamicBlock.push(["dynamic-sr",0,0,0]);
dynamicBlock.push(["dynamic-cz",0,0,0]);
dynamicBlock.push(["dynamic-pt",0,0,0]);

let staticBlock = [];

let markedBlock = [];

function tableEntryPoint(day1 = "", start1 = "", end1 = "", day2 = "", start2 = "", end2 = "") {
	resetDynamicBlockValues();
	if (day1 != "" && start1 != "" && end1 != "") {
		setDynamicBlockValues(day1, start1, end1);
	}
	if (day2 != "" && start2 != "" && end2 != "") {
		setDynamicBlockValues(day2, start2, end2);
	}
}

window.onload = function () {
	courseDetails();
	getStorage();
	updateInterface();
};

window.onresize = function () {
	updateInterface()
};

window.onclick = function(event) {
	if (event.target == document.getElementById("filtry")) {
		document.getElementById("filtry").style.display = "none";
	}
	if (event.target == document.getElementById("ustawPlan")) {
		document.getElementById("ustawPlan").style.display = "none";
	}
	if (event.target == document.getElementById("ustawienia")) {
		document.getElementById("ustawienia").style.display = "none";
	}
	if (event.target == document.getElementById("informacje")) {
		document.getElementById("informacje").style.display = "none";
	}
	if (event.target == document.getElementById("oznaczone")) {
		document.getElementById("oznaczone").style.display = "none";
	}
	if (event.target == document.getElementById("szczegoly")) {
		document.getElementById("szczegoly").style.display = "none";
	}
}

function setZapisownikTextArea(){
	let text = "";

	for (let i=0; i<markedBlock.length; i++){
		text += markedBlock[i][0]+"\n";
	}

	document.getElementById("zapisownik-connect").innerHTML = text;
}

function measureSlider() {
	sliderHeight = document.getElementById('pn').getBoundingClientRect().height;
	smallestStep = sliderHeight/162; 
}

function changeWidth(x) {
	var width = document.getElementById("right").offsetWidth;
	width += x;
	document.getElementById("right").style.width = width + "px";
	updateInterface();
}

function updateInterface() {
	measureSlider();
	updateDynamicBlockPosition();
	updateStaticBlocks();
	updateDivStyle();
	courseStats()
	
	var elements = document.getElementsByClassName("hour");
	for (var i=75; i<elements.length+180; i=i+5) {
		document.getElementById("h"+i).style.marginTop = 0+(i-75)*1.20*smallestStep+"px";
	}
}

function updateDivStyle() {
	var totalWidth = document.getElementById("right").offsetWidth;
	var sliderWidth = totalWidth / 6;
	var firstMargin = totalWidth / 12;
	var margin = totalWidth / 64;
	divWidth = sliderWidth;

	document.getElementById("left").style.width = "calc(100% - " + totalWidth + "px)";

	var hrs = document.querySelectorAll(".hour hr");
	for (i = 0; i < hrs.length; i++) {
		hrs[i].style.width = totalWidth + "px";
	}

	var divs = document.querySelectorAll("#right div");
	for (i = 0; i < divs.length; i++) {
		if (divs[i].style.borderWidth == "") {
			divs[i].style.width = sliderWidth + "px";
		}
	}

	var margins = document.querySelectorAll(".slider");
	for (i = 0; i < margins.length; i++) {
		margins[i].style.marginLeft = margin + "px";
	}

	var xd = document.querySelectorAll(".slider:first-of-type");
	for (i = 0; i < xd.length; i++) {
		xd[i].style.marginLeft = firstMargin-1+"px";
	}
}

function resetDynamicBlockValues() {
	document.getElementById("dynamic-pn").style.transition = "0s";
	document.getElementById("dynamic-wt").style.transition = "0s";
	document.getElementById("dynamic-sr").style.transition = "0s";
	document.getElementById("dynamic-cz").style.transition = "0s";
	document.getElementById("dynamic-pt").style.transition = "0s";
	dynamicBlock[0] = ["dynamic-pn", -1, 0, 0];
	dynamicBlock[1] = ["dynamic-wt", -1, 0, 0];
	dynamicBlock[2] = ["dynamic-sr", -1, 0, 0];
	dynamicBlock[3] = ["dynamic-cz", -1, 0, 0];
	dynamicBlock[4] = ["dynamic-pt", -1, 0, 0];
	updateInterface();
	document.getElementById("dynamic-pn").style.transition = "";
	document.getElementById("dynamic-wt").style.transition = "";
	document.getElementById("dynamic-sr").style.transition = "";
	document.getElementById("dynamic-cz").style.transition = "";
	document.getElementById("dynamic-pt").style.transition = "";
}

function setDynamicBlockValues(day,start,end){
	var parity = 0;
	switch(day){
		case "(pn)": 	day="dynamic-pn"; parity=0; break;
		case "(wt)": 	day="dynamic-wt"; parity=0; break;
		case "(sr)": 	day="dynamic-sr"; parity=0; break;
		case "(cz)": 	day="dynamic-cz"; parity=0; break;
		case "(pt)": 	day="dynamic-pt"; parity=0; break;
		case "(pn TP)": day="dynamic-pn"; parity=1; break;
		case "(wt TP)": day="dynamic-wt"; parity=1; break;
		case "(sr TP)": day="dynamic-sr"; parity=1; break;
		case "(cz TP)": day="dynamic-cz"; parity=1; break;
		case "(pt TP)": day="dynamic-pt"; parity=1; break;
		case "(pn TN)": day="dynamic-pn"; parity=2; break;
		case "(wt TN)": day="dynamic-wt"; parity=2; break;
		case "(sr TN)": day="dynamic-sr"; parity=2; break;
		case "(cz TN)": day="dynamic-cz"; parity=2; break;
		case "(pt TN)": day="dynamic-pt"; parity=2; break;
	}
	start = start.split(":"); 
	var startConv = parseInt(start[0]) * 60 + parseInt(start[1]);
	end = end.split(":");
	var endConv = parseInt(end[0]) * 60 + parseInt(end[1]);
	var diff = endConv - startConv;
	startConv = -90 + (startConv / 5);
	diff = diff / 5;                
	switch(day){
		case "dynamic-pn": dynamicBlock[0] = ["dynamic-pn",startConv,diff,parity]; break;
		case "dynamic-wt": dynamicBlock[1] = ["dynamic-wt",startConv,diff,parity]; break;
		case "dynamic-sr": dynamicBlock[2] = ["dynamic-sr",startConv,diff,parity]; break;
		case "dynamic-cz": dynamicBlock[3] = ["dynamic-cz",startConv,diff,parity]; break;
		case "dynamic-pt": dynamicBlock[4] = ["dynamic-pt",startConv,diff,parity]; break;
	}
	updateInterface();
}

function updateDynamicBlockPosition(){
	let color = "#977b71";
	
	for (var i=0; i<dynamicBlock.length; i++){
		let element = document.getElementById(dynamicBlock[i][0]);
		element.innerHTML = "";
		element.style.marginTop = smallestStep*dynamicBlock[i][1]+"px";
		if(dynamicBlock[i][3]==0){
			element.style.width = divWidth + "px";
			element.style.height = dynamicBlock[i][2]*smallestStep+"px";
			element.style.removeProperty("border-style");
			element.style.removeProperty("border-width");
			element.style.removeProperty("border-color");
			element.style.backgroundColor = color;
		}else if(dynamicBlock[i][3]==1){
			element.style.width = "0px";
			element.style.height = "0px";
			element.style.borderStyle = "solid";
			element.style.borderWidth = "0px 0px " + dynamicBlock[i][2] * smallestStep + "px 80px";
			element.style.borderColor = "transparent transparent "+color+" transparent";
			element.style.removeProperty("background-color");
		}else if(dynamicBlock[i][3]==2){
			element.style.width = "0px";
			element.style.height = "0px";
			element.style.borderStyle = "solid";
			element.style.borderWidth = "0px 0px " + dynamicBlock[i][2] * smallestStep + "px 80px";
			element.style.borderColor = "transparent transparent transparent "+color;
			element.style.removeProperty("background-color");
		}
	}
}

function reset() {
	purgeStaticBlocks();
	clearStorage();
	window.location.reload(false);
}

function removeStaticBlocks() {
	var elements = document.querySelectorAll('*[class^="static"]');
	for (i = 0; i < elements.length; i++) {
		elements[i].remove();
	}
}

function purgeStaticBlocks() {
	removeStaticBlocks();
	staticBlock = [];
	setStorage();
}

function updateStaticBlocks() {
	try {
		removeStaticBlocks();
		var div;

		for (i = 0; i < staticBlock.length; i++) {
			div = document.createElement("div");
			div.className = "static";
			div.innerHTML = staticBlock[i][4];
			div.style.height = staticBlock[i][2] * smallestStep / 5 + "px";
			div.style.marginTop = staticBlock[i][1] * smallestStep / 5 + "px";
			div.addEventListener('click', removeElement);
			document.getElementById(staticBlock[i][0]).append(div);
		}
		updateDivStyle();
		oneBigFilter();
	} catch (e) {
		alert("Wystąpił błąd: "+e+". Prewencyjnie czyszczę pamięć");
		purgeStaticBlocks();
	}
}

function addStaticBlockValue(day, start, end, text="") {
	try {
		var parity = 0;
		switch (day) {
			case "(pn)": day = "pn"; parity = 0; break;
			case "(wt)": day = "wt"; parity = 0; break;
			case "(sr)": day = "sr"; parity = 0; break;
			case "(cz)": day = "cz"; parity = 0; break;
			case "(pt)": day = "pt"; parity = 0; break;
			case "(pn TP)": day = "pn"; parity = 1; break;
			case "(wt TP)": day = "wt"; parity = 1; break;
			case "(sr TP)": day = "sr"; parity = 1; break;
			case "(cz TP)": day = "cz"; parity = 1; break;
			case "(pt TP)": day = "pt"; parity = 1; break;
			case "(pn TN)": day = "pn"; parity = 2; break;
			case "(wt TN)": day = "wt"; parity = 2; break;
			case "(sr TN)": day = "sr"; parity = 2; break;
			case "(cz TN)": day = "cz"; parity = 2; break;
			case "(pt TN)": day = "pt"; parity = 2; break;
		}
		start = start.split(":");
		var startConv = parseInt(start[0]) * 60 + parseInt(start[1]);
		end = end.split(":");
		var endConv = parseInt(end[0]) * 60 + parseInt(end[1]);
		var diff = endConv - startConv;
		startConv = -450 + startConv;
		diff = diff;
		var exists = false;
		for (i = 0; i < staticBlock.length; i++) {
			if (staticBlock[i][0] == day && staticBlock[i][1] == startConv && staticBlock[i][2] == diff) {
				exists = true;
				break;
			}
		}
		if (!exists) {
			staticBlock.push([day, startConv, diff, parity, text]);
			setStorage();
		}
	} catch (e) {
		alert("Wystąpił błąd: "+e);
	}
}

function setStorage() {
	var json_staticBlock = JSON.stringify(staticBlock);
	localStorage.setItem("staticBlock", json_staticBlock);
	var json_markedBlock = JSON.stringify(markedBlock);
	localStorage.setItem("markedBlock", json_markedBlock);

	var json_cb_ukryjPelne = JSON.stringify(document.getElementById("cb_ukryjPelne").checked);
	localStorage.setItem("cb_ukryjPelne", json_cb_ukryjPelne);


	var json_cb_lektoraty = JSON.stringify(document.getElementById("cb_lektoraty").checked);
	localStorage.setItem("cb_lektoraty", json_cb_lektoraty);
	var json_cb_sport = JSON.stringify(document.getElementById("cb_sport").checked);
	localStorage.setItem("cb_sport", json_cb_sport);
	var json_cb_humanistyczne = JSON.stringify(document.getElementById("cb_humanistyczne").checked);
	localStorage.setItem("cb_humanistyczne", json_cb_humanistyczne);

	var json_cb_stopien1 = JSON.stringify(document.getElementById("cb_stopien1").checked);
	localStorage.setItem("cb_stopien1", json_cb_stopien1);
	var json_cb_stopien2 = JSON.stringify(document.getElementById("cb_stopien2").checked);
	localStorage.setItem("cb_stopien2", json_cb_stopien2);

	var json_cb_godziny15 = JSON.stringify(document.getElementById("cb_godziny15").checked);
	localStorage.setItem("cb_godziny15", json_cb_godziny15);
	var json_cb_godziny30 = JSON.stringify(document.getElementById("cb_godziny30").checked);
	localStorage.setItem("cb_godziny30", json_cb_godziny30);
	var json_cb_godziny45 = JSON.stringify(document.getElementById("cb_godziny45").checked);
	localStorage.setItem("cb_godziny45", json_cb_godziny45);
	var json_cb_godziny60 = JSON.stringify(document.getElementById("cb_godziny60").checked);
	localStorage.setItem("cb_godziny60", json_cb_godziny60);
}

function getStorage() {
	if (localStorage.getItem("staticBlock") != null && localStorage.getItem("staticBlock") != "") {
		staticBlock = JSON.parse(localStorage.getItem("staticBlock"));
	} else {
		staticBlock = [];
	}

	if (localStorage.getItem("markedBlock") != null && localStorage.getItem("markedBlock") != "") {
		markedBlock = JSON.parse(localStorage.getItem("markedBlock"));
	} else {
		markedBlock = [];
	}

	if (localStorage.getItem("cb_ukryjPelne") != null && localStorage.getItem("cb_ukryjPelne") != "") {
		document.getElementById("cb_ukryjPelne").checked  = JSON.parse(localStorage.getItem("cb_ukryjPelne"));
	} else {
		document.getElementById("cb_ukryjPelne").checked  = true;
	}

	if (localStorage.getItem("cb_lektoraty") != null && localStorage.getItem("cb_lektoraty") != "") {
		document.getElementById("cb_lektoraty").checked  = JSON.parse(localStorage.getItem("cb_lektoraty"));
	} else {
		document.getElementById("cb_lektoraty").checked  = true;
	}
	if (localStorage.getItem("cb_sport") != null && localStorage.getItem("cb_sport") != "") {
		document.getElementById("cb_sport").checked  = JSON.parse(localStorage.getItem("cb_sport"));
	} else {
		document.getElementById("cb_sport").checked  = true;
	}
	if (localStorage.getItem("cb_humanistyczne") != null && localStorage.getItem("cb_humanistyczne") != "") {
		document.getElementById("cb_humanistyczne").checked  = JSON.parse(localStorage.getItem("cb_humanistyczne"));
	} else {
		document.getElementById("cb_humanistyczne").checked  = true;
	}

	if (localStorage.getItem("cb_stopien1") != null && localStorage.getItem("cb_stopien1") != "") {
		document.getElementById("cb_stopien1").checked  = JSON.parse(localStorage.getItem("cb_stopien1"));
	} else {
		document.getElementById("cb_stopien1").checked  = true;
	}
	if (localStorage.getItem("cb_stopien2") != null && localStorage.getItem("cb_stopien2") != "") {
		document.getElementById("cb_stopien2").checked  = JSON.parse(localStorage.getItem("cb_stopien2"));
	} else {
		document.getElementById("cb_stopien2").checked  = true;
	}

	if (localStorage.getItem("cb_godziny15") != null && localStorage.getItem("cb_godziny15") != "") {
		document.getElementById("cb_godziny15").checked  = JSON.parse(localStorage.getItem("cb_godziny15"));
	} else {
		document.getElementById("cb_godziny15").checked  = true;
	}
	if (localStorage.getItem("cb_godziny30") != null && localStorage.getItem("cb_godziny30") != "") {
		document.getElementById("cb_godziny30").checked  = JSON.parse(localStorage.getItem("cb_godziny30"));
	} else {
		document.getElementById("cb_godziny30").checked  = true;
	}
	if (localStorage.getItem("cb_godziny45") != null && localStorage.getItem("cb_godziny45") != "") {
		document.getElementById("cb_godziny45").checked  = JSON.parse(localStorage.getItem("cb_godziny45"));
	} else {
		document.getElementById("cb_godziny45").checked  = true;
	}
	if (localStorage.getItem("cb_godziny60") != null && localStorage.getItem("cb_godziny60") != "") {
		document.getElementById("cb_godziny60").checked  = JSON.parse(localStorage.getItem("cb_godziny60"));
	} else {
		document.getElementById("cb_godziny60").checked  = true;
	}
}

function clearScheudle(){
	localStorage.setItem("staticBlock", "");
	staticBlock = [];
	updateInterface();
}

function clearStorage() {
	localStorage.setItem("staticBlock", "");
	staticBlock = [];
	localStorage.setItem("markedBlock", "");
	markedBlock = [];

	localStorage.setItem("cb_ukryjPelne", "");

	localStorage.setItem("cb_lektoraty", "");
	localStorage.setItem("cb_sport", "");
	localStorage.setItem("cb_humanistyczne", "");

	localStorage.setItem("cb_stopien1", "");
	localStorage.setItem("cb_stopien2", "");
	
	localStorage.setItem("cb_godziny15", "");
	localStorage.setItem("cb_godziny30", "");
	localStorage.setItem("cb_godziny45", "");
	localStorage.setItem("cb_godziny60", "");

	updateInterface();
}

function hideAll(){
	document.getElementById("filtry").style.display = "none";
	document.getElementById("ustawPlan").style.display = "none";
	document.getElementById("ustawienia").style.display = "none";
	document.getElementById("informacje").style.display = "none";
	document.getElementById("oznaczone").style.display = "none";
	document.getElementById("szczegoly").style.display = "none";
	updateInterface();
}

function showStd(){
	document.getElementById("main").style.display = "";
	document.getElementById("left").style.display = "";
	document.getElementById("wybor").style.display = "";
	document.getElementById("right").style.display = "";
}

function showFilters(){
	hideAll();
	document.getElementById("filtry").style.display = "block";
}
function hideFilters(){
	setStorage();
	hideAll();
	showStd();
}

function showSetScheudle(){
	hideAll();
	document.getElementById("ustawPlan").style.display = "block";
	document.getElementById("modalCode").value = "";
	var temp;
	var startHours;
	var startMinutes;
	var endHours;
	var endMinutes;
	for (i = 0; i < staticBlock.length; i++) {
		temp = staticBlock[i][1] + 450;
		startHours = Math.floor(temp / 60);
		startMinutes = temp % 60;
		startMinutes = ("0" + startMinutes).slice(-2);
		temp += staticBlock[i][2];
		endHours = Math.floor(temp / 60);
		endMinutes = temp % 60;
		endMinutes = ("0" + endMinutes).slice(-2);
		document.getElementById("modalCode").value += "\"" + staticBlock[i][0] + "\",\"" + startHours + ":" + startMinutes + "\",\"" + endHours + ":" + endMinutes + "\",\"" + staticBlock[i][4] + "\"\r\n";
	}
}
function hideSetScheudle(){
	hideAll();
	showStd();
}

function showSettings(){
	hideAll();
	document.getElementById("ustawienia").style.display = "block";
}
function hideSettings(){
	hideAll();
	showStd();
}

function showInfo(){
	hideAll();
	document.getElementById("informacje").style.display = "block";
}
function hideInfo(){
	hideAll();
	showStd();
}

function mark(i){
	let table = document.getElementById("mainTable");
	let tr = table.getElementsByTagName("tr");

	let tdCode = tr[i].getElementsByTagName("td")[1];
	let tdName = tr[i].getElementsByTagName("td")[2];
	let tdDate = tr[i].getElementsByTagName("td")[3];
	let tdTeacher = tr[i].getElementsByTagName("td")[4];
	let tdSlots = tr[i].getElementsByTagName("td")[5];

	let txtCode = tdCode.textContent || tdCode.innerText;
	let txtName = tdName.textContent || tdName.innerText;
	let txtDate = tdDate.textContent || tdDate.innerText;
	let txtTeacher = tdTeacher.textContent || tdTeacher.innerText;

	txtDate = txtDate.replace(/(\))(\()/g, '$1, $2').trim();
	txtTeacher = txtTeacher.replace(/([a-z])([A-Z])/g, '$1, $2').trim();

	let znaleziono = false;
	for (let i=0; i<markedBlock.length; i++){
		if(markedBlock[i][0] == txtCode){
			znaleziono = true;
		}
	}

	if (znaleziono != true){
		markedBlock.push([txtCode, txtName, txtDate, txtTeacher]);
		setStorage();
	}
}
function unmark(txtCode){
	if(markedBlock.length > 0){
		for(let i = 0; i < markedBlock.length; i++){
			if(markedBlock[i][0] == txtCode){
				markedBlock.splice(i, 1);
				setStorage();
				showMarked();
			}
		}
	} else {
		document.getElementById("oznaczone-body").innerHTML = "Nie oznaczono żadnych kursów...";
	}
}

function resetStorage(){
	markedBlock = [];
	setStorage();
	showMarked();
}

function showMarked(){
	hideAll();
	document.getElementById("oznaczone").style.display = "block";

	document.getElementById("oznaczone-body").innerHTML = "Kody kursów do skopiowania do zapisownika:</br><textarea id=\"zapisownik-connect\"></textarea></br>";
	document.getElementById("oznaczone-body").innerHTML += "<button onclick='resetStorage()'>Resetuj oznaczone</button>";

	if(markedBlock.length > 0){
		for(let i = 0; i < markedBlock.length; i++){
			div = document.createElement("div");
			div.className = "oznaczone-div";
			div.innerHTML = "<b>Nazwa kursu: </b>"+markedBlock[i][1];
			div.innerHTML += "</br><b>Prowadzący: </b>"+markedBlock[i][3];
			div.innerHTML += "</br><b>Kod grupy: </b>"+markedBlock[i][0];
			div.innerHTML += "</br><b>Termin: </b>"+markedBlock[i][2];
			div.innerHTML += "</br><button onclick=\"unmark('"+markedBlock[i][0]+"')\">Odznacz</button>"
			
			let date = "";
			date = markedBlock[i][2].trim();
			date = date.replaceAll("<br>", "");
			date = date.replaceAll("/\r|\n/","");
			date = date.split(/(?<=\))\s|\s+(?=\d)|\s+(?=\()|(?<=\d)\s|\)\(|(?<=\:\d\d)\-/);

			div.onmouseover = function () {
				tableEntryPoint(date[0],date[1],date[2],date[5],date[6],date[7]);
			};
			document.getElementById("oznaczone-body").append(div);
		}
	} else {
		document.getElementById("oznaczone-body").innerHTML = "Nie oznaczono żadnych kursów...";
	}
	setZapisownikTextArea();
}
function hideMarked(){
	hideAll();
	showStd();
}

function showDetails(i){
	let table = document.getElementById("mainTable");
	let tr = table.getElementsByTagName("tr");

	let tdCodeCatalog = tr[i].getElementsByTagName("td")[0];
	let tdCode = tr[i].getElementsByTagName("td")[1];
	let tdName = tr[i].getElementsByTagName("td")[2];
	let tdDate = tr[i].getElementsByTagName("td")[3];
	let tdTeacher = tr[i].getElementsByTagName("td")[4];
	let tdSlots = tr[i].getElementsByTagName("td")[5];
	let tdHours = tr[i].getElementsByTagName("td")[6];
	let tdStationary = tr[i].getElementsByTagName("td")[7];
	let tdLevel = tr[i].getElementsByTagName("td")[8];
	let tdComment = tr[i].getElementsByTagName("td")[9];

	let txtCodeCatalog = tdCodeCatalog.textContent || tdCodeCatalog.innerText;
	let txtCode = tdCode.textContent || tdCode.innerText;
	let txtName = tdName.textContent || tdName.innerText;
	let txtDate = tdDate.textContent || tdDate.innerText;
	let txtTeacher = tdTeacher.textContent || tdTeacher.innerText;
	let txtSlots = tdSlots.textContent || tdSlots.innerText;
	let txtHours = tdHours.textContent || tdHours.innerText;
	let txtStationary = tdStationary.textContent || tdStationary.innerText;
	let txtLevel = tdLevel.textContent || tdLevel.innerText;
	let txtComment = tdComment.textContent || tdComment.innerText;

	hideAll();

	document.getElementById("szczegoly_kodKursu").value = txtCodeCatalog;
	document.getElementById("szczegoly_kodGrupy").value = txtCode;
	document.getElementById("szczegoly_nazwaKursu").value = txtName;
	document.getElementById("szczegoly_terminKursu").value = txtDate.replace(/(\))(\()/g, '$1, $2').trim();
	document.getElementById("szczegoly_prowadzacy").value = txtTeacher.replace(/([a-z])([A-Z])/g, '$1, $2').trim();
	document.getElementById("szczegoly_wolneMiejsca").value = txtSlots;
	document.getElementById("szczegoly_zzu").value = txtHours;
	document.getElementById("szczegoly_stacjonarnie").value = txtStationary.trim();
	document.getElementById("szczegoly_poziomStudiow").value = txtLevel.trim();
	document.getElementById("szczegoly_komentarz").innerHTML = txtComment.trim();

	document.getElementById("szczegoly").style.display = "block";

}
function hideDetails(){
	hideAll();
	showStd();
}

function courseStats(){
	let table = document.getElementById("mainTable");
	let totalCourseCount = table.rows.length-1;
	let shownCourseCount = 0;
	let shownCourseSlots = 0;

	let trs = table.getElementsByTagName("tr");
	for (let i = 1; i < trs.length; i++) {
		if (trs[i].style.display != "none"){
			shownCourseCount++;
			shownCourseSlots += parseInt(trs[i].getElementsByTagName("td")[5].innerHTML);
		}
	}
	
	document.getElementById("iloscPokazanychKursow").innerHTML = shownCourseCount;
	document.getElementById("iloscWszystkichKursow").innerHTML = totalCourseCount;
	document.getElementById("iloscWolnychMiejsc").innerHTML = shownCourseSlots;

}

function courseDetails(){
	let tr = document.getElementsByTagName("tr");
	
	for (i = 1; i < tr.length; ++i) {
		tr[i].innerHTML += '<td></td>';
		tds = tr[i].getElementsByTagName("td");

		let date = "";
		date = tds[3].innerHTML.trim()
		date = date.replaceAll("<br>", "");
		date = date.replaceAll("/\r|\n/","");
		date = date.split(/(?<=\))\s|\s+(?=\d)|\s+(?=\()|(?<=\d)\s|\)\(|(?<=\:\d\d)\-/);

		if(date[5]){
			date[4] += ")";
			date[5] = "("+date[5];
		}

		if(date[0]){
			tds[3].setAttribute("data-firstDay",date[0]);
		} else {
			tds[3].setAttribute("data-firstDay","");
		}
		if(date[1]){
			tds[3].setAttribute("data-firstStart",date[1]);
		} else {
			tds[3].setAttribute("data-firstStart","");
		}
		if(date[2]){
			tds[3].setAttribute("data-firstEnd",date[2]);
		} else {
			tds[3].setAttribute("data-firstEnd","");
		}
		
		if(date[5]){
			tds[3].setAttribute("data-secondDay",date[5]);
		} else {
			tds[3].setAttribute("data-secondDay","");
		}
		if(date[6]){
			tds[3].setAttribute("data-secondStart",date[6]);
		} else {
			tds[3].setAttribute("data-secondStart","");
		}
		if(date[7]){
			tds[3].setAttribute("data-secondEnd",date[7]);
		} else {
			tds[3].setAttribute("data-secondEnd","");
		}
		
		tr[i].setAttribute("onmouseover","tableEntryPoint('"+date[0]+"','"+date[1]+"','"+date[2]+"','"+date[5]+"','"+date[6]+"','"+date[7]+"')")

		tds[10].innerHTML += '<button class="buttonDetails" onclick="copyCode(\''+tds[1].innerHTML+'\')">Kopiuj kod</button></br>';
		tds[10].innerHTML += '<button class="buttonDetails" onclick="mark(\''+i+'\')">OZNACZ</button></br>';
		tds[10].innerHTML += '<button class="buttonDetails" onclick="showDetails(\''+i+'\')">SZCZEGÓŁY</button>';
	}
}

function copyCode(code){
	let elem = document.createElement("input");
	elem.value = code;
	elem.setAttribute("id", "copyText");
	var copyText = document.getElementById("main").appendChild(elem);

	copyText.select();
	copyText.setSelectionRange(0, 99999);

	document.execCommand("copy");

	copyText.parentNode.removeChild(copyText);
}

function editStaticBlockCode() {
	staticBlock = [];
	var code = document.getElementById("modalCode").value;
	code = code.trim();
	code = code.split("\n");
	for (i = 0; i < code.length; i++) {
		if(code[i] == "" || code[i] == "\n"){
			continue;
		}
		code[i] = code[i].replace(/\"/g, "")
		code[i] = code[i].split(",");
		if (code[i] != "") {
			var day = code[i][0];
			var start = code[i][1];
			var end = code[i][2];
			var comment = "";
			for (j = 3; j < code[i].length; j++) {
				if (j > 3) {
					comment += ",";
				}
				comment += code[i][j];
				addStaticBlockValue(day, start, end, comment);
			}
		}
	}
	setStorage();
	hideSetScheudle();
	updateInterface();
}

function oneBigFilter() {

	let table = document.getElementById("mainTable");
	let tr = table.getElementsByTagName("tr");

	let filterCourseName = document.getElementById("in_nazwa").value.toUpperCase();
	let filterCourseTeacher = document.getElementById("in_prowadzacy").value.toUpperCase();
	
	let filterCourseSlots = document.getElementById("cb_ukryjPelne").checked;
	
	let filterCourseNameL = document.getElementById("cb_lektoraty").checked;
	let filterCourseNameS = document.getElementById("cb_sport").checked;
	let filterCourseNameH = document.getElementById("cb_humanistyczne").checked;

	let filterCourseLevel1 = document.getElementById("cb_stopien1").checked;
	let filterCourseLevel2 = document.getElementById("cb_stopien2").checked;
	
	let filterCourseHours15 = document.getElementById("cb_godziny15").checked;
	let filterCourseHours30 = document.getElementById("cb_godziny30").checked;
	let filterCourseHours45 = document.getElementById("cb_godziny45").checked;
	let filterCourseHours60 = document.getElementById("cb_godziny60").checked;

	for (i = 1; i < tr.length; i++) {
		let tdCodeCatalog = tr[i].getElementsByTagName("td")[0];
		let tdCode = tr[i].getElementsByTagName("td")[1];
		let tdName = tr[i].getElementsByTagName("td")[2];
		let tdDate = tr[i].getElementsByTagName("td")[3];
		let tdTeacher = tr[i].getElementsByTagName("td")[4];
		let tdSlots = tr[i].getElementsByTagName("td")[5];
		let tdHours = tr[i].getElementsByTagName("td")[6];
		let tdStationary = tr[i].getElementsByTagName("td")[7];
		let tdLevel = tr[i].getElementsByTagName("td")[8];

		if (tdName) {
			
			let txtValueSlots = tdSlots.textContent || tdSlots.innerText;
			let txtValueCode = tdCode.textContent || tdCode.innerText;
			let txtValueName = tdName.textContent || tdName.innerText;
			let txtValueTeacher = tdTeacher.textContent || tdTeacher.innerText;
			let txtLevel = tdLevel.textContent || tdLevel.innerText;
			let txtHours = tdHours.textContent || tdHours.innerText;

			if (filterCourseSlots == true){
				if (txtValueSlots >= 1){
					tr[i].style.display = "";
				} else {
					tr[i].style.display = "none";
					continue;
				}
			}

			if (txtValueCode.charAt(0) == "w" && filterCourseNameS){
				tr[i].style.display = "";
			} else if (txtValueCode.charAt(0) == "v" && filterCourseNameS){
				tr[i].style.display = "";
			} else if (txtValueCode.charAt(0) == "L" && filterCourseNameL){
				tr[i].style.display = "";
			} else if (txtValueCode.charAt(0) == "H" && filterCourseNameH){
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
				continue;
			}

			if ((txtLevel == "I  II " || txtLevel == "I ") && filterCourseLevel1){
				tr[i].style.display = "";
			} else if ((txtLevel == "I  II " || txtLevel == " II ") && filterCourseLevel2){
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
				continue;
			}

			if (txtHours == "15" && filterCourseHours15){
				tr[i].style.display = "";
			} else if (txtHours == "30" && filterCourseHours30){
				tr[i].style.display = "";
			} else if (txtHours == "45" && filterCourseHours45){
				tr[i].style.display = "";
			} else if (txtHours == "60" && filterCourseHours60){
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
				continue;
			}

			if (txtValueName.toUpperCase().indexOf(filterCourseName) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
				continue;
			}

			if (txtValueTeacher.toUpperCase().indexOf(filterCourseTeacher) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
				continue;
			}

			var course1Day = tdDate.getAttribute("data-firstDay");
			var course1Start = tdDate.getAttribute("data-firstStart");
			var course1End = tdDate.getAttribute("data-firstEnd");
			var course2Day = tdDate.getAttribute("data-secondDay");
			var course2Start = tdDate.getAttribute("data-secondStart");
			var course2End = tdDate.getAttribute("data-secondEnd");

			course1Day = course1Day.charAt(1)+course1Day.charAt(2);
			course2Day = course2Day.charAt(1)+course2Day.charAt(2);

			if (course1Start != "") {
				course1Start = course1Start.split(":");
				var course1StartConv = parseInt(course1Start[0]) * 60 + parseInt(course1Start[1]);
			}
			if (course1End != "") {
				course1End = course1End.split(":");
				var course1EndConv = parseInt(course1End[0]) * 60 + parseInt(course1End[1]);
			}
			if (course2Start != "") {
				course2Start = course2Start.split(":");
				var course2StartConv = parseInt(course2Start[0]) * 60 + parseInt(course2Start[1]);
			}
			if (course2End != "") {
				course2End = course2End.split(":");
				var course2EndConv = parseInt(course2End[0]) * 60 + parseInt(course2End[1]);
			}
			if (course1StartConv !== undefined && course1EndConv !== undefined) {
				var course1Diff = course1EndConv - course1StartConv;
			}
			if (course2StartConv !== undefined && course2EndConv !== undefined) {
				var course2Diff = course2EndConv - course2StartConv;
			}

			if (course1Start != "" && course1Diff !== undefined) {
				var course1Start = course1StartConv -450;
				var course1Diff = course1Diff;
			}
			if (course2Start != "" && course2Diff !== undefined) {
				var course2Start = course2StartConv -450;
				var course2Diff = course2Diff;
			}

			for (j = 0; j < staticBlock.length; j++) {
				if (course1Day !== undefined) {
					if (staticBlock[j][0] == course1Day) {
						if (!((staticBlock[j][1] + staticBlock[j][2]) < course1Start) && !(staticBlock[j][1] > (course1Start + course1Diff))) {
							tr[i].style.display = "none";
							continue;
						}
					}
				}
				if (course2Day !== undefined) {
					if (staticBlock[j][0] == course2Day) {
						if (!((staticBlock[j][1] + staticBlock[j][2]) < course2Start) && !(staticBlock[j][1] > (course2Start + course2Diff))) {
							tr[i].style.display = "none";
							continue;
						}
					}
				}
			}
		}
	}
}

function addModalCode(){
	let textarea = document.getElementById("modalCode");
	let temp = textarea.value;
	temp = temp.split("\n");
	textarea.value = "";

	for (i = 0; i < temp.length; i++) {
		if(temp[i] == ""){
			continue
		} else {
			textarea.value += temp[i]+"\n";
		}
	}

	let day = document.getElementById("dzienUP").value;
	let hourStart = document.getElementById("godzinaRozpoczeciaUP").value;
	let hourEnd = document.getElementById("godzinaZakonczeniaUP").value;
	let comment = document.getElementById("komentarzUP").value;
	
	if(day != "" && hourStart != "" && hourEnd != ""){
		textarea.value += "\""+day+"\",\""+hourStart+"\",\""+hourEnd+"\",\""+comment+"\"\n";
	} else {
		alert("Błąd w formularzu");
	}
}

function removeElement(e) {
	let day = e.target.parentNode.id;
	let start = Math.round(parseFloat(e.target.style.marginTop) * 5 / smallestStep);
	let diff = Math.round(parseFloat(e.target.style.height) * 5 / smallestStep);

	if (!(isNaN(start) || isNaN(diff))) {
		for (i = 0; i < staticBlock.length; i++) {
			if (day == staticBlock[i][0] && start == staticBlock[i][1] && diff == staticBlock[i][2]) {
				staticBlock.splice(i, 1);
			}
		}
	}

	setStorage();
	updateInterface();
	oneBigFilter();
}