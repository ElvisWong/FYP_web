(function () { // closure

'use strict';
angular
    .module('mwr.shared')
    .directive('mwrBarChart', mwrBarChart);

mwrBarChart.$inject = [  ];

function mwrBarChart() {
	var directive = {
		restrict: 'E',
		replace: false,
		scope: {data: '=chartData'},
		link: link
	};

	return directive;

	function link(scope, el, attrs) {
		console.log("Bar chart called");
		var chart = d3.select(el[0]);
		console.log(chart);
		chart.append("div").attr("class", "chart")
             .selectAll('div')
             .data(scope.data).enter().append("div")
             .transition().ease("elastic")
             .style("width", function(d) { return d + "%"; })
             .text(function(d) { return d + "%"; });
	}

}

})(); // closure