<!DOCTYPE html>
<html>
	<head>
		<title>LLAC</title>
		<meta charset="UTF-8">
        <meta http-equiv="x-ua-compatible" content="IE=Edge">
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <meta name="apple-mobile-web-app-capable" content="yes">        
		<link rel="shortcut-icon" href="">
		<link rel="stylesheet" type="text/css" href="lib/bootstrap/3.3.7/css/bootstrap.min.css">
		<script type="text/javascript" src="lib/jquery/jquery-1.11.0.min.js"></script>
		<script type="text/javascript" src="lib/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<style type="text/css">
			* {
				margin: 0; 
				padding: 0;
			}

			body {
				background-color: #eee;
			}

			#container {				
				width: auto;
				height: auto;
				margin: 0.5em;
			}

			.trigger {
				width: 100%;
				height: 12em;
				margin-top: 1em;
				letter-spacing: 0.06em;
			}

		</style>
		<script type="text/javascript">
			$(window).load(function () {
				$(".trigger").click(function () {
					var url = $(this).attr("data-target");
					$(window).attr("location", url);
				});
			});
		</script>
	</head>
	<body>
		<div class="container-fluid" id="container">
			<div class="row">
				<div class="col-xs-12 col-sm-6">
					<button type="button" class="btn btn-primary btn-lg trigger" data-target="wordhunter">Word Hunter (PC)</button>
				</div>
				<div class="col-xs-12 col-sm-6">
					<button type="button" class="btn btn-warning btn-lg trigger" data-target="monsterfreenzy">Monster Freenzy</button>
				</div>
			</div>		
			<div class="row">
				<div class="col-xs-12 col-sm-6">
					<button type="button" class="btn btn-danger btn-lg trigger" data-target="earthcombat">Earth Combat</button>
				</div>
				<div class="col-xs-12 col-sm-6">
					<button type="button" class="btn btn-info btn-lg trigger" data-target="SnakeRetro">Snake Retro</button>
				</div>
			</div>	
			<div class="row">
				<div class="col-xs-12 col-sm-6">
					<button type="button" class="btn btn-success btn-lg trigger" data-target="TetrisRetro">Tetris Retro</button>
				</div>
				<div class="col-xs-12 col-sm-6">
					<button type="button" class="btn btn-inverse btn-lg trigger" data-target="RaceRetro">Racer Retro</button>
				</div>
			</div>	
		</div>	
	</body>
</html>