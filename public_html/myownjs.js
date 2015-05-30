/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$("#dialog").hide();
$(document).ready(function() {
	
	
	$("#thebutton").click(function(){
		$("#dialog").slideToggle(300);
		//$("#dialog").show(300);
		$("#overlay").toggleClass("toLay");
		//$("#overlay").removeClass("toLay");
		
	});
	
	/*
	$("*").not("#dialog").click(function(){
		
		$("#dialog").hide(300);
		$("#overlay").addClass("toLay");
	});
	*/
});