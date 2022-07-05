$(document).ready(function(){
	$("#txt").keyup(function(){
		$.ajax({
			type: 'GET',
			url: 'w_helper.php?t='+encodeURIComponent($("#txt").val()),
			success: exception
		});
		function exception(data, status){
			$("#send").val(data);
		}
	});
	$("#txt").change(function(){
		$.ajax({
			type: 'GET',
			url: 'w_helper.php?t='+encodeURIComponent($("#txt").val()),
			success: exception
		});
		function exception(data, status){
			$("#send").val(data);
		}
	});
	$("#send").click(function(){
		$.ajax({
			type: 'GET',
			url: 'w_helper.php?t='+encodeURIComponent($("#txt").val()),
			success: exception
		});
		function exception(data, status){
			$("#send").val(data);
		}
	});
});