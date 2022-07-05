<?php
$file = fopen("thefile.txt", "w");
$text = $_GET["t"];
if (isset($text)) {
fwrite($file, $text);
} else {
fwrite($file, "   &nbsp;   ");
}
fclose($file);
echo "Send more to screens";
?>