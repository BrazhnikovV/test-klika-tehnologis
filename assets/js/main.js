// импортировать React.js (расширение .js необязательно)
var React = require('react');
// импортировать ReactDom.js 
var ReactDOM = require('react-dom');

// JS эквивалентно любому нормальному пакету "bootstrap"
// не надо устанавливать это в переменную, просо запросите его
require('bootstrap-sass');

// загружает пакет jquery из node_modules
var $ = require('jquery');

// импортировать функцию из Filter.js
// ./ (or ../) means to look for a local file
var Filter = require('./Filter').default;
//var create_filter = Filter();
ReactDOM.render(<Filter/>, document.getElementById('root'));

//$().ready(function(){   
//    var tbody_td_width = $( "#table table > tbody > tr > td" ).outerWidth();
//    $('table > thead', this).css({'position':'fixed'});
//    $('table > thead > tr > th', this).css({'width': tbody_td_width+'px'})//;
//
//    $(window).on('resize', function() {
//        var resize_tbody_td_width = $( "#table table > tbody > tr > td" ).outerWidth();
//        $('#table table > thead > tr > th').css({'width': resize_tbody_td_width+'px'});
//    });
//});


