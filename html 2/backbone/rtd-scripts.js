/*
Prevent errors with Internet Explorer if Array.isArray is not available.
 */
if(!Array.isArray) {
	Array.isArray = function (vArg) {
		return Object.prototype.toString.call(vArg) === "[object Array]";
	};
}

/*
Prevent errors with Internet Explorer if Object.defineProperty is not available.
 */
if (Object.prototype.__defineGetter__&&!Object.defineProperty) {
   Object.defineProperty=function(obj,prop,desc) {
	   if ("get" in desc) obj.__defineGetter__(prop,desc.get);
	   if ("set" in desc) obj.__defineSetter__(prop,desc.set);
   }
}

/*
Prevent errors with Internet Explorer if Array.indexOf is not available.
 */
if (!Array.prototype.indexOf) { 
	Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) { return i; }
		}
		return -1;
	}
}


//Custom Select Dropdown Box Start
jQuery(function(){
	jQuery('.select').customSelect();
	jQuery('.select-landmark').customSelect();
	jQuery('.googletrip-select').customSelect();
	jQuery('.googletrip-select-landmark').customSelect();
	jQuery('.rtdDay').customSelect();
});
//Custom Select Dropdown Box End

//Force Horizontal Scrollbar on resized window Start
var resizedWindow = function () {
	if(jQuery(window).width() < 960) {
		jQuery("body").css("width","960px") &&
		jQuery("html").css("overflow-x","auto");
	}
	else {
		jQuery("body").css("width","100%");
	}
}

Array.prototype.contains = function(k) {
    for(var p in this)
        if(this[p] === k) return true;
    return false;
}

Array.prototype.indexOfPropertyValue = function(prop,value) {
    for (var index = 0; index < this.length; index++){
      if (this[index][prop]){
        if (this[index][prop] == value){
          return index;
        }
      }
    }
    return -1;
}

Array.prototype.indexOfProperty = function(prop,value) {
    for (var index = 0; index < this.length; index++){
      if (this[index][prop]){
        if (this[index][prop] == value){
          return this[index];
        }
      }
    }
    return null;
}

Array.prototype.indexOfPropertyArray = function(elements) {
    for (var index = 0; index < this.length; index++){
      if (this[index]){
    	for(var i = 0; i < elements.length; i++){
		    if(this[index] == elements[i]){
		    	return this[index];
		    }
        }
      }
    }
    return null;
}

String.prototype.replaceAll = function(search, replace)
{
    //if replace is null, return original string otherwise it will
    //replace search string with 'undefined'.
    if(!replace) 
        return this;

    return this.replace(new RegExp('[' + search + ']', 'g'), replace);
}

String.prototype.isEqual = function (str){
    return this.toUpperCase() == str.toUpperCase();
}

var nameList        = ["pFromStreet","pFromIntersection1","pFromIntersection2","pToStreet","pToIntersection1","pToIntersection2","googleDay","pWhen","rtdDay","hour","minute","ampm"];
var nameDefaultList = ["origin","destination","pFromStreet","pFromIntersection1","pFromIntersection2","pToStreet","pToIntersection1","pToIntersection2","landmarkOriginCategories","landmarkOriginLandmarks","landmarkDestinCategories","landmarkDestinLandmarks"];
var nameReturnList  = ["destination","origin","pToStreet","pToIntersection1","pToIntersection2","pFromStreet","pFromIntersection1","pFromIntersection2","landmarkDestinCategories","landmarkDestinLandmarks","landmarkOriginCategories","landmarkOriginLandmarks"];

// set the default placeholder text for input fields when radio button Google or RTD trip planner is clicked
var addressFT_RTD = "Enter an address, exclude city, state and zip";
var intersectionFT_RTD = "Enter a street name";
var addressFT_Google = "Enter an address";
var intersectionFT_Google = "Enter a full street name";
var addressTabName = "address";
var intersectionTabName = "intersection";
var landmarkTabName = "landmark";

// end set the default placeholder text for input fields when radio button Google or RTD trip planner is clicked//Force Horizontal Scrollbar on resized window End

//Right Sidebar Tabs Start//
// Sidebars are hidden with css, so we set them to display block here once js loads
jQuery(document).ready(function(){
	jQuery('#sidebar-tabs, #sidebar-tabs-vertical').css('display','block');
});
jQuery(function(){
	jQuery('.tripplanner-sidebar').tabSlideOut({
    	tabHandle: '.tripplanner-tab',  //class of the element that will become your tab
    	pathToTabImage: staticServer + 'images/tripplanner-sidebar-tabs-sprite.png', //path to the image for the tab
    	imageHeight: '82px',   //height of tab image
    	imageWidth: '79px',  //width of tab image
    	tabLocation: 'right', //where tab lives, top, right, bottom, or lefts
    	speed: 300,  //speed of animation
    	action: 'click',  //options: 'click' or 'hover', action to trigger animation
    	topPos: '55px', //position from the top/ use if tabLocation is left or right
    	leftPos: '20px',  //position from left/ use if tabLocation is bottom or top
    	fixedPosition: false,  //options: true makes it stick(fixed position) on scroll
		onLoadSlideOut: false 
    });

	jQuery('.schedulefinder-sidebar').tabSlideOut({
    	tabHandle: '.schedulefinder-tab',  //class of the element that will become your tab
    	pathToTabImage: staticServer + 'images/schedulefinder-sidebar-tabs-sprite.png', //path to the image for the tab
    	imageHeight: '82px',   //height of tab image
    	imageWidth: '79px',  //width of tab image
    	tabLocation: 'right', //where tab lives, top, right, bottom, or left
    	speed: 300,  //speed of animation
    	action: 'click',  //options: 'click' or 'hover', action to trigger animation
    	topPos: '145px', //position from the top/ use if tabLocation is left or right
    	leftPos: '20px',  //position from left/ use if tabLocation is bottom or top
    	fixedPosition: false,  //options: true makes it stick(fixed position) on scroll
		onLoadSlideOut: false 
    });

	jQuery('.rideralerts-sidebar').tabSlideOut({
    	tabHandle: '.rideralerts-tab',  //class of the element that will become your tab
    	pathToTabImage: staticServer + 'images/rideralerts-sidebar-tabs-sprite.png', //path to the image for the tab
    	imageHeight: '82px',   //height of tab image
    	imageWidth: '79px',  //width of tab image
    	tabLocation: 'right', //where tab lives, top, right, bottom, or left
    	speed: 300,  //speed of animation
    	action: 'click',  //options: 'click' or 'hover', action to trigger animation
    	topPos: '235px', //position from the top/ use if tabLocation is left or right
    	leftPos: '20px',  //position from left/ use if tabLocation is bottom or top
    	fixedPosition: false,  //options: true makes it stick(fixed position) on scroll
		onLoadSlideOut: false 
    });
	
	jQuery('.tripplanner-sidebar-vertical').tabSlideOut({
    	tabHandle: '.tripplanner-tab-vertical',  //class of the element that will become your tab
    	pathToTabImage: staticServer + 'images/tripplanner-sidebar-tabs-sprite-vertical.png', //path to the image for the tab
    	imageHeight: '140px',   //height of tab image
    	imageWidth: '29px',  //width of tab image
    	tabLocation: 'right', //where tab lives, top, right, bottom, or left
    	speed: 300,  //speed of animation
    	action: 'click',  //options: 'click' or 'hover', action to trigger animation
    	topPos: '55px', //position from the top/ use if tabLocation is left or right
    	leftPos: '20px',  //position from left/ use if tabLocation is bottom or top
    	fixedPosition: false,  //options: true makes it stick(fixed position) on scroll
		onLoadSlideOut: false 
    });

	jQuery('.schedulefinder-sidebar-vertical').tabSlideOut({
    	tabHandle: '.schedulefinder-tab-vertical',  //class of the element that will become your tab
    	pathToTabImage: staticServer + 'images/schedulefinder-tabs-sprite-vertical.png', //path to the image for the tab
    	imageHeight: '140px',   //height of tab image
    	imageWidth: '29px',  //width of tab image
    	tabLocation: 'right', //where tab lives, top, right, bottom, or left
    	speed: 300,  //speed of animation
    	action: 'click',  //options: 'click' or 'hover', action to trigger animation
    	topPos: '200px', //position from the top/ use if tabLocation is left or right
    	leftPos: '20px',  //position from left/ use if tabLocation is bottom or top
    	fixedPosition: false,  //options: true makes it stick(fixed position) on scroll
		onLoadSlideOut: false 
    });

	jQuery('.rideralerts-sidebar-vertical').tabSlideOut({
    	tabHandle: '.rideralerts-tab-vertical',  //class of the element that will become your tab
    	pathToTabImage: staticServer + 'images/rideralerts-tabs-sprite-vertical.png', //path to the image for the tab
    	imageHeight: '140px',   //height of tab image
    	imageWidth: '29px',  //width of tab image
    	tabLocation: 'right', //where tab lives, top, right, bottom, or left
    	speed: 300,  //speed of animation
    	action: 'click',  //options: 'click' or 'hover', action to trigger animation
    	topPos: '345px', //position from the top/ use if tabLocation is left or right
    	leftPos: '20px',  //position from left/ use if tabLocation is bottom or top
    	fixedPosition: false,  //options: true makes it stick(fixed position) on scroll
		onLoadSlideOut: false 
    });
	
});

jQuery(function(){
	resizedWindow();
});
	
jQuery(window).resize(function() {
	resizedWindow();
});

//Right Sidebar Tabs End//

//Right Sidebar Tabs Button States Start //
//
jQuery(function(){
   jQuery('.tripplanner-tab').click(function() {
    jQuery(this).toggleClass('tripplanner-tab').toggleClass('tripplanner-tab1').toggleClass('tripplanner-tab-active');
});   

jQuery('.schedulefinder-tab').click(function() {
    jQuery(this).toggleClass('schedulefinder-tab').toggleClass('schedulefinder-tab1').toggleClass('schedulefinder-tab-active');
});   

jQuery('.rideralerts-tab').click(function() {
    jQuery(this).toggleClass('rideralerts-tab').toggleClass('rideralerts-tab1').toggleClass('rideralerts-tab-active');
});   
   
jQuery('.tripplanner-tab-vertical').click(function() {
    jQuery(this).toggleClass('tripplanner-tab-vertical').toggleClass('tripplanner-tab-vertical1').toggleClass('active');
});   

jQuery('.schedulefinder-tab-vertical').click(function() {
    jQuery(this).toggleClass('schedulefinder-tab-vertical').toggleClass('schedulefinder-tab-vertical1').toggleClass('active');
});   

jQuery('.rideralerts-tab-vertical').click(function() {
    jQuery(this).toggleClass('rideralerts-tab-vertical').toggleClass('rideralerts-tab-vertical1').toggleClass('active');
});   

});
//Right Sidebar Tabs Button States End//


//Back to Top Start//
jQuery(function(){

	// hide #back-top first
	jQuery("#back-top").hide();
	
	// fade in #back-top
	jQuery(function () {
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > 100) {
				jQuery('#back-top').fadeIn();
			} else {
				jQuery('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		jQuery('#back-top a').click(function () {
			jQuery('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

});
//Back to Top End//

//select the radio option of either Google or RTD
function formtripPlannerSelect(id)
{
	if(id == "google")
	{
		jQuery("input[id='tripPlannerSelectGoogle']").each(function(index) {
			jQuery(this).trigger('click');
		});
	}
	else //rtd
	{
		jQuery("input[id='tripPlannerSelectRtd']").each(function(index) {
			jQuery(this).trigger('click');
		});
	}
	
}

//reset pre-selected values
showOriginPlannerChoices = function(id){
    //trigger click event 
    jQuery('#start-tripplanner-tabs a[href$="'+ id + '"]').trigger('click');
    jQuery('#origin').val(id);
}

showDestinPlannerChoices = function(id){
    //trigger click event 
    jQuery('#end-tripplanner-tabs a[href$="'+ id + '"]').trigger('click');
    jQuery('#destination').val(id);
}

//General Tabs Start//
function contentSwitcher(settings){
    //Hide all of the content except the first one on the nav
    jQuery(settings.contentClass).show();
    jQuery(settings.contentClass).not(':first').hide();
    jQuery(settings.navigationId).find('li').removeClass('active');
    jQuery(settings.navigationId).find('li:first').addClass('active');

    // onClick set the active state, 
    // hide the content panels and show the correct one
    jQuery(settings.navigationId).find('a').each(function(index) {
    
	    jQuery(this).unbind().click(function(e){
	        var contentToShow = settings.parentNode + jQuery(this).attr('href');
	        contentToShow = jQuery(contentToShow);
	
	        //dissable normal link behaviour
	        e.preventDefault();
	
	        //set the proper active class for active state css
	        jQuery(settings.navigationId).find('li').removeClass('active');
	        jQuery(this).parent('li').addClass('active');
	
	        //hide the old content and show the new
	        jQuery(settings.contentClass).hide();
	        contentToShow.show();
	    	
	        //set the proper active class for active state css
	        jQuery(settings.navigationId).find('li').removeClass('active');
	        jQuery(this).parent('li').addClass('active');
	
	        //hide the old content and show the new
	        jQuery(settings.contentClass).hide();
	        contentToShow.show();
	    });
    });
}

function mediaContentSwitcher(settings){
    // Show all of the content
	jQuery(settings.contentClass).each(function(index) {
    	jQuery(this).hide();
    });

	// Hide all of the content except the id=start-intersection
	jQuery(settings.contentId).each(function(index) {
    	jQuery(this).show();
    });

    // on 'li' remove class 'active'
	jQuery("div[id='"+settings.navigationId+"']").each(function(index) {
		jQuery(this).find('li').removeClass('active');
	});
	
	// on li:first add class 'active'
	jQuery("div[id='"+settings.navigationId+"']").each(function(index) {
		jQuery(this).find('li:first').addClass('active');
	});
	
    // onClick set the active state, 
    // hide the content panels and show the correct one
	// settings.parentNode+
	jQuery(settings.parentNode).find("div[id='"+settings.navigationId+"']").find('a').each(function(index) {
    
    
	    jQuery(this).unbind().click(function(e){
	        //dissable normal link behaviour
	        e.preventDefault();	        

	        var contentToShowID  = jQuery(this).attr('href').substring(1);
	        var contentToShowVal = jQuery(this).html();
	        jQuery('form[id="tripplannerform"]').validate().resetForm();
	        // set
		    switch(contentToShowID) {
			    case "start-address":
				case "start-intersection":
			        jQuery("input[name='origin']").each(function(index) {
			        	jQuery(this).val(contentToShowVal);
			        });
					break;
				case "start-landmark":
			        jQuery("input[name='origin']").each(function(index) {
			        	jQuery(this).val(contentToShowVal);
			        });

			        if (jQuery(settings.parentNode+'#landmarkOriginCategories').val() == null)
			    		fillLandmarkCategories(settings.parentNode+'#landmarkOriginCategories',settings.parentNode+'#landmarkOriginLandmarks');
			        
					jQuery(settings.parentNode+'#landmarkOriginCategories').change(function(e) {
						if (jQuery(this).val() !== null)
							fillLandmarks(jQuery(this).val(),settings.parentNode+'#landmarkOriginLandmarks');
					});
					break;
				case "end-address":
				case "end-intersection":
			        jQuery("input[name='destination']").each(function(index) {
			        	jQuery(this).val(contentToShowVal);
			        });
					break;
				case "end-landmark":
			        jQuery("input[name='destination']").each(function(index) {
			        	jQuery(this).val(contentToShowVal);
			        });

			    	if (jQuery(settings.parentNode+'#landmarkDestinCategories').val() == null)
			    		fillLandmarkCategories(settings.parentNode+'#landmarkDestinCategories',settings.parentNode+'#landmarkDestinLandmarks');
			        
					jQuery(settings.parentNode+'#landmarkDestinCategories').change(function(e) {
						if (jQuery(this).val() !== null)
							fillLandmarks(jQuery(this).val(),settings.parentNode+'#landmarkDestinLandmarks');
					});
					break;
		    }
	        
	        //set the proper active class for active state css
	        jQuery("div[id='"+settings.navigationId+"']").each(function(index) {
	        	jQuery(this).find('li').removeClass('active');
	        });
	        jQuery("a[href='"+jQuery(this).attr('href')+"']").each(function(index) {
	        	jQuery(this).parent('li').addClass('active');
	        });

	        //hide the old content and show the new
	    	jQuery(settings.contentClass).each(function(index) {
	        	jQuery(this).hide();
	        });
	    	jQuery(settings.contentClass+"[id='"+contentToShowID+"']").each(function(index) {
	        	jQuery(this).show();
	        });

	    });
    });
	
    
	jQuery(settings.parentNode+ " input[id='tripPlannerSelectRtd']").each(function(index) {
		jQuery(this).unbind().click(function(){
			jQuery("div[id='max1'],div[id='max2'],div[id='includeRoutes'],div[id='preferences'],span[id='rtdDayOption']").show(); //style.display = "block";
			jQuery("span[id='googleDayOption']").hide(); //style.display = "none";
			jQuery('input:radio[name="tripPlannerSelect"][value="google"]').filter('[checked="checked"]').each(function(index) {
				jQuery(this).prop('checked', false);
				jQuery(this).removeAttr('checked'); //checked=false;
			});
			jQuery('input:radio[name="tripPlannerSelect"][value="rtd"]:not(:checked)').each(function(index) {
				jQuery(this).prop('checked', true);
				jQuery('input:radio[name="tripPlannerSelect"][value="rtd"]').attr('checked','checked');
			});
			
			// update the default placeholder text for input fields when radio button Google or RTD trip planner is clicked
			// When radio button RTD trip planner is clicked
			// Address placeholder text
			jQuery('input:text[id="pFromStreet"],input:text[id="pToStreet"]').attr('placeholder',addressFT_RTD);
			// Intersection placeholder text
			jQuery('input:text[id="pFromIntersection1"],input:text[id="pFromIntersection2"],input:text[id="pToIntersection1"],input:text[id="pToIntersection2"]').attr('placeholder',intersectionFT_RTD);
			// end update the default placeholder text for input fields when radio button Google or RTD trip planner is clicked
		});
	});

	jQuery(settings.parentNode+ " input[id='tripPlannerSelectGoogle']").each(function(index) {
		jQuery(this).unbind().click(function(){
			jQuery("div[id='max1'],div[id='max2'],div[id='includeRoutes'],div[id='preferences'],span[id='rtdDayOption']").hide(); //style.display = "none";
			jQuery("span[id='googleDayOption']").show(); //style.display = "block";
			jQuery('input:radio[name="tripPlannerSelect"][value="rtd"]').filter('[checked="checked"]').each(function(index) {
				jQuery(this).prop('checked', false);
				jQuery(this).removeAttr('checked');       //checked=false;
			});
			jQuery('input:radio[name="tripPlannerSelect"][value="google"]:not(:checked)').each(function(index) {
				jQuery(this).prop('checked', true);
				jQuery('input:radio[name="tripPlannerSelect"][value="google"]').attr('checked','checked');
			});
			
			// update the default placeholder text for input fields when radio button Google or RTD trip planner is clicked
			// When radio button Google trip planner is clicked
			// Address placeholder text
			jQuery('input:text[id="pFromStreet"],input:text[id="pToStreet"]').attr('placeholder',addressFT_Google);
			// Intersection placeholder text
			jQuery('input:text[id="pFromIntersection1"],input:text[id="pFromIntersection2"],input:text[id="pToIntersection1"],input:text[id="pToIntersection2"]').attr('placeholder',intersectionFT_Google);
			// end update the default placeholder text for input fields when radio button Google or RTD trip planner is clicked
		});
	});
}
//General Tabs End//
//Start Tripplanner Tabs Start//
jQuery(function(){

	    var startSettings = {
	    		parentNode      : '#homepage-trip-planner ',
	            contentClass    : '.start-tripplanner-tabs-content',
	            contentId       : '.start-tripplanner-tabs-content[id="start-address"]',
	            navigationId    : 'start-tripplanner-tabs',
	            navigationLeave : '.tripplanner-leave'            
	    };
	    var endSettings = {
	    		parentNode      : '#homepage-trip-planner ',
	            contentClass    : '.end-tripplanner-tabs-content',
	            contentId       : '.end-tripplanner-tabs-content[id="end-address"]',
	            navigationId    : 'end-tripplanner-tabs'
	    };
		var socialSettings = {
	            parentNode      : '#content ',
	            contentClass    : '#content .social-media-content',
	            navigationId    : '#content  #social-media-tabs'
		};
		
		var mediaStartSettings = {
	    		parentNode      : '#sidebar-tabs ',
	            contentClass    : '.start-tripplanner-tabs-content',
	            contentId       : '.start-tripplanner-tabs-content[id="start-address"]',
	            navigationId    : 'start-tripplanner-tabs',
	            navigationLeave : '.tripplanner-leave'            
	    };
	    var mediaEndSettings = {
	    		parentNode   : '#sidebar-tabs ',
	            contentClass : '.end-tripplanner-tabs-content',
	            contentId    : '.end-tripplanner-tabs-content[id="end-address"]',
	            navigationId : 'end-tripplanner-tabs'
	    };
		
	    var verticalStartSettings = {
	    		parentNode      : '#sidebar-tabs-vertical ',
	            contentClass    : '.start-tripplanner-tabs-content',
	            contentId       : '.start-tripplanner-tabs-content[id="start-address"]',
	            navigationId    : 'start-tripplanner-tabs',
	            navigationLeave : '.tripplanner-leave'            
	    };
	    var verticalEndSettings = {
	    		parentNode   : '#sidebar-tabs-vertical ',
	            contentClass : '.end-tripplanner-tabs-content',
	            contentId    : '.end-tripplanner-tabs-content[id="end-address"]',
	            navigationId : 'end-tripplanner-tabs'
	    };
		
	    if(jQuery(mediaEndSettings.parentNode).length){
	    	mediaContentSwitcher(mediaStartSettings);
	    	mediaContentSwitcher(mediaEndSettings);
	    }

	    if(jQuery(verticalStartSettings.parentNode).length){
	    	mediaContentSwitcher(verticalStartSettings);
	    	mediaContentSwitcher(verticalEndSettings);
	    } else if(jQuery(startSettings.parentNode).length){
	    	mediaContentSwitcher(startSettings);
	    	mediaContentSwitcher(endSettings);
	    	contentSwitcher(socialSettings);
	    }
});

//document ready function
//this is for setting the active state for the tabs. 
//The following pages are using tabs component: media center archive, news and alert archive, board financial packets, and board meetings/study session
jQuery(function(){
      //do stuff here
      //media center archive, news and alert archive, and board meetings/study session use the same contentClass & navigationId as these pages render data by year
      var newsSettings = {
                parentNode   : '#right-sidebar-wrapper ',
                contentClass : '#right-sidebar-wrapper .news-archive-content',
                navigationId : '#right-sidebar-wrapper #news-archive-tabs'
      };
      //except for board financial packets, the tabs are messed up if use the same navigationId of 'news-archive-tabs'. Therefore, it has its own navigationId.
      var wipSettings = {
                parentNode   : '#right-sidebar-wrapper ',
                contentClass : '#right-sidebar-wrapper .news-archive-content',
                navigationId : '#right-sidebar-wrapper #wip-tabs'
      };
                                              
      contentSwitcher(wipSettings);
      contentSwitcher(newsSettings);
});

function prettyPrint(array){
	var string = '';
	for (i=0;i<array.length;i++){
		string += array[i] + '<br>';
	}
	return string;	
}

//dwr functions
function fillLandmarkCategories(strCategoryId,strLandmarkId){

	var categoryId = strCategoryId;
	var landmarkId = strLandmarkId;
	var updateLandmarkCategories = function(data){
		if (jQuery.localStorage.isExpires("categories")) {
			jQuery.localStorage.setItem("categories", data,600);
		}
		//dwr.util.setValue(categoryId,'');
		jQuery(categoryId).children().removeAttr("selected");
		//dwr.util.removeAllOptions(categoryId);
		jQuery(categoryId).children('option').each(function() {
			jQuery(this).remove();
		});
		//dwr.util.addOptions(categoryId, data, "key", "value");
        jQuery.each(data, function (index, obj) {
        	jQuery(categoryId).append("<option value='"+obj.key+"'>"+obj.value+"</option>");
        });
    	
        var defaultVal  = jQuery(categoryId+' option:eq(0)').val();
        var selectHtml = jQuery(categoryId+' option:eq(0)').html();
		jQuery(categoryId+'~span.select:eq(0)').find('.selectInner').html(selectHtml);
		jQuery(categoryId+'~span.select:eq(0)').addClass('changed');
		fillLandmarks(defaultVal,landmarkId);

		if (!jQuery.localStorage.isExpires("tripplanned")) {
		    var postData     = jQuery.localStorage.getItem("tripplanned");
		    
	    	var origin = postData.indexOfPropertyValue("name","origin");
	    	var destination = postData.indexOfPropertyValue("name","destination");

	    	if ((categoryId.indexOf("landmarkOriginCategories") !== -1) && (postData[origin].value == landmarkTabName)) {
	        	var categories = postData.indexOfPropertyValue("name","landmarkOriginCategories");
	        	var landmarks  = postData.indexOfPropertyValue("name","landmarkOriginLandmarks");
	        	
	        	if (categories == -1)
	        		fillLandmarks(defaultVal,landmarkId);
	        	else {
	        		//set category option to the selected val on selectbox
					jQuery('#landmarkOriginCategories option[value="'+postData[categories].value+'"]').attr('selected', 'selected');
	        		jQuery('#landmarkOriginCategories').next('.select').find('.selectInner').html(jQuery('#landmarkOriginCategories option[value="'+postData[categories].value+'"]').html());
					fillLandmarks(postData[categories].value,landmarkId);
	        	}
	        	
	    	}
	    	if ((categoryId.indexOf("landmarkDestinCategories") !== -1) && (postData[destination].value == landmarkTabName)) {
	        	var categories = postData.indexOfPropertyValue("name","landmarkDestinCategories");
	        	var landmarks  = postData.indexOfPropertyValue("name","landmarkDestinLandmarks");
	        	
	        	if (categories == -1)
	        		fillLandmarks(defaultVal,landmarkId);
	        	else {
	        		//set category option to the selected val on selectbox
					jQuery('#landmarkDestinCategories option[value="'+postData[categories].value+'"]').attr('selected', 'selected');
	        		jQuery('#landmarkDestinCategories').next('.select').find('.selectInner').html(jQuery('#landmarkDestinCategories option[value="'+postData[categories].value+'"]').html());
					fillLandmarks(postData[categories].value,landmarkId);
	        	}
	    	}
		} else fillLandmarks(defaultVal,landmarkId);
	}
	dwr.util.useLoadingMessage();
	if (jQuery.localStorage.isExpires("categories")) {
		DWRFacade.getLandmarkCategories(updateLandmarkCategories);
	} else {
		updateLandmarkCategories(jQuery.localStorage.getItem("categories"));
	}
}

function fillLandmarks(categoryId, strLandmarkId){
	var selectId   = categoryId;
	var landmarkId = strLandmarkId;	
	var updateLandmarks = function(data){
		if (jQuery.localStorage.isExpires("landmarks"+selectId)) {
			jQuery.localStorage.setItem("landmarks"+selectId, data,600);
		}
		// dwr.util.setValue(landmarkId,'');
		jQuery(landmarkId).children().removeAttr("selected");
	    //dwr.util.removeAllOptions(landmarkId);
		jQuery(landmarkId).children('option').each(function() {
			jQuery(this).remove();
		});
	    //dwr.util.addOptions(landmarkId, data, "key", "value");
        jQuery.each(data, function (index, obj) {
        	jQuery(landmarkId).append("<option value='"+obj.key+"'>"+obj.value+"</option>");
        });
		
		// set landmark option to the selected val on selectbox
		selectVal  = jQuery(landmarkId).find(':selected').val();
		selectHtml = jQuery(landmarkId).find(':selected').html();
		jQuery(landmarkId+'~span.select:eq(0)').find('.selectInner').html(selectHtml);
		jQuery(landmarkId+'~span.select:eq(0)').addClass('changed');
		// end set landmark option to the selected val on selectbox
	}
	if (jQuery.localStorage.isExpires("landmarks"+selectId)) {
		DWRFacade.getLandmarks(selectId, updateLandmarks);
	} else {
		updateLandmarks(jQuery.localStorage.getItem("landmarks"+selectId));
	}
	
}

function loadDate() {
   current_date = new Date();
   var month = (current_date.getMonth()+1)
   if (month<10) month="0"+month;
   var day = current_date.getDate()
   if (day<10) day="0"+day;
   year = current_date.getFullYear();
   return month + '/' + day + '/' + year ;
}

function loadHourAndSuffix() {
	   current_time = new Date();
	   loadMinutes();
	   hour = current_time.getHours();
	   minutes = current_time.getMinutes();

	   if (hour > 12) {
			hour -= 12;
			var strHour = (hour > 9) ? hour : '0'+hour; 
			jQuery("select[name='ampm']").each(function (index){jQuery(this).val('p');});
			jQuery("select[name='ampm']").each(function (index){jQuery(this).next('.select').find('.selectInner').html('PM');});
			jQuery("select[name='hour']").each(function (index){jQuery(this).val(strHour);});
			jQuery("select[name='hour']").each(function (index){jQuery(this).next('.select').find('.selectInner').html(strHour);});
	   } else if (hour == 12) {
			jQuery("select[name='ampm']").each(function (index){jQuery(this).val('p');});
			jQuery("select[name='ampm']").each(function (index){jQuery(this).next('.select').find('.selectInner').html('PM');});
			jQuery("select[name='hour']").each(function (index){jQuery(this).val(hour);});
			jQuery("select[name='hour']").each(function (index){jQuery(this).next('.select').find('.selectInner').html(hour);});
	   }else{
		    var strHour = (hour > 9) ? hour : '0'+hour; 
			jQuery("select[name='ampm']").each(function (index){jQuery(this).val('a');});
			jQuery("select[name='ampm']").each(function (index){jQuery(this).next('.select').find('.selectInner').html('AM');});
			jQuery("select[name='hour']").each(function (index){jQuery(this).val(strHour);});
			jQuery("select[name='hour']").each(function (index){jQuery(this).next('.select').find('.selectInner').html(strHour);});
	   }
	   var strMinutes = minutes > 9 ? minutes : '0'+minutes; 
	   jQuery("select[name='minute']").each(function (index){jQuery(this).val(strMinutes)});                                           // set select val on selectbox
	   jQuery("select[name='minute']").each(function (index){jQuery(this).next('.select').find('.selectInner').html(strMinutes);}); // set select val on selectbox
}

function loadMinutes() {
   current_time = new Date();
   minutes = current_time.getMinutes();

   var minuteArray=new Array(60);
   var options = '';
   
   for(var i=0;i<60;i++){
    	if ( i < 10 ){
    		minuteArray[i] = '0' + i;
    	}else{
    		minuteArray[i] = i;
    	}
   }
   
   for (var i = 0; i < minuteArray.length; i++) {
     options += '<option value="' + minuteArray[i]+ '">' + minuteArray[i]+ '</option>';
   }
   var strMinutes = minutes > 9 ? minutes : '0'+minutes; 
   jQuery("select[name='minute']").each(function (index){jQuery(this).html(options)});   // load option in selectbox for each if multiple
   
   if(jQuery("select[name='minute']").val() == null) {
	jQuery("select[name='minute']").each(function (index){jQuery(this).val(strMinutes)});    // set select val on selectbox
	jQuery("select[name='minute']").each(function (index){jQuery(this).next('.select').find('.selectInner').html(strMinutes);}); // set select val on selectbox	
   }
  
}

function setMinute(vhour,vminute,vampm) {
	
	var strMinutes = vminute > 9 ? vminute : '0'+ vminute; 
	var strHour = (vhour > 9) ? vhour : '0'+ vhour;
	
	jQuery("select[name='ampm']").each(function (index){jQuery(this).val(vampm);});
	if(vampm == 'a') jQuery("input[name='ampm']").each(function (index){jQuery(this).next('.select').find('.selectInner').html('AM');});
	else jQuery("select[name='ampm']").each(function (index){jQuery(this).next('.select').find('.selectInner').html('PM');});

	jQuery("select[name='hour']").each(function (index){jQuery(this).val(strHour);});
	jQuery("select[name='hour']").each(function (index){jQuery(this).next('.select').find('.selectInner').html(strHour);});
	
	jQuery("select[name='minute']").each(function (index){jQuery(this).val(strMinutes)});    // set select val on selectbox
	jQuery("select[name='minute']").each(function (index){jQuery(this).next('.select').find('.selectInner').html(strMinutes);}); // set select val on selectbox
}

exampleObjects = ['pFromIntersection1', 'pFromIntersection2', 'pToIntersection1','pToIntersection2','pFromStreet', 'pToStreet','pIncludeDataField','pExcludeDataField'];
exampleText = ['Ex: Broadway','Ex: Colfax','Ex: Broadway','Ex: Colfax','Ex: 123 Elm st','Ex: 456 Main st','Include Routes Ex: 15, 40','Exclude Routes Ex: 7, 21'];

function clearExampleText(){
	for (var i=0;i<exampleText.length;i++){
		formObject = document.getElementById(exampleObjects[i]);
		if (formObject.value == exampleText[i]){formObject.value='';}	
	}
}

function loadExampleText(){
	for (var i=0;i<exampleText.length;i++){
		formObject = document.getElementById(exampleObjects[i]);
		if (formObject.value == null || formObject.value == ''){
			formObject.value=exampleText[i];
		}
		formObject.onfocus=function(){this.value='';};
	}
}

jQuery(document).ready(function(){
	// onLoad set googleDay
	jQuery('form[id="tripplannerform"]:visible').find("input[name='googleDay']").each(function(index)
    {
        jQuery(this).val(loadDate());
    });

    var minDate = new Date();
	//jQuery('form[id="tripplannerform"]').find('input[name="googleDay"]').datepicker("destroy");
	jQuery('form[id="tripplannerform"]:visible').find('input[name="googleDay"]').datepicker({ 
		minDate: minDate,
		maxDate: "+1m +1w", // Max Date on Google Trip Planner Date Picker
		onSelect: function (dateText, inst) {
		    jQuery("input[name='googleDay']").each(function(index) {
		    	 jQuery(this).val(dateText);
		    });
		}
	});
    
    // onLoad set rtdDay drop-down option to the default day of the week
	// set pDay_val to 1 (Weekday) as default
    var pDay_val = 1;
    
	// URL parameter 'pDay' is used to set the selected option for pDay drop-down. This url parameter comes from the RTD Trip Planner results link.
	if (document.location.href.indexOf('pDay=') != -1) {
		url = document.location.href;
		var pDay_check = /[?&]pDay=([^&]+)/i;
		var match = pDay_check.exec(url);
		// check if there is a match that pDay parameter exists, set pDay_val to the value of url parameter 'pDay'
		if (match != null) {
			pDay_val = match[1];
		} 
		// else if there isn't a match, set pDay_val to 1 (Weekday) as default
		else {
			pDay_val = 1;
		}
		
	// check if localStorage serviceType does exist, retrieve serviceType from localStorage 
	// (which is rendered in schedules/ajax/getAjaxRouteAutoComplete.action) and set it to pDay_val
	} else if (!jQuery.localStorage.isExpires("serviceType")) {
		pDay_val = jQuery.localStorage.getItem("serviceType");
	} 
	
	// else, retrieve day of week from Date() Javascript function
	else {
		var today  = new Date().getDay();
		// if today is Sunday, set rtdDay to 3
		if (today == 0) { pDay_val = 3; }
		// if today is Saturday, set rtdDay to 2
		else if (today == 6) { pDay_val = 2; }
		// else if today is not 0 or 6, set rtdDay to 1 (Weekday)
		else { pDay_val = 1; }
	}
	
	// set rtdDay drop-down option
	jQuery("select[name='pDay']").each(function(index) {
		jQuery(this).val(pDay_val);	// set select val on selectbox
		selectVal  = jQuery(this).find(':selected').val();
		selectHtml = jQuery(this).find(':selected').html();
		jQuery(this).next('.select').find('.selectInner').html(selectHtml);
	});
	// end set rtdDay drop-down option to the default day of the week
	
	// onLoad set radio button for Trip Planner (Google or RTD)
	// Find file pathname of url. If it is RTD Trip Planner results link, set the radio button correspondent to the url parameter 'tripPlannerSelect'.
	// This is for a purpose of executing this validation code only when it comes to RTD Trip Planner results link to enhance page performance. 
	filePathname = document.location.pathname;
	jQuery("input[id='tripPlannerSelectGoogle']").each(function(index) {
		jQuery(this).trigger('click');
	});
	
	/* REMOVE RTD TRIPPLANNER
	if(filePathname.indexOf('/tripplanner/getRtdTrip.action') != -1){ 
		//URL parameter 'tripPlannerSelect' is used to validate whether "rtd" is the value selected. This url parameter comes from the RTD Trip Planner results link.
		url = document.location.href;
		//check radio option for RTD else Google as default.
		if(url.indexOf('tripPlannerSelect=rtd') != -1){ 
			jQuery("input[id='tripPlannerSelectRtd']").each(function(index) {
				jQuery(this).trigger('click');
			});
		} else {	
			jQuery("input[id='tripPlannerSelectGoogle']").each(function(index) {
				jQuery(this).trigger('click');
			});
		}	
	} 
	// else it is NOT RTD Trip Planner results link, Google option is checked as default.
	else {
		jQuery("input[id='tripPlannerSelectGoogle']").each(function(index) {
			jQuery(this).trigger('click');
		});
	}
	*/ 
	// end set radio button for Trip Planner (Google or RTD)
    
    loadHourAndSuffix();
    // onLoad set isPandemic view
    /* REMOVE RTD TRIPPLANNER
	if(( typeof isPandemicRunboard != 'undefined' ) && (isPandemicRunboard)) {
		// if isPandemicRunboard is true, RTD option is checked as default
		jQuery("input[id='tripPlannerSelectRtd']").each(function(index) {
			jQuery(this).trigger('click');
		});
	} else { 
		// else Google option is checked as default
		jQuery("input[id='tripPlannerSelectGoogle']").each(function(index) {
			jQuery(this).trigger('click');
		});
	}
	*/
	// onLoad set the right sidebar-tab view
	if(jQuery(window).width() > 1020) {
		jQuery('#sidebar-tabs-vertical').hide();
		jQuery('#sidebar-tabs').show();
	} else {
		jQuery('#sidebar-tabs').hide();
		jQuery('#sidebar-tabs-vertical').show();
	}
	// create event resize
	jQuery(window).resize(function() {

		var updateLandmarks = function(dataArray, landmarkId){
			// dwr.util.setValue(landmarkId,'');
			jQuery(landmarkId).children().removeAttr("selected");
		    //dwr.util.removeAllOptions(landmarkId);
			jQuery(landmarkId).children('option').each(function() {
				jQuery(this).remove();
			});
		    //dwr.util.addOptions(landmarkId, data, "key", "value");
	        jQuery.each(dataArray, function (index, obj) {
	        	jQuery(landmarkId).append("<option value='"+obj.value+"'>"+obj.text+"</option>");
	        });			
		    jQuery(landmarkId).next('.select').find('.selectInner').html(jQuery(landmarkId+' option:eq(0)' ).html())
		    jQuery(landmarkId).next('.select').addClass('changed');
		}

		var updateCategories = function(dataArray, categoryId){
			// dwr.util.setValue(categoryId,'');
			jQuery(categoryId).children().removeAttr("selected");
		    //dwr.util.removeAllOptions(categoryId);
			jQuery(categoryId).children('option').each(function() {
				jQuery(this).remove();
			});
		    //dwr.util.addOptions(categoryId, data, "key", "value");
	        jQuery.each(dataArray, function (index, obj) {
	        	jQuery(categoryId).append("<option value='"+obj.value+"'>"+obj.text+"</option>");
	        });			
		    jQuery(categoryId).next('.select').find('.selectInner').html(jQuery(categoryId+' option:eq(0)' ).html())
		    jQuery(categoryId).next('.select').addClass('changed');
		}
		
		if(jQuery(window).width() > 1020) {
			
			// show normal sidebasr
			var changeFlag = jQuery('#sidebar-tabs .tripplanner-sidebar:hidden').length;
			
			// set active/inactive status
			if (changeFlag) {
				// START TRIPPLANNER-SIDEBAR
				jQuery('#sidebar-tabs-vertical').hide();
				jQuery('#sidebar-tabs').hide();
				// copy all input object data
				jQuery("#sidebar-tabs-vertical form[id='tripplannerform']").find("input[type='text']").each(function(index){
					thisObject = jQuery(this);
					jQuery("#sidebar-tabs form[id='tripplannerform']").find("input[id='"+ thisObject.attr("id") +"']").val(thisObject.val());
				});

				// trigger the event to load categories & landmarks only when the landmark tab is clicked on
				// create onChange Categories event;  executed when the landmark tab is clicked on.
		    	if ((jQuery('#sidebar-tabs #landmarkOriginCategories').val() == null) && (jQuery('#sidebar-tabs-vertical #landmarkOriginCategories').val() != null)) {
		    		updateCategories(jQuery("#sidebar-tabs-vertical form[id='tripplannerform']").find("select[id='landmarkOriginCategories'] option"),'#sidebar-tabs #landmarkOriginCategories');
		    		updateLandmarks(jQuery("#sidebar-tabs-vertical form[id='tripplannerform']").find("select[id='landmarkOriginLandmarks'] option"),'#sidebar-tabs #landmarkOriginLandmarks');
		    	}
		    	
		    	if ((jQuery('#sidebar-tabs #landmarkDestinCategories').val() == null) && (jQuery('#sidebar-tabs-vertical #landmarkDestinCategories').val() != null)) {
		    		updateCategories(jQuery("#sidebar-tabs-vertical form[id='tripplannerform']").find("select[id='landmarkDestinCategories'] option"),'#sidebar-tabs #landmarkDestinCategories');
					updateLandmarks(jQuery("#sidebar-tabs-vertical form[id='tripplannerform']").find("select[id='landmarkDestinLandmarks'] option"),'#sidebar-tabs #landmarkDestinLandmarks');
		    	}

				// set value of selected option
				jQuery("#sidebar-tabs-vertical form[id='tripplannerform']").find("select").each(function(index){
					thisObject = jQuery(this);
					thisHtml   = jQuery(this).find("option:selected").html();
					jQuery("#sidebar-tabs form[id='tripplannerform']").find("select[id='"+ thisObject.attr("id") +"']").each(function (index){jQuery(this).val(thisObject.val());});
					jQuery("#sidebar-tabs form[id='tripplannerform']").find("select[id='"+ thisObject.attr("id") +"']").each(function (index){jQuery(this).next('.select').find('.selectInner').html(thisHtml);});
				});

				if ((jQuery('#sidebar-tabs-vertical .tripplanner-sidebar-vertical.open').length) && (jQuery('#sidebar-tabs .tripplanner-sidebar.open').length)) {
					// Do nothing
				} else if ((jQuery('#sidebar-tabs-vertical .tripplanner-sidebar-vertical.open').length) && (jQuery('#sidebar-tabs .tripplanner-sidebar').length)) {
					jQuery('#sidebar-tabs .tripplanner-tab').trigger('click');
				} else if ((jQuery('#sidebar-tabs-vertical .tripplanner-sidebar-vertical').length) && (jQuery('#sidebar-tabs .tripplanner-sidebar.open').length)) {
					jQuery('#sidebar-tabs .tripplanner-tab1').trigger('click'); 
				}
				// END   TRIPPLANNER-SIDEBAR
				// START SCHEDULEFINDER-SIDEBAR
				if ((jQuery('#sidebar-tabs-vertical .tripplanner-sidebar-vertical.open').length) && (jQuery('#sidebar-tabs .schedulefinder-sidebar.open').length)) {
					// Do nothing
				} else if ((jQuery('#sidebar-tabs-vertical .schedulefinder-tab-vertical.open').length) && (jQuery('#sidebar-tabs .schedulefinder-sidebar').length)) {
					jQuery('#sidebar-tabs .schedulefinder-tab').trigger('click');
				} else if ((jQuery('#sidebar-tabs-vertical .schedulefinder-tab-vertical').length) && (jQuery('#sidebar-tabs .schedulefinder-sidebar.open').length)) {
					jQuery('#sidebar-tabs .schedulefinder-tab1').trigger('click'); 
				}
				// END   SCHEDULEFINDER-SIDEBAR
				// START RIDERALERTS-SIDEBAR
				if ((jQuery('#sidebar-tabs-vertical .rideralerts-sidebar-vertical.open').length) && (jQuery('#sidebar-tabs .rideralerts-sidebar.open').length)) {
					// Do nothing
				} else if ((jQuery('#sidebar-tabs-vertical .rideralerts-tab-vertical.open').length) && (jQuery('#sidebar-tabs .rideralerts-sidebar').length)) {
					jQuery('#sidebar-tabs .rideralerts-tab').trigger('click');
				} else if ((jQuery('#sidebar-tabs-vertical .rideralerts-tab-vertical').length) && (jQuery('#sidebar-tabs .rideralerts-sidebar.open').length)) {
					jQuery('#sidebar-tabs .rideralerts-tab1').trigger('click'); 
				}
				// END   RIDERALERTS-SIDEBAR
				// show normal sidebasr
				jQuery('#sidebar-tabs').show();
			}
		} else {

			var changeFlag = jQuery('#sidebar-tabs-vertical .tripplanner-sidebar-vertical:hidden').length;
			// active/inactive status
			if (changeFlag) {
				// show mediaQuery sidebar
				jQuery('#sidebar-tabs').hide();
				jQuery('#sidebar-tabs-vertical').hide();
				
				// copy all input object data
				jQuery("#sidebar-tabs form[id='tripplannerform']").find("input[type='text']").each(function(index){
					thisObject = jQuery(this);
					jQuery("#sidebar-tabs-vertical form[id='tripplannerform']").find("input[id='"+ thisObject.attr("id") +"']").val(thisObject.val());
				});
				
				// trigger the event to load categories & landmarks only when the landmark tab is clicked on
				// create onChange Categories event;  executed when the landmark tab is clicked on.
		    	if ((jQuery('#sidebar-tabs-vertical #landmarkOriginCategories').val() == null) && (jQuery('#sidebar-tabs #landmarkOriginCategories').val() != null)) {
		    		updateCategories(jQuery("#sidebar-tabs form[id='tripplannerform']").find("select[id='landmarkOriginCategories'] option"),'#sidebar-tabs-vertical #landmarkOriginCategories');
		    		updateLandmarks(jQuery("#sidebar-tabs form[id='tripplannerform']").find("select[id='landmarkOriginLandmarks'] option"),'#sidebar-tabs-vertical #landmarkOriginLandmarks');
		    	}
		    	
		    	if ((jQuery('#sidebar-tabs-vertical #landmarkDestinCategories').val() == null) && (jQuery('#sidebar-tabs #landmarkDestinCategories').val() != null)) {
		    		updateCategories(jQuery("#sidebar-tabs form[id='tripplannerform']").find("select[id='landmarkDestinCategories'] option"),'#sidebar-tabs-vertical #landmarkDestinCategories');
					updateLandmarks(jQuery("#sidebar-tabs form[id='tripplannerform']").find("select[id='landmarkDestinLandmarks'] option"),'#sidebar-tabs-vertical #landmarkDestinLandmarks');
		    	}
				
				// copy select option objects
				jQuery("#sidebar-tabs form[id='tripplannerform']").find("select").each(function(index){
					thisObject = jQuery(this);
					thisHtml   = jQuery(this).find("option:selected").html();
					jQuery("#sidebar-tabs-vertical form[id='tripplannerform']").find("select[id='"+ thisObject.attr("id") +"']").each(function (index){jQuery(this).val(thisObject.val());});
					jQuery("#sidebar-tabs-vertical form[id='tripplannerform']").find("select[id='"+ thisObject.attr("id") +"']").each(function (index){jQuery(this).next('.select').find('.selectInner').html(thisHtml);});
				});

				if ((jQuery('#sidebar-tabs .tripplanner-sidebar.open').length) && (jQuery('#sidebar-tabs-vertical .tripplanner-sidebar-vertical.open').length)) {
					// Do nothing
				} else if ((jQuery('#sidebar-tabs .tripplanner-sidebar.open').length) && (jQuery('#sidebar-tabs-vertical .tripplanner-sidebar-vertical').length)) {
					jQuery('#sidebar-tabs-vertical .tripplanner-tab-vertical').trigger('click');
				} else if ((jQuery('#sidebar-tabs .tripplanner-sidebar').length) && (jQuery('#sidebar-tabs-vertical .tripplanner-sidebar-vertical.open').length)) {
					jQuery('#sidebar-tabs-vertical .tripplanner-tab-vertical1').trigger('click');
				}

				if ((jQuery('#sidebar-tabs .schedulefinder-sidebar.open').length) && (jQuery('#sidebar-tabs-vertical .schedulefinder-sidebar-vertical.open').length)) {
					// Do nothing
				} else if ((jQuery('#sidebar-tabs .schedulefinder-sidebar.open').length) && (jQuery('#sidebar-tabs-vertical .schedulefinder-sidebar-vertical').length)) {
					jQuery('#sidebar-tabs-vertical .schedulefinder-tab-vertical').trigger('click');
				} else if ((jQuery('#sidebar-tabs .schedulefinder-sidebar').length) && (jQuery('#sidebar-tabs-vertical .schedulefinder-sidebar-vertical.open').length)) {
					jQuery('#sidebar-tabs-vertical .schedulefinder-tab-vertical1').trigger('click');
				}
				
				if ((jQuery('#sidebar-tabs .rideralerts-sidebar.open').length) && (jQuery('#sidebar-tabs-vertical .rideralerts-sidebar-vertical.open').length)) {
					// Do nothing
				} else if ((jQuery('#sidebar-tabs .rideralerts-sidebar.open').length) && (jQuery('#sidebar-tabs-vertical .rideralerts-sidebar-vertical').length)) {
					jQuery('#sidebar-tabs-vertical .rideralerts-tab-vertical').trigger('click');
				} else if ((jQuery('#sidebar-tabs .rideralerts-sidebar').length) && (jQuery('#sidebar-tabs-vertical .rideralerts-sidebar-vertical.open').length)) {
					jQuery('#sidebar-tabs-vertical .rideralerts-tab-vertical1').trigger('click');
				}
				// show mediaQuery sidebar
				jQuery('#sidebar-tabs-vertical').show();
			}
		}
		var minDate = new Date();
		//jQuery('form[id="tripplannerform"]').find('input[name="googleDay"]').datepicker("destroy");
		jQuery('form[id="tripplannerform"]:visible').find('input[id="googleDay"]').datepicker({ 
			minDate: minDate,
			onSelect: function (dateText, inst) {
			    jQuery("input[name='googleDay']").each(function(index) {
			    	 jQuery(this).val(dateText);
			    });
			}
		});
	});
});

var landmarkId = null;
var originInit = null;
var destinInit = null;
var selectId='';

function validateForm(thisForm, isGoogle){
	
	var origin      = jQuery(thisForm).find('#origin').val();
	var destination = jQuery(thisForm).find('#destination').val();
	var validationErrors = [];
	var errorStyle = "thin inset red";
	
	var defaultInputText_Address = "";
	var defaultInputText_Intersection = "";
	
	if(isGoogle){
		defaultInputText_Address = addressFT_Google;
		defaultInputText_Intersection = intersectionFT_Google;
	} else {
		defaultInputText_Address = addressFT_RTD;
		defaultInputText_Intersection = intersectionFT_RTD;
	}

	// validate signup form on keyup and submit
	var validator = jQuery(thisForm).validate({
		rules: {
			googleDay: { 
				required: true,
				maxlength: 10,
				minlength: 10,
				date: true
			},
			hour: "required",
			minute: "required"
		},
		messages: {
			googleDay: "Date MM/DD/YYYY format required"
		}
	});	
	
	if (origin.isEqual("intersection")){
		if (jQuery(thisForm).find('#pFromIntersection1').val() == defaultInputText_Intersection)
			jQuery(thisForm).find('#pFromIntersection1').val("");
		if (jQuery(thisForm).find('#pFromIntersection2').val() == defaultInputText_Intersection)
			jQuery(thisForm).find('#pFromIntersection2').val("");
		jQuery(thisForm).find('#pFromIntersection1').addClass("required");
		jQuery(thisForm).find('#pFromIntersection2').addClass("required");
		jQuery(thisForm).find('#pFromStreet').removeClass("required");
	}else if (origin.isEqual(addressTabName)){
		//var text = jQuery(thisForm).find('#pFromStreet')[0].getAttribute('placeholder');
		if (jQuery(thisForm).find('#pFromStreet').val() == defaultInputText_Address)
			jQuery(thisForm).find('#pFromStreet').val("");
		jQuery(thisForm).find('#pFromStreet').addClass("required");
		jQuery(thisForm).find('#pFromIntersection1').removeClass("required");
		jQuery(thisForm).find('#pFromIntersection2').removeClass("required");
	}
	
	if (destination.isEqual("intersection")){
		if (jQuery(thisForm).find('#pToIntersection1').val() == defaultInputText_Intersection)
			jQuery(thisForm).find('#pToIntersection1').val("");
		if (jQuery(thisForm).find('#pToIntersection2').val() == defaultInputText_Intersection)
			jQuery(thisForm).find('#pToIntersection2').val("");
		jQuery(thisForm).find('#pToIntersection1').addClass("required");
		jQuery(thisForm).find('#pToIntersection2').addClass("required");
		jQuery(thisForm).find('#pToStreet').removeClass("required");
	}else if (destination.isEqual(addressTabName)){
		//var text = jQuery(thisForm).find('#pToStreet').attr('placeholder');
		if (jQuery(thisForm).find('#pToStreet').val() == defaultInputText_Address)
			jQuery(thisForm).find('#pToStreet').val("");
		jQuery(thisForm).find('#pToStreet').addClass("required");
		jQuery(thisForm).find('#pToIntersection1').removeClass("required");
		jQuery(thisForm).find('#pToIntersection2').removeClass("required");
	}

	if (!jQuery(thisForm).validate().form()) {
		return false;
	}
	return true;
}


function pandemicSettings(){
	formtripPlannerSelect('rtd');
}

function planReturnTrip(){
	dwr.util.setValue('returnTrip',true);
	//prepareSubmit();
	//Function prepareSubmit() is no longer a function, therefore, we are going to trigger the click event
	//on button "Plan your trip" (id="btn-tripplanner-submit") to submit the form when link 'Plan return trip' is clicked.
	jQuery("a[id='btn-tripplanner-submit']").trigger('click');

}

function googleGeoCodeResultCallBack(jsonData) {
	if (typeof(console) !== 'undefined') console.log(jsonData);
	jQuery.localStorage.setItem("fromAddress",jsonData);
}

//function prepareSubmit() is no longer a function but the Trip Planner form is submitted using .ready() event when button "Plan your trip" (id="btn-tripplanner-submit") is clicked.
jQuery(document).ready(function(){
	var urlFlag = false;

	jQuery('#tripplanner-notrips-error-container').hide();
	jQuery('#tripplanner-errormess-container').hide();
	
	// reset to address as defaulted tab for origin and destination
	jQuery("div[id='start-tripplanner-tabs']").find('a[href="#start-address"]').trigger('click');
	jQuery("div[id='end-tripplanner-tabs']").find('a[href="#end-address"]').trigger('click');
	// set filePath and url
	var filePathname = document.location.pathname;
	var url = document.location.href;
	
	if (((filePathname.indexOf('/GoogleTripPlanner.shtml') !== -1) || ((filePathname.indexOf('/tripplanner/getRtdTrip.action') !== -1))) && (jQuery('form[id="tripplannerform"]').length !== 0)) {
		var formURL      = appServer + "tripplanner/getGoogleTrip.action";
		//jQuery.localStorage.removeItem("tripplanned");
		//jQuery.localStorage.removeItem("tripUrl");
		// Find file pathname of url
		
		if(url.indexOf('origin=') != -1){
				var postData = [];
				var pairs = url.substring(url.indexOf('?') + 1).split('&');
				urlFlag   = true;
				for (var i = 0; i < pairs.length; i++) {
					var pair = pairs[i].split('=');
					var xObj = new Object;
					tmpString_name = pair[0].replaceAll('+',' ');
					tmpString_value = pair[1].replaceAll('+',' ');
					xObj.name  = decodeURIComponent(tmpString_name);
					xObj.value = decodeURIComponent(tmpString_value);
					postData.push(xObj);
				}
				jQuery.localStorage.setItem("tripplanned", postData);
		}
	}

	//function prepareSubmit() is no longer a function but the Trip Planner form is submitted using .ready() event when button "Plan your trip" (id="btn-tripplanner-submit") is clicked.
	//Set the page action url based on the selected Trip Planner radio options (Google or RTD).
	jQuery("a[id='btn-tripplanner-submit']").each(function() {
		jQuery(this).click(function(){
			var thisForm = jQuery(this).closest("form");
    		jQuery('#tripplanner-notrips-error-container').hide();
    		jQuery('#tripplanner-errormess-container').hide();
    		jQuery('#tripplanner-general-error-container').hide();
			
			
			var flagGoogle = true; //jQuery('input[id="tripPlannerSelectGoogle"]').is(':checked');
			if ( validateForm(thisForm, flagGoogle) ){
				var postData        = jQuery(thisForm).serializeArray();
		    	var origin          = postData.indexOfProperty("name","origin");
		    	var destination     = postData.indexOfProperty("name","destination");
		    	var categoriesArray = jQuery.localStorage.getItem("categories");
	        	var pWhen           = postData.indexOfProperty("name","pWhen");
				
		    	var tripplanner = "Homepage";
		    	if (jQuery("#sidebar-tabs").length) tripplanner = "Sidebar";
		    	else if (jQuery(document).attr('title') == "RTD Trip Planner Results") tripplanner = "RTD results page";
		    	else if (jQuery(document).attr('title') == "RTD Google Trip Planner Results") tripplanner = "Google results page";
		    	else if (jQuery(document).attr('title') == "RTD") tripplanner = "Homepage";

				if (flagGoogle){
					jQuery(thisForm).attr('action',staticServer+'GoogleTripPlanner.shtml');
					if (origin.value.isEqual(landmarkTabName)) {
			        	var categories = postData.indexOfProperty("name","landmarkOriginCategories");
			        	var landmarks  = postData.indexOfProperty("name","landmarkOriginLandmarks");
						var originName = jQuery("#landmarkOriginLandmarks~span.select").find('.selectInner').html();

						var startArray = landmarks.value.split('@');
						var catagory   = categoriesArray.indexOfProperty("key",categories.value);
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'Google', 'Start from | Landmark entry'],['_trackEvent', 'Capture trips planned', 'Google', tripplanner],['_trackEvent', 'Capture trip planner | Origin landmarks', catagory.value, originName],['_trackEvent', 'Trip Planner', 'When',pWhen.value]);
					} else if (origin.value.isEqual(addressTabName)) {
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'Google', 'Start from | Address entry'],['_trackEvent', 'Capture trips planned', 'Google', tripplanner],['_trackEvent', 'Trip Planner', 'When',pWhen.value]);
					} else if (origin.value.isEqual("intersection")) {
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'Google', 'Start from | Intersection entry'],['_trackEvent', 'Capture trips planned', 'Google', tripplanner],['_trackEvent', 'Trip Planner', 'When',pWhen.value]);
					}					
					
					if (destination.value.isEqual(landmarkTabName)) {
			        	var categories = postData.indexOfProperty("name","landmarkDestinCategories");
			        	var landmarks  = postData.indexOfProperty("name","landmarkDestinLandmarks");
						var destinName = jQuery("#landmarkDestinLandmarks~span.select").find('.selectInner').html();			        	

						var endArray   = landmarks.value.split('@');
						var catagory   = categoriesArray.indexOfProperty("key",categories.value);
				    	// _gaq.push(['_trackEvent', 'Trip Planner', 'Google', 'End at | Landmark entry', catagory.value + ' ' + endArray[0]],['_trackEvent', 'Capture trips planned', 'Google', tripplanner]);
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'Google', 'End at | Landmark entry'],['_trackEvent', 'Capture trips planned', 'Google', tripplanner],['_trackEvent', 'Capture trip planner | Destination landmarks', catagory.value, destinName]);
					} else if (destination.value.isEqual(addressTabName)) {
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'Google', 'End at | Address entry'],['_trackEvent', 'Capture trips planned', 'Google', tripplanner]);
					} else if (destination.value.isEqual("intersection")) {
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'Google', 'End at | Intersection entry'],['_trackEvent', 'Capture trips planned', 'Google', tripplanner]);
					}					
				}else{
					jQuery(thisForm).attr('action',appServer+'tripplanner/getRtdTrip.action');
					if (origin.value.isEqual(landmarkTabName)) {
			        	var categories = postData.indexOfProperty("name","landmarkOriginCategories");
			        	var landmarks  = postData.indexOfProperty("name","landmarkOriginLandmarks");
						var originName = jQuery("#landmarkOriginLandmarks~span.select").find('.selectInner').html();

						var startArray = landmarks.value.split('@');
						var catagory   = categoriesArray.indexOfProperty("key",categories.value);
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'RTD', 'Start from | Landmark entry'],['_trackEvent', 'Capture trips planned', 'RTD', tripplanner],['_trackEvent', 'Capture trip planner | Origin landmarks', catagory.value, originName],['_trackEvent', 'Trip Planner', 'When',pWhen.value]);
					} else if (origin.value.isEqual(addressTabName)) {
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'RTD', 'Start from | Address entry'],['_trackEvent', 'Capture trips planned', 'RTD', tripplanner],['_trackEvent', 'Trip Planner', 'When',pWhen.value]);
					} else if (origin.value.isEqual("intersection")) {
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'RTD', 'Start from | Intersection entry'],['_trackEvent', 'Capture trips planned', 'RTD', tripplanner],['_trackEvent', 'Trip Planner', 'When',pWhen.value]);
					}					
					
					if (destination.value == landmarkTabName) {
			        	var categories = postData.indexOfProperty("name","landmarkDestinCategories");
			        	var landmarks  = postData.indexOfProperty("name","landmarkDestinLandmarks");
						var destinName = jQuery("#landmarkDestinLandmarks~span.select").find('.selectInner').html();			        	

						var endArray   = landmarks.value.split('@');
						var catagory   = categoriesArray.indexOfProperty("key",categories.value);
				    	// _gaq.push(['_trackEvent', 'Trip Planner', 'RTD', 'End at | Landmark entry', catagory.value + ' ' + endArray[0]],['_trackEvent', 'Capture trips planned', 'RTD', tripplanner]);
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'RTD', 'End at | Landmark entry'],['_trackEvent', 'Capture trips planned', 'RTD', tripplanner],['_trackEvent', 'Capture trip planner | Destination landmarks', catagory.value, destinName]);
					} else if (destination.value.isEqual(addressTabName)) {
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'RTD', 'End at | Address entry'],['_trackEvent', 'Capture trips planned', 'RTD', tripplanner]);
					} else if (destination.value.isEqual("intersection")) {
				    	_gaq.push(['_trackEvent', 'Trip Planner', 'RTD', 'End at | Intersection entry'],['_trackEvent', 'Capture trips planned', 'RTD', tripplanner]);
					}
				}

				jQuery(thisForm).unbind().click(function(e){
					e.preventDefault();
					var formURL  = jQuery(thisForm).attr("action");
					var postData = jQuery(thisForm).serializeArray();
					
				    jQuery.localStorage.setItem("tripplanned", postData);
				    jQuery.localStorage.setItem("tripUrl", formURL,5);	
					
					jQuery(thisForm).attr('method','GET');
					jQuery(thisForm).submit();
				});
				
			}else{
				return false;
			}
		});
		
	});

	
	/**
	 * ResetForm function.
	 */
	jQuery("a[id='lnk-tripplanner-reset']").each(function() {
		jQuery(this).unbind().click(function(e){
			e.preventDefault();
    		jQuery('#tripplanner-notrips-error-container').hide();
    		jQuery('#tripplanner-errormess-container').hide();
    		jQuery('#tripplanner-general-error-container').hide();
    		
		    _gaq.push(['_trackEvent', 'Trip Planner', 'Reset']);
    		if ((typeof(Tripplanner) !== 'undefined') && (Tripplanner.directionsDisplay)) Tripplanner.reset();			

			// get closest form object
			var thisForm     = jQuery(this).closest("form");
			// set all input:test and textarea to empty string
			var postData = jQuery(thisForm).serializeArray();
	    	var origin = postData.indexOfProperty("name","origin");
	    	var destination = postData.indexOfProperty("name","destination");

	    	// reset form with validator.resetForm();
	    	if (isMSIE) {
		    	jQuery(thisForm).validate().showErrors({
		    		"pFromStreet": null
		    	});	    	
		    	jQuery(thisForm).validate().showErrors({
		    		"pFromIntersection1": null
		    	});	    	
		    	jQuery(thisForm).validate().showErrors({
		    		"pFromIntersection2": null
		    	});	    	
		    	jQuery(thisForm).validate().showErrors({
		    		"pToStreet": null
		    	});	    	
		    	jQuery(thisForm).validate().showErrors({
		    		"pToIntersection1": null
		    	});	    	
		    	jQuery(thisForm).validate().showErrors({
		    		"pToIntersection2": null
		    	});	    	
	    	} else {
		    	jQuery(thisForm).validate().resetForm();
	    	}
	    	
			jQuery(thisForm).find('input:text, textarea').val('');
			// set default date
		    jQuery("input[name='googleDay']").each(function(index)
    	    {
    	        jQuery(this).val(loadDate());
    	    });
		    jQuery("select[name='pWhen']").each(function(index)
    	    {
    	        jQuery(this).val("dep");
				jQuery(this).next('.select').find('.selectInner').html(jQuery('#pWhen option:selected').html());
    	       
    	    });
		    loadHourAndSuffix();
			// reset to address as defaulted tab for origin and destination
			jQuery("div[id='start-tripplanner-tabs']").find('a[href="#start-address"]').trigger('click');
	    	jQuery("div[id='end-tripplanner-tabs']").find('a[href="#end-address"]').trigger('click');
			// end reset to address as defaulted tab for origin and destination
		    jQuery.localStorage.removeItem("tripplanned");
		    if ((typeof(Tripplanner) !== 'undefined') && (Tripplanner.directionsDisplay)) Tripplanner.directionsDisplay.setDirections({ routes: [] });
			
			// Find file pathname of url. If it is RTD Trip Planner results link, redirect to trip planner action page on reset link only on RTD trip planner results page.
			if(filePathname.indexOf('/tripplanner/getRtdTrip.action') != -1){
				window.location=appServer + "tripplanner/start.action";
			}
			// else stay on the page
			else {
				return false;	
			}
		});
	});
	/* end ResetForm function */

	/* Plan return trip function */
	jQuery("a[id='lnk-tripplanner-return']").each(function() {
		
		jQuery(this).unbind().click(function(e){
			e.preventDefault();
    		
    		jQuery('#tripplanner-notrips-error-container').hide();
    		jQuery('#tripplanner-errormess-container').hide();
    		jQuery('#tripplanner-general-error-container').hide();
			
		    _gaq.push(['_trackEvent', 'Trip Planner', 'Return trips']);
			
			var thisForm     = jQuery(this).closest("form");
		    var postData     = jQuery(thisForm).serializeArray();
	    	
		    for (var i = 0; i < postData.length; i++) {
		    	var IndexDefault      = nameDefaultList.indexOf(postData[i].name);

		    	if ((typeof(IndexDefault) !== 'undefined') && (IndexDefault !== null) && (IndexDefault !== -1)) {
					var origin  	= postData.indexOfProperty("name",nameDefaultList[IndexDefault]);
			    	var destination = postData.indexOfProperty("name",nameReturnList[IndexDefault]);
		  			jQuery('#'+nameReturnList[IndexDefault]).each(function(){
						jQuery(this).val(origin.value).change();
						jQuery(this).next('.select').find('.selectInner').html(jQuery(this).find('option:selected').html());
		  			});
		    		
		    	}
		    }
		    
		    // save form as serializeArray
		    var postData    = jQuery(thisForm).serializeArray();
		    jQuery.localStorage.setItem("tripplanned", postData);

		    // switch Origin with Destination
			var tripOrigin      = jQuery.localStorage.getItem("tripOrigin");
			var tripDestination = jQuery.localStorage.getItem("tripDestination");

			jQuery.localStorage.setItem("tripOrigin",tripDestination);
			jQuery.localStorage.setItem("tripDestination",tripOrigin);
			
			var fromAddress     = jQuery.localStorage.getItem("fromAddress");
			var toAddress       = jQuery.localStorage.getItem("toAddress");
			
			jQuery.localStorage.setItem("fromAddress",toAddress,15);
			jQuery.localStorage.setItem("toAddress",fromAddress,15);

			var originAddressCandidates     = jQuery.localStorage.getItem("originAddressCandidates");
			var destinationAddressCandidates       = jQuery.localStorage.getItem("destinationAddressCandidates");
			
			jQuery.localStorage.setItem("originAddressCandidates", destinationAddressCandidates,15);
			jQuery.localStorage.setItem("destinationAddressCandidates", originAddressCandidates,15);
			
			// set tabs
	    	var origin 		= postData.indexOfPropertyValue("name","origin");
	    	var destination = postData.indexOfPropertyValue("name","destination");
	    	jQuery("div[id='start-tripplanner-tabs']").find('a:contains("'+postData[origin].value+'")').trigger('click');
	    	jQuery("div[id='end-tripplanner-tabs']").find('a:contains("'+postData[destination].value+'")').trigger('click');
	    	
		    if (jQuery("a[id='btn-google-tripplanner-submit']").length) 
		    	jQuery("a[id='btn-google-tripplanner-submit']").trigger("click");
		    else if (jQuery("a[id='btn-tripplanner-submit']").length)
		    	jQuery("a[id='btn-tripplanner-submit']").trigger("click");
		});
	});
	/* end Plan return trip function */
	
	/* Google Trip Planner Feedback Form function */
	jQuery("a[id='lnk-google-tripplanner-feedback-form']").click(function(){
		var thisForm = jQuery('form[id="tripplannerform"]');
		if ( validateForm(thisForm, true) ){
			var postData = jQuery(thisForm).serializeArray();
			jQuery.localStorage.setItem("googleTPData", postData);
		}
	});
	/* end Google Trip Planner Feedback Form function */
	
	jQuery('form[id="tripplannerform"]').submit(function(e){
		e.preventDefault();
		thisForm = jQuery(this);
		validateForm(thisForm, true);
		return false
	});

	jQuery('form[id="tripplannerform"]').bind("keypress", function(e) {
		if (e.keyCode == 13) {               
			e.preventDefault();
			thisForm = jQuery(this);
			validateForm(thisForm, true);
			return false;
		}
	});

	var postData    = jQuery.localStorage.getItem("tripplanned");
	if ((jQuery('form[id="tripplannerform"]').length !== 0) && (postData)) {
		    	    
	    	var origin      = postData.indexOfPropertyValue("name","origin");
	    	var destination = postData.indexOfPropertyValue("name","destination");
	
	    	jQuery("div[id='start-tripplanner-tabs']").find('a:contains("'+postData[origin].value+'")').trigger('click');
	    	jQuery("div[id='end-tripplanner-tabs']").find('a:contains("'+postData[destination].value+'")').trigger('click');
	
    		for (var i = 0; i < postData.length; i++) {
    			if ((urlFlag) || (nameDefaultList.contains(postData[i].name))) {
	    			jQuery('#'+postData[i].name).each(function(){
	    				jQuery(this).val(postData[i].value).change();
						jQuery(this).next('.select').find('.selectInner').html(jQuery(this).find('option:selected').html());
	    			});
    			}
    		}
	 }
	
});
