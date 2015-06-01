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
	
}

function loadJSON(){
	var text = localStorage.getItem('expenses');
	if (text != null){
		text += ']}';
		var obj = JSON.parse(text);
		for (i = 0; i < obj.expenses.length; i++){
			$("article").append(obj.expenses[i].expense + ": " + obj.expenses[i].amount);
			$("article").append("<br>");
		}
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