/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$("#dialog").hide();
$("#overlay").hide();
$(document).ready(function() {
	
	
	$("#thebutton,#thesubmit").click(function(){
		$("#dialog").slideToggle(300);
		$("#overlay").toggle();
	});
	
});