(function() {
    autograph.portfolio = {
        btWidth: 38,
        itemsInSlide: 4,
        itemsCount: 0,
        slidesCount: 0,
        currentStep: 0,
        previousStep: 0,
        currentIndex: 0,
        maxIndex: 0,
        partialShift: false,

        dotDraft: function() {
            return '<li class="bt_dot"></li>';
        },

        bindEvents: function() {
            var self = this;

            $(document).on('click', '.js-slider-group .slider_group_item_preview', this.showWork.bind(this));
            $(document).on('click', '.js-paranja, .js-closer', this.hideWork.bind(this));
            $(document).on('click', '.js-portfolio_controls_preview li', this.changeWork.bind(this));
            $(document).on('click', '.js-portfolio-bt-left, .js-portfolio-bt-right', this.triggerShowWork.bind(this));
            $(document).on('click', '.js-bt-left, .js-bt-right, .js-slider-dots li', this.nextSlide.bind(this));
            $(window).on('resize', function() {
                self.setSizes();
            });
        },

        getSlidesCount: function() {
            if (!this.itemsCount) {
                return 0;
            }

            var slides = this.itemsCount / this.itemsInSlide;
            if (slides && slides % 1 > 0) {
                this.partialShift = true;
                slides = parseInt(slides, 10) + 1;
            }

            return slides;
        },

        setControls: function() {
            var controls = '',
                i = this.slidesCount;

            while (i) {
                controls += this.dotDraft();
                i--;
            }

            $('.js-slider-dots').html(controls);
            $('.js-slider-dots li:first').addClass('bt_dot__active');
            $('.js-slider-controls').css({
                width: this.btWidth * this.slidesCount + 'px'
            });
        },

        setSizes: function() {
            this.slideWidth = window.innerWidth;

            if (this.partialShift) {
                this.lastShift = this.slideWidth * (this.slidesCount - this.itemsCount / this.itemsInSlide);
            }

            $('li', this.slider).css({
                'width': this.slideWidth / this.itemsInSlide + 'px'
            });

            this.slider.css({
                'width': '9999px'
            });
        },

        nextSlide: function(event) {
            if (!event) {
                return;
            }

            var shift,
                dir;

            this.previousStep = this.currentStep;

            if (event.target.className.match('dot')) {
                this.currentStep = $(event.target).index();
            } else {
                dir = event.target.className.match('left') ? -1 : 1;
                if ((this.currentStep <= 0 && dir == -1) || (this.currentStep >= this.slidesCount - 1 && dir == 1)) {
                    return;
                }

                this.currentStep += dir;
            }

            currentShift = (this.slider.css('left').replace('px', '') || 0);
            shift = currentShift - (this.currentStep - this.previousStep) * this.slideWidth;

            if (this.partialShift) {
                if (this.currentStep === this.slidesCount - 1 && (this.previousStep < this.currentStep)) {
                    shift += this.lastShift;
                }

                if (this.currentStep === 0 && (this.previousStep > this.currentStep)) {
                    shift = 0;
                }
            }

            this.slider.css({
                'left': shift
            });

            $('.js-slider-dots li').removeClass('bt_dot__active');
            $('.js-slider-dots li').get(this.currentStep).className += ' bt_dot__active';
        },

        showWork: function(event, target) {
            if (!event && !target) {
                return;
            }

            var elem = $(event && event.target || target);
            if (!elem) {
                return;
            }

            var data = elem.data() || {};

            $('.js-portfolio_controls_preview .portfolio_controls_preview_list').hide();
            $('.js-portfolio').css({
                'background-image': elem.css('background-image')
            });

            this.currentIndex = data.index || 0;
            var preview = $('.js-portfolio_controls_preview .portfolio_controls_preview_list[data-index="' + data.index + '"]');

            if (preview[0]) {
                $('li', preview).removeClass('portfolio_controls_preview_list_item__active');
                $('li:first', preview).addClass('portfolio_controls_preview_list_item__active');
                $('.js-title').text($('li:first', preview).data('title') || '');
                preview.show();
            } else {
                $('.js-title').text(data.title || '');
            }

            this.paranja.show();
            this.portfolio.show();

            this.currentIndex != 0 ? this.pBtLeft.show() : this.pBtLeft.hide();
            this.currentIndex != this.maxIndex ? this.pBtRight.show() : this.pBtRight.hide();

            $(document).off('mousewheel DOMMouseScroll');
        },

        hideWork: function() {
            this.paranja.hide();
            this.portfolio.hide();
            this.pBtLeft.hide();
            this.pBtRight.hide();

            $(document).on('mousewheel DOMMouseScroll', autograph.navigation.nextStep.bind(autograph.navigation));
        },

        triggerShowWork: function(event) {
            if (!event) {
                return;
            }

            var dir = event.target.className.match('left') ? -1 : 1;
            var nextIndex = parseInt(this.currentIndex, 10) + dir;
            this.showWork(null, '.js-slider-group .slider_group_item_preview[data-index="' + nextIndex + '"]');
        },

        changeWork: function(event) {
            if (!event) {
                return;
            }

            var elem = $(event.target);
            var data = elem.data() || {};

            $('.js-portfolio_controls_preview li').removeClass('portfolio_controls_preview_list_item__active');
            elem.addClass('portfolio_controls_preview_list_item__active');

            $('.js-title').text(data.title || '');
            $('.js-portfolio').css({
                'background-image': elem.css('background-image')
            });
        },

        init: function() {
            this.slider = $('.js-slider-group');
            this.itemsCount = $('li', this.slider).size();
            this.slideWidth = window.innerWidth;
            this.slidesCount = this.getSlidesCount();
            this.paranja = $('.js-paranja');
            this.portfolio = $('.js-portfolio_list');
            this.maxIndex = $('.js-slider-group .slider_group_item_preview').size() - 1;
            this.pBtLeft = $('.js-portfolio-bt-left');
            this.pBtRight = $('.js-portfolio-bt-right');

            this.setSizes();
            this.setControls();
            this.bindEvents();
        }
    };

    autograph.portfolio.init();
})();
