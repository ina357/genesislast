(function (global, factory) {
    global = global;
    global.g2 = global.g2 || {};
    global.g2.textModule = global.g2.textModule || {};
    global.g2.textModule.Component = factory();
}(this, function () { 'use strict';

    var Component = (function (isUndefined) {
        var win = window,
            $ = win.jQuery,
            Util = win.G2.util,
            RESPONSIVE = win.G2.RESPONSIVE;
        function Component (container, args) {
            if (!(this instanceof Component)) {
                return new Component(container, args);
            }
            var defParams = {
                obj : container,
                animateType : 'default',
                tweenObj : null,
                customEvent : '.Component' + (new Date()).getTime() + Math.random(),
                viewType : null
            };
            this.opts = Util.def(defParams, (args || {}));
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        }
        Component.prototype = {
            init : function () {
                this.initOpts();
                this.initLayout();
            },
            initOpts : function () {
                if (this.obj.attr('data-parallax-type') != isUndefined) {
                    this.opts.animateType = 'parallax';
                }
            },
            initLayout : function () {
                if (this.opts.animateType == 'parallax') {
                    this.resizeFunc();
                    this.bindEvents(true);
                } else {
                    this.opts.tweenObj = new PcTween(this.obj);
                }
            },
            changeEvents : function (event) {
                var events = [],
                    eventNames = event.split(' ');
                for (var key in eventNames) {
                    events.push(eventNames[key] + this.opts.customEvent);
                }
                return events.join(' ');
            },
            bindEvents : function (type) {
                if (type) {
                    $(win).on(this.changeEvents('resize orientationchange'), $.proxy(this.resizeFunc, this));
                } else {
                    $(win).off(this.changeEvents('resize orientationchange'));
                }
            },
            resizeFunc : function () {
                this.winWidth = Util.winSize().w;
                if (this.opts.resizeStart == null) {
                    this.opts.resizeStart = this.winWidth;
                    this.resizeAnimateFunc();
                }
                win.clearTimeout(this.resizeEndTime);
                this.resizeEndTime = win.setTimeout($.proxy(this.resizeEndFunc, this), 150);
            },
            resizeEndFunc : function () {
                this.opts.resizeStart = null;
                Util.cancelAFrame.call(win, this.resizeRequestFrame);
            },
            resizeAnimateFunc : function () {
                this.setLayout();
                this.resizeRequestFrame = Util.requestAFrame.call(win, $.proxy(this.resizeAnimateFunc, this));
            },
            controlTooltip : function () {
                var tooltip = this.obj.find('.cm-tooltip');
                for (var i = 0, max = tooltip.length; i < max; i++) {
                    (function (index) {
                        var tt = tooltip.eq(index),
                            instance = tt.data('ToolTip');
                        if (instance.opts.isActive) {
                            instance.close();
                        }
                    })(i);
                }
            },
            setLayout : function () {
                if (this.winWidth < RESPONSIVE.MOBILE.WIDTH) {
                    if (this.opts.viewType !== RESPONSIVE.MOBILE.NAME) {
                        this.opts.viewType = RESPONSIVE.MOBILE.NAME;
                        if (this.opts.tweenObj !== null) {
                            this.opts.tweenObj.destroy();
                        }
                        this.controlTooltip();
                        this.opts.tweenObj = new MoTween(this.obj);
                    }
                } else {
                    if (this.opts.viewType !== 'OTHER') {
                        this.opts.viewType = 'OTHER';
                        if (this.opts.tweenObj !== null) {
                            this.opts.tweenObj.destroy();
                        }
                        this.controlTooltip();
                        this.opts.tweenObj = new PcTween(this.obj);
                    }
                }
            },
            reInit : function (e) {
                // Global Callback
            }
        };
        function PcTween (container, args) {
            var defParams = {
                tweenObj : null,
                directionTweenOpts : {
                    tweenOpts : {
                        "SET" : {
                            "opacity" : 1
                        },
                        "SEQUENCE" : {
                            ".cp-text-module__img" : {
                                "SET" : {
                                    "opacity" : 0,
                                    "transform" : "scale(1.2)"
                                },
                                "TO" : {
                                    "opacity" : 1,
                                    "transform" : "scale(1)"
                                },
                                "DURATION" : 1
                            },
                            ".js-animate" : {
                                "SET" : {
                                    "opacity" : 0,
                                    "y" : 100
                                },
                                "TO" : {
                                    "opacity" : 1,
                                    "y" : 0
                                },
                                "DELAY" : 0.2,
                                "DURATION" : 0.8
                            }
                        }
                    }
                }
            };
            this.opts = Util.def(defParams, (args || {}));
            this.obj = $(container);
            if (!this.obj.length) return;
            this.init();
        };
        PcTween.prototype = {
            init : function () {
                this.buildTween();
            },
            buildTween : function () {
                this.opts.tweenObj = new DirectionTween(this.obj, this.opts.directionTweenOpts);
            },
            destroy : function () {
                if (this.opts.tweenObj == null) return;
                this.opts.tweenObj.controller.destroy();
                this.opts.tweenObj.timelineMax.progress(1).kill();
            }
        };
        function MoTween (container, args) {
            var defParams = {
                obj : container,
                parallaxSection : '.cp-text-module__parallax',
                parallaxWrap : '.cp-text-module__parallax-wrap',
                parallaxSpace : '.cp-text-module__parallax-space',
                parallaxInner : '.cp-text-module__inner',
                parallaxImg : '.cp-text-module__img',
                parallaxContent : '.cp-text-module__content',
                smagicOpts : {
                    triggerHook : 0
                },
                timeline : [],
                isDestroy : false,
                customEvent : '.Component' + (new Date()).getTime() + Math.random(),
                resizeStart : null
            };
            this.opts = Util.def(defParams, (args || {}));
            this.obj = $(container);
            if (!this.obj.length) return;
            this.init();
        };
        MoTween.prototype = {
            init : function () {
                this.setElements();
                this.initOpts();
                this.resizeFunc();
                this.bindEvents(true);
                this.buildController();
                this.buildScene();
            },
            setElements : function () {
                this.parallaxSection = this.obj.find(this.opts.parallaxSection);
                this.parallaxWrap = this.parallaxSection.find(this.opts.parallaxWrap);
                this.parallaxSpace = this.parallaxWrap.find(this.opts.parallaxSpace);
                this.parallaxInner = this.parallaxSpace.find(this.opts.parallaxInner);
                this.parallaxImg = this.parallaxInner.find(this.opts.parallaxImg);
                this.parallaxContent = this.parallaxInner.find(this.opts.parallaxContent);
            },
            initOpts : function () {
                this.opts.smagicOpts['triggerElement'] = this.parallaxSection.get(0);
            },
            changeEvents : function (event) {
                var events = [],
                    eventNames = event.split(' ');
                for (var key in eventNames) {
                    events.push(eventNames[key] + this.opts.customEvent);
                }
                return events.join(' ');
            },
            bindEvents : function (type) {
                if (type) {
                    $(win).on(this.changeEvents('resize orientationchange'), $.proxy(this.resizeFunc, this));
                } else {
                    $(win).off(this.changeEvents('resize orientationchange'));
                }
            },
            resizeFunc : function () {
                this.winWidth = Util.winSize().w;
                if (this.opts.resizeStart == null) {
                    this.opts.resizeStart = this.winWidth;
                    this.resizeAnimateFunc();
                }
                win.clearTimeout(this.resizeEndTime);
                this.resizeEndTime = win.setTimeout($.proxy(this.resizeEndFunc, this), 50);
            },
            resizeEndFunc : function () {
                this.opts.resizeStart = null;
                this.setLayout();
                Util.cancelAFrame.call(win, this.resizeRequestFrame);
            },
            resizeAnimateFunc : function () {
                this.setLayout();
                this.resizeRequestFrame = Util.requestAFrame.call(win, $.proxy(this.resizeAnimateFunc, this));
            },
            setLayout : function () {
                if (this.opts.isDestroy) return;
                var parallaxSectionParent = this.parallaxSection.parent('[data-scrollmagic-pin-spacer]');
                if (parallaxSectionParent.length) {
                    parallaxSectionParent.css({
                        'min-height' : ''
                    });
                }
                // var minHeight = this.parallaxSpace.outerHeight(true);
                // this.parallaxWrap.css('min-height', minHeight);
            },
            buildController : function () {
                this.controller = new ScrollMagic.Controller();
            },
            buildScene : function () {
                var parallaxInner = this.parallaxInner,
                    parallaxImg = this.parallaxImg,
                    parallaxContent = this.parallaxContent,
                    smagicOpts = this.opts.smagicOpts,
                    magicDuration = Util.winSize().h;

                var sectionBox = new TimelineMax();
                sectionBox.to(parallaxInner.get(0), 0, {
                    y : "0%"
                })
                .to(parallaxImg.get(0), 1, {
                    ease: Linear.easeNone,
                    opacity : 0.5,
                    y : "0%"
                });
                new ScrollMagic.Scene(Util.def(smagicOpts, {
                    duration: magicDuration + 'px'
                })).addTo(this.controller).setPin(this.parallaxSection.get(0)).setTween(sectionBox);

                var contentBox = new TimelineMax();
                contentBox.fromTo(parallaxContent.get(0), 1, {
                    y : "100%"
                }, {
                    // delay : 1,
                    ease : Linear.easeNone,
                    y : "0%"
                });
                new ScrollMagic.Scene(Util.def(smagicOpts, {
                    duration: magicDuration + 'px'
                })).addTo(this.controller).setTween(contentBox);

                this.opts.timeline.push(sectionBox);
                this.opts.timeline.push(contentBox);
            },
            destroy : function () {
                this.opts.isDestroy = true;
                this.bindEvents(false);
                this.controller.destroy();
                for (var i = 0, max = this.opts.timeline.length; i < max; i++) {
                    this.opts.timeline[i].progress(1).kill();
                }
                this.parallaxSection.unwrap().removeAttr('style');
                this.parallaxWrap.css('min-height', '');
                this.parallaxInner.css('transform', '');
                this.parallaxImg.css({
                    'opacity' : '',
                    'transform' : ''
                });
                this.parallaxContent.css('transform', '');
            }
        };

        return Component;
    })();
    return Component;

}));

(function (global, factory) {
    $(function () {
        factory();
    });
}(this, function () { 'use strict';

    var Component = (function (isUndefined) {
        var win = window,
            $ = win.jQuery,
            Util = win.G2.util;
        function Component (args) {
            var defParams = {
                obj : '.cp-text-module',
                isAemEditMode : Util.isAemEditMode()
            };
            this.opts = Util.def(defParams, (args || {}));
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        }
        Component.prototype = {
            init : function () {
                if (!this.opts.isAemEditMode) {
                    this.callComponent();
                }
            },
            callComponent : function () {
                for (var i = 0, max = this.obj.length; i < max; i++) {
                    new win.g2.textModule.Component(this.obj.eq(i));
                }
            }
        };
        return new Component();
    })();
    return Component;

}));
