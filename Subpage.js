/*
js for all the subpages
rn it just deals with hideing the bio depending on the url
*/

// will hide the bio if url has '?bio=false'
function checkBioHide(){
    var urlData = getParam('bio');
    if (urlData == "false"){
        $("#bio").hide();
    }
    // else you would keep it
}

checkBioHide();