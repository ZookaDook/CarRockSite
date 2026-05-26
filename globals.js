/* globals for the project */


const imgFocusClass = ".imgCanFocus";


const backgroundFader = $('<div class="bgfade"><div>');
$('body').append(backgroundFader);

let focusedImage = null;
let placeholderImg = null;

let scrollBar = null;


// get a param from the url
function getParam(Qname){
    try{
        const params = new URLSearchParams(window.location.search);
        return params.get(Qname);
    }
    catch{
        return "none";
    }
}

// adds the class to allow focusing to all the children of an element
// mostly used for adding zoom to images in .md files
function makeChildImgsFocusable(element){
    element.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', toggleFocus);
    });
}

// add the zoom to all other images with the calss
// this hits the stuff that loaded in to begin with
$(imgFocusClass).on("click",  toggleFocus);
backgroundFader.on("click", unFocusImage);

// fucntion to zoom in and out
function toggleFocus(){
    // get the element and toggle the class
    let element = $(this);
    if (placeholderImg != null){ // if there is already a focused image stop
        return;
    }
    focusImage(element);
}

// focuses the iamge
//      this works by making of a placeholder that it zooms in on
function focusImage(img){
    // make the placeholder
    const zoomImg = $(img.clone());
    const offset = img.offset();

    // set the values
    placeholderImg = zoomImg;
    focusedImage = img;

    // set events to un focuse
    zoomImg.on("click", unFocusImage);

    // starting css
    zoomImg.css({
        'z-index': '3',
        'cursor': 'zoom-out',
        'position': 'absolute',
        'top': offset.top + 'px',
        'left': offset.left + 'px',
        'width': img.outerWidth(),    
        'height': img.outerHeight(),  
        'margin': '0',                
    });

    // add the clone
    $('body').append(zoomImg);

    // force update so the animation works
    zoomImg[0].offsetWidth;

    // the antimation step 1
    zoomImg.css({
        'transform': 'scale(2)'
    });
    // setp 2
    zoomImg.one('transitionend', () => { 
        zoomImg.css({
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%, -50%) scale(2)'
        });
    });
    
    // hide the og image
    img.addClass('imgHidden');

    // fade the bg
    backgroundFader.addClass('fadeIn');
}

// unfocunses the image
function unFocusImage(){
    // unhide the og image 
    focusedImage.removeClass('imgHidden');
    
    // un fade the bg
    backgroundFader.removeClass('fadeIn');

    // fade out animation
    placeholderImg.css({
        'opacity': '0', 
        'transform': 'translate(-50%, -50%) scale(3)'         
    });

    // when the antimation is done remove the placeholder from the DOM
    placeholderImg.one('transitionend', () => { 
        placeholderImg.remove();
        placeholderImg = null;
        focusedImage = null;
    });
}

$(window).scroll( () => {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height();
    const winHeight = $(window).height();
    const scrollPrecent = (scrollTop / (docHeight - winHeight)) * 100;
    $(scrollBar).css({
        'top': scrollPrecent + '%',
    });
});

