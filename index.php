<?php

// set error reporting level
if (version_compare ( phpversion (), '5.3.0', '>=' ) == 1)
	error_reporting ( E_ALL & ~ E_NOTICE & ~ E_DEPRECATED );
else
	error_reporting ( E_ALL & ~ E_NOTICE );

session_start ();
?>

<!DOCTYPE html>
<html>
	<head>
    	<meta charset="utf-8">
    	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1">
    	<meta name="description" content="HIH, Version 0.4">
    	<meta name="author" content="Alva Chien">
    	
		<title>Home Info Hub, Version 0.4</title>
	
		<!-- JS part -->
		<!-- Angular JS -->
		<script src="http://apps.bdimg.com/libs/angular.js/1.4.0-beta.4/angular.min.js"></script>
<!-- 		<script src="http://apps.bdimg.com/libs/angular.js/1.4.0-beta.4/angular-route.min.js"></script> -->
 		<script src="http://apps.bdimg.com/libs/angular.js/1.4.0-beta.4/angular-animate.min.js"></script>
<!-- 		<script src="http://apps.bdimg.com/libs/angular.js/1.4.0-beta.4/angular-messages.min.js"></script> -->
<!-- 		<script src="http://apps.bdimg.com/libs/angular.js/1.4.0-beta.4/angular-resource.min.js"></script> -->
		<!-- jQuery -->
    	<script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
		<!-- Bootstrap -->
		<script src="http://apps.bdimg.com/libs/bootstrap/3.3.4/js/bootstrap.min.js"></script>
		<!-- Smart-Table -->
		<Script src="app\3rdparty\smart-table.min.js"></Script>
		<!-- Angular UI - UIRoute -->
		<Script src="app\3rdparty\angular-ui-router.min.js"></Script>
		<!-- Angular UI - Grid -->
		<Script src="app\3rdparty\ui-grid.min.js"></Script>
		<!-- Tiny MCE -->
		<script src="app\3rdparty\tinymce.min.js"></script>
		<!-- Angular UI - UI Tiny MCE -->
		<script type="app\3rdparty\ui-tinymce.js"></script>
    	<!-- Application part -->
    	<script src="app\controllers\app.js"></script>
    	<script src="app\controllers\login.js"></script>
<!--     	<script src="app\controllers\learn.js"></script> -->
<!--     	<script src="app\controllers\finance.js"></script> -->
		
		<!-- CSS part -->
		<!-- Bootstrap -->
		<link href="http://apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
		<link href="http://apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap-theme.min.css" rel="stylesheet">
		<!-- 3rd party part -->
		<link href="app\3rdparty\ui-grid.min.css" rel="stylesheet">
		<!-- Application part -->
		<link href="app\css\app.css" rel="stylesheet">
		<link href="app\css\login.css" rel="stylesheet">
		<link href="app\css\register.css" rel="stylesheet">
</head>

<body ng-app="hihApp">
	<!-- Main content area begins -->
	<div class="container" ui-view>	
	</div>
	<!-- Main content area ends -->
	
	<!-- Footer area begins -->
    <footer class="footer">
      <div class="container">
        <p class="text-muted">
        	<div><span data-i18n="Common.Copyright">Copyright</span> © 2014 - 2015 Alva Chien</div>
        	<div>An open source project on GitHub: <a href="https://github.com/alvachien/hih">HIH</a></div>
        </p>
      </div>
    </footer>
	<!-- Footer area ends -->
</body>
</html>
