'use strict';

require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrapAffix: '../bower_components/bootstrap/js/affix',
        bootstrapAlert: '../bower_components/bootstrap/js/alert',
        bootstrapButton: '../bower_components/bootstrap/js/button',
        bootstrapCarousel: '../bower_components/bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/bootstrap/js/collapse',
        bootstrapDropdown: '../bower_components/bootstrap/js/dropdown',
        bootstrapModal: '../bower_components/bootstrap/js/modal',
        bootstrapPopover: '../bower_components/bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/bootstrap/js/transition',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        requirejs: '../bower_components/requirejs/require',
        phaser: '../bower_components/phaser-official/build/phaser',
        almond: '../bower_components/almond/almond',
        'phaser-official': '../bower_components/phaser-official/build/phaser',
        underscore: '../node_modules/underscore/underscore-min.js'
    },
    shim: {
        bootstrapAffix: {
            deps: [
                'jquery'
            ]
        },
        bootstrapAlert: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapButton: {
            deps: [
                'jquery'
            ]
        },
        bootstrapCarousel: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapCollapse: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapDropdown: {
            deps: [
                'jquery'
            ]
        },
        bootstrapModal: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapPopover: {
            deps: [
                'jquery',
                'bootstrapTooltip'
            ]
        },
        bootstrapScrollspy: {
            deps: [
                'jquery'
            ]
        },
        bootstrapTab: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapTooltip: {
            deps: [
                'jquery',
                'bootstrapTransition'
            ]
        },
        bootstrapTransition: {
            deps: [
                'jquery'
            ]
        },
        phaser: {
            exports: 'Phaser'
        },
        underscore: {
            exports: '_'
        }
    }
});


require(['phaser', 'app', 'util'], function(Phaser, App) {
    var app = new App();
    app.start();
});