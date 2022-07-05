<?php
if ($_POST["file"]) {
$file=fopen("index.html", "w");
fwrite($file, stripslashes($_POST["file"]));
fclose($file);
}
?>
<!DOCTYPE html>
<html style="padding: 0;margin: 0;width: 100%; height: 100% !important;">
<head>
<title>Editor</title>
</head>
<body style="padding: 0;margin: 0;width: 100%; height: 100% !important;">
<form action="editor.php" method="POST">
<textarea name="file" style="width: 100%; height: 100% !important; padding: 0;margin: 0; border: 0;" rows="60">
<?php
$file=fopen("index.html", "r");
while(!feof($file))
  {
  echo fgets($file)."";
  }
fclose($file);
?>
</textarea>
<input type="submit" value="Save" style="padding: 15px 40px; margin: 10px; border: 1px solid #000; position: absolute; bottom: 0px; right: 0px; background-color: #ddd;" />
</form>
</body>
</html>