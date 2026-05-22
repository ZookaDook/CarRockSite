/*
every single page will have this
*/

const valutURL = 'elementsVault.html'

async function getElementFromVault(id){
    try {
        const page = await fetch(valutURL);
        const html = await page.text()

        const domParse = new DOMParser();

        const htmlDoc = domParse.parseFromString(html, 'text/html');

        return htmlDoc.getElementById(id);
    }
    catch{
        console.log("failed to grab html element form the vault");
        return "";
    }
}

async function addElementsFromVault(){
    if (getParam('navBar') != 'false'){ 
        const sideBar = await getElementFromVault('sideBar');
        sideBar.addEventListener('click', toggleSideBar)
        sideBar.state = 'closed';
        document.body.append( sideBar );
    }
}

function toggleSideBar(){toggleSideBar
    const sideBar = $("#sideBar");
    const state = sideBar[0].state;
    if (state == 'closed'){
        sideBar[0].state = 'open';
        sideBar.addClass('open')
    }
    else if (state == 'open'){
        sideBar[0].state = 'closed';
        sideBar.removeClass('open');
    }
}

async function getMDasElemnt(path){
    var MDChunkElement = "na";
    const mdPage = await fetch(path);
    const mdText = await mdPage.text();
    const mdParse = marked.parse(mdText);
    
    const element = document.createElement('div');
    element.innerHTML = mdParse;
    $(element).addClass("MdChunk")
    return element;
}

async function addMDsAsElemetns(parentElement, folderPath, fileNames){
    for (const name of fileNames){
        const path = folderPath + name;
        const element = await getMDasElemnt(path);
        console.log(element);
        parentElement.append(element);
    }
}

async function addMDsAsLink(parentElement, folderPath, fileNames){
    for (const name of fileNames){
        const path = folderPath + name;
        const element = $(document.createElement('a'));
        element.attr("href","BlogHolderPage.html");
        const displayName = name.replace(/\.md$/, "");
        element.text(displayName);
        element.addClass("blogLink")
        parentElement.append(element);
        console.log(element);
    }
}

addElementsFromVault();

