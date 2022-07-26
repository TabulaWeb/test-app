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

// Slider
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

let slider_services = tns({
    container: '.services-slider',
    items: 4,
    slideBy: 1,
    nav: false,
    mouseDrag: true,
    swipeAngle: false,
    speed: 400,
    controlsContainer: '.services-title__control-arrow',
})

let slider_technologies = tns({
    container: '.technologies-slider',
    items: 4,
    slideBy: 1,
    nav: false,
    mouseDrag: true,
    swipeAngle: false,
    speed: 400,
    controlsContainer: '.technologies-title__control-arrow',
})

let slider_reviews = tns ({
    container: '.reviews-slider',
    items: 4,
    slideBy: 1,
    nav: false,
    mouseDrag: true,
    swipeAngle: false,
    speed: 400,
    controlsContainer: '.reviews-title__control-arrow',
})

// Modal
document.addEventListener('click', function(e){
    if(e.target.closest('.modal_activate')){
        document.querySelector('.modal').classList.add('active')
        document.querySelector('body').classList.add('modal-active')
    } else if (!e.target.closest('.modal-content') ) {
        document.querySelector('.modal').classList.remove('active')
        document.querySelector('body').classList.remove('modal-active')
    }
})

close_modal.addEventListener('click', () => {
    document.querySelector('.modal').classList.remove('active')
    document.querySelector('body').classList.remove('modal-active')
})


