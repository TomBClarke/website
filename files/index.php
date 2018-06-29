<!DOCTYPE html>

<html>
    <head>
        <title>Files</title>


<!-- Meta Stuff -->
<meta http-equiv="Content-Type"   content="text/html; charset=utf-8" />
<meta name="viewport"             content="width=device-width, initial-scale=1" />
<meta property="og:url"           content="http://www.tombclarke.co.uk/" />
<meta property="og:type"          content="website" />
<meta property="og:title"         content="Tom Clarke - Files" />
<meta property="og:description"   content="Hi, I'm Tom, I study Computer Science at the University of Birmingham, and am looking for great projects to work on." />
<meta property="og:image"         content="http://www.tombclarke.co.uk/res/img/me_circle.png" />
<meta name="url"                  content="http://www.tombclarke.co.uk/" />
<meta name="type"                 content="website" />
<meta name="title"                content="Tom Clarke - Files" />
<meta name="description"          content="Hi, I'm Tom, I study Computer Science at the University of Birmingham, and am looking for great projects to work on." />
<meta name="image"                content="http://www.tombclarke.co.uk/res/img/me_circle.png" />
<meta name="keywords"             content="Tom, Thomas, B, Clarke, Computer Science, computer science, tom clarke, Tom Clarke, projects, work, year in industry, ">

<!-- Setup dir -->
<?php
   $serv_dir = "http://tombclarke.co.uk/";
?>

<script> var serv_dir = "<?php print $serv_dir; ?>"; </script>

<!-- Icon -->
<link rel="icon" href="<?php echo $serv_dir; ?>res/img/favicon.png">

<!-- CSS -->
<link type="text/css" rel="stylesheet" href="<?php echo $serv_dir; ?>css/main.css"/>
<link type="text/css" rel="stylesheet" href="<?php echo $serv_dir; ?>css/main_bars.css"/>




    </head>
    <body>
        <div class="main">
            <h1>Files:</h1>
            <div class="section">
<?php
  if ($handle = opendir('.')) {
    while (false !== ($file = readdir($handle))) {
      if ($file != "." && $file != ".." && $file != "index.php" && $file != ".htaccess" ) {
        $thelist .= '<li><a href="'.$file.'">'.$file.'</a></li>';
      }
    }
    closedir($handle);
  }
?>
		<ul><?php echo $thelist; ?></ul>
		</div>
        </div>
    </body>
</html>