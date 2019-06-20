/*! inntopia-search-widget - v1.0.0 - 2019-06-20
* https://github.com/EarthlingInteractive/inntopia-search-widget
* Requires: Bootstrap 3 and Jquery 1.9.1+ */


function injectScript(url, onLoad, onError) {
	if (document.querySelector('script[src="' + url + '"]')) {
		if (onLoad) {
			onLoad();
		}
		return;
	}
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src= url;
	if (onLoad) {
		script.onload = onLoad;
	}
	if (onError) {
		script.onerror = onError;
	}
	head.appendChild(script);
}

function injectLink(url, onLoad, onError) {
	if (document.querySelector('link[href="' + url + '"]')) {
		if (onLoad) {
			onLoad();
		}
		return;
	}
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = url;
	if (onLoad) {
		link.onload = onLoad;
	}
	if (onError) {
		link.onerror = onError;
	}
	head.appendChild(link);
}


$(document).ready(function () {
	if (typeof inntopiaVariables === 'undefined') {
		console.error('searchWidget script requires inntopiaVariables to be set!');
		return;
	}

	injectScript('//code.jquery.com/ui/1.10.3/jquery-ui.js', function() {
		//wait to load date pickers until jquery ui script is loaded
		initDatePickers();
	});

	var theme = (inntopiaVariables.theme) ? inntopiaVariables.theme : 'smoothness';
	injectLink('//code.jquery.com/ui/1.10.3/themes/' + theme + '/jquery-ui.css');

	var widgetHTML;

	var liStyle;
	if (inntopiaVariables.widgetLayout === 'vertical') {
		liStyle = 'unstyled';
	} else {
		liStyle = 'form-inline';
	}

	if (inntopiaVariables.widgetType === 1 || inntopiaVariables.widgetType === 3 || inntopiaVariables.widgetType === 4) {
		widgetHTML = '<form class="' + liStyle + '"><div class="form-group" style="margin-right:5px;"><label class="control-label" for="from">' + inntopiaVariables.arrivalDateLabel + '</label><br/><input type="text" id="arrivalDate" name="arrivalDate" class="form-control" style="width:100px;" autocomplete="off" /></div><div class="form-group" style="margin-right:5px;"><label class="control-label" for="to">' + inntopiaVariables.departureDateLabel + '</label><br/><input type="text" id="departureDate" name="departureDate" style="width:100px;" class="form-control" autocomplete="off"/></div><div class="form-group" style="margin-right:5px;"><label class="control-label" for="to">' + inntopiaVariables.adultLabel + '</label><br/><input type="number" id="adultCount" name="adultCount" class="form-control" style="width:60px;" min="0"  value="2"/></div><div class="form-group" style="margin-right:5px;"><label class="control-label" for="to">' + inntopiaVariables.childLabel + '</label><br/><input type="number" id="childCount" name="childCount" class="form-control " style="width:60px;" min="0"  value="0"/></div><div class="form-group" ><label class="control-label" for="submit">&nbsp;</label><br/><button class="btn btn-info" id="checkAvailability">' + inntopiaVariables.buttonText + '</button></div><span id="formError" class="help-block"></span></form>';
	}

	else if (inntopiaVariables.widgetType === 2) {
		widgetHTML = '<form class="' + liStyle + '"><div class="form-group" style="margin-right:5px;"><label class="control-label" for="from">' + inntopiaVariables.startDateLabel + '</label><br/><input type="text" id="startDate" name="startDate" class="form-control" style="width:100px;" autocomplete="off" /></div><div class="form-group" style="margin-right:5px;"><label class="control-label" for="submit"></label><br/><button  class="btn btn-info" id="searchDates">' + inntopiaVariables.buttonText + '</button></div><span id="formError" class="help-block"></span></form>';
	}


	$("#inntopiaSearchWidget").html(widgetHTML);

	$("#checkAvailability").click(function (e) {
		e.preventDefault();
		$("#formError").html('');
		var thisArrivalDate = $("#arrivalDate").val();
		var thisDepartureDate = $("#departureDate").val();
		var thisAdultCount = $("#adultCount").val();
		var thisChildCount = $("#childCount").val();
		var thisChildAgeArray = null;

		var hasError = false;
		if (thisArrivalDate == '') {
			$("#formError").html('Please Enter Arrival Date');
			hasError = true;
		}
		if (thisDepartureDate == '') {
			$("#formError").html('Please Enter Departure Date');
			hasError = true;
		}
		if (isNaN(thisAdultCount)) {
			$("#formError").html('Please Enter Number of Adults');
			hasError = true;
		}
		if (isNaN(thisChildCount)) {
			$("#formError").html('Please enter Number of Children');
			hasError = true;
		}
		if ((thisAdultCount === '0') && (thisAdultCount === '0')) {
			$("#formError").html('Please enter the Number of Guests');
			hasError = true;

		}
		if (thisAdultCount === '') {
			$("#formError").html('Please Enter Number of Adults');
			hasError = true;
		}


		var today = new Date();
		var arrivalDateDT = new Date(thisArrivalDate);

		var departureDateDT = new Date(thisDepartureDate);


		if (arrivalDateDT < today) {
			$("#formError").html('Arrival Date must be today or later');
			hasError = true;
		}

		if (arrivalDateDT >= departureDateDT) {
			$("#formError").html('Departure Date must be after Arrival Date');
			hasError = true;
		}

		if (hasError === false) {
			// setDefaultsCookie(thisArrivalDate, thisDepartureDate, thisAdultCount, thisChildCount, thisChildAgeArray, null);
			// $.blockUI({ message: $("#waitMessage") });
			var inntopiaSearchURL;
			if (inntopiaVariables.widgetType === 1) {
				inntopiaSearchURL = 'http://' + inntopiaVariables.domain + '/ecomm/shop/lodging/' + inntopiaVariables.salesId + '/' + inntopiaVariables.language + '/?arrivalDate=' + thisArrivalDate + '&departureDate=' + thisDepartureDate + '&adultcount=' + thisAdultCount + '&childCount=' + thisChildCount;
			}
			else if (inntopiaVariables.widgetType === 3) {
				inntopiaSearchURL = 'http://' + inntopiaVariables.domain + '/ecomm/listings/supplierdetail/' + inntopiaVariables.salesId + '/' + inntopiaVariables.language + '/?supplierid=' + inntopiaVariables.supplierId + '&arrivalDate=' + thisArrivalDate + '&departureDate=' + thisDepartureDate + '&adultcount=' + thisAdultCount + '&childcount=' + thisChildCount;
			}
			else if (inntopiaVariables.widgetType === 4) {
				inntopiaSearchURL = 'http://' + inntopiaVariables.domain + '/products/lodging?arrivalDate=' + thisArrivalDate + '&departureDate=' + thisDepartureDate + '&adultcount=' + thisAdultCount + '&childcount=' + thisChildCount;
			}

			window.location = inntopiaSearchURL;

		}
	});

	$("#searchDates").click(function () {

		$("#formError").html('');
		var thisStartDate = $("#startDate").val();


		var hasError = false;
		if (thisStartDate == '') {
			$("#formError").html('Please Enter Start Date');
			hasError = true;
		}



		var today = new Date();
		var startDateDT = new Date(thisStartDate);

		if (startDateDT < today) {
			$("#formError").html('Start Date must be today or later');
			hasError = true;
		}

		if (hasError === false) {
			// setDefaultsCookie(thisArrivalDate, thisDepartureDate, thisAdultCount, thisChildCount, thisChildAgeArray, null);
			// $.blockUI({ message: $("#waitMessage") });

			window.location = 'http://' + inntopiaVariables.domain + '/ecomm/shop/activities/' + inntopiaVariables.salesId + '/' + inntopiaVariables.language + '/?startDate=' + thisStartDate + '&productcategoryid=' + inntopiaVariables.productCategoryId + '&productsupercategoryid=' + inntopiaVariables.productSuperCategoryId;

		}
	});

	function initDatePickers() {
		var arrivalDateElement = $("#arrivalDate");
		var departureDateElement = $("#departureDate");
		var startDateElement = $("#startDate");

		arrivalDateElement.datepicker({
			defaultDate: "+1w",
			minDate: 0,
			changeMonth: true,
			numberOfMonths: 1,
			regional: inntopiaVariables.language,
			onClose: function (selectedDate) {
				departureDateElement.datepicker("option", "minDate", selectedDate);
			}
		});

		departureDateElement.datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			regional: inntopiaVariables.language,
			minDate: 0,
			onClose: function (selectedDate) {
				arrivalDateElement.datepicker("option", "maxDate", selectedDate);
			}
		});


		startDateElement.datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			regional: inntopiaVariables.language,
			minDate: 0

		});
	}
});
