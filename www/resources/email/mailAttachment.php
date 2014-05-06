<?php


if($_SERVER['REQUEST_METHOD']=="POST"){
echo 'hi';die('bye');
$to = $_POST['toEmail'];
$fromEmail = $_POST['fieldFormEmail']; 
$fromName = $_POST['fieldFormName']; 
$subject = $_POST['fieldSubject']; 
$message = $_POST['fieldDescription'];

/* GET File Variables */ 
$tmpName = $_FILES['attachment']['tmp_name']; 
$fileType = $_FILES['attachment']['type']; 
$fileName = $_FILES['attachment']['name']; 

/* Start of headers */ 
$headers = "From: $fromName"; 

if (file($tmpName)) { 
  /* Reading file ('rb' = read binary)  */
  $file = fopen($tmpName,'rb'); 
  $data = fread($file,filesize($tmpName)); 
  fclose($file); 

  /* a boundary string */
  $randomVal = md5(time()); 
  $mimeBoundary = "==Multipart_Boundary_x{$randomVal}x"; 

  /* Header for File Attachment */
  $headers .= "\nMIME-Version: 1.0\n"; 
  $headers .= "Content-Type: multipart/mixed;\n" ;
  $headers .= " boundary=\"{$mimeBoundary}\""; 

  /* Multipart Boundary above message */
  $message = "This is a multi-part message in MIME format.\n\n" . 
  "--{$mimeBoundary}\n" . 
  "Content-Type: text/plain; charset=\"iso-8859-1\"\n" . 
  "Content-Transfer-Encoding: 7bit\n\n" . 
  $message . "\n\n"; 

  /* Encoding file data */
  $data = chunk_split(base64_encode($data)); 

  /* Adding attchment-file to message*/
  $message .= "--{$mimeBoundary}\n" . 
  "Content-Type: {$fileType};\n" . 
  " name=\"{$fileName}\"\n" . 
  "Content-Transfer-Encoding: base64\n\n" . 
  $data . "\n\n" . 
  "--{$mimeBoundary}--\n"; 
} 

$flgchk = mail ("$to", "$subject", "$message", "$headers"); 

if($flgchk){
  echo "A email has been sent to: $to";
 }
else{
  echo "Error in Email sending";
}
}
?>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Email Attachment Without Upload - Excellent Web World</title>
<style>
body{ font-family:Arial, Helvetica, sans-serif; font-size:13px;}
th{ background:#999999; text-align:right; vertical-align:top;}
input{ width:181px;}
</style>
</head>
<body>
    <form action="" method="post" name="mainform" enctype="multipart/form-data">
    <table width="500" border="0" cellpadding="5" cellspacing="5">
       <tr>
        <th>Your Name</th>
        <td><input name="fieldFormName" type="text"></td>
    </tr>
    <tr>
    <tr>
        <th>Your Email</th>
        <td><input name="fieldFormEmail" type="text"></td>
    </tr>
    <tr>
        <th>To Email</th>
        <td><input name="toEmail" type="text"></td>
    </tr>

    <tr>
        <th>Subject</th>
        <td><input name="fieldSubject" type="text" id="fieldSubject"></td>
    </tr>
    <tr>
        <th>Comments</th>
        <td><textarea name="fieldDescription" cols="20" rows="4" id="fieldDescription"></textarea></td>
    </tr>
    <tr>
      <th>Attach Your File</th>
      <td><input name="attachment" type="file"></td>
    </tr>
    <tr>
        <td colspan="2" style="text-align:center;"><input type="submit" name="Submit" value="Send"><input type="reset" name="Reset" value="Reset"></td>
    </tr>
    </table>
    </form>
</body>
</html>