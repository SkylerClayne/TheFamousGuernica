var jq = jQuery.noConflict(), imagesReq, descriptionReq, miscReq, gotoReq, quickMailReq, overlayReq, transitOverlayReq, map, markerArray = [], newMarkerArray = [], myPano, maxMarkers = 175, workplaceLat = 0, workplaceLong = 0, showPOI=!1, showCityClusters=!0, picDialogUnopened=!0, favDialogUnopened=!0, aboutDialogUnopened=!0, saveFavsDialogUnopened=!0, showNeighborhoodOverlay=!0, showCollabAcceptedOverlay=!1, numTimesBounced = 0, userId =- 1, searchTerms = "", showMarkerPoint, isIE=!1, IEVersion = 0, listingLimitAlertDisabled=!1, yelpType = "bars",
currBubbleHeight = 0, lastQMContents = "", defaultSearchText = "Words Required In Listing", defaultFilterSettings = {
    minRent: 0,
    maxRent: 6E3,
    minBR: 0,
    maxBR: 10,
    minBA: 1,
    maxPricePerBedroom: 6E3,
    maxAge: 7,
    imagesOnly: "false",
    phoneReq: "false",
    cats: "false",
    dogs: "false",
    noFee: "false",
    onlyHQ: "true",
    showSubs: "true",
    showRooms: "true",
    showVac: "true",
    showNonSubs: "true",
    cl: "true",
    pl: "true",
    aptsrch: "true",
    rnt: "true",
    airbnb: "true",
    af: "true",
    rltr: "true",
    ood: "true",
    searchTerms: defaultSearchText
}, currImage = 0, currNumImages = 0, currListing =
0, animatedMarkers = [], currAnimationTimeoutId = 0, inactivePoints = [], activePoints = [], currSidelistIds = [], tempPoints = [], listingCache = {}, listingCacheQueue = [], currentPoint, currentMarker, workIcon, currentWorkIcon, neighborhoodPolyArray = [], drawnNeighborhoodPolys = {}, transitPointArrays = [], transitSegmentArrays = [], drawnTransitSegments = {}, drawnTransitPoints = {}, transitLayer, infoWindow = new google.maps.InfoWindow, bizMarkers = [], directionsObj = new google.maps.DirectionsService, commuteBoundsTime, interval = 20, boundsPolyPoints =
[], boundsPoly, circlePolyPoints = [], circleSearchPoints = [], circleSearchPointsTemp = [], circlePoly, directionsPolyLines = [], drivingCircleCenter = null, commuteMode = "drive", followMouse=!1, followListener, closeFilterPolyListener, lastVertex, mouseFollowPolyline, polyVertexArray = [], polylines, lineLabel, walkscoreLayer = null, crimeLayer = null, quickMailFrom = "", quickMailEmail = "", quickMailPhone = "", quickMailId =- 1, seenMarkers = {}, favMarkers = {}, hiddenMarkers = {}, onscreenMarkers = {}, overlays = [], mostRecentUpdateBackendAjaxRequest =
null, defaultShadow = {
    url: "http://www.padmapper.com/images/MarkerShadow.png",
    size: new google.maps.Size(26, 19),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(1, 19)
}, redMarkerIcon = "http://www.padmapper.com/images/red-dot.png", lowAccuracyIcon = "http://www.padmapper.com/images/WashedOutMarker.png", type0icon = "http://www.padmapper.com/images/marker_34_green.png", type2icon = "http://www.padmapper.com/images/yellow-dot2.png", shoppingTypeIcon = "http://www.padmapper.com/images/shopping-rounded.png",
foodTypeIcon = "http://www.padmapper.com/images/food-rounded.png", barTypeIcon = "http://www.padmapper.com/images/bar-rounded.png", nightlifeTypeIcon = "http://www.padmapper.com/images/nightlife-rounded.png", activeTypeIcon = "http://www.padmapper.com/images/active-rounded2.png", artTypeIcon = "http://www.padmapper.com/images/art-rounded.png", beautyTypeIcon = "http://www.padmapper.com/images/beautysvc-rounded.png", placesIcon = "http://www.padmapper.com/images/marker_blue.png", seenIcon = "http://www.padmapper.com/images/gray-dot.png",
favIcon = "http://www.padmapper.com/images/marker_34_green.png";
workIcon = "http://www.padmapper.com/images/marker_34_green.png";
var transitStopIcon = "http://www.padmapper.com/images/SubwayStopIcon.png", panListener, dragListener, zoomListener;
function setupInput(a, b) {
    var c = document.getElementById(a);
    isIE ? (c.attachEvent("onfocus", clearDefaultText), c.attachEvent("onblur", replaceDefaultText), maxMarkers = 120) : (c.addEventListener("focus", clearDefaultText, !1), c.addEventListener("blur", replaceDefaultText, !1));
    "" != c.value && (c.defaultText = b)
}
function makeInputSelectall(a) {
    jq(a).focus(function() {
        this.select()
    });
    jq(a).mouseup(function(a) {
        a.preventDefault()
    })
}
function subscribeToAlerts(a, b, c) {
    toggleDiv("#alerttSignupSpinnerContainer");
    var d = getWindowLimits(), d = makeGetVars(d, 100), d = d + "&email=" + URLEncode(a) + "&frequency=" + URLEncode(b) + "&contact=" + URLEncode(c);
    jq.get("/emailSub.php" + d, function(a) {
        "1" == a ? (toggleDiv("#alerttSignupSpinnerContainer"), showDiv("#alerttSignupCompletedMessage"), setTimeout("hideDiv('#alerttSignupCompletedMessage');", 5E3)) : (toggleDiv("#alerttSignupSpinnerContainer"), showDiv("#alerttSignupFailedMessage"), setTimeout("hideDiv('#alerttSignupFailedMessage');",
        5E3))
    });
    trck("Interaction", "Email Alerts Subbed", "")
}
function saveAndEmailFavs(a, b) {
    toggleDiv("#divSpinnerContainer");
    jq.get("/storeList.php" + ("?name=" + b + "&emailAddress=" + a), function(a) {
        "1" == a ? (toggleDiv("#divSpinnerContainer"), showDiv("#favEmailCompletedMessage"), setTimeout("hideDiv('#favEmailCompletedMessage');", 5E3)) : alert("Failed")
    });
    trck("Interaction", "FavsSaved", "")
}
function placeTabHtml(a) {
    var b = transportPiece("Drive", "car.png", a.id), c = transportPiece("Bike", "bicycle.png", a.id), d = transportPiece("Walk", "hiker.png", a.id), e = transportPiece("Transit", "transit.png", a.id);
    return "<div class='place" + a.id + "' style='font-size:10pt; padding-bottom:1em; margin-bottom:1em; border-bottom:1px solid #888888;'><div>" + ("<table width=100%><tr><td width=20%>" + ("<b>" + a.name + "</b> <br/><small>" + a.address + "</small>") + "<br/><small><a href='#' onclick='deletePlace(" + a.id + ")'>Delete</a></small></td><td width=20%>" +
    b + "</td><td width=20%>" + e + "</td><td width=20%>" + c + "</td><td width=20%>" + d + "</td></tr></table>") + "</div></div> "
}
function placeMenuHtml(a) {
    return "<div class = 'place" + a.id + "' style='border-bottom:1px solid #888; margin-bottom:5px; padding-bottom:5px;'><table width=100%><tr><td width=30%><b>" + a.name + "</b></td><td width=30%><small>" + a.address + "</small></td><td width=30% style='text-align:right;'><small> <a href='#' onclick='deletePlace(" + a.id + ")'>Delete</a></small></td></tr></table></div>"
}
function placePlaceHtml(a) {
    return "<div class='place" + a.id + "'><div style='width:220px'>" + ("<b>" + a.name + "</b> <br/><small>" + a.address + "</small>") + "</div><div style='margin-top:5px'>" + ("<a href='#' onclick='deletePlace(" + a.id + ")' style='font-size:smaller'>Delete</a>") + "</div></div>"
}
function transportPiece(a, b, c) {
    return "<div style='float:left;'><img class='transportIcon' src='http://www.padmapper.com/images/" + b + "'/></div><div style='float:left; width:50px;'><span id='place" + c + a + "Time'> </span> <br/><span id='place" + c + a + "Dist'></span></div><div style='clear:both;'/>"
}
function displayAllPlaces() {
    jq("#placesLocations").html("");
    jq("#placesList").html("");
    for (var a in places) {
        var b = places[a];
        b && displayPlace(b)
    }
}
function displayPlace(a) {
    jq("#placesLocations").append(placeTabHtml(a));
    jq("#placesList").append(placeMenuHtml(a));
    addPlaceMarker(a)
}
function addPlaceMarker(a) {
    var b = new google.maps.LatLng(a.lat, a.lng), b = createPlacesMarker(b, a.id, map);
    addMarkerToMap(b);
    a.marker = b
}
function redrawPlaces() {
    for (var a in places) {
        var b = places[a];
        b && addPlaceMarker(b)
    }
}
function pullDistances(a, b) {}
function updatePlaceDistance() {}
function loadPlacesDescription(a, b) {
    var c = placePlaceHtml(places[b]);
    openInfoWindowHtml(a, c)
}
function clearDefaultText(a) {
    (a = window.event ? window.event.srcElement : a ? a.target : null) && a.value == a.defaultText && (a.value = "")
}
function replaceDefaultText(a) {
    (a = window.event ? window.event.srcElement : a ? a.target : null) && "" == a.value && a.defaultText && (a.value = a.defaultText)
}
function badListing(a) {
    a = "?id=" + a;
    descriptionReq && descriptionReq.abort();
    descriptionReq = jq.get("/flagAsBad.php" + a, descriptionLoadStateChanged);
    trck("Interaction", "Listing Flagged", "")
}
function showFilterResetLink() {
    showDiv("#filterReset")
}
function filterChanged() {
    showFilterResetLink();
    reloadAll()
}
function doubleSlider(a, b, c, d, e, f, g, h, k, l) {
    jq(a).slider({
        range: !0,
        min: b,
        max: c,
        values: [e, f],
        step: d,
        slide: function(a, b) {
            doubleChangeEvent(a, b, g, h, k, l, c)
        },
        change: function(a, b) {
            doubleChangeEvent(a, b, g, h, k, l, c)
        },
        stop: function(a, b) {
            filterChanged()
        }
    });
    b = jq(a).slider("values", 1);
    b == c && (b += "+");
    jq(g).text(jq(a).slider("values", 0));
    jq(h).text(b);
    jq(k).text(jq(a).slider("values", 0));
    jq(l).text(b)
}
function doubleChangeEvent(a, b, c, d, e, f, g) {
    a = b.values[1];
    b.values[1] == g && (a += "+");
    jq(c).text(b.values[0]);
    jq(d).text(a);
    jq(e).text(b.values[0]);
    jq(f).text(a)
}
function singleChangeEvent(a, b, c, d, e) {
    a = b.values[0];
    b.values[0] == e && (a += "+");
    jq(c).text(a);
    jq(d).text(a)
}
function singleSlider(a, b, c, d, e, f, g) {
    jq(a).slider({
        min: b,
        max: c,
        values: [d],
        step: e,
        slide: function(a, b) {
            singleChangeEvent(a, b, f, g, c)
        },
        change: function(a, b) {
            singleChangeEvent(a, b, f, g, c)
        },
        stop: function(a, b) {
            filterChanged()
        }
    });
    a = jq(a).slider("values", 0);
    a == c && (a += "+");
    jq(f).text(a);
    jq(g).text(a)
}
function createMarker(a, b, c, d) {
    return 0 == c ? createCityMarker(a, b, d) : 1 == c || 2 == c||-1 == c ? createApartmentMarker(a, b, d, c) : createPOIMarker(a, b, d, c)
}
function makeLoadingMarker(a, b, c, d) {
    d = "undefined" != typeof d ? d : {
        position: a
    };
    "undefined" == typeof d.position && (d.position = a);
    var e = new google.maps.Marker(d);
    e.value = b;
    google.maps.event.addListener(e, "click", function() {
        currentPoint = a;
        openInfoWindowHtml(a, '<div id = "infoBoxHTML"><div id="throbberHolder"><img src="/images/throbber.gif"/></div>');
        c(e.value)
    });
    return e
}
function openInfoWindowHtmlOld(a, b) {
    infoWindow.close();
    infoWindow.setContent(b);
    infoWindow.setPosition(a);
    infoWindow.open(map)
}
function openInfoWindowHtml(a, b) {
    hideDiv("#infoWindow");
    jq("#infoWindow").css({
        height: "auto",
        width: "auto"
    });
    jq("#infoWindowContent").html(b);
    setTimeout(function() {
        updateWindowPosition();
        currBubbleHeight = jq("#infoDescriptionDiv").height();
        dragListener || (dragListener = google.maps.event.addListener(map, "drag", updateWindowPosition));
        panListener || (panListener = google.maps.event.addListener(map, "bounds_changed", updateWindowPosition));
        zoomListener || (zoomListener = google.maps.event.addListener(map, "zoom_changed",
        updateWindowPosition))
    }, 0)
}
function closeInfoWindow() {
    hideDiv("#infoWindow");
    hideAllPieces();
    resetAnimatedMarkers();
    null != currentMarker && unmarkSidelistItemAsCurrentlyViewed(currentMarker.value);
    google.maps.event.removeListener(dragListener);
    google.maps.event.removeListener(panListener);
    google.maps.event.removeListener(zoomListener);
    zoomListener = panListener = dragListener = currentMarker = currentPoint = null
}
function hideAllPieces() {
    hideDiv("#bottomPiece");
    hideDiv("#topPiece");
    hideDiv("#leftPiece");
    hideDiv("#rightPiece")
}
function isCollision(a, b) {
    return !(a.y + a.height < b.y || a.y > b.y + b.height || a.x + a.width < b.x || a.x > b.x + b.width)
}
function trimRegion(a, b, c) {
    isCollision(b, {
        x: a.bounding.x0,
        y: a.bounding.y0,
        width: a.bounding.x1 - a.bounding.x0,
        height: a.bounding.y1 - a.bounding.y0
    }) && ("x" == a.slidesIn ? b.x + b.width < c.x ? a.bounding.x0 = b.x + b.width : b.x > c.x ? a.bounding.x1 = b.x : (a.bounding.x0 = c.x, a.bounding.x1 = c.x) : "y" == a.slidesIn && (b.y + b.height < c.y ? a.bounding.y0 = b.y + b.height : b.y > c.y ? a.bounding.y1 = b.y : (a.bounding.y0 = c.y, a.bounding.y1 = c.y)))
}
function updateWindowPosition() {
    if (currentPoint) {
        var a = findXYOfLatLng(currentPoint), b = jq("#map").height(), c = jq("#map").width(), d = jq("#infoWindow").outerHeight(), e = jq("#infoWindow").outerWidth(), f = jq.map([jq(".mapOverlay")], function(a) {
            return jq.map(a, function(a) {
                a = jq(a);
                if (!a.is(":visible"))
                    return {
                        x: -1,
                        y: -1,
                        width: 0,
                        height: 0
                    };
                var b = a.offset(), c = a.outerWidth();
                a = a.outerHeight();
                return {
                    x: b.left,
                    y: b.top,
                    width: c,
                    height: a
                }
            })
        }), g = [{
            x: -999999,
            y: 0,
            width: 999999,
            height: b
        }, {
            x: c,
            y: 0,
            width: 999999,
            height: b
        }, {
            x: 0,
            y: -999999,
            width: c,
            height: 999999
        }, {
            x: 0,
            y: b,
            width: c,
            height: 999999
        }
        ], b = [a.x < c / 2 ? g[0]: g[1], a.y < b / 2 ? g[2]: g[3]], f = [[].concat(g, f), g, b], h = {
            above: {
                slidesIn: "x",
                quadrant: -1,
                arrow: {
                    element: jq("#bottomPiece")
                },
                info: {
                    offsetLeft: 0,
                    offsetTop: 0
                },
                bounding: {}
            },
            below: {
                slidesIn: "x",
                quadrant: 1,
                arrow: {
                    element: jq("#topPiece")
                },
                info: {
                    offsetLeft: 0,
                    offsetTop: 0
                },
                bounding: {}
            },
            left: {
                slidesIn: "y",
                quadrant: -1,
                arrow: {
                    element: jq("#rightPiece")
                },
                info: {
                    offsetLeft: 0,
                    offsetTop: 0
                },
                bounding: {}
            },
            right: {
                slidesIn: "y",
                quadrant: 1,
                arrow: {
                    element: jq("#leftPiece")
                },
                info: {
                    offsetLeft: 0,
                    offsetTop: 0
                },
                bounding: {}
            }
        };
        jq.each(h, function(b, c) {
            var f = c.arrow, g = c.bounding;
            f.width = c.arrow.element.outerWidth();
            f.height = c.arrow.element.outerHeight();
            c.info.width = e + ("y" == c.slidesIn ? f.width : 0);
            c.info.height = d + ("x" == c.slidesIn ? f.height : 0);
            var h = "x" == c.slidesIn ? "offsetTop": "offsetLeft";
            c.info[h] +=- 1 * c.quadrant;
            if (1 == c.quadrant) {
                var h = "x" == c.slidesIn ? "offsetTop": "offsetLeft", k = "x" == c.slidesIn ? "height": "width";
                c.info[h] += f[k]
            }
            k = "x" == c.slidesIn ? "width" : "height";
            h = "x" == c.slidesIn ?
            "offsetLeft" : "offsetTop";
            c.info[k] += f[k] + 10;
            c.info[h] += (f[k] + 10) / 2;
            "x" == c.slidesIn ? (g.x0 = a.x - e, g.x1 = a.x + e, f.x = a.x - f.width / 2, "above" == b ? (g.y0 = a.y - d - f.height, g.y1 = a.y, f.y = a.y - f.height) : "below" == b && (g.y0 = a.y, g.y1 = a.y + d + f.height, f.y = a.y)) : "y" == c.slidesIn && (g.y0 = a.y - d, g.y1 = a.y + d, f.y = a.y - f.height / 2, "left" == b ? (g.x0 = a.x - e - f.width, g.x1 = a.x, f.x = a.x - f.width) : "right" == b && (g.x0 = a.x, g.x1 = a.x + e + f.width, f.x = a.x))
        });
        var k=!1;
        jq.each(f, function(b, c) {
            if (k)
                return !1;
            jq.each(["above", "below", "left", "right"], function(b,
            d) {
                var e = jq.extend(!0, {}, h[d]);
                jq.each(c, function(b, c) {
                    trimRegion(e, c, a)
                });
                if (e.bounding.x1 - e.bounding.x0 >= e.info.width && e.bounding.y1 - e.bounding.y0 >= e.info.height) {
                    var f = a.x - e.info.width / 2, g = a.y - e.info.height / 2;
                    f < e.bounding.x0 && (f = e.bounding.x0);
                    f + e.info.width > e.bounding.x1 && (f = e.bounding.x1 - e.info.width);
                    g < e.bounding.y0 && (g = e.bounding.y0);
                    g + e.info.height > e.bounding.y1 && (g = e.bounding.y1 - e.info.height);
                    jq("#infoWindow").css({
                        left: f + e.info.offsetLeft,
                        top: g + e.info.offsetTop
                    });
                    hideAllPieces();
                    e.arrow.element.css({
                        left: e.arrow.x,
                        top: e.arrow.y
                    });
                    showDiv(e.arrow.element);
                    k=!0;
                    if ("localStorage"in window && null !== window.localStorage && "true" === localStorage.getItem("debugObstacles")) {
                        jq(".debug-obstacle").remove();
                        jq(".debug-info").remove();
                        jq(".debug-region").remove();
                        var l = jq("<div></div>").addClass("debug-info");
                        l.css({
                            position: "absolute",
                            border: "3px dashed black",
                            "z-index": 999999,
                            left: f,
                            top: g,
                            width: e.info.width-6,
                            height: e.info.height-6
                        });
                        jq("body").append(l);
                        f = jq("<div></div>").addClass("debug-region");
                        f.css({
                            position: "absolute",
                            "background-color": "green",
                            opacity: .2,
                            "z-index": 999999,
                            left: e.bounding.x0,
                            top: e.bounding.y0,
                            width: e.bounding.x1 - e.bounding.x0,
                            height: e.bounding.y1 - e.bounding.y0
                        });
                        jq("body").append(f);
                        jq.each(c, function(a, b) {
                            var c = jq("<div></div>");
                            c.addClass("debug-obstacle");
                            c.css({
                                position: "absolute",
                                "background-color": "red",
                                "z-index": 999999,
                                opacity: .2,
                                left: b.x,
                                top: b.y,
                                width: b.width,
                                height: b.height
                            });
                            jq("body").append(c)
                        })
                    }
                    return !1
                }
            })
        });
        showDiv("#infoWindow")
    }
}
function findXYOfLatLng(a) {
    a = latLngOverlay.getProjection().fromLatLngToContainerPixel(a);
    return {
        x: Math.round(a.x),
        y: Math.round(a.y)
    }
}
function createCityMarker(a, b, c) {
    markerOptions = {
        icon: type0icon,
        position: a,
        shadow: defaultShadow
    };
    return makeLoadingMarker(a, b, loadCityDescription, markerOptions)
}
function createPOIMarker(a, b, c, d) {
    3 == d ? markerOptions = {
        icon: shoppingTypeIcon
    } : 4 == d ? markerOptions = {
        icon: foodTypeIcon
    } : 5 == d ? markerOptions = {
        icon: barTypeIcon
    } : 6 == d ? markerOptions = {
        icon: nightlifeTypeIcon
    } : 7 == d ? markerOptions = {
        icon: activeTypeIcon
    } : 8 == d ? markerOptions = {
        icon: artTypeIcon
    } : 9 == d && (markerOptions = {
        icon: beautyTypeIcon
    });
    return makeLoadingMarker(a, b, loadPOIDescription, markerOptions)
}
function createPOIMarkerHtml(a, b, c) {
    markerOptions = "grocery" == yelpType ? {
        icon: shoppingTypeIcon,
        position: a
    } : "restaurants" == yelpType ? {
        icon: foodTypeIcon,
        position: a
    } : "bars" == yelpType || "coffee" == yelpType ? {
        icon: barTypeIcon,
        position: a
    } : "nightlife" == yelpType ? {
        icon: nightlifeTypeIcon,
        position: a
    } : "gyms" == yelpType ? {
        icon: activeTypeIcon,
        position: a
    } : "arts" == yelpType ? {
        icon: artTypeIcon,
        position: a
    } : "elementaryschools+highschools" == yelpType ? {
        icon: artTypeIcon,
        position: a
    } : {
        icon: beautyTypeIcon,
        position: a
    };
    b = new google.maps.Marker(markerOptions);
    google.maps.event.addListener(b, "click", function() {
        currentPoint = a;
        openInfoWindowHtml(a, c)
    });
    return b
}
function createApartmentMarker(a, b, c, d) {
    c = defaultShadow;
    var e = parseInt(1E3 * (90 - a.lat())), f = {
        icon: redMarkerIcon,
        position: a,
        shadow: c,
        zIndex: e + 1
    };
    isFavorite(b) ? f = {
        position: a,
        icon: favIcon,
        shadow: c,
        zIndex: e + 25
    } : isSeen(b) ? f = {
        position: a,
        icon: seenIcon,
        shadow: c,
        zIndex: e-20
    } : 1 == d||-1 < userId || (-1 == d ? (a = offsetPoint(a, b), f = {
        position : a, icon : lowAccuracyIcon, zIndex : e
    }) : 2 == d && (f = {
        position: a,
        icon: type2icon,
        zIndex: e + 20
    }));
    var g = new google.maps.Marker(f);
    g.originalLL = a;
    g.value = b;
    google.maps.event.addListener(g, "click",
    function() {
        isSeenMarker(g) || (g = replacePointWithSeenOrFavMarker(g, !0));
        closeInfoWindow();
        currentPoint = a;
        currentMarker = g;
        findAndSeparateNearbyMarkers(g);
        openInfoWindowHtml(currentPoint, '<div id = "infoBoxHTML"><div id="throbberHolder"><img src="/images/throbber.gif"/></div></div>');
        loadApartmentDescription(g.value);
        markSidelistItemAsCurrentlyViewed(currentMarker.value)
    });
    return g
}
function createPlacesMarker(a, b, c) {
    var d = new google.maps.Marker({
        icon: placesIcon,
        position: a,
        shadow: defaultShadow
    });
    d.value = b;
    google.maps.event.addListener(d, "click", function() {
        currentPoint = a;
        currentMarker = d;
        loadPlacesDescription(a, d.value)
    });
    return d
}
function trck(a, b, c) {
    _gaq.push(["_trackEvent", a, b, c])
}
function imageProcess(a, b, c, d, e) {
    d = a.naturalHeight;
    a = a.naturalWidth;
    if (null == a || null == d)
        b = jq("#" + b), b.removeClass("infoThumbnail"), d = b.height(), a = b.width(), b.addClass("infoThumbnail");
    null != a && null != d && (100 > a || 100 > d || 1.5 < a / d || 1.5 < d / a) && jq.get("/imgProcess.php" + ("?listId=" + c + "&imgId=" + e + "&w=" + a + "&h=" + d))
}
function zIndexFn(a, b) {
    var c = GOverlay.getZIndex(a.getPoint().lat());
    return isFav(a) ? c + 20 : isSeenMarker(a) ? c-20 : c
}
function resetAnimatedMarkers() {
    window.clearTimeout(currAnimationTimeoutId);
    for (var a = 0; a < animatedMarkers.length; a++) {
        var b = animatedMarkers[a];
        b.setPosition(b.originalLL)
    }
}
function findAndSeparateNearbyMarkers(a) {
    window.clearTimeout(currAnimationTimeoutId);
    animatedMarkers = [];
    var b = a.getPosition(), c = b.lat(), b = b.lng(), d = a.value;
    a = getOverlapBounds();
    for (var e = new google.maps.LatLngBounds(new google.maps.LatLng(c - a, b - a), new google.maps.LatLng(c + a, b + a)), b = 0; b < markerArray.length; b++) {
        var f = markerArray[b], g = f.getPosition();
        e.contains(g) && f.value != d && (f.lastLatLng = f.getPosition(), animatedMarkers.push(f))
    }
    animatedMarkers.sort(markerLngSortComparator);
    d = getLngOffset();
    for (b =
    0; b < animatedMarkers.length; b++)
        f = animatedMarkers[b], e = (b - animatedMarkers.length / 2) * d, g = f.getPosition(), f.stepNum = 1, f.destinationLatLng = new google.maps.LatLng(c-2 * a, g.lng() + e);
    window.setTimeout("animateMarkers()", 10)
}
function getLngOffset() {
    return 3.5E-4 * Math.pow(2, 16 - map.getZoom())
}
function getOverlapBounds() {
    return 2.5E-4 * Math.pow(2, 16 - map.getZoom())
}
function markerLngSortComparator(a, b) {
    return a.originalLL.lng() - b.originalLL.lng()
}
function animateMarkers() {
    for (var a=!1, b = 0; b < animatedMarkers.length; b++) {
        var c = animatedMarkers[b];
        if (c.destinationLatLng && 5 >= c.stepNum) {
            var d = c.lastLatLng, e = c.destinationLatLng, f = c.stepNum / 5, a = d.lat() + f * (e.lat() - d.lat()), d = d.lng() + f * (e.lng() - d.lng()), a = new google.maps.LatLng(a, d);
            c.setPosition(a);
            c.stepNum += 1;
            a=!0
        }
    }
    a && (currAnimationTimeoutId = window.setTimeout("animateMarkers()", 25))
}
function offsetPoint(a, b) {
    var c = b%16, d = 40 / 348400, e = d * Math.cos(2 * Math.PI * c / 16), c = d * Math.sin(2 * Math.PI * c / 16);
    return new google.maps.LatLng(a.lat() + e, a.lng() + c)
}
function createAndAddWorkMarker(a, b, c) {
    currentWorkIcon && (removeMarkerFromMap(currentWorkIcon), currentWorkIcon = null);
    b = new google.maps.Marker({
        icon: workIcon,
        position: a
    });
    google.maps.event.addListener(b, "click", function() {
        openInfoWindowHtml(a, '<div id = "infoBoxHTML">' + c + "</div>")
    });
    addMarkerToMap(b);
    currentWorkIcon = b
}
function removeWorkMarker(a) {
    currentWorkIcon && (removeMarkerFromMap(currentWorkIcon), currentWorkIcon = null)
}
function selectTab(a, b, c, d, e, f) {
    jq("." + c).hide();
    jq("." + d).removeClass(e);
    jq("#" + a).show();
    jq("#" + b).addClass(e);
    location.href = "#" + f
}
function hideOrShowListingNumWarning() {
    markerArray.length >= maxMarkers&&!listingLimitAlertDisabled ? jq("#tooManyAlertOverlay").show() : jq("#tooManyAlertOverlay").hide()
}
function closeListingNumWarning() {
    listingLimitAlertDisabled=!0;
    jq.get("/disableListingAlertBox.php");
    jq("#tooManyAlertOverlay").hide();
    trck("Interaction", "DisableListingNumWarning", "")
}
function storeScreenConfig() {
    var a = jq("#sideContainer").hasClass("hidden"), b = jq("#all").hasClass("hidden"), c = jq("#filterDiv").hasClass("hidden"), d = jq("#advancedDiv").hasClass("hidden");
    jq.get("/storeScreenConfig.php?side=" + a + "&all=" + b + "&more=" + c + "&secret=" + d)
}
function getYelpPOIs(a) {
    showDiv("#yelpThrobber");
    yelpType = a;
    var b = getWindowLimits();
    getVars = "?eastLong=" + b.eastLong + "&northLat=" + b.northLat + "&westLong=" + b.westLong + "&southLat=" + b.southLat + "&term=" + a;
    jq.get("/yelpRequest.php" + getVars, function(a) {
        a = JSON.parse(a);
        "OK" == a.message.text ? showBusinesses(a.businesses) : alert("Could not find any nearby matches.")
    });
    trck("Yelp", a, "")
}
function initTooltips() {
    jq(".tooltip").each(function(a, b) {
        jq(b).qtip()
    })
}
function resetFilters() {
    confirm("This will reset all filters back to their original state. Would you like to do this?") && (setFilters(defaultFilterSettings), hideDiv("#filterReset"), reloadAll())
}
function arraysEqual(a, b) {
    for (prop in a)
        if (!(prop in b) || a[prop] != b[prop])
            return !1;
    for (prop in b)
        if (!(prop in a))
            return !1;
    return !0
}
function routeToOpeningState(a) {
    "" != a && ("#team" == a && (showOverlay("#aboutOverlay"), selectTab("teamAbout", "teamAboutTab", "aboutPane", "aboutTab", "selectedInfoTab", "team")), "#about" == a && (showOverlay("#aboutOverlay"), selectTab("aboutAbout", "aboutAboutTab", "aboutPane", "aboutTab", "selectedInfoTab", "about")), "#why" == a && (showOverlay("#aboutOverlay"), selectTab("whyAbout", "whyAboutTab", "aboutPane", "aboutTab", "selectedInfoTab", "why")), "#tips" == a && (showOverlay("#aboutOverlay"), selectTab("tipsAbout", "tipsAboutTab",
    "aboutPane", "aboutTab", "selectedInfoTab", "tips")))
}
function loadPane(a, b) {
    jq.get(b, function(b) {
        jq(a).html(b)
    })
}
function loadProfile() {
    loadProfilePane(!1);
    loadProfilePane(!0)
}
function loadProfilePane(a, b) {
    var c = "#renterProfileShow", d = "/profile/profileShow.php";
    a && (c = "#renterProfileEdit", d = "/profile/profileBasicInfo.php");
    jq.get(d, function(a) {
        jq(c).html(a);
        b && showProfile()
    })
}
function editProfile() {
    hideDiv("#renterProfileShow");
    showDiv("#renterProfileEdit")
}
function showProfile() {
    hideDiv("#renterProfileEdit");
    showDiv("#renterProfileShow")
}
function saveAndContinue() {
    var a = jq("#app_form").serialize();
    jq.post("/profile/submitBasicProfile.php", a, function(a) {
        loadProfilePane(!1, !0)
    })
}
function isTrue(a) {
    return "true" === a
}
function setMapAndFilters() {
    jq.get("/loadAccountSettings.php", function(a) {
        a = JSON.parse(a);
        !0 === a.isLoggedIn && null != a.currentSettings && (a = a.currentSettings, setFilters(a), map.setCenter(new google.maps.LatLng(a.centerLat, a.centerLong)), map.setZoom(a.zoom), reloadAll(), showCollabAcceptedOverlay && (showCollabAcceptedOverlay=!1, showOverlay("#collabAccepted")))
    })
}
function setFilters(a) {
    jq("#rent_slider").slider("values", 0, a.minRent);
    jq("#rent_slider").slider("values", 1, a.maxRent);
    jq("#br_slider").slider("values", 0, a.minBR);
    jq("#br_slider").slider("values", 1, a.maxBR);
    jq("#ba_slider").slider("values", 0, a.minBA);
    jq("#ppbr_slider").slider("values", 0, a.maxPricePerBedroom);
    jq("#age_slider").slider("values", 0, a.maxAge);
    jq("#imagesOnlyCheck").attr("checked", isTrue(a.imagesOnly));
    jq("#phoneReqCheck").attr("checked", isTrue(a.phoneReq));
    jq("#catsCheck").attr("checked",
    isTrue(a.cats));
    jq("#dogsCheck").attr("checked", isTrue(a.dogs));
    jq("#noFeeCheck").attr("checked", isTrue(a.noFee));
    jq("#onlyHQCheck").attr("checked", isTrue(a.onlyHQ));
    jq("#subs").attr("checked", isTrue(a.showSubs));
    jq("#rooms").attr("checked", isTrue(a.showRooms));
    jq("#vac").attr("checked", isTrue(a.showVac));
    jq("#nonsubs").attr("checked", isTrue(a.showNonSubs));
    jq("#cl").attr("checked", isTrue(a.cl));
    jq("#pl").attr("checked", isTrue(a.pl));
    jq("#aptsrch").attr("checked", isTrue(a.aptsrch));
    jq("#rnt").attr("checked",
    isTrue(a.rnt));
    jq("#airbnb").attr("checked", isTrue(a.airbnb));
    jq("#af").attr("checked", isTrue(a.af));
    jq("#rltr").attr("checked", isTrue(a.rltr));
    jq("#ood").attr("checked", isTrue(a.ood));
    a = a.searchTerms;
    null != a && "" != a && jq("#listingSearch").val(a);
    setSearchTermsNoReload()
}
function syncWithPhone() {
    loggedIn ? checkIfLoggedIn(!1) : showLoginScreen()
}
function afterNoteSaving(a, b, c) {}
function afterLoginStuff(a, b) {
    changeToLoggedIn();
    loadProfile();
    seenMarkers = a.seenIds;
    favMarkers = a.favIds;
    notes = a.notes;
    jq("#favsListTextArea").html(a.favListHtml);
    jq("#existingCollabConnectionsContent").html(a.collabListHtml);
    places = a.places;
    displayAllPlaces();
    a.hasLastSettings && b ? (a.collabInvite && (showCollabAcceptedOverlay=!0), showOverlay("#restoreOriginalDialog")) : (a.collabInvite && showOverlay("#collabAccepted"), reloadAll())
}
function afterLogoutStuff() {
    changeToLoggedOut();
    loadProfile()
}
function dontRestorePositionAfterLogin() {
    closeOverlay("#restoreOriginalDialog");
    showCollabAcceptedOverlay && (showCollabAcceptedOverlay=!1, showOverlay("#collabAccepted"));
    reloadAll()
}
function clearYelpMarkers() {
    for (var a = 0; a < bizMarkers.length; a++)
        bizMarker = bizMarkers[a], removeMarkerFromMap(bizMarker);
    bizMarkers = []
}
function showBusinesses(a) {
    hideDiv("#yelpThrobber");
    for (var b = 0; b < a.length; b++) {
        var c = a[b], d = "Unknown";
        c.categories[0] && (d = c.categories[0].name);
        d = "<div class='infoDescriptionDiv' style='font-size:10pt;'> <a target='_blank' href='" + c.url + "'>" + c.name + "</a><br/>Category: " + d + "<br/> <img src='" + c.rating_img_url + "'/> (" + c.review_count + " ratings) <br/><br/><div style='float:left; font-size:10px; padding-top:6px;'>Powered by</div> <div style='float:left;'><img src='/images/miniMapLogo.png'/></div><div style='clear:both;'></div></div>";
        c = new google.maps.LatLng(c.latitude, c.longitude);
        c = createPOIMarkerHtml(c, map, d);
        bizMarkers.push(c);
        addMarkerToMap(c)
    }
}
function reShowBusinesses() {
    for (var a = 0; a < bizMarkers.length; a++)
        addMarkerToMap(bizMarkers[a])
}
function replacePointWithSeenOrFavMarker(a, b) {
    var c = a.originalLL, d = a.value;
    b ? seenMarkers[d] = 1 : favMarkers[d] = 1;
    c = createApartmentMarker(c, d, map, 1);
    swapMarkers(a, c);
    return c
}
function swapMarkers(a, b) {
    addMarkerToMap(b);
    removeMarkerFromMap(a, !0);
    for (var c = 0; c < markerArray.length; c++)
        markerArray[c] == a && (markerArray[c] = b)
}
function selectAllListings() {
    hideDiv("#favoritesInnerInner");
    showDiv("#sidelist");
    jq("#allListingsTab").removeClass("inactiveTab");
    jq("#allListingsTab").addClass("selectedTab");
    jq("#favoritesTab").removeClass("selectedTab");
    jq("#favoritesTab").addClass("inactiveTab")
}
function selectFavorites() {
    hideDiv("#sidelist");
    showDiv("#favoritesInnerInner");
    jq("#allListingsTab").removeClass("selectedTab");
    jq("#allListingsTab").addClass("inactiveTab");
    jq("#favoritesTab").removeClass("inactiveTab");
    jq("#favoritesTab").addClass("selectedTab")
}
function openSidelist() {
    showDiv("#sideContainer");
    hideDiv("#sidebarOpenArrow");
    showDiv("#sidebarCloseArrow");
    jq("#map").css({
        width: "80%"
    });
    jq("#locationsSearchBar").css({
        width: "80%"
    });
    jq("#sidelistToggle").css({
        right: "20%"
    });
    google.maps.event.trigger(map, "resize")
}
function closeSidelist() {
    hideDiv("#sideContainer");
    hideDiv("#sidebarCloseArrow");
    showDiv("#sidebarOpenArrow");
    jq("#map").css({
        width: "100%"
    });
    jq("#locationsSearchBar").css({
        width: "100%"
    });
    jq("#sidelistToggle").css({
        right: "0%"
    });
    google.maps.event.trigger(map, "resize")
}
function toggleSidelist() {
    jq("#sideContainer").hasClass("hidden") ? openSidelist() : closeSidelist();
    storeScreenConfig()
}
function sortSidelist(a) {
    a.sort(function(a, c) {
        return c.priority - a.priority
    });
    return a
}
function updateSidelist() {
    for (var a = map.getBounds(), b = [], c = [], d = {}, e = 0; e < activePoints.length; e++) {
        var f = activePoints[e], g = new google.maps.LatLng(f.lat, f.lng), h = f.id;
        0 != f.type && a.contains(g) && (d[h] = h, h in listingCache ? b.push(listingCache[h]) : (listingCacheQueue.push(h), c.push(h)))
    }
    b = sortSidelist(b);
    a = jq("#sidelist");
    e = null;
    for (key in b)
        h = b[key].id, f = "#sidebar-" + h, g = jq(f), g.length ? e ? e.after(g) : g.appendTo(a) : a.append(sidelistItem(h, 0)), e = jq(f);
    for (key in c)
        h = c[key], g = jq("#sidebar-" + h), g.length ? g.appendTo(a) :
    a.append(sidelistItem(h, 0));
    for (key in currSidelistIds)
        h = currSidelistIds[key], d[h] || jq("#sidebar-" + h).remove();
    currSidelistIds = d;
    map.getZoom();
    isIE || jq(".sidebar-image").lazyload({
        container: jq("#sidelist")
    })
}
function sidelistItem(a, b) {
    var c = "whiteLine";
    1 == b && (c = "blueLine");
    c = '<div id="sidebar-' + a + '" class="' + c + '">';
    if (a in listingCache) {
        var d = listingCache[a];
        if (0 >= d.price)
            return "";
        c += sidelistItemText(d)
    } else 
        c += "<div class='sidebar-item'>Loading...</div>";
    return c + "</div>"
}
function sidelistItemText(a) {
    var b = "";
    isFavorite(a.id) ? b = "favSidelist" : isSeen(a.id) && (b = "seenSidelist");
    var c = "<div class='sidebar-image-holder'>", d = a.description;
    0 < a.images.length && 0 != a.source ? (40 < d.length && (d = d.substring(0, 40) + "..."), "" == d && (d = a.beds + "BR/" + a.baths + "BA"), c = isIE ? c + ("<div class='sidebar-description-text-holder' style='margin-top:85px;'><h3 class='sidebar-description-text'>" + d + " <br/>(No Pics with Internet Explorer)</h3></div>") : c + ("<img class='sidebar-image' data-original='" + a.images[0] +
    "'/><div class='sidebar-description-text-holder'><h3 class='sidebar-description-text'>" + d + "</h3></div>")) : c += "<div style='text-align:center; margin-top:40px;'>No Pics</div>";
    return ["<div id= 'sidebar-inner-" + a.id + "' class='pointerhand " + b + "' onclick='goToMarker(" + a.id + ");'>", "<div class='sidebar-item'>", c + "</div>", "<div style='clear:both;'></div>", "<div class='sidebar-price'>$" + formatNumber(a.price) + "</div>", "<div class='sidebar-beds'>" + a.beds + " Bed</div>", "<div class='sidebar-baths'>" + a.baths + " Bath</div>",
    "<div style='clear:both;'></div></div></div>"].join("")
}
function markSidelistItemAsSeen(a) {
    jq("#sidebar-inner-" + a).addClass("seenSidelist")
}
function markSidelistItemAsFavorite(a) {
    jq("#sidebar-inner-" + a).removeClass("seenSidelist");
    jq("#sidebar-inner-" + a).addClass("favSidelist")
}
function unmarkSidelistItemAsFavorite(a) {
    jq("#sidebar-inner-" + a).addClass("seenSidelist");
    jq("#sidebar-inner-" + a).removeClass("favSidelist")
}
function markSidelistItemAsCurrentlyViewed(a) {
    jq("#sidebar-inner-" + a).addClass("currentViewedSidelist")
}
function unmarkSidelistItemAsCurrentlyViewed(a) {
    jq("#sidebar-inner-" + a).removeClass("currentViewedSidelist")
}
function chooseImageFromListing(a) {
    return 0 != a.source && 0 < a.images.length ? "<img class='sidebar-img' src='" + a.images[0] + "'/>" : ":-("
}
function bedImages(a) {
    var b = "", c = "";
    4 < a && (a = 4, c = "+");
    for (var d = 0; d < a; d++)
        b += "<img src='/images/Bed.png' style='float:left; width:16px;'/>";
    return b + c
}
function bathImages(a) {
    var b = "", c = "";
    4 < a && (a = 4, c = "+");
    for (var d = 0; d < a; d++)
        b += "<img src='/images/Toilet.png' style='float:left; width:16px;'/>";
    return b + c
}
function updateSidelistItem(a) {
    var b = listingCache[a];
    jq("#sidebar-" + a).html(sidelistItemText(b))
}
function backgroundLoadAndCacheAptInfo() {
    var a = listingCacheQueue.length;
    if (0 != a) {
        var b = "";
        100 >= a ? (b = listingCacheQueue.toString(), listingCacheQueue = []) : (a = listingCacheQueue.slice(0, 100), listingCacheQueue = listingCacheQueue.slice(100), b = a.toString());
        a = "ids=" + URLEncode(b);
        jq.post("/pullListingsForCache.php", a, function(a) {
            a = eval("(" + a + ")");
            for (listingInd in a) {
                var b = a[listingInd], e = b.id;
                listingCache[e] = b;
                updateSidelistItem(e)
            }
            updateSidelist();
            0 < listingCacheQueue.length && setTimeout(backgroundLoadAndCacheAptInfo,
            500)
        })
    }
}
function dragUpdateMarkers() {
    for (var a = map.getBounds(), b = [], c = [], d = 0, e = 0; e < markerArray.length; e++) {
        var f = new google.maps.LatLng(activePoints[e].lat, activePoints[e].lng);
        a.contains(f) ? (b[d] = markerArray[e], c[d] = activePoints[e], d++) : (f = markerArray[e], f.setMap(null), onscreenMarkers[f.value] = 0, inactivePoints.push(activePoints[e]))
    }
    activePoints = c;
    markerArray = b;
    trimAndPromoteInactivePoints();
    updateBackend()
}
function trimAndPromoteInactivePoints() {
    for (var a = map.getBounds(), b = getOuterLimits(), c = [], d = 0, e = markerArray.length, f = 0; f < inactivePoints.length; f++) {
        var g = inactivePoints[f].lat, h = inactivePoints[f].lng, k = inactivePoints[f].id;
        b.eastLong > b.westLong && (g > b.northLat || g < b.southLat || h > b.eastLong || h < b.westLong) || null != onscreenMarkers[k] && 0 != onscreenMarkers[k] || (k = new google.maps.LatLng(inactivePoints[f].lat, inactivePoints[f].lng), e < maxMarkers && a.contains(k) ? (g = activePoints.length, activePoints[g] = inactivePoints[f],
        h = activePoints[g], k = createMarker(k, h.id, h.type, map), addMarkerToMap(k), k.setMap(map), onscreenMarkers[h.id] = 1, markerArray[g] = k, e++) : (c[d] = inactivePoints[f], d++))
    }
    inactivePoints = c;
    hideOrShowListingNumWarning();
    updateSidelist();
    backgroundLoadAndCacheAptInfo()
}
function addMarkerToMap(a) {
    a.setMap(map);
    overlays.push(a)
}
function removeMarkerFromMap(a, b) {
    a && (a.setMap(null), removeFromOverlays(a));
    !0 !== b && a === currentMarker && null !== currentMarker && closeInfoWindow()
}
function addSegmentToMap(a) {
    a.setMap(map);
    overlays.push(a);
    drawnTransitSegments[a.id] = a
}
function removeSegmentFromMap(a) {
    a.setMap(null);
    removeFromOverlays(a);
    delete drawnTransitSegments["" + a.id]
}
function addTransitPointToMap(a) {
    a.setMap(map);
    drawnTransitPoints[a.id] = a
}
function removeTransitPointFromMap(a) {
    removeMarkerFromMap(a);
    delete drawnTransitPoints["" + a.value]
}
function removeFromOverlays(a) {
    a = jq.inArray(a, overlays);
    overlays.splice(a, 1)
}
function redrawOverlays() {
    redrawAllPolys();
    redrawPlaces();
    crimeOverlayEnabled() && enableCrimeOverlay();
    neighborhoodOverlayEnabled() && (drawnNeighborhoodPolys = {}, loadNewNeighborhoodPolys());
    0 < bizMarkers.length && reShowBusinesses();
    currentWorkIcon && addMarkerToMap(currentWorkIcon)
}
function createMarkers() {
    markerArray = [];
    for (var a = 0, b = map.getBounds(), c = 0; c < activePoints.length; c++) {
        var d = activePoints[c], e = new google.maps.LatLng(d.lat, d.lng);
        !b.contains(e) || a > maxMarkers || (d = createMarker(e, d.id, d.type, map), addMarkerToMap(d), markerArray[c] = d, a++)
    }
    showMarkerPoint && (goToMarker(showMarkerPoint.id), showMarkerPoint = null)
}
function loadCityDescription(a) {
    a = "?cityID=" + a;
    descriptionReq && descriptionReq.abort();
    descriptionReq = jq.get("/loadCityDescription.php" + a, descriptionLoadStateChanged)
}
function loadPOIDescription(a) {
    a = "?poiID=" + a;
    descriptionReq && descriptionReq.abort();
    descriptionReq = jq.get("/loadPOIDescription.php" + a, descriptionLoadStateChanged)
}
function loadStopDescription(a) {
    a = "?stopID=" + a;
    descriptionReq && descriptionReq.abort();
    descriptionReq = jq.get("/loadStopDescription.php" + a, descriptionLoadStateChanged)
}
function loadApartmentMarkerPoint(a) {
    a = "?apartmentID=" + a;
    gotoReq && gotoReq.abort();
    gotoReq = jq.get("/loadApartmentPoint.php" + a, function(a) {
        "" != a && "0" != a ? (a = eval(a), a = a[0], goToAndSelectMarker(a, null)) : showExpiredAlert();
        gotoReq = null
    })
}
function showExpiredAlert() {
    showDiv("#overlay")
}
function loadApartmentDescription(a) {
    currListing = a;
    markSidelistItemAsSeen(a);
    if (a in listingCache) {
        var b = formDetailsTabHTML(a), b = formApartmentBubbleHTML(b);
        openInfoWindowHtml(currentPoint, b);
        var b = jq("#infoWindow").height(), c = jq("#infoWindow").width();
        jq("#infoWindow").css({
            height: b,
            width: c
        });
        jq.get("/setAsSeen.php?apartmentID=" + a)
    } else 
        jq.get("/getSingleListingForListingCache.php", "apartmentID=" + a, function(a) {
            try {
                var b = eval("(" + a + ")")
            } catch (c) {
                handleWindowLoadingError()
            }
            b.id && 0 < b.id ? (a = b.id, listingCache[a] =
            b, updateSidelistItem(a), updateSidelist(), loadApartmentDescription(a)) : handleWindowLoadingError()
        });
    trck("Markers", "Opened", a)
}
function handleWindowLoadingError() {
    closeInfoWindow();
    alert("Sorry, something seems to have gone wrong with loading this listing.")
}
function formDetailsTabHTML(a) {
    var b = listingCache[a], c;
    c = '<div id = "infoDescriptionDiv" style="width:380px; min-height:210px; font-family: Helvetica, Arial, sans-serif; font-size:9pt; line-height:1.3em;"><div id="mailDiv" class="hidden"><a href = "#" onclick=" showDiv(\'#listingSummaryDiv\'); hideDiv(\'#mailDiv\');">&#8592; Back to Listing Summary</a>$this->createMailDiv()</div>';
    c += '<div id = "listingSummaryDiv">';
    c += '<img src="/images/pxl.gif?type=view&id=' + a + '"/>';
    var d = "<b>" + b.baths + "</b> Bath";
    0 == b.baths && (d = "<b>?</b> Bath");
    var e = formatNumber(b.price), f = "<b>$" + e + "</b> - " + b.description;
    c += '<a target="_blank" href="' + formApartmentLinkURL("", "main", b) + "\" onclick=\"trck('Opens', 'Original', '" + b.id + "');\">" + f + "</a>";
    c += "<br/><b>" + b.beds + "</b> Bed, " + d + "<br/>";
    d = getListingTypeString(b);
    c += d + "<br/>";
    if (0 < b.comp) {
        var d = 100 * (b.price - b.comp) / b.comp, f = formatNumber(b.comp), g = b.beds + " BR leases";
        2 == b.type ? g = b.beds + " BR sublets" : 3 == b.type ? g = " rooms" : 4 == b.type && (g = " BR vacation rentals");
        c = 0 < d ? c +
        ('<span style = "color:red">' + Math.floor(Math.abs(d)) + "% more</span> than median of nearby " + g + ' (<span style = "color:red">$' + e + "</span> vs. $" + f + ")") : c + ('<span style = "color:green">' + Math.floor(Math.abs(d)) + "% less</span> than median of nearby " + g + ' (<span style = "color:green">$' + e + "</span> vs. $" + f + ")");
        c += "<br/>"
    }
    "" != b.location && (e = b.location.replace(/\+/, " "), c += e.toTitleCase(), 6 > b.locationPrecision ? c += ' <span style="color:red; font-weight:bold;">On-Map Location is Approximate</span>' : "" !=
    b.area && (c += " (" + b.area + ")"), c += "<br/>");
    105 == b.source && (c += "<b>Bonus:</b> $200 in gift cards upon move-in<br/>");
    numImages = b.images.length;
    c += '<div id="infoImageDiv" style = "height:100px; margin-top:10px; margin-bottom:10px; width:350px;">';
    e = 0;
    if (0 < b.images.length)
        if (0 == b.source)
            c += "Has pics, but we don't show images from Craigslist";
        else 
            for (; 3 > e && e < b.imageIds.length;)
                d = b.images[e], f = a + "-" + e, c += '<a href = "javascript:getImage(' + e + "," + numImages + "," + a + ')"><img id="' + f + '" onload="imageProcess(this, \'' +
    f + "', '" + b.id + "', '" + d + "', " + b.imageIds[e] + ');" class = "infoThumbnail" src="' + d + '"/></a>', e += 1;
    else 
        c += "No Pics :-(";
    c += "</div>";
    e = Math.floor(((new Date).getTime() / 1E3 - b.date) / 86400);
    null == b.date && (e = 0);
    null != b.sourceName && "" != b.sourceName && (c += '<div class="bubbleInfo bubbleInfoTitle">Source:</div><div class="bubbleInfo">' + b.sourceName + ", ");
    c = 0 == e ? c + "Added today (< 24 hours)" : 1 == e ? c + "Added yesterday" : c + ("Added " + e + " days ago");
    c += '</div><div style="clear:both"></div>';
    e = null != b.email && "" != b.email;
    d = null != b.phone && "" != b.phone;
    e && (c += '<div class="bubbleInfo bubbleInfoTitle">Email:</div> <div class="bubbleInfo"><a target="_blank" href="' + formApartmentLinkURL("", "main", b) + "\" onclick=\"trck('Opens', 'Original', '" + b.id + '\');">Original Listing</a> </div><div style="clear:both"></div>');
    d && (c += '<div class="bubbleInfo bubbleInfoTitle">Phone:</div> <div class="bubbleInfo">' + b.phone + '</div><div style="clear:both"></div>');
    d || e || (c += '<div class="bubbleInfo bubbleInfoTitle">Contact:</div> <div class="bubbleInfo"><a target="_blank" href="' +
    formApartmentLinkURL("", "main", b) + "\" onclick=\"trck('Opens', 'Original', '" + b.id + '\');">Original Listing</a> </div><div style="clear:both"></div>');
    d = e = "";
    if (a in notes)
        for (key in noteBlob = notes[a], noteBlob)
            "note" == key ? e += noteBlob.note : d += noteBlob[key].email + " - " + noteBlob[key].note + "<br/>";
    "" != d && (d = "<div><b>Collaborator Notes:</b><br/>" + d + "</div>");
    c += ["<div>", d, "<b>Your Notes:</b><br/>", '<div style="float:left; padding:2px;" id="noteButton' + b.id + 'bub"><a href="javascript:writeEditNote(' + b.id +
    ',\'bub\')"><img class="linkNoBorder" title = "Write/Edit a Note" alt = "Write/Edit a Note" style = "height:13px;" src = "http://www.padmapper.com/images/pencil.png" /></a></div>', '<div id="note' + b.id + 'bub" style="padding:2px;">' + e + "</div>", '<div style="clear:both;"></div></div>'].join(" ");
    a = "hidden";
    e = "shown";
    isFavorite(b.id) && (a = "shown", e = "hidden");
    d = "shown";
    f = "hidden";
    isHidden(b.id) && (d = "hidden", f = "shown");
    c += '<div style="margin-top: 10px; padding-top:3px; font-size:8pt; border-top:1px solid #888888; text-align:center; background-color:E0E0E0;">';
    c += ['<div style="margin-top: 3px; margin-bottom:5px;">', '<span id = "saveLinkDiv" class = "' + e + '">', '<div style = "margin-right:10px;" class="normalButton whiteButton thumbButton" onclick="addAsFavorite(' + b.id + ')">', '<img style="float:left;" src="http://www.padmapper.com/images/ThumbsUp.png"/> <div class="thumbButtonText">Save as Favorite</div> </div> </span> <span id = "savingMessage" class = "hidden">  <div style = "margin-right:10px;" class="normalButton whiteButtonDisabled thumbButton"> <div class="thumbButtonText">Saving... </div> </div> </span>',
    '<span id = "savedMessage" class = "' + a + '">', '<div style = "margin-right:10px;" class="normalButton whiteButton thumbButton" onclick="removeFavorite(' + b.id + ')">', '<div class="thumbButtonText">Unsave Favorite</div> </div> </span>', '<span id = "hideLinkDiv" class = "' + d + '">', '<div class="normalButton whiteButton thumbButton" onclick="addAsHidden(' + b.id + ')">', '<img style="float:left;" src="http://www.padmapper.com/images/ThumbsDown.png"/> <div class="thumbButtonText">Hide from Map</div> </div> </span>',
    '<span id = "unhideLinkDiv" class = "' + f + '">', '<div class="normalButton whiteButton thumbButton" onclick="unhideMarker(' + b.id + ')">', '<div class="thumbButtonText">Unhide Marker</div> </div> </span> </div>'].join(" ");
    c += "Other Tools: ";
    c += ' <a href="javascript:linkToListing(' + b.id + ')">Link To</a>';
    c += " &middot; ";
    c += ' <a target="_blank" href="http://maps.google.com/maps?f=d&source=s_d&saddr=&daddr=' + b.lat + "%2C" + b.lng + "&hl=en&geocode=&mra=ls&ie=UTF8&z=15\" onclick=\"trck('Opens', 'Directions To', '" +
    b.id + "');\">Directions To</a> &middot; ";
    0 != workplaceLat & 0 != workplaceLong && (c += ' <a target="_blank" href="http://www.google.com/maps?ie=UTF8&f=d&dirflg=r&saddr=' + b.lat + "%2C" + b.lng + "&daddr=" + workplaceLat + "%2C" + workplaceLong + '&ttype=dep&date=1%2F14&time=9%3A00am">Commute Directions/Time</a> &middot; ');
    c += "</span>";
    c += '<a href="javascript:badListing(' + b.id + ');">Flag as Bad/Deleted</a> ';
    c += "</div>";
    return c += "</div></div>"
}
function formApartmentLinkURL(a, b, c) {
    0 == c.source && (a = "https://" + window.location.host);
    return a = a + "/show.php?source=" + c.source + "&id=" + c.id + "&src=" + b
}
function getListingTypeString(a) {
    var b = "Normal Lease";
    1 == a.aptType ? b = "abo" == a.listingType ? "Full Term Lease, No Broker Fee (Listing by Owner)" : "nfb" == a.listingType ? "Full Term Lease, No Broker Fee (Broker Listing)" : "fee" == a.listingType ? 'Full Term Lease, <span style="color:red; font-weight:bold;">Broker Fee</span>' : "Full Term Lease" : 2 == a.aptType ? b = "Sublet" : 3 == a.aptType ? b = "Room/Share" : 4 == a.aptType && (b = "Vacation Rental");
    return b
}
function formApartmentBubbleHTML(a) {
    return ["<div id = \"detailInfoWindowTab\" class=\"infoWindowTab selectedInfoWindowTab\" onclick=\"selectTab('detailsPane', 'detailInfoWindowTab', 'infoWindowPane', 'infoWindowTab', 'selectedInfoWindowTab', 'deets');\"><span>Details</span></a></div><div id = \"placesInfoWindowTab\" class=\"infoWindowTab\" onclick=\"selectTab('placesPane', 'placesInfoWindowTab', 'infoWindowPane', 'infoWindowTab', 'selectedInfoWindowTab', 'places'); showPlacesPane();\"><span>My Places</span></a></div><div id = \"streetviewInfoWindowTab\" class=\"infoWindowTab\" onclick=\"selectTab('panoPane', 'streetviewInfoWindowTab', 'infoWindowPane', 'infoWindowTab', 'selectedInfoWindowTab', 'streetview'); showStreetView(currentPoint.lat(),currentPoint.lng());\"><span>Street View</span></div><div id = \"walkscoreInfoWindowTab\" class=\"infoWindowTab\" onclick=\"selectTab('walkPane', 'walkscoreInfoWindowTab', 'infoWindowPane', 'infoWindowTab', 'selectedInfoWindowTab', 'walkscore'); showWalkScore(currentPoint.lat(),currentPoint.lng());\"><span>Walk Score</span></div><div style=\"clear:both;\"></div><div style=\"border-top:1px solid #999999; margin-top:-1px; padding-top:5px;\"><div id=\"detailsPane\" class=\"infoWindowPane\">", a,
    '</div><div id="placesPane" class="infoWindowPane" style="display:none"></div><div id="panoPane" class="infoWindowPane" style="display:none"><div id="pano" style="height:250px; width:100%;"></div></div><div id="walkPane" class="infoWindowPane" style="display:none"></div></div>'].join("")
}
function trackOverlay(a, b) {}
function descriptionLoadStateChanged() {
    openInfoWindowHtml(currentPoint, descriptionReq.responseText);
    descriptionReq = null
}
function afterWindowClosed() {
    clearPlacesPolylines();
    resetAnimatedMarkers()
}
function clearPlacesPolylines() {
    jq.each(placesPolylines, function(a, b) {
        map.removeOverlay(b)
    });
    placesPolylines = []
}
function startFilterPoly() {
    mapDrawListener = google.maps.event.addListener(map, "click", function(a, b) {
        var c = new google.maps.Marker({
            icon: type0icon,
            draggable: !0,
            position: b
        });
        lastVertex = b;
        polyVertexArray.push(b);
        drawFilterPoly();
        followMouse || (followMouse=!0, closeFilterPolyListener = google.maps.event.addListener(c, "click", finishFilterPoly), followListener = google.maps.event.addListener(map, "mousemove", followMousePoly));
        addMarkerToMap(c)
    })
}
function drawFilterPoly() {
    polylines && map.removeOverlay(polylines);
    polylines = new GPolyline(polyVertexArray, "#8888ff", 5, 1, {
        clickable: !1
    });
    map.addOverlay(polylines)
}
function followMousePoly(a) {
    mouseFollowPolyline && map.removeOverlay(mouseFollowPolyline);
    lineLabel && map.removeOverlay(lineLabel);
    mouseFollowPolyline = new GPolyline([lastVertex, a], "#8888ff", 5, 1, {
        clickable: !1
    });
    var b = new google.maps.LatLng((lastVertex.lat() + a.lat()) / 2, (lastVertex.lng() + a.lng()) / 2);
    a = getDistanceInKilometers(lastVertex.lat(), a.lat(), lastVertex.lng(), a.lng());
    a = a.toPrecision(2);
    lineLabel = new ELabel(b, a + "km");
    map.addOverlay(lineLabel);
    map.addOverlay(mouseFollowPolyline)
}
function finishFilterPoly(a) {
    google.maps.event.removeListener(closeFilterPolyListener);
    google.maps.event.removeListener(followListener);
    google.maps.event.removeListener(mapDrawListener);
    map.removeOverlay(mouseFollowPolyline);
    followMouse=!1;
    lastVertex = null;
    map.removeOverlay(lineLabel);
    lineLabel = null;
    polyVertexArray.push(polyVertexArray[0]);
    drawFilterPoly()
}
function addFilterPolyVertex(a) {
    alert(a.lat())
}
function toggleTransitOverlay() {
    transitOverlayEnabled() ? (transitLayer || (transitLayer = new google.maps.TransitLayer), transitLayer.setMap(map), trackOverlay("Transit", !1)) : transitLayer.setMap(null)
}
function getOuterLimitGetVars() {
    var a = getOuterLimits();
    return "?eastLong=" + a.eastLong + "&westLong=" + a.westLong + "&northLat=" + a.northLat + "&southLat=" + a.southLat
}
function runOnAjaxSuccess(a, b) {
    4 == a.readyState && 200 == a.status && b(a)
}
function toggleNeighborhoodOverlay() {
    neighborhoodOverlayEnabled() ? (loadNewNeighborhoodPolys(), trackOverlay("Neighborhood", !0)) : (removeAllNeighborhoodPolygons(), trackOverlay("Neighborhood", !1))
}
function loadNewNeighborhoodPolys() {
    var a = getOuterLimitGetVars();
    overlayReq && overlayReq.abort();
    overlayReq || (overlayReq = jq.get("/loadNeighborhoodOverlayPolys.php" + a, function(a) {
        neighborhoodPolyArray = eval(a);
        updateOverlayPolys();
        overlayReq = null
    }))
}
function rectangleOverlapsView(a, b, c, d, e) {
    var f = e.southLat, g = e.northLat, h = e.westLong;
    e = e.eastLong;
    return a > f && a < g && c > h && c < e || b > f && b < g && c > h && c < e || a > f && a < g && d > h && d < e || b > f && b < g && d > h && d < e || a < f && b > g && (c > h && c < e || d > h && d < e || c < h && d > e) || c < h && d > e && (a > f && a < g || b > f && b < g || a < f && b > g)
}
function updateOverlayPolys() {
    drawnNeighborhoodPolys.initialized=!0;
    for (var a = getWindowLimits(), b = 0; b < neighborhoodPolyArray.length; b++) {
        var c = neighborhoodPolyArray[b], d = c[0], e = d[0], f = d[1], g = d[2], h = d[3], k = d[4], l = d[5], m = d[6], r = d[7], d = d[8];
        if (null == drawnNeighborhoodPolys[e] && rectangleOverlapsView(k, m, l, r, a)) {
            for (var s = [], n = 1; n < c.length; n++) {
                var p = c[n], p = new google.maps.LatLng(p[0], p[1]);
                s.push(p)
            }
            c = new google.maps.Polygon({
                paths: s,
                strokeColor: "#0000FF",
                strokeOpacity: .25,
                strokeWeight: 2,
                fillColor: "#0000FF",
                fillOpacity: 0
            });
            c.value = f;
            c.minLat = k;
            c.maxLat = m;
            c.minLng = l;
            c.maxLng = r;
            c.id = e;
            google.maps.event.addListener(c, "mouseover", function() {
                this.setOptions({
                    fillOpacity: .05
                });
                this.label.setOptions({
                    opacity: 100
                })
            });
            google.maps.event.addListener(c, "mouseout", function() {
                this.setOptions({
                    fillOpacity: 0
                });
                this.label.setOptions({
                    opacity: 50
                })
            });
            google.maps.event.addListener(c, "click", function() {
                infoWindow.close()
            });
            e = "";
            k = 100;
            "" != d && (e = '<div style="float:right;"><a target="_blank" href="' + d + '"><img style="border:0;" src="http://www.padmapper.com/images/info_but.png"/></a></div>',
            k = 84);
            f = '<div style="background-color:black; color:white; width:100px; padding:5px; margin-left:-60px;"><div style="float:left; text-align:center; width:' + k + 'px; font-size:14px;">' + f + "</div>" + e + '<div style="clear:both;"/></div>';
            g = new ELabel({
                latlng: new google.maps.LatLng(g, h),
                label: f,
                offset: 0,
                opacity: 50,
                overlap: !0,
                clicktarget: !1
            });
            c.label = g;
            addNieghborhoodPolygonToMap(c)
        }
    }
    for (n in drawnNeighborhoodPolys)
        "initialized" != n && (b = drawnNeighborhoodPolys[n], rectangleOverlapsView(b.minLat, b.maxLat, b.minLng,
        b.maxLng, a) || removeNeighborhoodPolygonFromMap(b));
    loadNewNeighborhoodPolys()
}
function addNieghborhoodPolygonToMap(a) {
    addMarkerToMap(a);
    addMarkerToMap(a.label);
    drawnNeighborhoodPolys["" + a.id] = a
}
function removeNeighborhoodPolygonFromMap(a) {
    a && (removeMarkerFromMap(a.label), removeMarkerFromMap(a), delete drawnNeighborhoodPolys["" + a.id])
}
function removeAllNeighborhoodPolygons() {
    for (var a in drawnNeighborhoodPolys)
        "initialized" != a && removeNeighborhoodPolygonFromMap(drawnNeighborhoodPolys[a]);
    drawnNeighborhoodPolys = {}
}
function enableOverlayClick() {
    makeCursorCrosshair();
    hideInitAndShowCancelButton();
    var a = google.maps.event.addListener(map, "click", function(b, c) {
        createTransitBoundPoly(c);
        resetCursor();
        google.maps.event.removeListener(a)
    })
}
function makeCursorCrosshair() {
    jq("#map img").addClass("crossHaired")
}
function resetCursor() {
    jq("#map img").removeClass("crossHaired")
}
function clearMap() {
    makeBackgroundWhite("#driveCommuteAddress");
    showInitAndHideCancelButton();
    resetCursor();
    removeAllPolys();
    resetCommuteTime()
}
function haltCommuteTime() {
    showInitAndHideCancelButton();
    resetCursor();
    circleSearchPointsTemp = []
}
function resetCommuteTime() {
    boundsPolyPoints = [];
    boundsPoly = null;
    circlePolyPoints = [];
    circleSearchPoints = [];
    circleSearchPointsTemp = [];
    circlePoly = null;
    directionsPolyLines = [];
    drivingCircleCenter = null
}
function hideInitAndShowCancelButton() {
    hideDiv("#drivingBoundsInitButton");
    showDiv("#drivingBoundsCancelButton")
}
function showInitAndHideCancelButton() {
    showDiv("#drivingBoundsInitButton");
    hideDiv("#drivingBoundsCancelButton")
}
function driveCommuteCallback(a, b) {
    var c = a.address;
    commuteMode = jq("#commuteType").val();
    if (a) {
        var d = 12;
        "walk" == commuteMode && (d = 14);
        map.setCenter(a);
        map.setZoom(d);
        makeBackgroundGreen("#driveCommuteAddress");
        workplaceLat = a.lat();
        workplaceLong = a.lng();
        createAndAddWorkMarker(a, map, c);
        createTransitBoundPoly(a)
    } else 
        makeBackgroundRed("#driveCommuteAddress"), workplaceLong = workplaceLat = 0, removeWorkMarker(map)
}
function setupDirectionsObjCommuteMode() {}
function getAssumedSpeedLimits() {
    var a = 40;
    "walk" == commuteMode ? a = 3.5 : "bike" == commuteMode && (a = 10);
    return a
}
function createTransitBoundPoly(a) {
    if (a) {
        removeAllPolys();
        resetCommuteTime();
        commuteBoundsTime = jq("#commuteTime").val();
        var b = getAssumedSpeedLimits() * (commuteBoundsTime / 60);
        circlePolyPoints = getPolyPoints(a, b, !1);
        circleSearchPointsTemp = circleSearchPoints = getPolyPoints(a, b, !0);
        redrawRoadDistCircle();
        getDirections(a)
    }
}
function getPolyPoints(a, b, c) {
    drivingCircleCenter = a;
    var d = [], e = 1;
    c && (e = interval);
    Math.cos(1);
    b*=.014457;
    c = b / Math.cos(.017453 * a.lat());
    for (var f = 0; 361 > f; f += e) {
        var g = Math.PI / 180 * f, h = a.lng() + c * Math.cos(g), g = a.lat() + b * Math.sin(g), h = new google.maps.LatLng(parseFloat(g), parseFloat(h), !0);
        d.push(h)
    }
    return d
}
function getDirections() {
    if (circleSearchPointsTemp && 0 != circleSearchPointsTemp.length) {
        var a = google.maps.TravelMode.DRIVING;
        "walk" == commuteMode ? a = google.maps.TravelMode.WALKING : "bike" == commuteMode ? a = google.maps.TravelMode.BICYCLING : "transit" == commuteMode && (a = google.maps.TravelMode.TRANSIT);
        var b = new google.maps.LatLng(drivingCircleCenter.lat(), drivingCircleCenter.lng()), c = new google.maps.LatLng(circleSearchPointsTemp[0].lat(), circleSearchPointsTemp[0].lng());
        circleSearchPointsTemp.shift();
        directionsObj.route({
            origin: b,
            destination: c,
            travelMode: a
        }, function(a, b) {
            if (b == google.maps.DirectionsStatus.OK) {
                var c = shortenPolyLineByDuration(a.routes[0], a.routes[0].overview_polyline.points);
                if (c && 0 < c.getPath().getLength()) {
                    directionsPolyLines.push(c);
                    var g = c.getPath().getAt(c.getPath().getLength()-1);
                    boundsPolyPoints.push(g);
                    boundsPolyPoints.sort(angleComparator);
                    setupShapeListeners(c);
                    c.setMap(map);
                    redrawBoundsPoly()
                }
            } else 
                alert("Failed to route :-( " + b);
            setTimeout("getDirections()", 1E3)
        })
    } else 
        showInitAndHideCancelButton()
}
function shortenPolyLineByDuration(a, b) {
    for (var c = 60 * commuteBoundsTime, d = 0, e = [], f = a.legs[0], g = f.steps.length, h = 0; h < g; h++) {
        var k = f.steps[h], l = k.duration.value, m = k.path;
        if (d + l < c)
            for (k = 0; k < m.length; k++)
                e.push(m[k]);
        else {
            f = 0;
            c = (c - d) / l * k.distance.value;
            for (k = 0; k < m.length-1; k++) {
                d = m[k];
                l = m[k + 1];
                g = google.maps.geometry.spherical.computeDistanceBetween(d, l);
                e.push(d);
                if (f + g > c) {
                    e.push(getPartialVertex((c - f) / g, d, l));
                    break
                }
                f += g
            }
            break
        }
        d += l
    }
    return new google.maps.Polyline({
        path: e,
        geodesic: !0,
        strokeColor: "#bb4444",
        strokeOpacity: .7,
        strokeWeight: 2
    })
}
function shortenPolyLineByDistance(a) {
    for (var b = 1609 * drivingDistance, c = 0, d = [], e = 0; e < a.getVertexCount()-1; e++) {
        var f = a.getVertex(e), g = a.getVertex(e + 1), h = f.distanceFrom(g);
        d.push(f);
        if (c + h > b) {
            d.push(getPartialVertex((b - c) / h, f, g));
            break
        }
        c += h
    }
    return new GPolyline(d, "#bb4444", 2, .7)
}
function getPartialVertex(a, b, c) {
    var d = b.lat() + a * (c.lat() - b.lat());
    a = b.lng() + a * (c.lng() - b.lng());
    return new google.maps.LatLng(d, a)
}
function redrawRoadDistCircle() {
    circlePoly && circlePoly.setMap(null);
    3 <= circlePolyPoints.length && (circlePoly = new google.maps.Polygon({
        paths: circlePolyPoints,
        strokeColor: "#0000ff",
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: "#00ff00",
        fillOpacity: 0
    }), google.maps.event.clearInstanceListeners(circlePoly), setupShapeListeners(circlePoly), circlePoly.setMap(map))
}
function redrawBoundsPoly() {
    boundsPoly && boundsPoly.setMap(null);
    3 <= boundsPolyPoints.length && (boundsPoly = new google.maps.Polygon({
        paths: boundsPolyPoints,
        strokeColor: "#00ff00",
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: "#00ff00",
        fillOpacity: .2
    }), google.maps.event.clearInstanceListeners(boundsPoly), setupShapeListeners(boundsPoly), boundsPoly.setMap(map))
}
function setupShapeListeners(a) {
    google.maps.event.addListener(a, "click", function() {
        infoWindow.close()
    })
}
function redrawDrivingPathLines() {
    for (var a = 0; a < directionsPolyLines.length; a++) {
        var b = directionsPolyLines[a];
        setupShapeListeners(b);
        b.setMap(map)
    }
}
function removeAllPolys() {
    boundsPoly && boundsPoly.setMap(null);
    circlePoly && circlePoly.setMap(null);
    for (var a = 0; a < directionsPolyLines.length; a++)
        directionsPolyLines[a].setMap(null)
}
function redrawAllPolys() {
    redrawRoadDistCircle();
    redrawBoundsPoly();
    redrawDrivingPathLines()
}
function angleComparator(a, b) {
    return getAngleToVert(drivingCircleCenter, a) - getAngleToVert(drivingCircleCenter, b)
}
function squared(a) {
    return Math.pow(a, 2)
}
function getAngleToVert(a, b) {
    var c = b.lat(), d = b.lng(), e = a.lat(), f = a.lng(), g = 69.172 * Math.abs(Math.cos(e * Math.PI / 180)), g = Math.sqrt(squared(69.172 * (c - e)) + squared((d - f) * g)), h = 1, k = 0;
    f > d && (h =- 1, k = Math.PI);
    return k + Math.acos(h * (c - e) * 69.172 / g)
}
function redrawPolyLines() {}
function toggleWalkscoreOverlay() {
    walkscoreOverlayEnabled() ? (enableWalkscoreOverlay(), trackOverlay("Walkscore", !0)) : (map.overlayMapTypes.setAt(0, null), trackOverlay("Walkscore", !1))
}
function enableWalkscoreOverlay() {
    walkscoreLayer || (walkscoreLayer = new google.maps.ImageMapType({
        alt: "Walkscore Overlay",
        getTileUrl: WalkscoreGetTileUrl,
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 18,
        minZoom: 1,
        name: "Walkscore",
        opacity: .35
    }));
    map.overlayMapTypes.insertAt(0, walkscoreLayer)
}
function WalkscoreGetTileUrl(a, b) {
    return "http://tilecache.walkscore.com.s3.amazonaws.com/1.0.0/ws/" + b + "/" + a.x + "/" + a.y + ".png"
}
function toggleCrimeOverlay() {
    crimeOverlayEnabled() ? (enableCrimeOverlay(), trackOverlay("Crime", !0)) : (map.removeOverlay(crimeLayer), trackOverlay("Crime", !1))
}
function enableCrimeOverlay() {
    if (!crimeLayer) {
        var a = new GCopyrightCollection(" ");
        a.addCopyright(new GCopyright("Demo", new google.maps.LatLngBounds(new google.maps.LatLng(-90, -180), new google.maps.LatLng(90, 180)), 0, ""));
        a = new GTileLayer(a);
        a.getTileUrl = CrimeGetTileUrl;
        a.isPng = function() {
            return !0
        };
        a.getOpacity = function() {
            return .35
        };
        crimeLayer = new GTileLayerOverlay(a)
    }
    map.addOverlay(crimeLayer)
}
function CrimeGetTileUrl(a, b) {
    return "http://padmapper-crimemaps.s3.amazonaws.com/" + b + "/" + a.x + "/" + ((1<<b) - a.y-1) + ".png"
}
function showPlacesPane() {
    var a = "<small>Add your office, school, favorite gym, etc. here and PadMapper will pull drive and walk times here on every listing.</small><div id='placesLocations' style='margin-bottom:10px; max-height:200px; overflow-y:auto;'>", b;
    for (b in places) {
        var c = places[b];
        c && (a += placeTabHtml(c))
    }
    a = a + "</div>" + addPlaceLink();
    jq("#placesPane").html(a);
    rebindPlacesAddLinks();
    for (b in places)(c = places[b]) 
        && getTimeAndDistanceForAllModes(c, currentPoint);
    trck("Opens", "PlacesTab", "")
}
function showStreetView(a, b) {
    jq("#pano").height(currBubbleHeight);
    myPano = new google.maps.StreetViewPanorama(document.getElementById("pano"));
    myPano.setPosition(new google.maps.LatLng(a, b));
    trck("Opens", "StreetviewTab", "")
}
function showWalkScore(a, b) {
    var c = "", c = am ? "<div style = 'height:" + currBubbleHeight + "px; overflow:hidden;'><script type='text/javascript'> var ws_wsid = 'de3c2ed1a164722c4391a9f63f73d514'; var ws_lat = '" + a + "'; var ws_lon = '" + b + "'; var ws_width = '650';var ws_height = '" + currBubbleHeight + "';var ws_layout = 'horizontal';\x3c/script><style type='text/css'>#ws-walkscore-tile{position:relative;text-align:left}#ws-walkscore-tile *{float:none;}#ws-footer a,#ws-footer a:link{font:11px/14px Verdana,Arial,Helvetica,sans-serif;margin-right:6px;white-space:nowrap;padding:0;color:#000;font-weight:bold;text-decoration:none}#ws-footer a:hover{color:#777;text-decoration:none}#ws-footer a:active{color:#b14900}</style><div id='ws-walkscore-tile'><div id='ws-footer' style='position:absolute;top:372px;left:3px;width:364px'><form id='ws-form'><a id='ws-a' href='https://www.walkscore.com/' target='_blank'>What's Your Walk Score?</a><input type='text' id='ws-street' style='position:absolute;top:0px;left:170px;width:162px' /><input type='image' id='ws-go' src='https://cdn.walkscore.com/images/tile/go-button.gif' height='15' width='22' border='0' alt='get my Walk Score' style='position:absolute;top:0px;right:0px' /></form></div></div><script type='text/javascript' src='https://www.walkscore.com/tile/show-walkscore-tile.php'>\x3c/script></div>":
    "<div style = 'height:" + currBubbleHeight + "px; overflow:hidden;'><script type='text/javascript'> var ws_wsid = 'de3c2ed1a164722c4391a9f63f73d514'; var ws_lat = '" + a + "'; var ws_lon = '" + b + "'; var ws_width = '370';var ws_height = '" + currBubbleHeight + "';var ws_layout = 'vertical';\x3c/script><style type='text/css'>#ws-walkscore-tile{position:relative;text-align:left}#ws-walkscore-tile *{float:none;}#ws-footer a,#ws-footer a:link{font:11px/14px Verdana,Arial,Helvetica,sans-serif;margin-right:6px;white-space:nowrap;padding:0;color:#000;font-weight:bold;text-decoration:none}#ws-footer a:hover{color:#777;text-decoration:none}#ws-footer a:active{color:#b14900}</style><div id='ws-walkscore-tile'><div id='ws-footer' style='position:absolute;top:372px;left:3px;width:364px'><form id='ws-form'><a id='ws-a' href='https://www.walkscore.com/' target='_blank'>What's Your Walk Score?</a><input type='text' id='ws-street' style='position:absolute;top:0px;left:170px;width:162px' /><input type='image' id='ws-go' src='https://cdn.walkscore.com/images/tile/go-button.gif' height='15' width='22' border='0' alt='get my Walk Score' style='position:absolute;top:0px;right:0px' /></form></div></div><script type='text/javascript' src='https://www.walkscore.com/tile/show-walkscore-tile.php'>\x3c/script></div>";
    jq("#walkPane").html(c);
    trck("Opens", "WalkscoreTab", "")
}
function showInfo() {
    hideDiv("#panoPane");
    hideDiv("#walkPane");
    showDiv("#infoDescriptionDiv")
}
function unhideMarker(a) {
    jq.get("/removeHidden.php?apartmentID=" + a);
    loadApartmentMarkerPoint(a);
    hideDiv("#unhideLinkDiv");
    showDiv("#hideLinkDiv");
    delete hiddenMarkers[a]
}
function addAsHidden(a) {
    for (var b = "?apartmentID=" + a, c = 0; c < markerArray.length; c++)
        markerArray[c].value == a && (removeMarkerFromMap(markerArray[c]), onscreenMarkers[markerArray[c].value] = 0, hiddenMarkers[a] = markerArray[c]);
    jq.get("/addAsHidden.php" + b);
    jq("#sidebar-" + a).remove();
    hideDiv("#hideLinkDiv");
    showDiv("#unhideLinkDiv")
}
function addAsFavorite(a) {
    hideDiv("#saveLinkDiv");
    showDiv("#savingMessage");
    for (var b = 0; b < markerArray.length; b++)
        markerArray[b].value == a && replacePointWithSeenOrFavMarker(markerArray[b], !1);
    markSidelistItemAsFavorite(a);
    jq.get("/addAsFavorite.php?apartmentID=" + a, function(a) {
        addHTMLToFavList(a)
    })
}
function bounceFavoritesDiv() {
    jq("#viewFavoritesDiv").animate({
        top: "-15px"
    }, 300).animate({
        top: "0px"
    }, 300).animate({
        top: "-7px"
    }, 200).animate({
        top: "0px"
    }, 200).animate({
        top: "-3px"
    }, 100).animate({
        top: "0px"
    }, 100)
}
function addHTMLToFavList(a) {
    a = jq("#favsListTextArea").html() + a;
    jq("#favsListTextArea").html(a);
    hideDiv("#savingMessage");
    showDiv("#savedMessage");
    favDialogUnopened && 3 > numTimesBounced && bounceFavoritesDiv()
}
function getImage(a, b, c) {
    a%=b;
    0 > a && (a = b + a);
    currImage = a;
    currNumImages = b;
    currListing = c;
    a = "?id=" + c + "&image=" + a;
    imagesReq && imagesReq.abort();
    imagesReq = jq.get("/getImageUrl.php" + a, function(a) {
        showImage(a);
        imagesReq = null
    })
}
function showSaveFavoritesDialog() {
    jq("#savefavoverlaydiv").hasClass("hidden") && (showDiv("#overlay"), showDiv("#savefavoverlaydiv"))
}
function showCollaborationDialog() {
    loggedIn ? jq("#collaboverlaydiv").hasClass("hidden") && (showDiv("#overlay"), showDiv("#collaboverlaydiv")) : showLoginScreen()
}
function unlinkCollaborator(a) {
    jq("#collaborator-" + a).remove();
    jq.get("/unlinkCollaborator.php?userId=" + a)
}
function openFavorites() {
    openSidelist();
    selectFavorites()
}
function showImage(a) {
    var b = currListing, c = currImage, d = currNumImages;
    jq("#overlaydiv").hasClass("hidden") && (showDiv("#overlay"), showDiv("#overlaydiv"));
    a = '<div style = "padding: 20px;">  <div style="text-align: center; padding-bottom:15px;"><a style= "border=0px;" href = "javascript:getImage(' + (c-1) + "," + d + "," + b + ')"> <img class="controlArrow" title = "Previous Image" src="http://www.padmapper.com/images/leftArrow.png"/></a> <b>(' + (c + 1) + "/" + d + ')</b> <a href = "javascript:getImage(' + (c + 1) + "," + d + "," + b +
    ')"> <img class="controlArrow" title = "Next Image" src="http://www.padmapper.com/images/rightArrow.png"/> </a></div> <div style = "text-align: center;"><img id = "enlargedImage" class = "enlargedImg" src="' + a + '"/></div></div>';
    jq("#overlaycontents").html(a)
}
function openDialog(a) {
    aboutDialogUnopened ? (jq("#dialog").dialog({
        height: 600,
        width: 800,
        modal: !0,
        overlay: {
            opacity: .5,
            background: "black"
        }
    }), aboutDialogUnopened=!1) : jq("#dialog").dialog("open");
    a = jq(a).html();
    jq("#dialog").html('<div style = "padding:20px; ">' + a + "</div>")
}
function showImageBlock(a, b) {
    jq.get("./getImageInfoBubble.php?listingId=" + a + "&imageNum=" + b, function(a) {
        jq("#infoBubbleImage").html(a)
    })
}
function getOuterLimits() {
    var a = getWindowLimits(), b = a.westLong - a.eastLong, c = a.northLat - a.southLat;
    a.northLat += 1 * c;
    a.southLat -= 1 * c;
    a.westLong += 1 * b;
    a.eastLong -= 1 * b;
    return a
}
function getWindowLimits() {
    var a = map.getBounds(), b = a.getSouthWest(), a = a.getNorthEast(), c = {};
    c.northLat = a.lat();
    c.eastLong = a.lng();
    c.southLat = b.lat();
    c.westLong = b.lng();
    return c
}
function transitOverlayEnabled() {
    return document.f4.transitOverlay.checked
}
function neighborhoodOverlayEnabled() {
    return 13 < map.getZoom() && document.f4.neighborhoodOverlay.checked
}
function walkscoreOverlayEnabled() {
    return document.f4.walkscoreOverlay.checked
}
function crimeOverlayEnabled() {
    return !1
}
function isImagesOnly() {
    return document.f1.imagesOnly.checked
}
function isPhoneReq() {
    return document.f1.phoneReq.checked
}
function areCatsAllowed() {
    return document.f1.catsAllowed.checked
}
function areDogsAllowed() {
    return document.f1.dogsAllowed.checked
}
function noFeeOnly() {
    return document.f1.noFee.checked
}
function nonSubletsShown() {
    return document.f10.nonsubs.checked
}
function subletsShown() {
    return document.f10.subs.checked
}
function roomsShown() {
    return document.f10.rooms.checked
}
function vacShown() {
    return document.f10.vac.checked
}
function clShown() {
    return document.f2.cl.checked
}
function aptsComShown() {
    return document.f2.apts.checked
}
function aptsrchShown() {
    return document.f2.aptsrch.checked
}
function rntComShown() {
    return document.f2.rnt.checked
}
function oodShown() {
    return document.f2.ood.checked
}
function rntsclShown() {
    return document.f2.rntscl.checked
}
function rltrShown() {
    return document.f2.rltr.checked
}
function airbnbShown() {
    return document.f2.airbnb.checked
}
function plShown() {
    return document.f2.pl.checked
}
function rhpShown() {
    return document.f2.rhp.checked
}
function afShown() {
    return document.f2.af.checked
}
function trackConv(a, b, c) {
    (new Image(1, 1)).src = "//www.googleadservices.com/pagead/conversion/" + a + "/?value=" + c + "&label=" + b + "&script=0"
}
function generateLink() {
    var a = "http://www.padmapper.com/" + makeGetVarsLink(), b = '<iframe width="900" height="700" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="' + a + '&ver=1"></iframe><br /><small><a href="' + a + '" style="color:#0000FF;text-align:left">View Larger Map</a>, Powered by PadMapper <a href="http://www.padmapper.com" style="color:#0000FF;text-align:left">Apartment Search</a></small>';
    jq("#directLink").val(a);
    jq("#embedOutput").val(b);
    toggleDiv("#linkEmbedDiv");
    showDiv("#overlay")
}
function linkToListing(a) {
    a = "http://www.padmapper.com/?showMarker=" + a + "&src=link";
    jq("#listingDirectLink").val(a);
    toggleDiv("#listingLinkDiv");
    showDiv("#overlay")
}
function sendLead(a) {
    var b = jq("#leadFormFirstName").val(), c = jq("#leadFormLastName").val(), d = jq("#leadFormPhone").val(), e = jq("#leadFormEmail").val(), f = jq("#leadFormComments").val(), b = "leadFirstName=" + URLEncode(b) + "&leadLastName=" + URLEncode(c) + "&leadPhoneNum=" + URLEncode(d) + "&leadEmailAddr=" + URLEncode(e) + "&leadComments=" + URLEncode(f) + "&leadAptId=" + URLEncode(a) + "&adsrc=" + URLEncode(adsrc);
    jq.post("/postLead.php", b, function(b) {
        var c = eval("(" + b + ")");
        if (null != c.returnCode && "SUCCESS" == c.returnCode) {
            b = c.conversionId;
            var d = c.conversionLabel, c = c.conversionValue;
            jq("#contactPropForm").html("<b>Inquiry sent successfully!</b><br/><br/>You should hear back soon.");
            "" != b && "" != d && "" != c && trackConv(b, d, c);
            loggedIn && addSomethingToNote(a, "Email Sent \n");
            isFavorite(a) || addAsFavorite(a)
        }
    })
}
function makeGetVars(a, b) {
    return makeGetVarsBase(a, b, "")
}
function makeGetVarsLink() {
    var a = getWindowLimits();
    return makeGetVarsBase(a, 0, "link")
}
function makeGetVarsBase(a, b, c) {
    var d = jq("#rent_slider").slider("values", 0), e = jq("#rent_slider").slider("values", 1), f = jq("#ppbr_slider").slider("values", 0), g = jq("#ba_slider").slider("values", 0), h = jq("#br_slider").slider("values", 0), k = jq("#br_slider").slider("values", 1), l = isImagesOnly(), m = isPhoneReq(), r = areCatsAllowed(), s = areDogsAllowed(), n = subletsShown(), p = roomsShown(), w = vacShown(), x = nonSubletsShown(), u = document.f3.favsOnly.checked, v = document.f3.showHidden.checked, y = document.f1.onlyHQ.checked, z = noFeeOnly(),
    q = 0, A = jq("#age_slider").slider("values", 0), B = URLEncode(searchTerms), C = map.getZoom();
    if (null == g || isNaN(g) || 1 > g || 10 < g)
        g = 1;
    if (null == h || isNaN(h) || 0 > h || 10 < h)
        h = 0;
    if (null == k || isNaN(k) || 0 > k || 10 < k)
        k = 10;
    if (null == f || isNaN(f) || 1E4 < f || 0 > f)
        f = 1E4;
    if (null == e || isNaN(e) || 0 > e || 1E4 < e)
        e = 1E4;
    if (null == d || isNaN(d) || 0 > d || 1E4 < d)
        d = 0;
    if (null == q || isNaN(q) || 0 > q || 60 < q)
        q = 60;
    var t = "", t = "link" == c ? "?lat=" + (a.northLat + a.southLat) / 2 + "&lng=" + (a.eastLong + a.westLong) / 2: "?eastLong=" + a.eastLong + "&northLat=" + a.northLat + "&westLong=" + a.westLong +
    "&southLat=" + a.southLat + "&cities=" + showCityClusters + "&showPOI=" + showPOI + "&limit=" + b, t = t + "&minRent=" + d + "&maxRent=" + e + "&searchTerms=" + B + "&maxPricePerBedroom=" + f + "&minBR=" + h + "&maxBR=" + k + "&minBA=" + g + "&maxAge=" + A + "&imagesOnly=" + l + "&phoneReq=" + m + "&cats=" + r + "&dogs=" + s + "&noFee=" + z + "&showSubs=" + n + "&showNonSubs=" + x + "&showRooms=" + p + "&showVac=" + w + "&userId=" + userId + "&cl=" + clShown() + "&pl=" + plShown() + "&aptsrch=" + aptsrchShown() + "&rnt=" + rntComShown() + "&airbnb=" + airbnbShown() + "&ood=" + oodShown() + "&af=" + afShown() + "&rltr=" +
    rltrShown() + "&zoom=" + C + "&favsOnly=" + u + "&onlyHQ=" + y + "&showHidden=" + v + "&am=" + am;
    return t + "&workplaceLat=0&workplaceLong=0&maxTime=" + q
}
function clearOverlays() {
    closeInfoWindow();
    for (removeAllNeighborhoodPolygons(); overlays[0];)
        overlays.pop().setMap(null);
    onscreenMarkers = {};
    markerArray = [];
    activePoints = [];
    inactivePoints = []
}
function reloadAll() {
    showDiv("#mapUpdatingMessage");
    clearOverlays();
    redrawOverlays();
    updateBackend()
}
function updateBackend() {
    var a = getOuterLimits(), a = makeGetVars(a, 9 * maxMarkers);
    null !== mostRecentUpdateBackendAjaxRequest && mostRecentUpdateBackendAjaxRequest.abort();
    mostRecentUpdateBackendAjaxRequest = jq.get("/reloadMarkersJSON.php" + a, function(a) {
        mostRecentUpdateBackendAjaxRequest = null;
        tempPoints = eval(a);
        a = 0;
        for (var c = [], d = 0; d < tempPoints.length; d++) {
            for (var e = tempPoints[d].id, f = a < activePoints.length ? activePoints[a].id : -1; a < activePoints.length && e < f;)
                a++;
            if (a >= activePoints.length || e > f)
                null != onscreenMarkers[e] &&
                0 != onscreenMarkers[e] || c.push(tempPoints[d])
        }
        inactivePoints = c;
        trimAndPromoteInactivePoints();
        hideDiv("#mapUpdatingMessage");
        showMarkerPoint && (goToMarker(showMarkerPoint.id), showMarkerPoint = null)
    })
}
function setSearchTermsNoReload() {
    searchTerms = jq("#listingSearch").val()
}
function setSearchTerms() {
    setSearchTermsNoReload();
    filterChanged();
    reloadAll()
}
function clearSearchTerms() {
    searchTerms = "";
    jq("#listingSearch").val(defaultSearchText);
    reloadAll()
}
function handleEnter(a) {
    if ("#commuteAddress" == a || "#driveCommuteAddress" == a || "#goToAddress" == a) {
        var b;
        b = "#commuteAddress" == a ? commuteCallback : "#driveCommuteAddress" == a ? driveCommuteCallback : gotoCallback;
        var c = jq(a).val();
        geocodeAdd(c, a, b)
    } else 
        "#favlistEmailAddress" == a ? getEmailFromInputBoxAndSend() : "#collabInviteEmailAddress" == a ? getEmailFromInputBoxAndSendCollabInvite() : "#alertEmailAddress" == a ? getEmailFromInputBoxAndSubscribeToAlerts() : "#listingSearch" == a ? setSearchTerms() : "#placesAddress" == a ? addPlacePushed() :
        alert("No Recognizable input box...")
}
function getEmailFromInputBoxAndSendCollabInvite() {
    var a = jq("#collabInviteEmailAddress").val();
    sendCollabInvite(a)
}
function sendCollabInvite(a) {
    toggleDiv("#collabEmailSpinnerContainer");
    a = "?emailAddress=" + URLEncode(a);
    jq.get("/sendCollabInvite.php" + a, function(a) {
        "1" == a ? (toggleDiv("#collabEmailSpinnerContainer"), showDiv("#collabEmailCompletedMessage"), setTimeout("hideDiv('#collabEmailCompletedMessage');", 5E3)) : alert("Failed")
    })
}
function getEmailFromInputBoxAndSend() {
    var a = jq("#favlistEmailAddress").val();
    saveAndEmailFavs(a, "default")
}
function getEmailFromInputBoxAndSubscribeToAlerts() {
    var a = jq("#alertEmailAddress").val(), b = jq("input[name='emailFreq']:checked").val(), c = jq("input[name='contactMe']:checked").val();
    subscribeToAlerts(a, b, c)
}
function showAllApts(a, b, c) {
    document.f10.nonsubs.checked=!0;
    document.f10.subs.checked=!0;
    goToLatLong(a, b, c)
}
function goToLatLong(a, b, c) {
    a = new google.maps.LatLng(a, b);
    map.setCenter(a);
    map.setZoom(c)
}
function checkAddress(a) {
    var b;
    b = "#commuteAddress" == a ? commuteCallback : "#driveCommuteAddress" == a ? driveCommuteCallback : gotoCallback;
    var c = jq(a).val();
    geocodeAdd(c, a, b)
}
function goToMarker(a) {
    for (var b, c=!1, d = null, e = 0; e < activePoints.length; e++) {
        var f = activePoints[e];
        1 != f.type && 2 != f.type || f.id != a || (c=!0, b = activePoints[e], d = markerArray[e])
    }
    if (!c)
        for (e = 0; e < inactivePoints.length; e++)
            f = inactivePoints[e], 1 == f.type && f.id == a && (c=!0, b = inactivePoints[e]);
    c ? goToAndSelectMarker(b, d) : loadApartmentMarkerPoint(a)
}
function goToAndSelectMarker(a, b) {
    if (null == b) {
        var c = new google.maps.LatLng(a.lat, a.lng), d = map.getZoom();
        if (14 > d) {
            d = 14;
            showMarkerPoint = a;
            map.setCenter(c);
            map.setZoom(d);
            return 
        }
        map.setCenter(c);
        map.setZoom(d);
        b = createMarker(c, a.id, a.type, map);
        addMarkerToMap(b);
        markerArray.push(b);
        activePoints[activePoints.length] = a;
        for (var c = [], e = d = 0; e < inactivePoints.length; e++)
            if (inactivePoints[e].id != a.id || inactivePoints[e].type != a.type)
                c[d] = inactivePoints[e], d++;
        inactivePoints = c
    }
    google.maps.event.trigger(b, "click");
    showMarkerPoint = null
}
function commuteCallback(a, b) {
    var c = a.address;
    a ? (map.setCenter(a), map.setZoom(13), makeBackgroundGreen("#commuteAddress"), workplaceLat = a.lat(), workplaceLong = a.lng(), createAndAddWorkMarker(a, map, c), showDiv("#commuteSliderDiv")) : (makeBackgroundRed("#commuteAddress"), workplaceLong = workplaceLat = 0, hideDiv("#commuteSliderDiv"), removeWorkMarker(map))
}
function gotoCallback(a, b) {
    a ? (makeBackgroundGreen("#goToAddress"), map.setCenter(a), map.fitBounds(b)) : makeBackgroundRed("#goToAddress")
}
function removeCommuteFilter() {
    makeBackgroundWhite("#commuteAddress");
    hideDiv("#commuteSliderDiv");
    workplaceLong = workplaceLat = 0;
    removeWorkMarker(map);
    reloadAll()
}
function isFavorite(a) {
    return null != favMarkers[a]
}
function isHidden(a) {
    return null != hiddenMarkers[a]
}
function isFav(a) {
    return null != favMarkers[a.value]
}
function isSeenMarker(a) {
    return null != seenMarkers[a.value]
}
function isSeen(a) {
    return null != seenMarkers[a]
}
function removeFavorite(a) {
    hideDiv("#savedMessage");
    showDiv("#saveLinkDiv");
    jq("#fav_" + a).remove();
    favMarkers[a] = null;
    for (var b = 0; b < markerArray.length; b++)
        markerArray[b].value == a && replacePointWithSeenOrFavMarker(markerArray[b], !0);
    unmarkSidelistItemAsFavorite(a);
    jq.get("/removeFavorite.php?apartmentID=" + a)
}
function arrowToggleDiv(a, b) {
    var c;
    c = jq(a).hasClass("hidden") ? '<img class="toggleArrow" title = "Minimize" src = "http://www.padmapper.com/images/minimize2.png"/>' : '<img class="toggleArrow" title = "Unminimize" src = "http://www.padmapper.com/images/maximize2.png"/>';
    toggleDiv(a);
    jq(b).html(c)
}
function toggleDiv(a, b) {
    jq(a).hasClass("hidden") ? (showDiv(a), "undefined" !== typeof b && jq(b).text("Hide")) : (hideDiv(a), "undefined" !== typeof b && jq(b).text("Show"));
    storeScreenConfig()
}
function hideDiv(a) {
    jq(a).removeClass("shown");
    jq(a).addClass("hidden")
}
function showDiv(a) {
    jq(a).removeClass("hidden")
}
function showDivHorizSizeChange(a, b) {
    if (jq(a).hasClass("hidden")) {
        var c = jq(b).width(), d = jq(a).outerWidth() + 5;
        showDiv(a);
        c += d;
        jq(b).width(c)
    }
}
function hideDivHorizSizeChange(a, b) {
    if (!jq(a).hasClass("hidden")) {
        var c = jq(b).width(), d = jq(a).outerWidth() + 5;
        hideDiv(a);
        c -= d;
        jq(b).width(c)
    }
}
function showOverlay(a, b) {
    showDiv("#overlay");
    showDiv(a);
    null != b && (location.href = "#" + b)
}
function closeOverlay(a, b) {
    null == b && (b=!0);
    hideDiv("#overlay");
    hideDiv(a);
    b && (location.href = "#")
}
function sendQuickMail(a) {
    lastQMContents = jq("#quickMailContents").html();
    quickMailBody = jq("#quickMailBody").val();
    quickMailFrom = jq("#quickMailFrom").val();
    quickMailPhone = jq("#quickMailPhone").val();
    quickMailEmail = jq("#quickMailEmail").val();
    includeProfile = document.quickMailForm.includeProfileCheckbox && document.quickMailForm.includeProfileCheckbox.checked ? "true" : "false";
    jq("#quickMailContents").html('<img src="/images/throbber.gif"/>');
    var b = "quickMailEmail=" + URLEncode(quickMailEmail) + "&quickMailFrom=" +
    URLEncode(quickMailFrom) + "&quickMailPhone=" + URLEncode(quickMailPhone) + "&quickMailBody=" + URLEncode(quickMailBody) + "&includeProfile=" + includeProfile + "&id=" + a;
    jq.post("/quickMailSend.php", b, function(b) {
        jq("#quickMailContents").html(b);
        isFavorite(a) || addAsFavorite(a);
        loggedIn && addSomethingToNote(a, "Email Sent \n")
    });
    trck("Message", "Sent", a)
}
function showLastQM() {
    jq("#quickMailContents").html(lastQMContents);
    jq("#quickMailBody").val(quickMailBody);
    jq("#quickMailFrom").val(quickMailFrom);
    jq("#quickMailPhone").val(quickMailPhone);
    jq("#quickMailEmail").val(quickMailEmail);
    jq("#includeProfileCheckbox").attr("checked", isTrue(includeProfile));
    setupInput("quickMailEmail", "Your Email Address")
}
function editQMTemplate() {
    showDiv("#overlay");
    showDiv("#quickMailTemplateScreen");
    loadQuickMailPage("/quickMailEmailTemplatePage.php")
}
function showEditQM() {
    showDiv("#quickMail");
    showDiv("#overlay");
    editQMTemplate()
}
function loadQuickMailPage(a) {
    jq("#quickMailTemplateContents").html('<img src="/images/throbber.gif"/>');
    jq.get(a, function(a) {
        jq("#quickMailTemplateContents").html(a)
    })
}
function saveQMTemplate() {
    var a = jq("#quickMailTemplate").val(), a = "quickMailTemplate=" + URLEncode(a);
    jq.post("/quickMailTemplateSave.php", a, function(a) {
        jq("#quickMailTemplateContents").html(a)
    });
    trck("Message", "TemplateChanged", userId)
}
function checkIEVersion() {
    var a = getInternetExplorerVersion();
    -1 < a && (isIE=!0);
    IEVersion = a
}
function getInternetExplorerVersion() {
    var a =- 1;
    "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (a = parseFloat(RegExp.$1));
    return a
};

