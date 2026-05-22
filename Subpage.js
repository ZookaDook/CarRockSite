/*
js for all the subpages
rn it just deals with hideing the bio depending on the url
*/

async function addBio(){
    const bio = await getElementFromVault('bio');
    $("#bioHolder").append(bio);
}

// will hide the bio if url has '?bio=false'
function checkBioHide(){
    var urlData = getParam('bio');
    if (urlData != "false"){
       addBio();
    }
}

checkBioHide()