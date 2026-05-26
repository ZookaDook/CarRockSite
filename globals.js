/* globals for the project */


const imgFocusClass = ".imgCanFocus";

let placeholder = null;

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

// fucntion to zoom in and out
function toggleFocus(){
    // get the element and toggle the class
    let element = $(this);
    focusImage(element);
}

function focusImage(img){
    const zoomImg = $(img.clone());
    const offset = img.offset();

    placeholder = zoomImg;
    zoomImg.on("click", unFocusImage);

    zoomImg.css({
        'cursor': 'zoom-out',
        'position': 'absolute',
        'top': offset.top + 'px',
        'left': offset.left + 'px',
        'width': img.outerWidth(),    
        'height': img.outerHeight(),  
        'margin': '0',                
    });

    $('body').append(zoomImg);

    zoomImg[0].offsetWidth;

    zoomImg.css({
        'transform': 'scale(2)'
    });
    zoomImg.one('transitionend', () => { 
        zoomImg.css({
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%, -50%) scale(2)'
        });
    });
    
    img.addClass('imgHidden');
}

function unFocusImage(){
    placeholder.css({
        'top': '50%',
        'left': '50%',
        'opacity': '0.5',
        'transform': 'scale(1)'               
    });
}