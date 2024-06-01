import { query } from './blankRequest.js';

// Fonction pour mettre à jour le contenu du menu de gauche
function updateLeftMenuContent() {
    const leftMenuContent = document.getElementById('query-tokens');
    leftMenuContent.innerHTML = `
        <div style="display: flex; justify-content: space-around; align-items: center">
            <h3 style='text-align: center; font-size:2em; margin: 20px 0px'>Query params</h3>
            <img src="../assets/Refresh_icon.svg.png" style="width: 30px; height: 30px" id="refreshIcon"/>
        </div>
    `;

    const q = document.createElement('div');
    q.innerHTML = `
        <h5 style="font-size: 20px; margin: 20px 0px 10px 20px">Query :</h5>
        <hr style="width:90%; margin: auto">
        <div style='padding:10px'></div>
        <div id="queryPresentation" style="padding-left: 20px"></div>
    `;
    if (query.keyWord.query !== "" | false | null) leftMenuContent.appendChild(q);

    if (query.keyWord.casse) {
        const queryPresentation = document.getElementById('queryPresentation');
        console.log(queryPresentation)
        const splited = query.keyWord.query.split(' ');
        splited.forEach(item => {
            const token = `<span style="background: #1F1F1F; padding: 5px 10px; margin: 0px 2px; border-radius: 20px">${item}</span>`
            queryPresentation.innerHTML += token;
        })
        // queryPresentation.appendChild(`<span style="background: #1F1F1F; padding: 5px 10px; margin: 40px 10px; border-radius: 20px">${query.keyWord.query}</span>`)
    } else {
        const queryPresentation = document.getElementById('queryPresentation');
        queryPresentation.innerHTML = `<span style="background: #1F1F1F; padding: 5px 10px; margin: 0px 2px; border-radius: 20px">${query.keyWord.query}</span>`
    }

    const s = document.createElement('div');
    s.innerHTML = `
        <h5 style="font-size: 20px; margin: 20px 0px 10px 20px">On site :</h5>
        <hr style="width:90%; margin: auto">
        <div style='padding:10px'></div>
        <span style="background: #1F1F1F; padding: 5px 10px; margin: 40px 10px; border-radius: 20px">${query.onSite}</span>
    `;
    if (query.onSite) leftMenuContent.appendChild(s);

    const f = document.createElement('div');
    f.innerHTML = `
        <h5 style="font-size: 20px; margin: 20px 0px 10px 20px">File type :</h5>
        <hr style="width:90%; margin: auto">
        <div style='padding:10px'></div>
        <span style="background: #1F1F1F; padding: 5px 10px; margin: 40px 10px; border-radius: 20px">${query.documentType}</span>
    `;
    if (query.documentType) leftMenuContent.appendChild(f);

    const dAfter = document.createElement('div');
    dAfter.innerHTML = `
        <h5 style="font-size: 20px; margin: 20px 0px 10px 20px">Publish after :</h5>
        <hr style="width:90%; margin: auto">
        <div style='padding:10px'></div>
        <span style="background: #1F1F1F; padding: 5px 10px; margin: 40px 10px; border-radius: 20px">${query.date.after}</span>
    `;
    if (query.date.after) leftMenuContent.appendChild(dAfter);

    const dBefore = document.createElement('div');
    dBefore.innerHTML = `
        <h5 style="font-size: 20px; margin: 20px 0px 10px 20px">Publish after :</h5>
        <hr style="width:90%; margin: auto">
        <div style='padding:10px'></div>
        <span style="background: #1F1F1F; padding: 5px 10px; margin: 40px 10px; border-radius: 20px">${query.date.before}</span>
    `;
    if (query.date.before) leftMenuContent.appendChild(dBefore);

    // Ajoutez l'écouteur d'événement ici pour appeler updateLeftMenuContent lorsque l'image est cliquée
    document.getElementById('refreshIcon').addEventListener('click', updateLeftMenuContent);
}

// Left btn actions
document.getElementById('leftMenuToggleButton').addEventListener('click', function () {
    let leftMenuBtn = document.getElementById('leftMenuToggleButton');
    let leftMenu = document.getElementById('left-menu');
    const menuContent = document.getElementById('query-tokens');

    if (leftMenu.contains(menuContent)) {
        menuContent.remove();
        leftMenuBtn.style.rotate = "180deg";
        return;
    } else {
        const leftMenuContent = document.createElement('div');
        leftMenuContent.id = 'query-tokens';
        leftMenuContent.classList.add('scrollstyle')
        leftMenu.appendChild(leftMenuContent);
        updateLeftMenuContent();
        leftMenuBtn.style.rotate = "0deg";
    }
});
