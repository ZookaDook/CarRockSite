/*
js for all the subpages
rn it just deals with hideing the bio depending on the url
*/

// will hide the bio if url has '?bio=false', under any other case it is shown
function checkBioHide(){
    var urlData = getParam('bio'); // check url
    if (urlData != "false"){
       addBio($("#bioHolder"));
    }
}

// check if the bio should be hidden
checkBioHide()