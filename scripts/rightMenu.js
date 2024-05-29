// Right btn actions
document.getElementById('rightMenuToggleButton').addEventListener('click', function () {
    let leftMenuBtn = document.getElementById('rightMenuToggleButton');
    let leftMenu = document.getElementById('right-menu');
    const menuContent = document.getElementById('query-history')

    if (leftMenu.contains(menuContent)) {
        menuContent.remove();
        leftMenuBtn.style.rotate = "0deg";
        return;
    } else {                
        const leftMenuContent = document.createElement('div');
        leftMenuContent.textContent = 'Query history';
        leftMenuContent.id = 'query-history';
        leftMenu.appendChild(leftMenuContent);
        leftMenuBtn.style.rotate = "180deg";
    } 
});