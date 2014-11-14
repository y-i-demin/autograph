function setId(id) {
    $('body').attr('class', 'page-' + id);
}

(function() {
    if (location.hash) {
        $('.nav a[href="' + location.hash + '"]').addClass('nav_item_link__active');
        setId(location.hash.replace('#', ''));
    }

    $(document).on('click', '.nav a', function() {
        $('.nav a').not($(this)).removeClass('nav_item_link__active');
        $(this).addClass('nav_item_link__active');
        setId(this.hash.replace('#', ''));
    });
})();