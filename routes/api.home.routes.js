(function() { // closure

module.exports = apiHomeRoutes;

function apiHomeRoutes(router, parser, multiparser, cookies) {

	var api = 
		router
			.post('/home/runPython', parser.json(), runPython)
			.post('/home/search', parser.json(), search)
			.post('/stat/getSentiment', getSentiment);

	return api;

	function runPython(req, res, next) {

        const py = require('child_process').spawn('python', ["python/trend_relation.py"]);
        var data = req.body.inputField;
        var dataString = "";
        /*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
        py.stdout.on('data', function(data){
        	dataString += data.toString();
        });
        py.stdout.on('end', function(){
        	console.log(dataString);
            return res.status(200).json(JSON.stringify(dataString));
        });
        py.stdout.on('error', function(err) {
        	console.log(err.stack);
        })
        py.stdin.write(JSON.stringify(data));
        py.stdin.end();
    }
    function search(req, res, next) {
    	return res.status(200).json({});
    }
    function getSentiment(req, res, next) {
		var data = [655.6158387729641, 810.0323978631739, 636.3042805943716, 383.5088399130936, 147.82221952899044, 47.28190114232879, 85.33789520412222, 81.59912980209458, 44.627244524586274, 58.454702673029914, 48.269581773722194, 22.545191293562425, 52.418039663555504, 44.69757324160997, 21.973264580558492, 16.796825690203008, 21.215696167755482, 25.312795750562685, 48.086267938518915, 7.752902928347126, 22.287285745643914, 20.214185864195656, 45.172498022243076, 26.952293702879956, 15.567965113416008, 5.260669300248594, 6.884258296302505, 4.184901206733187, 3.938389417612285, 22.882579750123796, 22.68400649812378, 34.43630862145878, 21.542878945877987, 231.33013966172132, 223.48757270770687, 0.0, 206.04461167621656, 0.0, 514.9729823048702, 21.28266177420153, 22.882579750123796, 22.882579750123796, 0.0, 38.523322697522815, 23.000968612013935, 0.0, 231.33013966172132, 33.314672695957626, 22.116860905034855, 0.0, 47.71611826323266, 0.0];
		return res.status(200).json(JSON.stringify(data));
	}

}

})(); //closure