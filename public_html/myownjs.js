/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var template ='';

$(document).ready(function() {
	
	Handlebars.registerHelper('dateDisp', function(date){
		var thedate = new Date(date);
		
		//don't know why date is displayed as May when it's June now, hence the +1
		var toReturn = "" + thedate.getDate() +"/"+ (thedate.getMonth()+1) +"/"+ thedate.getFullYear();
		return toReturn;
	});
	
	Handlebars.registerHelper('amountFixed', function(amt){
		var amount = Number(amt);
		return amount.toFixed(2);
	});
	Handlebars.registerHelper('indexPlus', function(ind){
		return ind + 1;
	});
	Handlebars.registerHelper('calTotal', function(expenses){
		var total = 0;
		for (x in expenses){
			total += Number(expenses[x].amount);
		}
		return total.toFixed(2);
	});
	
	compileTemplate();
	load();
	loadChart();
	
	$("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
});


function newExpense(){
	
	var expenseName = $("#thefield").val();
	var amt = $("#theamount").val();

	var data = JSON.parse(localStorage.getItem('tracker'));
	
	var obj = {expense:expenseName,amount:amt,date:new Date()};
	data.push(obj);
	var string = JSON.stringify(data);
	localStorage.setItem('tracker', string);
	clearValues();
	load();
}

function clearValues(){
	setTimeout(function(){
		$("#thefield").val("");
		$("#theamount").val("");
	}, 800);
}

function compileTemplate(){
	var thehtml = $('#records').html();
	template = Handlebars.compile(thehtml);
}

function load(){
	var data = JSON.parse(localStorage.getItem('tracker'));
	if (data === null){
		var data = [];
		localStorage.setItem('tracker', JSON.stringify(data));
	} else {
		var temp = template(data);
		$("#articles").html(temp);
	}
}
		
function deleteRow(index){
	var data = JSON.parse(localStorage.getItem('tracker'));	
	data.splice(index, 1);
	
	var string = JSON.stringify(data);
	localStorage.setItem('tracker', string);
	
	load();
}

function loadChart(){
	
	var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
	
	// Get context with jQuery - using jQuery's .get() method.
	var ctx = $("#charts").get(0).getContext("2d");
	// This will get the first returned node in the jQuery collection.
	var myNewChart = new Chart(ctx).Bar(data,Chart.defaults.Bar);
	
	
	

	
	
}
