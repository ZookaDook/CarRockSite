/*
js for all the subpages
rn it just deals with hideing the bio depending on the url
*/

// grabs the bio element form the vault and adds it
async function addBio(){
    const bio = await getElementFromVault('bio');
    $("#bioHolder").append(bio);
}

// will hide the bio if url has '?bio=false', under any other case it is shown
function checkBioHide(){
    var urlData = getParam('bio'); // check url
    if (urlData != "false"){
       addBio();
    }
}

// check if the bio should be hidden
checkBioHide()