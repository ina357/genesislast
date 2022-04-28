(function (global, factory) {
    global = global;
    global.g2 = global.g2 || {};
    global.g2.cpFullTabs = global.g2.cpFullTabs || {};
    global.g2.cpFullTabs.Component = factory();
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
                props : {},
                cmBtnSwiper : '.cp-full-tabs__nav',
                navWrap : '.carousel-nav',
                navList : '.carousel-nav-list',
                navItem : '.carousel-nav__item',
                navControls : '.carousel-nav-controls',
                globalText : {},
                isInArea : false,
                customEvent : '.Component' + (new Date()).getTime() + Math.random(),
                viewType : null,
                scrollStart : null,
                resizeStart : null
            };
            this.opts = Util.def(defParams, (args || {}));
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        }
        Component.prototype = {
            init : function () {
                this.setElements();
                this.initOpts();
                this.buildTimer();
                this.buildControl();
                this.buildTab();
                this.resizeFunc();
                this.bindEvents(true);
            },
            setElements : function () {
                this.cmBtnSwiper = this.obj.find(this.opts.cmBtnSwiper);
                this.navWrap = this.cmBtnSwiper.find(this.opts.navWrap);
                this.navList = this.navWrap.find(this.opts.navList);
                this.navItem = this.navList.find(this.opts.navItem);
                this.navControls = this.cmBtnSwiper.find(this.opts.navControls);
            },
            initOpts : function () {
                // globalText
                var globalText = this.obj.data('global-text');
                if (globalText !== isUndefined) {
                    for (var gKey in globalText) {
                        var gText = $.trim(globalText[gKey]);
                        this.opts.globalText[gKey] = gText.length ? gText : gKey;
                    }
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
                    $(win).on(this.changeEvents('scroll'), $.proxy(this.scrollFunc, this));
                    $(win).on(this.changeEvents('resize orientationchange'), $.proxy(this.resizeFunc, this));
                } else {
                    $(win).off(this.changeEvents('scroll'));
                    $(win).off(this.changeEvents('resize orientationchange'));
                }
            },
            setOpts : function () {
                var offset = this.obj.offset(),
                    height = this.obj.outerHeight(true);
                this.opts.props['offset'] = offset.top;
                this.opts.props['minOffset'] = Math.ceil(offset.top - Util.winSize().h, 10);
                this.opts.props['maxOffset'] = Math.ceil(offset.top + height, 10);
            },
            scrollTimerControl : function () {
                var props = this.opts.props,
                    winTop = $(win).scrollTop();
                if (props.minOffset <= winTop && winTop < props.maxOffset) {
                    if (!this.opts.isInArea) {
                        this.opts.isInArea = true;
                        this.controller.isPlay = false;
                        this.timer.play(this.timer.activeIndex);
                        this.tab.play(this.timer.activeIndex);
                    }
                } else {
                    if (this.opts.isInArea) {
                        this.opts.isInArea = false;
                        this.controller.isPlay = true;
                        this.timer.pause(this.timer.activeIndex);
                        this.tab.pause(this.timer.activeIndex);
                    }
                }
            },
            isInActiveControl : function () {
                if (!this.opts.isInArea) {
                    this.controller.isPlay = true;
                    this.timer.pause(this.timer.activeIndex);
                    this.tab.pause(this.timer.activeIndex);
                }
            },
            scrollFunc : function () {
                this.winTop = $(win).scrollTop();
                if (this.opts.scrollStart == null) {
                    this.opts.scrollStart = this.winTop;
                    this.scrollAnimateFunc();
                }
                win.clearTimeout(this.scrollEndTimeout);
                this.scrollEndTimeout = win.setTimeout($.proxy(this.scrollEndFunc, this), 60);
            },
            scrollEndFunc : function () {
                this.opts.scrollStart = null;
                Util.cancelAFrame.call(win, this.scrollRequestFrame);
            },
            scrollAnimateFunc : function () {
                this.setOpts();
                this.scrollTimerControl();
                this.scrollRequestFrame = Util.requestAFrame.call(win, $.proxy(this.scrollAnimateFunc, this));
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
                this.setOpts();
                this.scrollFunc();
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
                        this.controlTooltip();
                        var activeIndex = (this.timer.activeIndex == null) ? 0 : this.timer.activeIndex;
                        this.tab.reset(activeIndex);
                        this.timer.reset(activeIndex);
                        this.timer.pause(activeIndex);
                    }
                } else {
                    if (this.opts.viewType !== 'OTHER') {
                        this.opts.viewType = 'OTHER';
                        this.controlTooltip();
                        var activeIndex = (this.timer.activeIndex == null) ? 0 : this.timer.activeIndex;
                        this.tab.reset(activeIndex);
                        if (this.controller.isPlay) {
                            this.tab.pause(activeIndex);
                        } else {
                            this.tab.play(activeIndex);
                        }
                        this.timer.reset(activeIndex);
                        this.timer.play(activeIndex);
                    }
                }
            },
            buildTimer : function () {
                Util.def(this, {
                    timer : {
                        instance : [],
                        activeIndex : null,
                        play : $.proxy(function (num) {
                            if (this.timer.instance[num] == isUndefined) return;
                            if (this.controller.isPlay) return;
                            this.controller.controlClass(false);
                            this.timer.instance[num].play();
                        }, this),
                        pause : $.proxy(function (num) {
                            if (this.timer.instance[num] == isUndefined) return;
                            this.controller.controlClass(true);
                            this.timer.instance[num].pause();
                        }, this),
                        reset : $.proxy(function (num) {
                            if (this.timer.instance[num] == isUndefined) return;
                            this.timer.instance[num].progress(0);
                        }, this),
                        build : $.proxy(function (num, autoplay) {
                            if (this.timer.instance[num] == isUndefined) {
                                this.timer.instance[num] = new Timer(this.navItem.eq(num), {
                                    autoPlay : autoplay,
                                    on : {
                                        complete : $.proxy(function () {
                                            this.controlTooltip();
                                            this.timer.reset(num);
                                            var next = num + 1;
                                            if (next >= this.navItem.length) {
                                                next = 0;
                                            }
                                            this.timer.activeIndex = next;
                                            this.tab.play(next);
                                        }, this)
                                    }
                                });
                                this.timer.build(num);
                            } else {
                                this.timer.activeIndex = num;
                                if (this.opts.viewType !== RESPONSIVE.MOBILE.NAME) {
                                    this.timer.play(num);
                                    this.isInActiveControl();
                                }
                            }
                        }, this)
                    }
                });
            },
            buildControl : function () {
                Util.def(this, {
                    controller : {
                        instance : null,
                        isPlay : false,
                        controlClass : $.proxy(function (type) {
                            if (this.controller.instance == null) return;
                            this.controller.instance.controlClass(type);
                        }, this),
                        build : $.proxy(function () {
                            if (this.navControls.length && (this.navItem.length > 1)) {
                                this.controller.instance = new Controller(this.obj, {
                                    navControls : this.opts.navControls,
                                    isPlay : this.controller.isPlay,
                                    globalText : this.opts.globalText,
                                    on : {
                                        play : $.proxy(function () {
                                            this.controller.isPlay = true;
                                            this.timer.pause(this.timer.activeIndex);
                                            this.tab.pause(this.timer.activeIndex);
                                        }, this),
                                        pause : $.proxy(function () {
                                            this.controller.isPlay = false;
                                            this.timer.play(this.timer.activeIndex);
                                            this.tab.play(this.timer.activeIndex);
                                        }, this)
                                    }
                                });
                            } else {
                                this.navControls.hide();
                            }
                        }, this)
                    }
                });
                this.controller.build();
            },
            buildTab : function () {
                var startItem = $.proxy(function () {
                    this.timer.reset(this.timer.activeIndex);
                }, this);
                var completeItem = $.proxy(function () {
                    if (this.tab.instance == null) return;
                    var currentIndex = this.tab.instance.opts.currentIndex,
                        tabs = this.tab.instance.opts.tabs[currentIndex],
                        tabVideo = tabs.tabVideo;
                    if (tabVideo == null) {
                        this.timer.build(currentIndex, 5);
                    } else {
                        if (tabVideo.attr('data-video-loaded') == isUndefined) {
                            tabVideo.on('videoLoaded', $.proxy(function () {
                                this.timer.build(currentIndex, tabVideo.find('video')[0].duration);
                            }, this));
                            if (!this.tab.instance.opts.isPlay) {
                                this.timer.activeIndex = currentIndex;
                            }
                        } else {
                            this.timer.build(currentIndex, tabVideo.find('video')[0].duration);
                        }
                    }
                }, this);
                Util.def(this, {
                    tab : {
                        instance : null,
                        play : $.proxy(function (index) {
                            if (this.tab.instance == null) return;
                            this.tab.instance.play(index);
                        }, this),
                        pause : $.proxy(function (index) {
                            if (this.tab.instance == null) return;
                            this.tab.instance.pause(index);
                        }, this),
                        reset : $.proxy(function (index) {
                            if (this.tab.instance == null) return;
                            this.tab.instance.reset(index);
                        }, this),
                        build : $.proxy(function () {
                            if (!this.navItem.length) return;
                            this.tab.instance = new Tab(this.obj, {
                                cmBtnSwiper : this.opts.cmBtnSwiper,
                                on : {
                                    start : $.proxy(function () {
                                        startItem();
                                    }, this),
                                    complete : $.proxy(function () {
                                        completeItem();
                                    }, this)
                                }
                            });
                        }, this)
                    }
                });
                this.tab.build();
                completeItem();
            },
            reInit : function (e) {
                // Global Callback
            }
        };
        function Tab (container, args) {
            var defParams = {
                cmBtnSwiper : null,
                tabBtn : '.tab-btn',
                cmTabContent : '.cp-full-tabs__carousel-wrap, .cp-full-tabs__content',
                cmTabItem : '.cp-full-tabs__carousel-item, .cp-full-tabs__item',
                carouselContainer : '.swiper-container',
                carouselWrapper : '.swiper-wrapper',
                carouselItem : '.swiper-slide',
                carouselInstance : null,
                swiperInstance : null,
                carouselOpts : {
                    autoHeight : false,
                    slidesPerView: 'auto',
                    slidesPerGroup: 1
                },
                tabs : [],
                animating : false,
                duration : 200,
                classAttr : {
                    active : 'is-active'
                },
                autoPlay : true,
                customEvent : '.Component' + (new Date()).getTime() + Math.random(),
                on : {
                    start : null,
                    complete : null
                }
            };
            this.opts = Util.def(defParams, (args || {}));
            this.obj = $(container);
            if (!this.obj.length) return;
            this.init();
        };
        Tab.prototype = {
            init : function () {
                this.setElements();
                this.buildData();
                this.initLayout();
                this.buildCarousel();
                this.bindEvents(true);
            },
            setElements : function () {
                this.cmBtnSwiper = this.obj.find(this.opts.cmBtnSwiper);
                this.tabBtns = this.cmBtnSwiper.find(this.opts.tabBtn);
                this.cmTabContent = this.obj.find(this.opts.cmTabContent);
                this.cmTabItem = this.obj.find(this.opts.cmTabItem);
                this.carouselContainer = this.cmBtnSwiper.find(this.opts.carouselContainer);
                this.carouselWrapper = this.carouselContainer.find(this.opts.carouselWrapper);
                this.slides = this.carouselWrapper.find(this.opts.carouselItem);
            },
            buildData : function () {
                for (var tbMin = 0, tbMax = this.tabBtns.length; tbMin < tbMax; tbMin++) {
                    var _tabBtn = this.tabBtns.eq(tbMin),
                        _tabBtnName = _tabBtn.attr('data-tabtarget-name'),
                        _tabCont = this.cmTabItem.filter('[data-tabtarget="' + _tabBtnName  +'"]'),
                        _tabVideo = _tabCont.find('.video-container');
                    this.opts.tabs[tbMin] = {
                        tab : _tabBtn,
                        activeTab : _tabBtn.closest('li'),
                        tabCont : _tabCont,
                        tabVideo : _tabVideo.length ? _tabVideo : null
                    }
                }
            },
            initLayout : function () {
                var _this = this,
                    _activeTabBtn = this.tabBtns.filter(function () {
                        var _target = $(this);
                        return $(this).closest('li').hasClass(_this.opts.classAttr.active);
                    }),
                    _activeIndex = this.tabBtns.index(_activeTabBtn),
                    _index = _activeIndex < 0 ? 0 : _activeIndex;
                for (var tbMin = 0, tbMax = this.opts.tabs.length; tbMin < tbMax; tbMin++) {
                    (function (index) {
                        var tab = _this.opts.tabs[index];
                        if (_index == index) {
                            tab.activeTab.addClass(_this.opts.classAttr.active);
                            tab.tabCont.addClass(_this.opts.classAttr.active).css('display', '');
                            if (tab.tabVideo !== null) {
                                tab.tabVideo.removeAttr('data-use-scrollmagic');
                            }
                        } else {
                            tab.activeTab.removeClass(_this.opts.classAttr.active);
                            tab.tabCont.removeClass(_this.opts.classAttr.active).hide();
                            if (tab.tabVideo !== null) {
                                tab.tabVideo.attr('data-use-scrollmagic', 'false');
                            }
                        }
                    })(tbMin);
                }
                this.opts.currentIndex = _index;
            },
            buildCarousel : function () {
                if (this.opts.carouselInstance == null) {
                    this.opts.carouselOpts['breakpoints'] = {
                        768 : {
                            slidesPerView : this.slides.length,
                            slidesPerGroup : this.slides.length
                        }
                    };
                    this.opts.carouselInstance = new HiveSwiper(this.cmBtnSwiper, this.opts.carouselOpts);
                    this.opts.swiperInstance = this.opts.carouselInstance.carousel;
                }
            },
            carouselAutoFocus : function (type) {
                if (this.opts.carouselInstance == null) return;
                this.opts.carouselInstance.controlAutoFocus(type);
            },
            slideTo : function (index, speed) {
                if (this.opts.carouselInstance == null) return;
                var speedTime = speed;
                this.opts.swiperInstance.slideTo(index, speed);
                if (speed == isUndefined) {
                    speedTime = this.opts.swiperInstance.params.speed;
                }
                win.setTimeout($.proxy(function () {
                    this.carouselAutoFocus(true);
                }, this), speedTime);
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
                    this.tabBtns.on(this.changeEvents('touchstart mousedown'), $.proxy(this.openerInFocus, this));
                    this.tabBtns.on(this.changeEvents('click'), $.proxy(this.cmTabBtnsClick, this));
                } else {
                    this.tabBtns.off(this.changeEvents('touchstart mousedown'));
                    this.tabBtns.off(this.changeEvents('click'));
                }
            },
            contAnimate : function (type, callback) {
                var _this = this;
                var cmTabContents = this.cmTabContent,
                    cb = (callback || function () {});
                if (type) {
                    var loadRank = 0;
                    for (var ctMin = 0, ctMax = cmTabContents.length; ctMin < ctMax; ctMin++) {
                        (function (index) {
                            var cmTabContent = cmTabContents.eq(index),
                                cmTabActiveItem = cmTabContent.find(_this.opts.cmTabItem).filter('.' + _this.opts.classAttr.active);
                            Util.imgLoaded(cmTabContent).done($.proxy(function () {
                                var currentHeight = Util.getBoundingClientRect(cmTabContent).height;
                                var targetHeight = Util.getBoundingClientRect(cmTabActiveItem).height;
                                var completeFunc = $.proxy(function () {
                                    cmTabContent.stop().css('height', '');
                                    loadRank++;
                                    if (loadRank == (ctMax)) {
                                        cb();
                                    }
                                }, _this);
                                if (currentHeight == targetHeight) {
                                    completeFunc();
                                } else {
                                    TweenLite.to(cmTabContent, (250 / 1000), {
                                        height: targetHeight,
                                        onComplete : $.proxy(function () {
                                            completeFunc();
                                        }, _this)
                                    });
                                }
                            }, _this));
                        })(ctMin);
                    }
                } else {
                    for (var ctMin = 0, ctMax = cmTabContents.length; ctMin < ctMax; ctMin++) {
                        var cmTabContent = cmTabContents.eq(ctMin),
                            cmTabActiveItem = cmTabContent.find(_this.opts.cmTabItem).filter('.' + _this.opts.classAttr.active);
                        cmTabContent.css('height', Util.getBoundingClientRect(cmTabActiveItem).height);
                    }
                    cb();
                }
            },
            openerInFocus : function () {
                this.carouselAutoFocus(false);
            },
            cmTabBtnsClick : function (e) {
                e.preventDefault();
                var _this = this;
                var _target = $(e.currentTarget),
                    _index = this.tabBtns.index(_target);
                this.slideTo(_index);

                // animation
                var tabs = this.opts.tabs,
                    _tabBtn = $(e.currentTarget),
                    _index = this.tabBtns.index(_tabBtn),
                    _activeFunc = $.proxy(function (oldIndex) {
                        TweenLite.fromTo(tabs[_index].tabCont, (this.opts.duration / 1000), {
                            opacity : 0
                        },{
                            opacity : 1,
                            display : 'block',
                            onComplete : $.proxy(function () {
                                if (oldIndex !== null && tabs[oldIndex].tabVideo !== null) {
                                    tabs[oldIndex].tabVideo.attr('data-use-scrollmagic', 'false');
                                    tabs[oldIndex].tabVideo.trigger('hiveVideoPause');
                                    tabs[oldIndex].tabVideo.trigger('hiveVideoSetTime', 0);
                                }
                                if (this.opts.autoPlay) {
                                    if (tabs[_index].tabVideo !== null) {
                                        tabs[_index].tabVideo.attr('data-use-scrollmagic', 'true');
                                        tabs[_index].tabVideo.trigger('hiveVideoPlay');
                                    }
                                }
                            }, this)
                        });
                        win.setTimeout($.proxy(function () {
                            var allLoadFunc = $.proxy(function () {
                                this.contAnimate(true, $.proxy(function () {
                                    win.G2.page.stickyReposition();
                                    this.outCallback('complete');
                                }, this));
                            }, this);
                            this.opts.animating = false;
                            if (tabs[_index].tabVideo !== null) {
                                var videoNotLoadeds = tabs[_index].tabVideo.not('[data-video-loaded="true"]'),
                                    videoLoadRank = 0;
                                if (videoNotLoadeds.length) {
                                    for (var vnMin = 0, vnMax = videoNotLoadeds.length; vnMin < vnMax; vnMin++) {
                                        (function (vIndex) {
                                            var videoNotLoaded = videoNotLoadeds.eq(vIndex);
                                            videoNotLoaded.on('videoLoaded', $.proxy(function () {
                                                videoLoadRank++;
                                                if (videoLoadRank == vnMax) {
                                                    allLoadFunc();
                                                }
                                            }, _this));
                                        })(vnMin);
                                    }
                                    if (!this.opts.autoPlay) {
                                        allLoadFunc();
                                    }
                                } else {
                                    allLoadFunc();
                                }
                            } else {
                                allLoadFunc();
                            }
                        }, this), this.opts.duration);
                    }, this);
                if (this.opts.currentIndex === _index || this.opts.animating) return;
                this.opts.animating = true;
                this.contAnimate(false);
                this.outCallback('start');
                tabs[_index].activeTab.addClass(this.opts.classAttr.active);
                tabs[_index].tabCont.addClass(this.opts.classAttr.active);
                if (this.opts.currentIndex !== null) {
                    var oldIndex = this.opts.currentIndex;
                    tabs[this.opts.currentIndex].activeTab.removeClass(this.opts.classAttr.active);
                    tabs[this.opts.currentIndex].tabCont.removeClass(this.opts.classAttr.active);
                    TweenLite.fromTo(tabs[this.opts.currentIndex].tabCont, (this.opts.duration / 1000), {
                        opacity : 1,
                        display : 'block'
                    }, {
                        opacity : 0,
                        display : 'none'
                    });
                    win.setTimeout(function () {
                        _activeFunc(oldIndex);
                    }, this.opts.duration);
                } else {
                    _activeFunc(null);
                }
                this.opts.currentIndex = _index;
            },
            play : function (num) {
                this.opts.autoPlay = true;
                if (num == this.opts.currentIndex) {
                    var tabs = this.opts.tabs;
                    if (tabs[num].tabVideo !== null) {
                        tabs[num].tabVideo.attr('data-use-scrollmagic', 'true');
                        tabs[num].tabVideo.trigger('hiveVideoPlay');
                    }
                } else {
                    this.tabBtns.eq(num).triggerHandler('click');
                }
            },
            pause : function (num) {
                this.opts.autoPlay = false;
                var tabs = this.opts.tabs;
                if (tabs[num].tabVideo !== null) {
                    tabs[num].tabVideo.attr('data-use-scrollmagic', 'false');
                    tabs[num].tabVideo.trigger('hiveVideoPause');
                }
            },
            reset : function (num) {
                var tabs = this.opts.tabs;
                if (tabs[num].tabVideo !== null) {
                    tabs[num].tabVideo.trigger('hiveVideoSetTime', 0);
                }
            },
            outCallback : function (ing) {
                var callbackObj = this.opts.on[ing];
                if (callbackObj == null) return;
                callbackObj();
            }
        };
        function Controller (container, args) {
            if (!(this instanceof Controller)) {
                return new Controller(container, args);
            }
            var defParams = {
                navControls : null,
                controlBtn : '.btn-controls',
                isPlay : true,
                classAttr : {
                    play : 'is-play',
                    pause : 'is-pause'
                },
                customEvent : '.Controller' + (new Date()).getTime() + Math.random(),
                globalText : {},
                on : {
                    play : null,
                    pause : null
                }
            };
            this.opts = Util.def(defParams, (args || {}));
            this.obj = $(container);
            if (!this.obj.length) return;
            this.init();
        };
        Controller.prototype = {
            init : function () {
                this.setElements();
                this.initLayout();
                this.bindEvents(true);
            },
            setElements : function () {
                this.navControls = this.obj.find(this.opts.navControls);
                this.controlBtn = this.navControls.find(this.opts.controlBtn);
            },
            initLayout : function () {
                this.controlClass(this.opts.isPlay);
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
                    this.controlBtn.on(this.changeEvents('click'), $.proxy(this.controlClickFunc, this));
                } else {
                    this.controlBtn.off(this.changeEvents('click'));
                }
            },
            controlClickFunc : function (e) {
                e.preventDefault();
                this.opts.isPlay = !this.opts.isPlay;
                if (this.opts.isPlay) {
                    this.outCallback('play');
                } else {
                    this.outCallback('pause');
                }
                this.controlClass(this.opts.isPlay);
            },
            controlClass : function (type) {
                var globalText = this.opts.globalText,
                    classAttr = this.opts.classAttr;
                if (type) {
                    if (this.controlBtn.hasClass(classAttr.play)) return;
                    this.controlBtn.addClass(classAttr.play).removeClass(classAttr.pause);
                    this.controlBtn.find('.blind').text(globalText['Play']);
                } else {
                    if (this.controlBtn.hasClass(classAttr.pause)) return;
                    this.controlBtn.addClass(classAttr.pause).removeClass(classAttr.play);
                    this.controlBtn.find('.blind').text(globalText['Pause']);
                }
                this.opts.isPlay = type;
            },
            outCallback : function (ing) {
                var callbackObj = this.opts.on[ing];
                if (callbackObj == null) return;
                callbackObj();
            }
        };
        function Timer (container, args) {
            if (!(this instanceof Timer)) {
                return new Timer(container, args);
            }
            var defParams = {
                lineInner : '.line-inner',
                autoPlay : 6,
                progress : null,
                remainFill : null,
                on : {
                    complete : null
                }
            };
            this.opts = Util.def(defParams, (args || {}));
            this.obj = $(container);
            if (!this.obj.length) return;
            this.init();
        };
        Timer.prototype = {
            init : function () {
                this.setElements();
                this.initOpts();
                this.initLayout();
            },
            setElements : function () {
                this.lineInner = this.obj.find(this.opts.lineInner);
            },
            initOpts : function () {
                this.opts.autoPlay = this.opts.autoPlay * 1000;
                this.opts.remainFill = this.opts.autoPlay;
            },
            initLayout : function () {
                this.lineInner.css('width', 0);
            },
            play : function () {
                this.lineInner.stop().animate({
                    'width' : '100%'
                }, {
                    duration : this.opts.remainFill,
                    easing : 'linear',
                    step : $.proxy(function (data) {
                        this.opts.progress = data;
                    }, this),
                    complete : $.proxy(function () {
                        this.outCallback('complete');
                    }, this)
                });
            },
            pause : function () {
                this.stop(this.opts.progress);
            },
            stop : function (num) {
                var ramainDuration = 100 - num,
                    ramainDurationPercent = ramainDuration / 100;
                this.lineInner.stop().css('width', num + '%');
                this.opts.remainFill = this.opts.autoPlay * ramainDurationPercent;
                this.opts.progress = num;
            },
            progress : function (num) {
                if (num == isUndefined) {
                    num = 0;
                }
                if (num < 0) {
                    num = 0;
                } else if (num >= 1) {
                    num = 1;
                }
                this.stop(num * 100);
            },
            outCallback : function (ing) {
                var callbackObj = this.opts.on[ing];
                if (callbackObj == null) return;
                callbackObj();
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
                obj : '.cp-full-tabs'
            };
            this.opts = Util.def(defParams, (args || {}));
            if (!(this.obj = $(this.opts.obj)).length) return;
            this.init();
        }
        Component.prototype = {
            init : function () {
                this.callComponent();
            },
            callComponent : function () {
                for (var i = 0, max = this.obj.length; i < max; i++) {
                    new win.g2.cpFullTabs.Component(this.obj.eq(i));
                }
            }
        };
        return new Component();
    })();
    return Component;

}));
