
//QUOTE CAROUSEL
function quoteCarousel (item, x) {
    let active = ""
    if (!x) {
        active = "active";
    }
    $("#carousel-inner").append(`
    <div class="carousel-item ${active}">
    <div class="row justify-content-around">
        <div class="col-sm-1">
            <img class="rounded-circle mx-auto my-3 d-block" height="150" width="150" src="${item.pic_url}" alt="">
        </div>
        <div class="col-sm-6 mx-3">
        <p>${item.text}</p>
            <p><span class="font-weight-bold">${item.name}</span></p>
        </div>
    </div>
    
    `);
    }

    //LOADER
function loader(active, item) {
    if (active) {
        $(item).wrap('<div class="loader"></div>');
    } else {
        $(item).unwrap();
    }
}

//AJAX

function getQuoteData () {
    var settings = {
        "url": "https://smileschool-api.hbtn.info/quotes",
        "method": "GET",
        "content-type": "application/javascript",
        "beforeSend": loader(true),
        "success": function(result) {
            $("#carousel-inner").empty();
            loader(false, "#carousel-inner");
            result.forEach((item, x) => {
                quoteCarousel(item, x);
            });
        },
    };
    $.ajax(settings).done(function(response) {
        let response1 = response[0];
        let response2 = response[1];
        quoteCarousel(response1, "#carousel-inner");
    });
}

$(document).ready(function() {
    getQuoteData();
})

// VIDEO CAROUSEL
function tutCarousel (item, x) {
    let active = ""
    if (!x) {
        active = "active";
    }
    $("#popularcarousel").append(`<div class="carousel-item ${active}">
    <div class="row justify-content-center">
        <div class="col">
            <div class="mx-1">
                <div class="card mx-auto my-3">
                    <img class="card-img-top" src="${item.thumb_url}" width="245" height="154">
                    <img class="play-img" src="images/play.png" width="64" height="64">
                        <div class="card-body">
                            <p class="fs-16heavy">"${item.title}"</p><span class="text-secondary font-14 font-weight-normal">${item["sub-title"]}</span>
                                <div class="row justify-content-start font-14 smallpurp">
                                    <div class="col-2">
                                        <img src="${item.author_pic_url}" class="rounded-circle" width="30" height="30">
                                    </div>
                                    <div class="col mt-1">
                                    ${item.author}
                                    </div>
                                </div>
                    <div class="row justify-content-between mt-2">
                        <div class="col">
                            <img src="${item.star}" height="15" width="15">
                        </div>
                        <div class="col-4 text-right smallpurp">
                            ${item.duration}
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
<div class="row justify-content-center">
        <div class="col">
            <div class="mx-1">
                <div class="card mx-auto my-3">
                    <img class="card-img-top" src="${item.thumb_url}" width="245" height="154">
                    <img class="play-img" src="images/play.png" width="64" height="64">
                        <div class="card-body">
                            <p class="fs-16heavy">"${item.title}"</p><span class="text-secondary font-14 font-weight-normal">${item["sub-title"]}</span>
                                <div class="row justify-content-start font-14 smallpurp">
                                    <div class="col-2">
                                        <img src="${item.author_pic_url}" class="rounded-circle" width="30" height="30">
                                    </div>
                                    <div class="col mt-1">
                                    ${item.author}
                                    </div>
                                </div>
                    <div class="row justify-content-between mt-2">
                        <div class="col">
                            <img src="${item.star}" height="15" width="15">
                        </div>
                        <div class="col-4 text-right smallpurp">
                            ${item.duration}
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
<div class="row justify-content-center">
        <div class="col">
            <div class="mx-1">
                <div class="card mx-auto my-3">
                    <img class="card-img-top" src="${item.thumb_url}" width="245" height="154">
                    <img class="play-img" src="images/play.png" width="64" height="64">
                        <div class="card-body">
                            <p class="fs-16heavy">"${item.title}"</p><span class="text-secondary font-14 font-weight-normal">${item["sub-title"]}</span>
                                <div class="row justify-content-start font-14 smallpurp">
                                    <div class="col-2">
                                        <img src="${item.author_pic_url}" class="rounded-circle" width="30" height="30">
                                    </div>
                                    <div class="col mt-1">
                                    ${item.author}
                                    </div>
                                </div>
                    <div class="row justify-content-between mt-2">
                        <div class="col">
                            <img src="${item.star}" height="15" width="15">
                        </div>
                        <div class="col-4 text-right smallpurp">
                            ${item.duration}
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>

    `);
}

function getTutData () {
    var settings = {
        "url": "https://smileschool-api.hbtn.info/popular-tutorials",
        "method": "GET",
        "content-type": "application/javascript",
        "beforeSend": loader(true),
        "success": function(result) {
            $("#popularcarousel").empty();
            loader(false, "#popularcarousel");
            result.forEach((item, x) => {
                tutCarousel(item, x);
            });
        },
    };
    $.ajax(settings).done(function(response) {
        let response1 = response[0];
        let response2 = response[1];
        tutCarousel(response1, "#popularcarousel");
    });
}
$(document).ready(function() {
    getTutData();
})

//LATEST VIDEOS
function latestCarousel (item, x) {
    let active = ""
    if (!x) {
        active = "active";
    }
    $("#latestcarousel").append(`<div class="carousel-item ${active}">
    <div class="row justify-content-center">
        <div class="col">
            <div class="mx-1">
                <div class="card mx-auto my-3">
                    <img class="card-img-top" src="${item.thumb_url}" width="245" height="154">
                    <img class="play-img" src="images/play.png" width="64" height="64">
                        <div class="card-body">
                            <p class="fs-16heavy">"${item.title}"</p><span class="text-secondary font-14 font-weight-normal">${item["sub-title"]}</span>
                                <div class="row justify-content-start font-14 smallpurp">
                                    <div class="col-2">
                                        <img src="${item.author_pic_url}" class="rounded-circle" width="30" height="30">
                                    </div>
                                    <div class="col mt-1">
                                    ${item.author}
                                    </div>
                                </div>
                    <div class="row justify-content-between mt-2">
                        <div class="col">
                            <img src="${item.star}" height="15" width="15">
                        </div>
                        <div class="col-4 text-right smallpurp">
                            ${item.duration}
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
<div class="row justify-content-center">
        <div class="col">
            <div class="mx-1">
                <div class="card mx-auto my-3">
                    <img class="card-img-top" src="${item.thumb_url}" width="245" height="154">
                    <img class="play-img" src="images/play.png" width="64" height="64">
                        <div class="card-body">
                            <p class="fs-16heavy">"${item.title}"</p><span class="text-secondary font-14 font-weight-normal">${item["sub-title"]}</span>
                                <div class="row justify-content-start font-14 smallpurp">
                                    <div class="col-2">
                                        <img src="${item.author_pic_url}" class="rounded-circle" width="30" height="30">
                                    </div>
                                    <div class="col mt-1">
                                    ${item.author}
                                    </div>
                                </div>
                    <div class="row justify-content-between mt-2">
                        <div class="col">
                            <img src="${item.star}" height="15" width="15">
                        </div>
                        <div class="col-4 text-right smallpurp">
                            ${item.duration}
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
<div class="row justify-content-center">
        <div class="col">
            <div class="mx-1">
                <div class="card mx-auto my-3">
                    <img class="card-img-top" src="${item.thumb_url}" width="245" height="154">
                    <img class="play-img" src="images/play.png" width="64" height="64">
                        <div class="card-body">
                            <p class="fs-16heavy">"${item.title}"</p><span class="text-secondary font-14 font-weight-normal">${item["sub-title"]}</span>
                                <div class="row justify-content-start font-14 smallpurp">
                                    <div class="col-2">
                                        <img src="${item.author_pic_url}" class="rounded-circle" width="30" height="30">
                                    </div>
                                    <div class="col mt-1">
                                    ${item.author}
                                    </div>
                                </div>
                    <div class="row justify-content-between mt-2">
                        <div class="col">
                            <img src="${item.star}" height="15" width="15">
                        </div>
                        <div class="col-4 text-right smallpurp">
                            ${item.duration}
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div>
    `);
}

function getLatestData () {
    var settings = {
        "url": "https://smileschool-api.hbtn.info/latest-videos",
        "method": "GET",
        "content-type": "application/javascript",
        "beforeSend": loader(true),
        "success": function(result) {
            $("#latestcarousel").empty();
            loader(false, "#latestcarousel");
            result.forEach((item, x) => {
                latestCarousel(item, x);
            });
        },
    };

    $.ajax(settings).done(function(response) {
        let response1 = response[0];
        let response2 = response[1];
        latestCarousel(response1, "#latestcarousel");
    });
}
$(document).ready(function() {
    getLatestData();
})
