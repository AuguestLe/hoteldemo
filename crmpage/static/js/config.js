/**
 * @file requirejs config
 * @author zhajiashun(zhajiashun@baidu.com)
 */
require.config({
    urlArgs: 'v=' + new Date().getTime(),
    baseUrl: './',
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        datepicker0: {
            deps: ['bootstrap'],
            exports: 'jQuery'
        },
        datepicker: {
            deps: ['datepicker0'],
            exports: 'jQuery'
        },
        paginator: {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        validator: {
            deps: ['bootstrap'],
            exports: 'jQuery'
        },
        'typeahead.js': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    },
    paths: {
        'env': 'module/common/env',
        'common': 'module/common/common',
        'text': 'bower_components/requirejs-text/text',
        'jqueryui': 'bower_components/jquery-ui/jquery-ui',
        'underscore': 'bower_components/underscore/underscore',
        'md5': 'bower_components/JavaScript-MD5/js/md5',
        'router': 'bower_components/router.js/dist/router.min',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        'datepicker0': 'bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker',
        'datepicker': 'bower_components/bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min',
        'timepicker': 'bower_components/jt.timepicker/jquery.timepicker',
        'datetimepicker': 'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        'moment': 'bower_components/moment/min/moment-with-locales.min',
        'validator': 'bower_components/bootstrap-validator/dist/validator',
        'paginator': 'bower_components/twbs-pagination/jquery.twbsPagination',
        'toastr': 'bower_components/toastr/toastr',
        'bootbox': 'bower_components/bootbox/bootbox',
        'jquery.ui.widget': 'bower_components/jquery-file-upload/js/vendor/jquery.ui.widget',
        'jquery.fileupload': 'bower_components/jquery-file-upload/js/jquery.fileupload',
        'jquery.crossfileupload': 'bower_components/jquery-file-upload/js/jquery.iframe-transport',
        'tokenfield': 'bower_components/bootstrap-tokenfield/dist/bootstrap-tokenfield',
        'select2': 'bower_components/select2/dist/js/select2',
        'webuploader': 'bower_components/uploade/webuploader.min',
        'toomode':'model/consol',
        'datapak':'bower_components/datapika/pikaday',
        'jqpage':'bower_components/jquerpage/jqupage'
    }
});
