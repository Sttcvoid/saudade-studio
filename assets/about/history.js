$(".full-content-btn").on("click", (function() {
    contentVisibility(this);
}
));

function contentVisibility(btn) {
    var id = $(btn).data("id");
    var action = $(btn).data("action");

    if (action == "hide") {
        $("main").find(`[data-id='${id}'], [data-action='show']`).removeClass("hidden");
        $([document.documentElement, document.body]).animate({
            scrollTop: $(`#info-${id}`).offset().top - 100
        }, 1);
    } else $(btn).addClass("hidden");

    action == "show" ? $(`#${id}-full`).removeClass("hidden") : $(`#${id}-full`).addClass("hidden");
}