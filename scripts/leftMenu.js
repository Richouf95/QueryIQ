import { query } from './blankRequest.js';

// Function to update the content of the left menu
function updateLeftMenuContent() {
    const leftMenuContent = document.getElementById('query-tokens');
    leftMenuContent.innerHTML = `
        <div style="display: flex; justify-content: space-around; align-items: center">
            <h3 style='text-align: center; font-size:2em; margin: 20px 0px'>Query params</h3>
            <img src="../assets/Refresh_icon.svg.png" style="width: 30px; height: 30px" id="refreshIcon"/>
        </div>
    `;

    // Create and append query details
    const queryDetails = document.createElement('div');
    queryDetails.innerHTML = `
        <h5 style="font-size: 20px; margin: 20px 0px 10px 20px">Query :</h5>
        <hr style="width:90%; margin: auto">
        <div style='padding:10px'></div>
        <div id="queryPresentation" style="padding-left: 20px"></div>
    `;
    if (query.keyWord.query) leftMenuContent.appendChild(queryDetails);

    // Display query keywords
    const queryPresentation = document.getElementById('queryPresentation');
    if (query.keyWord.query) {
        if (!query.keyWord.casse) {
            query.keyWord.query.split(' ').forEach(item => {
                const token = `<span style="background: #1F1F1F; padding: 5px 10px; margin: 0px 2px; border-radius: 20px">${item}</span>`;
                queryPresentation.innerHTML += token;
            });
        } else {
            query.keyWord.query && (queryPresentation.innerHTML = `<span style="background: #1F1F1F; padding: 5px 10px; margin: 0px 2px; border-radius: 20px">${query.keyWord.query}</span>`);
        }        
    }

    // Function to create and append detail sections
    function appendDetailSection(title, content) {
        const section = document.createElement('div');
        section.innerHTML = `
            <h5 style="font-size: 20px; margin: 20px 0px 10px 20px">${title} :</h5>
            <hr style="width:90%; margin: auto">
            <div style='padding:10px'></div>
            <span style="background: #1F1F1F; padding: 5px 10px; margin: 40px 10px; border-radius: 20px">${content}</span>
        `;
        if (content) leftMenuContent.appendChild(section);
    }

    appendDetailSection('On site', query.onSite);
    appendDetailSection('File type', query.documentType);
    appendDetailSection('Publish after', query.date.after);
    appendDetailSection('Publish before', query.date.before);

    // Add event listener to refresh icon
    document.getElementById('refreshIcon').addEventListener('click', updateLeftMenuContent);
}

// Left menu toggle actions
document.getElementById('leftMenuToggleButton').addEventListener('click', function () {
    const leftMenuBtn = document.getElementById('leftMenuToggleButton');
    const leftMenu = document.getElementById('left-menu');
    const menuContent = document.getElementById('query-tokens');

    if (menuContent) {
        menuContent.remove();
        leftMenuBtn.style.rotate = "180deg";
    } else {
        const leftMenuContent = document.createElement('div');
        leftMenuContent.id = 'query-tokens';
        leftMenuContent.classList.add('scrollstyle');
        leftMenu.appendChild(leftMenuContent);
        updateLeftMenuContent();
        leftMenuBtn.style.rotate = "0deg";
    }
});
