
var searchedValue;

function setSearchedValue(form){
	searchedValue = form.searched;
}

function setValueOnSearchPage(){
	document.getElementById('searched').innerHTML = searchedValue;
}

function searchKeyPress(e){
	searchedValue = form.search.
	if(typeof e == 'undefined' && window.event) {
		e = window.event;
	}
	if (e.keyCode == 13) {
		document.getElementById('searchbtn').click();
	}
}

function openSearchPage(form){
	//setSearchedValue(form);
	document.form.submit();
	window.open("Search.html");
	//setValueOnSearchPage();
}

