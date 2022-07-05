<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Pi Generated</title>
<meta name="viewport" content="minimum-scale=1.0, height=device-height, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<link rel="stylesheet" href="bwui.css" type="text/css" /><!-- 
<link rel="stylesheet" href="grass.css" type="text/css" /> -->
<script type="text/javascript">
function load() {
    document.getElementById("title").innerHTML=document.title;
}
</script>

</head>
<body onLoad="load();">
<h1 id="title">
Loading...
</h1>
<br />

<div id="text">
<?php
/*
set_time_limit(3600);
*/
//Pi calculation code 
//From Chao Xu 
//At http://www.webdevlogs.com 
function bcpi($precision){
 $num = 0;
 $k = 0;
 bcscale($precision+3);
 $limit = ($precision+3)/14;
 while($k < $limit){
 $num = bcadd($num,bcdiv(bcmul(bcadd('13591409',bcmul('545140134', $k)),bcmul(bcpow(-1, $k), bcfact(6*$k))),bcmul(bcmul(bcpow('640320',3*$k+1),bcsqrt('640320')), bcmul(bcfact(3*$k), bcpow(bcfact($k),3)))));
 ++$k;
 }
 return bcdiv(1,(bcmul(12,($num))),$precision);
 }

function bcfact($n){
return ($n == 0 || $n== 1) ? 1 : bcmul($n,bcfact($n-1));
} 

if ($_GET["to"]) {
echo bcpi(1*(10^($_GET["to"]+10))); 
} else {
echo bcpi(1*(10^(10^1000)));
}
 ?>
 <!-- freshly generated -->

</div>
<br />
<div id="credits">
<form>
<input type="number" id="to" name="to" placeholder="To how many places? " style="border: 1px solid #9999AA; padding: 10px; margin: 10px; font-size: 20px; width: 200px; -webkit-border-radius: 1px;" />
</form>
<br />
<br />
Pi calculation code from Chao Xu at <a href="http://www.webdevlogs.com" target="_blank">http://www.webdevlogs.com</a>
<br />
<br />
If you see <a href="error.png">"<br /> <table border='1' cellpadding='2' bgcolor='#FFFFDF' bordercolor='#E8B900' align='center' style="font-size: 5px;"><tr><td><font face='Arial' color='#000000'><b>PHP Error Message</b></font></td></tr></table>
<span style="font-size: 15px;">
<b>Fatal error</b>:  Maximum execution time of 10 seconds exceeded in <b>/home/a7154108/public_html/pi/index.php</b> on line <b>36</b>
</span>
<table border='1' cellpadding='2' bgcolor='#FFFFDF' bordercolor='#E8B900' align='center' style="font-size: 5px;"><tr><td><div align='center'><a href='http://www.000webhost.com/'><font face='Arial' color='#000000'>Free Web Hosting</font></a></div></td></tr></table> "<!-- <img src="error.png" width="50" style="vertical-align: middle;" /> --></a>, the number of digits is too much.
</div> 
</body>
</html>
 