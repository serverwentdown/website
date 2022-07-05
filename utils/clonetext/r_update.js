setInterval(function(){
	$.ajax({
		type: 'GET',
		url: 'r_helper.php',
		success: exception
	});
	function exception(data, status){
		$("#ha").html(data);
	}
}, 100);