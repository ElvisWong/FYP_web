module.exports = {
	database: { url: 'mongodb://localhost:27017/test_database' },
	build: {
		servers: {
			dev: {
				root: 'app/', 
				port: 8080, 
				reloadPort: 35729
			}
		},
		paths: {
			dist: './dist',
			shell: {
				base: '/views/layout/shell.html',
				minCSS: 'app.min.css',
				minJS: 'app.min.js'
			},
			appRoot: [ './app/app.module.js' ],
			js: [ 
				'./app/**/*.js',
				'./app/_app.js',
				'./app/home/_home.js'
			 ],
			less: [ './app/**/*.less' ],
			views: [ './app/**/*.jade' ],
			statics: [ './client/**' ]
		}
	}
};