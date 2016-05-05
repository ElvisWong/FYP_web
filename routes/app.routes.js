(function() { // closure

module.exports = appRoutes;

function appRoutes(router, parser, multiparser, cookie) {
    var api =
        router
            .get('/files/*', parser.json(), getFile)
            .get('*', parser.json(), shell)
            .get('/:name', parser.json(), template);

    return api;

    function shell(req, res, next) {
        var params = req.params[0];
        if (params.indexOf('.map') >= 0) return;
        res.sendFile('index.html', {root: './dist'});
    }
    function template(req, res, next) {
        var name = req.params.name;
        res.render(name);
    }
    function getFile(req, res, next) {
        /*/
        if (!req.session.user) {
            res.statusCode = 302;
            res.setHeader("Location", "/login");
            res.end();
        }
        /*/
        var file = req.url.split('?')[0].replace('/files', '');
        res.sendFile(file, {root: './uploads/'});
    }

}

})(); // closure