<?php
	$start_process = (float) array_sum(explode(' ',microtime())); 
 
	include("geoipcity.inc");
	include("geoipregionvars.php");
 
	$ip = $_SERVER['REMOTE_ADDR'];
 
	$weather_feed = "";
 
	$gi = geoip_open("GeoLiteCity.dat",GEOIP_STANDARD);
	$record = geoip_record_by_addr($gi,$ip);
	geoip_close($gi);
 
	$city = $record->city;
 
	if ($city == "")
		$city = "Sydney";
 
	$url_post = "http://where.yahooapis.com/v1/places.q('".urlencode($city)."')?appid=";
	$weather_feed = file_get_contents($url_post);
	$objDOM = new DOMDocument();
	$objDOM->loadXML($weather_feed);
	$woeid = $objDOM->getElementsByTagName("place")->item(0)->getElementsByTagName("woeid")->item(0)->nodeValue;
 
	echo "Current IP: " . $ip . "<br>";
	echo "City Name: " . $city . "<br>";
	echo "WOEID: " . $woeid . "<br>";
 
	$end_process = (float) array_sum(explode(' ',microtime())); 
    echo "<!--Execution time: ". sprintf("%.4f", ($end_process-$start_process))." seconds" . "-->";
?>