(function() { // closure

'use strict';

angular
	.module('app.stat')
	.controller('StatController', StatController);

StatController.$inject = [ '$scope', '$state', 'statService' ];

function StatController($scope, $state, statService) {

	var vm = this;

	var total = 0;
	vm.myData = [];
	vm.showData = false;
	vm.unigramsCount = 0;
	vm.unigramsData = [
		{
			value: 790986,
		    color:'#71201B',
		    fillColor: '#71201B',
		    highlight: '#71312E',
		    label: 'NP'
		},
		{
			value: 373677,
		    color:'#537150',
		    fillColor: '#537150',
		    highlight: '#5E715A',
		    label: 'VP'
		},
		{
			value: 321733,
		    color:'#C5E54C',
		    fillColor: '#C5E54C',
		    highlight: '#C6E552',
		    label: 'PP'
		},
		{
			value: 66538,
		    color:'#AB86E7',
		    fillColor: '#AB86E7',
		    highlight: '#C0A3E7',
		    label: 'ADVP'
		},
		{
			value: 65067,
		    color:'#3829B2',
		    fillColor: '#3829B2',
		    highlight: '#473CB2',
		    label: 'ADJP'
		}
	];
	vm.unigramsOptions = {
		// Sets the chart to be responsive
		responsive: true,

		//Boolean - Whether we should show a stroke on each segment
		segmentShowStroke : true,

		//String - The colour of each segment stroke
		segmentStrokeColor : '#fff',

		//Number - The width of each segment stroke
		segmentStrokeWidth : 2,

		//Number - The percentage of the chart that we cut out of the middle
		percentageInnerCutout : 0, // This is 0 for Pie charts

		//Number - Amount of animation steps
		animationSteps : 100,

		//String - Animation easing effect
		animationEasing : 'easeOutBounce',

		//Boolean - Whether we animate the rotation of the Doughnut
		animateRotate : true,

		//Boolean - Whether we animate scaling the Doughnut from the centre
		animateScale : false,

		//String - A legend template
		legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
	};
	vm.bigramsData = {
		labels: ['VP, VP', 'ADJP, PP', 'ADJP, VP', 'NP, NP', 'NP, PP', 'ADVP, NP', 'PP, NP', 'PP, VP', 'VP, ADVP', 'VP, PP', 'VP, NP', 'NP, ADJP', 'NP, ADVP', 'PP, ADJP', 'VP, ADJP', 'NP, VP', 'ADJP, ADVP', 'ADJP, NP', 'ADVP, VP', 'PP, ADVP', 'ADVP, PP', 'PP, PP'],
		datasets: [
		{
		  label: 'Bigrams Probability',
		  fillColor: 'rgba(255,255,255,0.2)',
		  strokeColor: 'rgba(234, 137, 192, 1)',
		  pointColor: 'rgba(234, 137, 192, 1)',
		  pointStrokeColor: '#fff',
		  pointHighlightFill: '#fff',
		  pointHighlightStroke: 'rgba(234, 137, 192, 1)',
		  data: [0.045454545454545456, 0.32, 0.2, 0.21708185053380782, 0.25622775800711745, 0.30434782608695654, 0.911504424778761, 0.017699115044247787, 0.03787878787878788, 0.12878787878787878, 0.7575757575757576, 0.06405693950177936, 0.0498220640569395, 0.02654867256637168, 0.030303030303030304, 0.4128113879003559, 0.08, 0.4, 0.13043478260869565, 0.017699115044247787, 0.5652173913043478, 0.02654867256637168]
		}
		]
	};
	vm.bigramsOptions = {
		// Sets the chart to be responsive
      responsive: true,

      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero : true,

      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,

      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      //Boolean - If there is a stroke on each bar
      barShowStroke : true,

      //Number - Pixel width of the bar stroke        .input-group-btn

      barStrokeWidth : 2,

      //Number - Spacing between each of the X value sets
      barValueSpacing : 5,

      //Number - Spacing between data sets within X values
      barDatasetSpacing : 1,

      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
  };
  vm.relatedData = {
		labels: ['nyfwbr_idal', 'nyc', 'fw16', 'kevaind', 'cheyma', 'jaiperdumaveste', 'whimsycanyon', 'tbt', 'nikon', 'cheymagirl', 'bts', 'sneakpeak', 'love', 'jpmv', 'bleumode', 'br_idetobe', 'manhattan'],
		datasets: [
		{
		  label: 'Related Trends - nyfw(47)',
		  fillColor: 'rgba(255,255,255,0.2)',
		  strokeColor: 'rgba(171, 215, 111, 1)',
		  pointColor: 'rgba(171, 215, 111, 1)',
		  pointStrokeColor: '#fff',
		  pointHighlightFill: '#fff',
		  pointHighlightStroke: 'rgba(171, 215, 111, 1)',
		  data: [0.170212765957, 0.170212765957, 0.106382978723, 0.0851063829787, 0.0851063829787, 0.0851063829787, 0.0851063829787, 0.063829787234, 0.063829787234, 0.063829787234, 0.063829787234, 0.0425531914894, 0.0425531914894, 0.0425531914894, 0.0425531914894, 0.0425531914894 ,0.0425531914894]
		}
		]
	};
	vm.relatedOptions = {
		// Sets the chart to be responsive
      responsive: true,

      //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero : true,

      //Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,

      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      //Boolean - If there is a stroke on each bar
      barShowStroke : true,

      //Number - Pixel width of the bar stroke
      barStrokeWidth : 2,

      //Number - Spacing between each of the X value sets
      barValueSpacing : 5,

      //Number - Spacing between data sets within X values
      barDatasetSpacing : 1,

      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
  };
	vm.chartData = {
		labels: ['15/2/2016', '16/2/2016', '17/2/2016', '18/2/2016', '19/2/2016', '20/2/2016', '21/2/2016', '22/2/2016', '23/2/2016', '24/2/2016', '25/2/2016', '26/2/2016', '27/2/2016', '28/2/2016', '29/2/2016', '1/3/2016', '2/3/2016', '3/3/2016', '4/3/2016', '5/3/2016', '6/3/2016', '7/3/2016', '8/3/2016', '9/3/2016', '10/3/2016'],
		datasets: [
		{
		  label: 'Hashtag Frequency',
		  fillColor: 'rgba(255,255,255,0.1)',
		  strokeColor: 'rgba(234, 137, 192, 1)',
		  pointColor: 'rgba(234, 137, 192, 1)',
		  pointStrokeColor: '#fff',
		  pointHighlightFill: '#fff',
		  pointHighlightStroke: 'rgba(234, 137, 192, 1)',
		  data: [616.728592156, 587.714038162, 461.399226412, 511.363943491, 606.246670825, 623.542079927, 534.121303198, 379.587028766, 222.902019292, 110.359486761, 56.3627213364, 47.8297906618, 58.9789197245, 66.8848583548, 61.0912760903, 44.7457297509, 28.6803695102, 22.5432311493, 27.9032568324, 37.080250166, 38.6235642007, 26.6768088134, 8.17821668009, 0.677099614988, 16.6772389326, 40.4908688742, 23.7065199538, -40.8936170793, 144.241632208, 1819.37651327]
		},
		{
		  label: 'Sentiment Analysis',
		  fillColor: 'rgba(255,255,255,0.1)',
		  strokeColor: 'rgba(244, 189, 82, 1)',
		  pointColor: 'rgba(244, 189, 82, 1)',
		  pointStrokeColor: '#fff',
		  pointHighlightFill: '#fff',
		  pointHighlightStroke: 'rgba(244, 189, 82, 1)',
		  data: [616.1454624, 689.8482475, 570.4641624, 350.1236442, 183.5757883, 145.5979305, 90.86497032, 103.8640482, 91.93756971, 84.24694242, 66.51687288, 43.53593112, 27.34230933, 25.13385933, 21.02623158, 40.45902842, 35.0516722, 31.29460989, 25.46910931, 3.28614202, 13.46098424, 17.29473134, 33.2833538, 27.93817423, 14.38573943]
		},
		{
		  label: 'Sentence Structure Analysis',
		  fillColor: 'rgba(255, 255, 255, 0.1)',
		  strokeColor: 'rgba(93, 156, 237, 1)',
		  pointColor: 'rgba(93, 156, 237, 1)',
		  pointStrokeColor: '#fff',
		  pointHighlightFill: '#fff',
		  pointHighlightStroke: 'rgba(93, 156, 237, 1)',
		  data: [666.1018216, 819.1755662, 640.5507867, 380.4169532, 148.1052739, 95.4374089, 83.19404286, 83.08976786, 50.87523188, 56.44430602, 48.65675092, 41.77785807, 29.34093057, 34.37731547, 21.02623158, 21.07543325, 25.15502819, 35.65117066, 23.86770527, 7.182888993, 16.07615472, 16.07096977, 34.49191284, 26.50329542, 15.44771339]
		},
		{
		  label: 'Actual Value of tweets count',
		  fillColor: 'rgba(255, 255, 255, 0.1)',
		  strokeColor: 'rgba(171, 215, 111, 1)',
		  pointColor: 'rgba(171, 215, 111, 1)',
		  pointStrokeColor: '#fff',
		  pointHighlightFill: '#fff',
		  pointHighlightStroke: 'rgba(171, 215, 111, 1)',
		  data: [658, 840, 641, 381, 146, 95, 84, 79, 52, 55, 49, 41, 38, 37, 21, 18, 24, 25, 20, 9, 19, 13, 35, 27, 15]
		}
		]
	};
	vm.chartOptions = {
		// Sets the chart to be responsive
      responsive: true,

      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,

      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      //Boolean - Whether the line is curved between points
      bezierCurve : true,

      //Number - Tension of the bezier curve between points
      bezierCurveTension : 0.4,

      //Boolean - Whether to show a dot for each point
      pointDot : true,

      //Number - Radius of each point dot in pixels
      pointDotRadius : 4,

      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth : 1,

      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius : 20,

      //Boolean - Whether to show a stroke for datasets
      datasetStroke : true,

      //Number - Pixel width of dataset stroke
      datasetStrokeWidth : 2,

      //Boolean - Whether to fill the dataset with a colour
      datasetFill : true,

      // Function - on animation progress
      onAnimationProgress: function(){},

      // Function - on animation complete
      onAnimationComplete: function(){},

      //String - A legend template
      legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
	};

	activate();

	function activate() {
		for (var i=0; i<vm.unigramsData.length;i++) {
			vm.unigramsCount += parseInt(vm.unigramsData[i].value);
			console.log(vm.unigramsData[i].value, typeof vm.unigramsData[i].value, vm.unigramsCount, typeof vm.unigramsCount);
		}
		jQuery('.loading').css('visibility', 'visible');
		statService.getSentiment()
			.success(function(data) {
				data = JSON.parse(data);
				for (var i=0; i<data.length;i++) {
					total += data[i];
				}
				console.log(total, typeof data, data);
				vm.myData = data.map(function(value, index) {
					console.log("map: ", value, index);
					return value/total*100;
				});
				console.log(vm.myData);
				vm.showData = true;
				jQuery('.loading').css('visibility', 'hidden');
				resize();
			});
		// setScale();
	}

	// function setScale() {
	// 	window.onload = function(){
	// 	    var ctx = document.getElementById("canvas").getContext("2d");
	// 	    window.myLine = new Chart(ctx).Line(lineChartData, {
	// 	        scaleOverride : true,
	// 	        scaleSteps : 10,
	// 	        scaleStepWidth : 50,
	// 	        scaleStartValue : 0 
	// 	    });
	// 	};
	// }
	
}

})(); //closure