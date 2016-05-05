(function() { // closure

module.exports = httpDetector;

function httpDetector(req, res, next) {
    var isHttps = (req.headers['x-secure-connection']);

    if (!isHttps) {
        // redirect back to http
        var host = req.get('host');

        // do not redirect if we are running locally
        if (host.indexOf('localhost') !== -1) {
            return next();
        }
        
        var httpsUrl = 'https://' + req.get('host') + req.originalUrl;
        res.redirect(httpsUrl);
    } else {
        next();
    }
}

})(); // closure
