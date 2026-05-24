/*
    This script injects elements form the valut into a given HTML page.
    It also deals with loading in stuff form md files
    important script
*/

// ---------- HTML VAULT STUFF ----------

// link to the vault
const valutURL = '/ElementVault/elementsVault.html'

// grabs an element from the valut by its id
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

// adds in elements form the vault, anything in here is just an auto add
// rn its just the sidebar and the bottom bar
async function addElementsFromVault(){
    // Sidebar
    if (getParam('navBar') != 'false'){  // check to see if it should be hidden
        const sideBar = await getElementFromVault('sideBar');
        sideBar.addEventListener('click', toggleSideBar)
        sideBar.state = 'closed';
        document.body.append( sideBar );
    }

    // bottom bar
    const bottomBar = await getElementFromVault('bottomBar');
    document.body.append( bottomBar );
}

// toggles the sidebar, its in here because the sidebar is added in here
function toggleSideBar(){toggleSideBar
    const sideBar = $("#sideBar");
    const state = sideBar[0].state;
    if (state == 'closed'){ // to open...
        sideBar[0].state = 'open';
        sideBar.addClass('open')
    }
    else if (state == 'open'){// to close..
        sideBar[0].state = 'closed';
        sideBar.removeClass('open');
    }
}


// ---------- MARKDOWN STUFF ----------

// gets an .md file as an html element 
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

// adds a list of .md files from a folder as children elements of the parent element given 
async function addMDsAsElemetns(parentElement, folderPath, fileNames){
    for (const name of fileNames){
        const path = folderPath + name;
        const element = await getMDasElemnt(path);
        console.log(element);
        parentElement.append(element);
    }
}

// adds a list of .md files form a folder as links to the files under a parent element given
// this deals with linking to the pages useing the blogHolder js and html files
async function addMDsAsLink(parentElement, folderPath, fileNames){
    for (const name of fileNames){
        const path = folderPath + name;
        const element = $(document.createElement('a'));
        element.attr("href","BlogHolderPage.html?mdpath=" + path); // update url to link to the right path
        const displayName = name.replace(/\.md$/, ""); // clean up the display name, remove .md
        element.text(displayName);
        element.addClass("blogLink")
        parentElement.append(element);
    }
}

addElementsFromVault();

