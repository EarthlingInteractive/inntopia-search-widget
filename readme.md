# inntopia search widget

Refactored inntopia search widget to use Bootstrap 3 and inject it's own jquery ui dependencies into the header.

Blatantly Stolen from: https://aeeb40960f2325f91cfc-640799dcbea6c8f76886d4f85a8094f8.ssl.cf1.rackcdn.com/responsive-commerce-widget.html

Enjoy!

## Usage

Requires Bootstrap 3 and Jquery to be loaded in the page already.

Add the following to your html body:

```html
<!-- Required: Place above #inntopiaSearchWidget div -->
<script>
	//SET YOUR PREFERENCES HERE
	var inntopiaVariables = {
		salesId: 961991, // Replace '961991' with your salesId
		widgetType: 4, // Select one of the following: 1=lodging search,  2=activity search, 3=hotel/location lodging search, 4= product lodging search
		productSuperCategoryId: null, // Required for widgetType: 2. Refer to http://www.inntopia.com/inntopia/templates/reports/productcategories_RAW.xml
		widgetLayout: 'horizontal', // Select one of the following: 'horizontal' or 'vertical'
		supplierId: 000000, // Required for widgetType: 3
		productCategoryId: 117, // Optional for widgetType: 2. to http://www.inntopia.com/inntopia/templates/reports/productcategories_RAW.xml
		startDateLabel: 'Starting', // For activity search labels
		arrivalDateLabel: 'Arrival', // For lodging search labels
		departureDateLabel: 'Departure', // For lodging search labels
		adultLabel: 'Adults', // For lodging search labels
		childLabel: 'Children', // For lodging search labels
		buttonText: 'Check Availability', // Button text for all widget types
		domain: 'superiornational.lutsen.com', // Update with your custom domain, if available
		language: 'en-US', // Only en-US currently supported for this widget
		theme: 'smoothness' //jquery ui theme to use
	};
</script>
<script src="searchwidget.js" type="text/javascript"></script>
```

And

```html
<!-- Required: Place this where you want the widget to be located -->
<div id="inntopiaSearchWidget"></div>
```

Other Features added:

| Option   | Description |
|----------|:-------------:|
| widgetType | Added widgetType 4, which searches at `/products/lodging` |
| theme | Can now specify jquery ui theme, defaults to smoothness. See http://code.jquery.com/ui/ for options |

## Development

The index.html file contains a demo. Spin up a local web server and hack away.
