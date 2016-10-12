

var nullFunc = function() {
	$.ajax('index.html', {
	  success: function(response) {
	    $('.hello-world').html(response);
	  }
	});

	// Then:

	// You can use jQuery to parse XML:

	var result1 = $(xmlData1)
	var result2 = $(xmlData2)
	// Then you can use jQuery to search/compare within your XML:

	if (result1.find('RNA[A=100]').attr ('x') == result2.find('RNA[B=100]').attr('x'))
	{
	   //do stuff
	}

}



var start = function() {
	
}