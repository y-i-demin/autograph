(function(d, e, c, r, n) {
    e = d.documentElement;
    c = "className";
    r = "replace";
    n = "createElementNS";
    e[c] = e[c][r]("is-js_no", "is-js_yes");
})(document);

function pageResize() {
    // 215 - высота шапки
    $('.page_content').css('height', window.innerHeight - 215 + 'px');
}

(function() {
    $(window).on('resize', pageResize);
    pageResize();
})();
