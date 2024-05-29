function updateRighttMenuContent(data) {
    const rightMenuContent = document.getElementById('query-history');
    rightMenuContent.innerHTML = `
        <div style="display: flex; justify-content: space-around; align-items: center">
            <h3 style='text-align: center; font-size:2em; margin: 20px 0px'>queries history</h3>
            <img src="../assets/Refresh_icon.svg.png" style="width: 30px; height: 30px" id="refreshIconhistory"/>
        </div>
    `;

    data.forEach((i, index) => {
        const div = document.createElement('div');
        div.classList.add('historyItem');
        div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; background-color: #1F1F1F; border-radius: 10px; margin: 10px; padding:20px 10px">
            <div>
                <p>Query: <span style="background-color: #303134; padding: 5px 10px; border-radius: 20px;">${i.keyWord.query}</span></p>
                <p style="margin-top: 15px;">Created at : <span style="background-color: #303134; padding: 5px 10px; border-radius: 20px;">${i.date}</span></p> 
            </div>
            <div><img src="../assets/seemore.png" alt="see more" style='width:20px' /></div>
        </div>
        `;
        // console.log(item)
        rightMenuContent.appendChild(div);
    })

    // Ajoutez l'écouteur d'événement ici pour appeler updateLeftMenuContent lorsque l'image est cliquée
    document.getElementById('refreshIconhistory').addEventListener('click', updateRighttMenuContent);
}

// Right btn actions
document.getElementById('rightMenuToggleButton').addEventListener('click', function () {
    let leftMenuBtn = document.getElementById('rightMenuToggleButton');
    let leftMenu = document.getElementById('right-menu');
    const menuContent = document.getElementById('query-history')

    const history = JSON.parse(localStorage.getItem('queryiq'));

    console.log("=> History from right menu :\n", history)

    if (leftMenu.contains(menuContent)) {
        menuContent.remove();
        leftMenuBtn.style.rotate = "0deg";
        return;
    } else {                
        const rightMenuContent = document.createElement('div');
        rightMenuContent.id = 'query-history';
        leftMenu.appendChild(rightMenuContent);
        updateRighttMenuContent(history);
        leftMenuBtn.style.rotate = "180deg";
    } 
});