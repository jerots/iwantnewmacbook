/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$("#dialog").hide();
$("#overlay").hide();


$(document).ready(function() {
	loadJSON();
	
	$("#thebutton,#thesubmit").click(function(){
		$("#dialog").slideToggle(300);
		$("#overlay").toggle();
	});
	
});

function newExpense(){
	var expenseNum = (localStorage.length -2) / 2;
	var expenseName = document.getElementById("thefield").value;
	var amount = document.getElementById("theamount").value;
	localStorage.setItem('expense' + expenseNum, expenseName);
	localStorage.setItem('amount' + expenseNum, amount);
	
}

function newExpenseJSON(){
	var expenseName = document.getElementById("thefield").value;
	var amt = document.getElementById("theamount").value;
	
	
	//WITHOUT STRINGIFY
	//var text =  '{ "expenses" : [' +
	//'{ "expense":"' + expenseName + '", "amount":"' + amt + '"}] }';
	
	//USING STRINGIFY
	var text = localStorage.getItem('expenses');
	if (text == null){
		text =  '{ "expenses" : [';
		text +=  JSON.stringify({expense:expenseName, amount:amt});
	} else {
		text += "," +  JSON.stringify({expense:expenseName, amount:amt});
	}
	//text += ']}';
	//var obj = JSON.parse(text);
	localStorage.setItem ('expenses', text);
	//$("#article").load($(document.URL +  " #article"));
	//window.setTimeout(countdown, 0);
	
}

function loadJSON(){
	var text = localStorage.getItem('expenses');
	if (text != null){
		text += ']}';
		var obj = JSON.parse(text);
		
		var html = '<table class="table table-striped table-bordered table-hover">';
		html += '<tr><td>#</td><td>Expenses</td><td>Amount</td></tr>';
		for (i = 0; i < obj.expenses.length; i++){
			
			html += "<tr>";
			html += "<td>" + (i + 1) + "</td>";
			html += "<td>" + obj.expenses[i].expense + "</td><td> " + obj.expenses[i].amount + "</td>";
			html += '<td>Edit and Delete buttons coming soon</td>';
			html += "</tr>";
		}
		html += "</table>";
		$("article").html(html);
		/*for (i = 0; i < obj.expenses.length; i++){
			$("article").append(obj.expenses[i].expense + ": " + obj.expenses[i].amount);
			$("article").append("<br>");
		}*/
	}
}

function load(){
	var expenseNum = (localStorage.length -2) / 2;
	for (i = 0; i < expenseNum; i++){
		
		var expenseName = localStorage.getItem('expense' + i);
		var expenseAmt = localStorage.getItem('amount' + i);
		$('article').append(expenseName + ": " + expenseAmt + "<br>");
	}
	
}