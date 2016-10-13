var user_input = [];
var rawData;

var nullFunc = function() {
	
	// get data from input fields: 

	//Get
	var foo = $(".element-classname").val();
	foo.push($(".element-classname").val());
	// but you'll need to add them all together, in the same format as CSV

	//Set
	// $('#txt_name').val('bla');



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
	// TASK: Put in a checker for unique numbers (onkeyup) in inputs
	$.ajax({url: "data.csv", success: function(result){
        var rawData = result;
        console.log(rawData[1] + rawData[2] + rawData[3]);
    }});
}

var submit = function() {
//TASK: add an input checker
	var user_display = "";
	
	for (n=0; n<6; n++) {
		var input_temp = $("input[name=" + "num" + n + "]").val(); 
		
		// console.log(user_display);
		console.log(input_temp);
		if (input_temp[0] == "0" && input_temp[1]) { //stops values being 01, or 02 etc...
			input_temp = input_temp[1];
			// TASK: check number isn't "00" either
		}

		// console.log(input_temp);
		user_input.push(input_temp); //takes temp values and pushes onto array
		user_display += input_temp + " "; //shows values in text on board

	}

	$(".num_display").html(user_display) 
	console.log(user_input);

	
	$(".game_cont").removeClass("step1"); // switches to loading page
	$(".game_cont").addClass("step2");

	// stepThree("a"); //placeholder - changes to 'you would have won!' page
	filter_data();
}

var stepThree = function(pass_fail) {
	if (pass_fail == "a") {
		$(".game_cont").removeClass("step1");
		// $(".game_cont").removeClass("step2");
		$(".game_cont").addClass("step3a");
		console.log("a");
	}

	
}

var filter_data = function() {
	compare_data();
}

var compare_data = function() {

}