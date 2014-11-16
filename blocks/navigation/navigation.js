(function() {
    ({
        slideHeight: 780,
        map: ['about', 'services', 'portfolio', 'contacts'],
        currentPage: 'about',

        nextStep: function(event) {
            var self = this;

            event = event.originalEvent;
            $(document).off('mousewheel DOMMouseScroll');

            setTimeout(function() {
                $(document).on('mousewheel DOMMouseScroll', self.nextStep.bind(self));
            }, 1500);

            var currentIndex = this.map.indexOf(this.currentPage);
            var dir = (event.wheelDelta ? event.wheelDelta : event.detail/-1) < 0 ? 1 : -1;
            // next: 1
            // prev: -1

            if (dir === 1 && currentIndex === this.map.length - 1) {
                return;
            }

            if (dir === -1 && currentIndex === 0) {
                return;
            }

            this.setCurrent(null, this.map[currentIndex + dir], dir);
        },

        setCurrent: function(event, page, dir) {
            this.currentPage = page || (event && event.target.hash || location.hash).replace('#', '');

            $('.nav a').removeClass('nav_item_link__active');
            $('.nav a[href="#' + this.currentPage + '"]').addClass('nav_item_link__active');

            var self = this;
            var target = dir && dir * this.slideHeight || $('.page#' + this.currentPage).offset().top;

            $('.pages').animate({
                scrollTop: '+=' + target
            }, 350, function() {
                $('body').attr('class', 'page-' + self.currentPage);
            });

            return false;
        },

        bindEvents: function() {
            $(document).on('click', '.nav a', this.setCurrent.bind(this));
            $(document).on('mousewheel DOMMouseScroll', this.nextStep.bind(this));
        },

        init: function() {
            if (location.hash) {
                this.setCurrent();
            }

            this.slideHeight = window.innerHeight;
            this.bindEvents();
        }
    }).init();
})();
