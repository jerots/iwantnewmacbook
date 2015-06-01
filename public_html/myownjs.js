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
	
	var expenseName = localStorage.getItem('amount');
	//if (expenseName){
		document.getElementById('article').innerHTML = expenseName;
	//}
	
}