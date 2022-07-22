function testWebP(callback) {

    var webP = new Image();
            webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }else{
        document.querySelector('body').classList.add('no-webp');
    }
});

let slider = tns({
    container: '.home-slider__slides',
    items: 1,
    slideBy: 1,
    mouseDrag: true,
    swipeAngle: false,
    nav: true,
    speed: 400,
    controlsContainer: '.home-slider__arrow',
    navContainer: '.home-slide__dot'
});

let slider_benefits = tns({
    container: '.benefits-slider',
    items: 4,
    slideBy: 1,
    nav: false,
    mouseDrag: true,
    swipeAngle: false,
    speed: 400,
    // edgePadding: 25,
    controlsContainer: '.benefits-slider_arrow',
})