/*
    js for a page of the blog. This script looks at the url and loads in the .md file from that
*/

// gets the data form the url
function getMDPathFromURL(){
    var urlData = getParam('mdpath');
    return urlData;
}

// loads in the md file
async function loadFromURL(){
    const path = getMDPathFromURL();
    const element = await getMDasElemnt(path);
    $("#mdBlogHolder").append(element);
}

loadFromURL();
