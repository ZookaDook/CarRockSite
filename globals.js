
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
