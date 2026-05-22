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

addElementsFromVault();

