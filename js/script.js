// Class NavigatorFader
var NavigatorFader = function(nav) {
    var _this = this;
    this.scroll = $(document).scrollTop();
    this.visible = true;
    this.timeout = null;
    this.activeArea = $(nav).height();
    
    $(document).scroll(function() {
        if (_this.timeout != null)
            window.clearTimeout(_this.timeout);
        _this.timeout = window.setTimeout(function() {
            var newScroll = $(document).scrollTop();
            if (newScroll < _this.scroll && !_this.visible) {
                _this.visible = true;
                $(nav).stop(true, true);
                $(nav).fadeIn(300);
            }
            else if (newScroll > _this.scroll && _this.visible && newScroll > _this.activeArea) {
                _this.visible = false;
                $(nav).stop(true, true);
                $(nav).fadeOut(300);
            }
            _this.scroll = newScroll;
            _this.timeout = null;
        }, 100);
    });
};


var smartCollapse = function() {
    if ($('#main-nav').hasClass('in'))
        $('#main-nav').collapse('hide');
};


var app = angular.module('app', ['ngAnimate', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'templates/home.html'
        }).
        when('/blog', {
            templateUrl: 'templates/blog.html'
        }).
        when('/resume', {
            templateUrl: 'templates/resume.html'
        }).
        when('/projects', {
            templateUrl: 'templates/projects.html',
            controller: 'ProjectsController'
        }).
        otherwise({
            redirectTo: '/'
    });
}]);


var HeaderController = function($scope, $location) {
    $scope.isActive = function(viewLocation) { 
        return viewLocation === $location.path();
    };
};

var ProjectsController = function($scope, $location) {
    $scope.active = 'archetype';
    $scope.isActive = function(project) {
        return project === $scope.active;
    };
    $scope.toggle = function(project) {
        $scope.active = project;
        console.log($scope.active);
    };
    $scope.$on('$viewContentLoaded', function() {
        $('.gallery a').fancybox();
    });

};

$(document).ready(function() {
    var navFader = new NavigatorFader('.navbar');

    $('.body-wrapper').bind('click', smartCollapse);
    $(document).keydown(function(e) {
        if (e.keyCode == 27)
            smartCollapse();
    });
});
