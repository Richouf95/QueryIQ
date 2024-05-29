// Left btn actions
document.getElementById('leftMenuToggleButton').addEventListener('click', function () {
    let leftMenuBtn = document.getElementById('leftMenuToggleButton');
    let leftMenu = document.getElementById('left-menu');
    const menuContent = document.getElementById('query-tokens')

    if (leftMenu.contains(menuContent)) {
        menuContent.remove();
        leftMenuBtn.style.rotate = "180deg";
        return;
    } else {                
        const leftMenuContent = document.createElement('div');
        leftMenuContent.textContent = 'Query Tokens';
        leftMenuContent.id = 'query-tokens';
        leftMenu.appendChild(leftMenuContent);
        leftMenuBtn.style.rotate = "0deg";
    } 
});