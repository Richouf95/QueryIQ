// import {historyContent} from './popupContent.js';

// function updateRighttMenuContent(data) {
//     const rightMenuContent = document.getElementById('query-history');
//     rightMenuContent.innerHTML = `
//         <div style="display: flex; justify-content: space-around; align-items: center">
//             <h3 style='text-align: center; font-size:2em; margin: 20px 0px'>queries history</h3>
//             <img src="../assets/Refresh_icon.svg.png" style="width: 30px; height: 30px" id="refreshIconhistory"/>
//         </div>
//     `;

//     data && data.forEach((i, index) => {
//         const div = document.createElement('div');
//         div.classList.add('historyItem');
//         const historyDate = new Date(i.createdAt);
//         const formattedDate = historyDate.toLocaleDateString('fr-FR', { 
//             day: '2-digit', 
//             month: '2-digit', 
//             year: 'numeric'
//         });
//         const formattedTime = historyDate.toLocaleTimeString('fr-FR', {
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//         div.innerHTML = `
//         <div style="display: flex; justify-content: space-between; align-items: center; background-color: #1F1F1F; border-radius: 10px; margin: 10px; padding:20px 10px">
//             <div>
//                 <p>Query: <span style="background-color: #303134; padding: 5px 10px; border-radius: 20px;">${i.keyWord.query}</span></p>
//                 <p style="margin-top: 15px;">Created at : <span style="background-color: #303134; padding: 5px 10px; border-radius: 20px;">${formattedDate} ${formattedTime}</span></p> 
//             </div>
//             <div>
//                 <div><img src="../assets/seemore.png" alt="see more" style='width:20px' class='seeMoreIcon' id="history_${i.id}" /></div>
//                 <div><img src="../assets/delete.png" alt="see more" style='width:20px' class='' id="delete_${i.id}" onclick="(() => {
//                     const store = JSON.parse(localStorage.getItem('queryiq'));
//                     const without = store.filter(x => x.id !== '${i.id}');
//                     localStorage.removeItem('queryiq');
//                     localStorage.setItem('queryiq', JSON.stringify(without));
//                     const menuContent = document.getElementById('query-history');
//                     menuContent.remove();
//                 })()" /></div>
//             </div>
//         </div>
//         `;
//         rightMenuContent.appendChild(div);
//     });

//     // Ajoutez l'écouteur d'événement ici pour appeler updateLeftMenuContent lorsque l'image est cliquée
//     document.getElementById('refreshIconhistory').addEventListener('click', () => updateRighttMenuContent(data));

//     // Sélectionner tous les éléments avec la classe 'seeMoreIcon' et ajouter un écouteur d'événements
//     const seeMoreIcons = document.querySelectorAll('.seeMoreIcon');
//     seeMoreIcons.forEach(icon => {
//         icon.addEventListener('click', () => {
//             historyContent(icon)
//         });
//     });
// }

// // Right btn actions
// document.getElementById('rightMenuToggleButton').addEventListener('click', function () {
//     let leftMenuBtn = document.getElementById('rightMenuToggleButton');
//     let leftMenu = document.getElementById('right-menu');
//     const menuContent = document.getElementById('query-history')

//     const history = JSON.parse(localStorage.getItem('queryiq'));

//     if (leftMenu.contains(menuContent)) {
//         menuContent.remove();
//         leftMenuBtn.style.rotate = "0deg";
//         return;
//     } else {                
//         const rightMenuContent = document.createElement('div');
//         rightMenuContent.id = 'query-history';
//         rightMenuContent.classList.add('scrollstyle');
//         leftMenu.appendChild(rightMenuContent);
//         updateRighttMenuContent(history);
//         leftMenuBtn.style.rotate = "180deg";
//     } 
// });


import { historyContent } from './popupContent.js';

// Function to update the content of the right menu
function updateRightMenuContent(data) {
    const rightMenuContent = document.getElementById('query-history');
    rightMenuContent.innerHTML = `
        <div style="display: flex; justify-content: space-around; align-items: center">
            <h3 style='text-align: center; font-size:2em; margin: 20px 0px'>queries history</h3>
            <img src="../assets/Refresh_icon.svg.png" style="width: 30px; height: 30px" id="refreshIconhistory"/>
        </div>
    `;

    // If data is available, iterate over it to display each history item
    data && data.forEach((i, index) => {
        const div = document.createElement('div');
        div.classList.add('historyItem');
        const historyDate = new Date(i.createdAt);
        const formattedDate = historyDate.toLocaleDateString('fr-FR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric'
        });
        const formattedTime = historyDate.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; background-color: #1F1F1F; border-radius: 10px; margin: 10px; padding:20px 10px">
            <div>
                <p>Query: <span style="background-color: #303134; padding: 5px 10px; border-radius: 20px;">${i.keyWord.query}</span></p>
                <p style="margin-top: 15px;">Created at : <span style="background-color: #303134; padding: 5px 10px; border-radius: 20px;">${formattedDate} ${formattedTime}</span></p> 
            </div>
            <div>
                <div><img src="../assets/seemore.png" alt="see more" style='width:20px' class='seeMoreIcon' id="history_${i.id}" /></div>
                <div><img src="../assets/delete.png" alt="see more" style='width:20px' class='' id="delete_${i.id}" onclick="(() => {
                    const store = JSON.parse(localStorage.getItem('queryiq'));
                    const without = store.filter(x => x.id !== '${i.id}');
                    localStorage.removeItem('queryiq');
                    localStorage.setItem('queryiq', JSON.stringify(without));
                    const menuContent = document.getElementById('query-history');
                    menuContent.remove();
                })()" /></div>
            </div>
        </div>
        `;
        rightMenuContent.appendChild(div);
    });

    // Add event listener to refresh icon to update the right menu content
    document.getElementById('refreshIconhistory').addEventListener('click', () => updateRightMenuContent(data));

    // Select all elements with class 'seeMoreIcon' and add event listener
    const seeMoreIcons = document.querySelectorAll('.seeMoreIcon');
    seeMoreIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            historyContent(icon);
        });
    });
}

// Right menu toggle button actions
document.getElementById('rightMenuToggleButton').addEventListener('click', function () {
    let leftMenuBtn = document.getElementById('rightMenuToggleButton');
    let leftMenu = document.getElementById('right-menu');
    const menuContent = document.getElementById('query-history');

    const history = JSON.parse(localStorage.getItem('queryiq'));

    if (leftMenu.contains(menuContent)) {
        menuContent.remove();
        leftMenuBtn.style.rotate = "0deg";
        return;
    } else {                
        const rightMenuContent = document.createElement('div');
        rightMenuContent.id = 'query-history';
        rightMenuContent.classList.add('scrollstyle');
        leftMenu.appendChild(rightMenuContent);
        updateRightMenuContent(history);
        leftMenuBtn.style.rotate = "180deg";
    } 
});
