/* globals for the project */
$('.btnimg').on("click", imgBtnClick);
$('.btnimg').on("mouseover", imgBtnMouseIn);
$('.btnimg').on("mouseout", imgBtnMouseOut);

function imgBtnClick(){
    let imgbtn = $(this);
    let link = imgbtn.attr("link");
    document.location.href = link;
}

function imgBtnMouseIn(){
    let imgbtn = $(this);
    let hoverImg = imgbtn.attr("hover");
    imgbtn.attr("src",hoverImg);
}

function imgBtnMouseOut(){
    let imgbtn = $(this);
    let mainImg = imgbtn.attr("main");
    imgbtn.attr("src",mainImg);
}

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

