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