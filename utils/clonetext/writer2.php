<!DOCTYPE html>
<html style="padding: 0; margin: 0; width: 100%; height: 100%;">
<head>
<meta charset='utf-8'>
<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; minimum-scale= 1.0; user-scalable=0;" />
<title>Screen1 - Writer</title>
</head>
<body style="padding: 0; margin: 0; width: 100%; height: 100%;text-align:center;">
<textarea id="txt" name="t" autofocus="true" style="width: 100%; height: 99.9%;padding:0;margin:0;border:0;font-family:Serif;font-size:100px;text-align:center;background-color:#eee;">
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
<input type="text" placeholder="Codes" id="cds" style=" position: absolute;top: 0px; left: 0px;background-color:rgba(255, 255, 255, 0.5);width: 60px; height: 30px;padding:0;margin:0;border:0;text-align: center;" />
<input id="send" style="position: absolute;top: 0px; left: 60px; background-color:rgba(220, 220, 220, 0.5);width: 150px; height: 30px;padding:0;margin:0;border:0;" value="Send to screens" type="button" />
<script type="text/javascript" src="jquery-1.4.3.min.js"></script>
<script type="text/javascript" src="w_update2.js"></script>
<script src="jquery.hotkeys.js"></script>
<script type="text/javascript">
function starttrack() {
$("#cds").bind('keydown', '6', function (evt){ $("#txt").val("<style>body{background-color:#f00;color:rgba(50,50,50,0.5)}#ha{font-size:200px !important}</style><br />  "); $("#txt").keyup(); return true; });
$("#cds").bind('keydown', '1', function (evt){ $("#txt").val("<style>body{background-color:#f00;color:rgba(50,50,50,0.5)}#ha{font-size:200px !important}</style><br /> READY? "); $("#txt").keyup(); return true; });
$("#cds").bind('keydown', '2', function (evt){ $("#txt").val("<style>body{background-color:#ff0;color:rgba(50,50,50,0.5)}#ha{font-size:200px !important}</style><br /> SET? "); $("#txt").keyup(); return true; });
$("#cds").bind('keydown', '3', function (evt){ $("#txt").val("<style>body{background-color:#0f0;color:rgba(50,50,50,0.5)}#ha{font-size:200px !important}</style><br /> GO! "); $("#txt").keyup(); return true; });
$("#cds").bind('keydown', '4', function (evt){ $("#txt").val("<style>body{background-color:#002;color:rgba(200,200,200,0.7)}#ha{font-size:120px !important}</style>"); $("#txt").keyup(); return true; });
$("#cds").bind('keydown', '5', function (evt){ $("#txt").val("<style>body{background-color:#002;color:rgba(200,200,200,0.7)}#ha{font-size:120px !important}table{margin:10px auto;width:90%;border-collapse:collapse}td,tr{border:1px solid #555}td:first-child{width:100px}</style>Winners<table><tr><td>1st</td><td>&nbsp;</td></tr><tr><td>2nd</td><td>&nbsp;</td></tr><tr><td>3rd</td><td>&nbsp;</td></tr></table>"); $("#txt").keyup(); return true; });
$("#cds").keyup(function (){ $("#cds").val(""); });
}
$(document).ready(starttrack);
</script>
</body>
</html>