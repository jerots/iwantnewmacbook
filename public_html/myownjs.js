/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$("#dialog").hide();
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
	
	load();
	compileTemplate();
	load2();
	
	$("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
	
	/*
	$("#thebutton,#thesubmit").click(function(){
		$("#dialog").slideToggle(300,function(){
			//RESET VALUES AFTER DIALOG CLOSES
			$("#thefield").val("");
			$("#theamount").val("");
		});
	});*/
	
	
	
	
	
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
	load2();
	
}

function clearValues(){
	setTimeout(function(){
		$("#thefield").val("");
		$("#theamount").val("");
	}, 800)
	
}

function compileTemplate(){
	var thehtml = $('#records').html();
	template = Handlebars.compile(thehtml);
	
}

function load2(){
	
	var data = JSON.parse(localStorage.getItem('tracker'));
	if (data === null){
		var data = [];
		localStorage.setItem('tracker', JSON.stringify(data));
	} else {
		
		
		var temp = template(data);
		$("#articles").html(temp);
	}
	
	
}

function load(){
	var data = JSON.parse(localStorage.getItem('tracker'));
	if (data == null){
		var data = [];
		localStorage.setItem('tracker', JSON.stringify(data));
	} else {

		var total = 0.0;
		var html = '<table id="historytable" class="table table-striped table-condensed">';
		html += '<tr><td>#</td><td>Expenses</td><td>Amount</td><td>Remove</td></tr>';
		var index = 1;
		for (x in data){
			var currAmt = parseFloat(data[x].amount)
			total += currAmt
			html += '<tr>';
			html += "<td>" + index + "</td>";
			html += "<td>" + data[x].expense + "</td><td> $" + currAmt.toFixed(2) + "</td>";
			html += '<td class="buttoncol"><button type="button" id="removebutton" class="btn btn-default btn-sm" onclick="deleteRow('+ x +')">';
			html += '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
			html += '</button></td>';
			html += "</tr>";
			index++;
		}
		html += '<tr><td>Total: </td><td></td><td>$' + total.toFixed(2) + '</td></tr>';
		html += "</table>";
		$("article").html(html);
		
	}
}
		
function deleteRow(index){
	var data = JSON.parse(localStorage.getItem('tracker'));	
	data.splice(index, 1);
	
	var string = JSON.stringify(data);
	localStorage.setItem('tracker', string);
	
	load();
	load2();
}

