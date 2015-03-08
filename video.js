


jQuery(document).ready(function() {
	$("#sb").click(function() {
		$("p").hide();

		alert("first");
		//var inval = getelementbyId("url");
		//var url = $inval.text();

		//prependbody(url);

		//$(".div").prepend().html("<iframe src=" + url +"><iframe>");
	});
});

function clickme()
{

	$(document).ready(function() {
		$("#two").click(function(event) {
			alert("surprise");
		});
	});
}

function prependbody(url)
{
	var vid = $("<iframe />").attr({
		src: url,
		width:"560",
		height:"349",
		frameborder="0",
		allowfullscreen
	});

	alert(url);

	$(".videowrap").prepend(vid);
}