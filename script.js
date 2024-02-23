function printData() {
	// Split data
	var dataSplit = data.split('|');
	// var dataSplit = data.split(/\r?\n|\r|\n/g);

	// Get total seconds from time
	var totalDuration = dataSplit[3].split(":");
	var totalDuration = +(totalDuration[0] * 60) + +totalDuration[1];
	// Get elapsed seconds
	var elapsedDuration = dataSplit[4].split(":");
	var elapsedDuration = +(elapsedDuration[0] * 60) + +elapsedDuration[1];
	// Calculate percentage
	var percentage = (elapsedDuration / totalDuration) * 100;

	// Populate HTML
	document.getElementById("artist").innerHTML = dataSplit[0];
	document.getElementById("album").innerHTML = dataSplit[1];
	document.getElementById("song").innerHTML = dataSplit[2];
	document.getElementById("duration").innerHTML = dataSplit[3];
	document.getElementById("elapsed").innerHTML = dataSplit[4];
	document.getElementById("progress_bar_fill").style.width = `${percentage}%`;
	// Album art
	// Just assume standard "cover.jpg" file
	var albumArtFilePath =  dataSplit[5] + "/cover.jpg";
	document.getElementById('album_art').style.backgroundImage = "url('" + albumArtFilePath + "')";
}

function updateWidget() {
	loadJS();
	printData();
}

function checkEverySecond() {
	window.setInterval(function() {
		// Reload data and repopulate
		updateWidget();

		// Apply marquees
		marqueeOverflows("artist");
		marqueeOverflows("album");
		marqueeOverflows("song");
	}, 1000);
}

function marqueeOverflows(elementId) {
	var element = document.getElementById(elementId);

	if (checkOverflow(element))
	{
		console.log(element + " is overflowing.");
		element.classList.add('marquee');
	}
	else
	{
		element.classList.remove('marquee');
	}
}

function checkOverflow(el)
{
	return el.clientWidth < el.scrollWidth;
}

function loadJS() {
	// Find HEAD
	var head = document.getElementsByTagName('head')[0];

	// Remove current script
	head.removeChild(document.getElementById('data'));

	// Generate new script
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.charset = "utf-8";
	script.id = "data";
	script.src = 'data.txt';

	// Append
	head.appendChild(script);
}

onload = function() {
	// Load initial data
	updateWidget();

	// Do it every second afterwards
	checkEverySecond();
}
