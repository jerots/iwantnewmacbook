/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var template ='';

$(document).ready(function() {
	
	Handlebars.registerHelper('dateDisp', function(date){
		var thedate = new Date(date);
		var locale = 'en-us';
		var month = thedate.toLocaleString(locale, { month: "long" });
		var toReturn = "" + thedate.getDate() +" "+ month +" "+ thedate.getFullYear();
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
	//load2();
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
	var date = new Date();
	
	var obj = {expense:expenseName,amount:amt,date:date};
	
	data.push(obj);
	var string = JSON.stringify(data);
	localStorage.setItem('tracker', string);
	clearValues();
	load();
	loadChart();
}

function newExpense2(){
	var expenseName = $("#thefield").val();
	var amt = $("#theamount").val();

	var data = JSON.parse(localStorage.getItem('expenses'));
	
	var date = new Date();
	var month = date.toLocaleString('en-us', { month: "long" });
	var dateStore = (month + date.getFullYear());
	
	var mthObj = data[dateStore];
	if (mthObj == undefined){
		mthObj = {
			budget: 500,
			record: []
		};
	} 
	var obj = {expense:expenseName,amount:amt,date:date};
	mthObj.record.push(obj);
	data[dateStore] = mthObj;
	localStorage.setItem('expenses', JSON.stringify(data));
	
	
	clearValues();
	load();
	loadChart();
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

function load2(){
	
	var data = JSON.parse(localStorage.getItem('expenses'));
	if (data === null){
		var data = {};
		localStorage.setItem('expenses', JSON.stringify(data));
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
	loadChart();
}

function loadChart(){
	
	var budget = 200;
	var toShow = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
        {
            label: "Actual spending",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [0,0,0,0,0,0,0,0,0,0,0,0]
        },
        {
            label: "Budget",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [budget,budget,budget,budget,budget,budget,budget,budget,budget,budget,budget,budget]
        }
    ]
};
	
	var data = JSON.parse(localStorage.getItem('tracker'));
	
	
		
	for (x in data){
		var currDate = new Date(data[x].date);
		var currMonth = currDate.getMonth();
		var currAmt = data[x].amount;
		toShow.datasets[0].data[currMonth-1] += Number(currAmt);

	}
			
		
		

	
	
	// Get context with jQuery - using jQuery's .get() method.
	var ctx = $("#charts").get(0).getContext("2d");
	// This will get the first returned node in the jQuery collection.
	var myNewChart = new Chart(ctx).Bar(toShow,Chart.defaults.Bar);
	
	
	

	
	
}
