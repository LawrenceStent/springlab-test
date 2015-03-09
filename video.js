jQuery(document).ready(function() {
		$("#but").click(function() {

			var url = $("#url").val();
			//var str = texting.text();

			alert(url);
			getJSONdata(url);

			//prependbody(texting);

					});
	});

	//what needs to be done: for post -  accept user url input, send that input to function whereby $.getJSON responds with the api info. extract the video id, title, description, url... 

	//send that information in json format to an external file. 

	//on load of the page any videos in the json file are read on to the page and put into a list//table under the correct columns
	//});

	//method to load the json file data
	function onload()
	{
		var xmlhttp = new XMLHttpRequest();
		var urli = "data.txt";

		xmlhttp.onreadystatechange = function()
		{
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		    {
		    	//calls the readJson method to place data in a table
		    	var jtext = $.parseJSON(xmlhttp.responseText);
		        readJson(jtext);
	    	}
		}

		xmlhttp.open("GET", urli, true);
		xmlhttp.send(null);
	}

	//method for the output of json file data
	function readJson(jsontext)
	{
		var jarray = $.parseJSON(jsontext);
		var i = 0;

		//write directly into a table on page load
		var html = "<table class='table table-hover'><thead><tr><th>ID</th><th>TITLE</th><th>DESCRIPTION</th><th>Delete video</th></tr></thead>";

		for (i; i < jarray.length; i++) 
		{
			html += "<tr><td>"+
			jarray[i].id+"</td><td><a href='"+jarray[i].url+"'"+
			jarray[i].title+"</a></td><td>"+
			jarray[i].description+"</td>"+
			//call function jquery delete with id...delete jarray[i]['id'];
			//problem with below line of code - may not read the correct id as this is on page load to get id may 
			"<td id='"+i+"' onclick='deletejson(this.id, "+jarray+");'>DELETE</td></tr>";
		}

		html +="</table>"
		document.getelementbyId("jsondata").innerhtml = html;
	}

	//method to accept yt api information and convert to json
	function getJSONdata(urlstring)
	{
		var id = "";
		var title = "";
		var description = "";

		$.getJSON(urlstring, function(response) {
				id = response.data.id;
				title = response.data.title;
				description = response.data.description;

				alert(id);
		});

		var inputData = {
					"id" : id,
					"title" : title,
					"description" : description,
					"url" : urlstring
				}

		//sends json to function
		writeJson(inputData);
	}

	//this function is to accept the Youtube response data and write it to our json file.
	function writeJson(ytdata)
	{
		//here i find infile = /file.json in js. to write to file in json. possibly use writeJson();

		//$.writeJson("")
		var obj = JSON.stringify(ytdata);

		/*$.post('data.json', obj, function(data, textStatus) 
		{
			alert(obj);
		});*/
		$.ajax({
			url: 'data.txt',
			type: 'POST',
			dataType: 'json',
			data: obj,
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	}

	//this is to accept the json id and delete it from file
	function deletejson(id, jsonarray)
	{
		var deleting = document.getelementbyId(id);

		$.ajax({
			url: 'data.txt',
			type: 'DELETE',
			dataType: 'json',
			data: {jsonarray[id]}
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}