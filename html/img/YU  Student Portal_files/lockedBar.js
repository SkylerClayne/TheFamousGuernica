	function window_onload() {
  		window.addEventListener("scroll",navbar_reset_top,false);
	}

	var navbar_top=125;
  var cssRuleCode = document.all ? 'rules' : 'cssRules';
  // for loop decreasing the top-margin as scroll increases.

function navbar_reset_top() {
  var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
  if(scrollTop>navbar_top&&navbar.className==="navbar_absolute") {
    document.getElementById("navbar").className="navbar_fixed";
    //document.getElementById("submenu").className="submenu_fixed"
  } 
  else if(scrollTop<navbar_top&&navbar.className==="navbar_fixed") {
    document.getElementById("navbar").className="navbar_absolute";
    //document.getElementById("submenu").className="submenu_absolute";
  }
}
