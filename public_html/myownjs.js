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
	
	var expenseName = $("#thefield").val();
	var amt = $("#theamount").val();
	
	var data = JSON.parse(localStorage.getItem('tracker'));
	//var data = [];
	var obj = {expense:expenseName,amount:amt};
	data.push(obj);
	var string = JSON.stringify(data);
	localStorage.setItem('tracker', string);
	loadJSON2();
	
}

function load(){
	var data = JSON.parse(localStorage.getItem('tracker'));
	if (data == null){
		var data = [];
		localStorage.setItem('tracker', JSON.stringify(data));
	} else {
		var index = 1;
		var total = 0.0;
		var html = '<table class="table table-striped table-bordered table-hover">';
		html += '<tr><td>#</td><td>Expenses</td><td>Amount</td></tr>';
		
		for (x in data){
			
			total += parseFloat(data[x].amount);
			html += "<tr>";
			html += "<td>" + index + "</td>";
			html += "<td>" + data[x].expense + "</td><td> $" + data[x].amount + "</td>";
			html += '<td>Edit and Delete buttons coming soon</td>';
			html += "</tr>";
			index++;
		}
		html += '<tr><td>Total: </td><td></td><td>$' + total + '</td></tr>';
		html += "</table>";
		$("article").html(html);
		
	}
		
	
	
	
	

}