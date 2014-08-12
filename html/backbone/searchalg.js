
function getSearchedValue(){

	localStorage.searchedValue = document.getElementById("search").value;
}

function searchKeyPress(e){
	if(typeof e == 'undefined' && window.event) {
		e = window.event;
	}
	if (e.keyCode == 13) {
		document.getElementById('searchbtn').click();
	}
}

function openSearchPage(){
	getSearchedValue();
	window.open("Search.html");
	//setSearchedValue(form);
	//setValueOnSearchPage();
}

function setSearchedValue(){
	document.getElementById("searched").innerText = localStorage.searchedValue;
}