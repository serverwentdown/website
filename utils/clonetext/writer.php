<!DOCTYPE html>
<html style="padding: 0; margin: 0; width: 100%; height: 100%;">
<head>
<meta charset='utf-8'>
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; minimum-scale= 1.0; user-scalable=0;" />
<title>Screen1 - Writer</title>
</head>
<body style="padding: 0; margin: 0; width: 100%; height: 100%;text-align:center;">
<textarea id="txt" name="t" autofocus="true" style="width: 100%; height: 500px;padding:0;margin:0;border:0;font-family:Serif;font-size:100px;text-align:center;">
<?php
$file = fopen("thefile.txt", "r");
if (filesize("thefile.txt")==0) {
$size=100;
} else {
$size=filesize("thefile.txt");
}
echo fread($file, $size);
fclose($file);
?>
</textarea>
<br />
<input id="send" style="width: 200px; height: 100px;" value="Send to screens" type="button" />
<script type="text/javascript" src="jquery-1.4.3.min.js"></script>
<script type="text/javascript" src="w_update.js"></script>
</body>
</html>