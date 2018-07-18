const glob = require('glob');
const path = require('path');

module.exports = {
    entry: {
        vendor: [
            'angular',
            'angular-animate',
            'angular-breadcrumb',
            'angular-messages',
            'angular-mocks',
            'angular-resource',
            'angular-ui-bootstrap',
            'angular-ui-notification',
            'angular-ui-router',
            'angular-ui-tinymce',
            'ng-img-crop',
            'ng-file-upload',
            'ng-idle',
            'angular-drag-and-drop-lists'
        ],
        appConfig: './modules/core/app/config.js',
        appInit: './modules/core/app/init.js',
        moduleConfig: glob.sync('./modules/*/*.js'),
        modules: glob.sync('./modules/**/*.js', {
            ignore: [   './modules/*/*.js',
                        './main.js',
                        './modules/core/app/config.js',
                        './modules/core/app/init.js'
                    ]
        })
    },
    output: {
        path: path.join(__dirname, './public/dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        mainFiles: ['index', 'compile/minified/ng-img-crop']
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: require.resolve('tinymce/tinymce'),
                use: [
                    'imports-loader?this=>window',
                    'exports-loader?window.tinymce'
                ]
            },
            {
                test: /tinymce\/(themes|plugins)\//,
                use: [
                    'imports-loader?this=>window'
                ]
            }
        ]
    }
}