/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var template ='';

$(document).ready(function() {
	
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
	
	var obj = {expense:expenseName,amount:amt};
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

