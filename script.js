var user_input = [];
var rawData = [];
var success_arr = [];
var success = {};
var user_pwr_ball;
var small_winnings;
var lucky_dip = false;
var month;
var year;



var start = function() {
	$.ajax({url: "data.csv", success: function(result){
        rawData = result;
        // console.log(rawData[1] + ", " + rawData[2] + ", " + rawData[3]);
    }});

    $("input").keyup(function() {input_validator();})
}

var submit = function() {
	var user_display = "";
	for (n=0; n<7; n++) {
		var input_temp = $("input[name=" + "num" + n + "]").val();
		if (input_temp[0] == "0" && input_temp[1]) { //stops values being 01, or 02 etc...
			input_temp = input_temp[1];
		}
		user_input.push(input_temp); //takes temp values and pushes onto array
		user_display += input_temp + " "; //shows values in text on board

	}

	$(".num_display").html(user_display) 
	$(".game_cont").removeClass("step1"); // switches to loading page
	$(".game_cont").addClass("step2");

	user_pwr_ball = user_input[6];
	user_input.pop();
	compare_data_threeBalls();
}

var stepThree = function(pass_fail) {
	if (pass_fail == "a") {
		$(".game_cont").removeClass("step2");
		$(".game_cont").addClass("step3a");
		console.log("a");
	} else if (pass_fail == "b") {
		$(".game_cont").removeClass("step2");
		$(".game_cont").addClass("step3b");
	}

	
}

var compare_data = function() {
	var com_count = 7;

	for (n=0; n<(rawData.length); n++) {
		if (com_count == 7) {
			com_count = 0;
			var matches = 0;
			var z = 13; // number of letters into line that numbers begin
			for (y=0;y<7;y++) { //y is the userinput number	

				if (user_input[y] == rawData[(n+z)] + "" + rawData[(n+z+1)] || user_input[y][0] == rawData[(n+z)] && user_input[y][1] == undefined && rawData[(n+z+1)] == ",") {
					matches++;

					if (rawData[(n+z+1)] == ",") {  //to account for shorter rawData numbers
						z+=2;
					} else {
						z+=3;
					}
				}
				if (matches == 6) {
					success = {};
					success.date = rawData.substr(n+2, 10);
					success.cash = (rawData.substr(n+z+2, 10)).replace(/,/g, '');
					// success.cash.splice(-3,0, ",");
					console.log(success.cash);
					console.log(success.date);
					success_arr.push(success);
				}
			}
		}
		if (rawData[n] == ",") { // looks for 7 commas at the end of each line, to locate beginning of next one
			com_count++;
		} else {
			com_count = 0;
		}
	}
	setTimeout(function(){ endgame(); }, 3000);
}

var compare_data_threeBalls = function() {
	var com_count = 7;

	for (n=0; n<rawData.length/20; n++) {
		if (com_count == 7) {
			com_count = 0;
			var matches = 0;
			var powerball = false;
			var z = 13; // number of letters into rawData line that lottery numbers begin
			var line = [];
			
			var lot_num = "";
			for (p=0;p<18;p++) {
				if ($.isNumeric(rawData[(n+z)]) == true) {
					lot_num += "" + (rawData[(n+z)]); //stacks up string
					z++;				
				} else {
					line.push(lot_num); //stacks strings into array for ease of comparison to user input
					z++;
					lot_num = "";
				}
			}

			var z = 13; // number of letters into rawData line that lottery numbers begin
			// console.log(user_input[6] + ", " + user_pwr_ball);
			if (user_input[6] == user_pwr_ball) {
				matches++;
				powerball = true;
				console.log("powerball");
			}

			for (y=0;y<6;y++) { // y is the userinput number	

				if (user_input[y] == line[y]) {
					matches++;

					if (rawData[(n+z+1)] == ",") {  //to account for shorter rawData numbers
						z+=2;
					} else {
						z+=3;
					}
				}
				// console.log(matches);
				if (matches == 6) {
					success = {};
					success.date = rawData.substr(n+2, 10);
					success.cash = (rawData.substr(n+z+2, 10)).replace(/,/g, '');
					// success.cash.splice(-3,0, ",");
					console.log(success.cash);
					console.log(success.date);
					
					// console.log(year);
					// console.log(month);
					// console.log((success.date)[0,1]);
					// console.log((success.date).indexOf("10/"));
					success_arr.push(success);
				
				} else if (matches >= 3 && y==5 && powerball == false) {
					console.log("threeballs");
					console.log(success.date);
					success = {};
					success.date = rawData.substr(n+2, 10);
					year = (success.date).slice(-4);
					month = (success.date).slice(-7, -5);
					if (year == 2015) {
						// console.log((success.date).indexOf("10/"));
						if (month > 10) { //october 2015
							small_winnings = 25;
							lucky_dip = true;
						} else {
							small_winnings = 25;
						}
					} else if (year == 2014 || year == 2013 && month > 10) {
						small_winnings = 25;
					} else if (year == 2013 && month < 10) {
						small_winnings = 10;
					} else if (year < 2013) {
						small_winnings = 10;
					}
				}
			}
		}
		if (rawData[n] == ",") { // looks for 7 commas at the end of each line, to locate beginning of next one
			com_count++;
		} else {
			com_count = 0;
		}
	}
	setTimeout(function(){ endgame(); }, 3000);
}

var endgame = function() {
	var total = 0;
	if (success_arr.length > 0) {
		for (i=0; i<success_arr.length; i++) {
			$(".win_RHS").append("<div class='win_amt win'>£" + success_arr[i].cash + "</div>");
			$(".win_LHS").append("<div class='win_date win'>"+ success_arr[i].date +" </div>");
			total += parseInt(success_arr[i].cash);
		}
		$(".winnings").html("£" + total);
		stepThree("a");
	} else {
		total += small_winnings;
		$(".winnings").html("£" + total);
		//TASK: show fail screen content
		stepThree("b");
	}
}

var embed = function() {
	alert("not set up in prototype");
}
var share = function() {
	alert("not set up in prototype");
}

var input_validator = function() {
	// TASK: add alerts to all of these so user knows what they did wrong
	var focus = document.activeElement;
	var focus_val = $(document.activeElement).val();
	var filled_inputs = 0;

	if ($.isNumeric(focus_val) == false || focus_val == "00" || focus_val[0] == "0") { //valid number
		$(focus).val("");
		console.log("whoops");
	}

	if (focus_val.length > 2 ) {
		$(focus).val(focus_val.slice(0,-1));
	}

	for (x=0; x<7; x++) {
		if ($("[name=num" + x + "]").is(":focus")) { // makes sure user does not compare activeElement to itself
		} else {
			if (focus_val == $("[name=num" + x + "]").val()) {  // checking for duplicate numbers
				$(focus).val("");
			}
		}
		if ($("[name=num" + x + "]").val()) {
			filled_inputs++;
			if (filled_inputs == 7) { // are all inputs filled?
				$(".submit_btn").attr("onclick", "submit()").css({
					"background-color": "rgba(0,0,0,0.7)",
					"color": "white",
					"cursor": "pointer"
				});
				filled_inputs = 0;
			} else {
				$(".submit_btn").attr("onclick", "").css({
					"background-color": "rgba(70,70,70,0.7)",
					"color": "rgb(200,200,200)",
					"cursor": "default"
				});
			}
		}
	}
}


	// 11th digit is first number
	// 1. check first number against first number on input.
	// 1a. if no match, keep going until 7 commas in a row. Then reset horizontal counter. Return to step one
	// 1b. if match, move ahead to number after single comma
	// 2. compare new number to corresponding number on user input. If no, return to step 1a.
	// 3. When appropriate number of successes (7) take next value (check length over 3, and without '/' characters) and save as success.cash
	// 4. Save values 0-10 of success lines as 'success.date'

