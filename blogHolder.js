

function getMDPathFromURL(){
    var urlData = getParam('mdpath');
    return urlData;
}

async function loadFromURL(){
    const path = getMDPathFromURL();
    const element = await getMDasElemnt(path);
    $("#mdBlogHolder").append(element);
}

loadFromURL();
