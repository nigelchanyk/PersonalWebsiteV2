// Class Pagination
Pagination = function(nav, content) {
    this.animating = false;
    this.nav = nav;
    this.content = content;
};

Pagination.prototype.divFadeOut = function(element, callback) {
    var _this = this;
    this.animating = true;
    element.css({
        'margin-left': 0,
        'opacity': 1,
        'width': element.parent().width()
    });
    element.animate({
            'margin-left': '30%',
            'opacity': 0
        },
        500,
        'swing',
        function() {
            element.css('width', 'auto');
            element.removeClass('active');
            _this.animating = false;
            if (callback != null)
                callback();
        }
    );
};

Pagination.prototype.divFadeIn = function(element, callback) {
    var _this = this;
    this.animating = true;
    element.addClass('active');
    element.css({
        'margin-left': '30%',
        'opacity': 0,
        'width': element.parent().width()
    });
    element.animate({
            'margin-left': 0,
            'opacity': 1
        },
        500,
        'swing',
        function() {
            element.css('width', 'auto');
            _this.animating = false;
            if (callback != null)
                callback();
        }
    );
};

Pagination.prototype.register = function(selector) {
    var _this = this;
    $(selector, this.nav).bind('click', function() {
        if ($(selector, _this.content).hasClass('active'))
            return;
        if (_this.animating) {
            $('.active', _this.content).stop(true, true).removeClass('active');
            $('.active', _this.nav).removeClass('active');
            $(selector, _this.content).addClass('active');
            $(selector, _this.content).css({
                'opacity': 1,
                'margin-left': 0,
                'width': 'auto'
            });
        }
        else {
            _this.divFadeOut($('.active', _this.content), function() {
                $('.active', _this.nav).removeClass('active');
                $(selector, _this.content).addClass('active');
                _this.divFadeIn($(selector, _this.content), null);
            });
        }
    });
};


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


$(document).ready(function() {
    var pagination = new Pagination('#main-nav', '.content-wrapper');
    pagination.register('.home');
    pagination.register('.resume');

    var navFader = new NavigatorFader('.navbar');

    $('.body-wrapper').bind('click', smartCollapse);
    $(document).keydown(function(e) {
        if (e.keyCode == 27)
            smartCollapse();
    });
});
