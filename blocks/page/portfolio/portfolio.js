(function() {
    autograph.portfolio = {
        btWidth: 38,
        itemsInSlide: 4,
        itemsCount: 0,
        slidesCount: 0,
        currentStep: 0,

        dotDraft: function() {
            return '<li class="bt_dot"></li>';
        },

        bindEvents: function() {
            var self = this;

            $(document).on('click', '.js-slider-group .slider_group_item_preview', this.showWork.bind(this));
            $(document).on('click', '.js-paranja, .js-closer', this.hideWork.bind(this));
            $(document).on('click', '.js-bt-left, .js-bt-right, .js-slider-dots li', this.nextSlide.bind(this));
            $(window).on('resize', function() {
                self.setSizes();
            });
        },

        getSlidesCount: function() {
            if (!this.itemsCount) {
                return 0;
            }

            var slides  = this.itemsCount / this.itemsInSlide;
            if (slides && slides % 1 > 0) {
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

            if (event.target.className.match('dot')) {
                this.currentStep = $(event.target).index();
            } else {
                var dir = event.target.className.match('left') ? -1 : 1;
                if ((this.currentStep <= 0 && dir == -1) || (this.currentStep >= this.slidesCount - 1 && dir == 1)) {
                    return;
                }

                this.currentStep += dir;
            }

            this.slider.css({
                'left': this.currentStep * this.slideWidth * -1
            });

            $('.js-slider-dots li').removeClass('bt_dot__active');
            $('.js-slider-dots li').get(this.currentStep).className += ' bt_dot__active';
        },

        showWork: function(event) {
            this.paranja.show();
            this.portfolio.show();

            $(document).off('mousewheel DOMMouseScroll');
        },

        hideWork: function() {
            this.paranja.hide();
            this.portfolio.hide();

            $(document).on('mousewheel DOMMouseScroll', autograph.navigation.nextStep.bind(autograph.navigation));
        },

        init: function() {
            this.slider = $('.js-slider-group');
            this.itemsCount = $('li', this.slider).size();
            this.slideWidth = window.innerWidth;
            this.slidesCount = this.getSlidesCount();
            this.paranja = $('.js-paranja');
            this.portfolio = $('.js-portfolio_list');

            this.setSizes();
            this.setControls();
            this.bindEvents();
        }
    };

    autograph.portfolio.init();
})();
