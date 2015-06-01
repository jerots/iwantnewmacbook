/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$("#dialog").hide();
$("#overlay").hide();


$(document).ready(function() {
	load();
	
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

function load(){
	var expenseNum = (localStorage.length -2) / 2;
	for (i = 0; i < expenseNum; i++){
		
		var expenseName = localStorage.getItem('expense' + i);
		var expenseAmt = localStorage.getItem('amount' + i);
		$('article').append(expenseName + ": " + expenseAmt + "<br>");
	}
	
}