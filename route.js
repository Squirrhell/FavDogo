
function home(view){
    let div = document.createElement('div');
    div.id = "divMain";

    console.log(div);

    let button = document.createElement('button');
    button.innerHTML = "Roll";
    button.setAttribute("onclick", "affichageChienRandom()");

    console.log(button);
    
    view.appendChild(div);
    view.appendChild(button);

    affichageChienRandom();
}

function favorite(view){
    
};

function hashChangedRoute() {
    const hash = window.location.hash;  
    console.log(hash);
    const view = document.getElementById("view");
    view.innerHTML = "";

    switch (hash) {
        case "#home":
            home(view);
        break;

        case "#favorite":
            favorite(view);
        break;

        default:
            view.innerHTML = "<h1>404 - Page Not Found</h1>";
        break;
    } 
}  

window.addEventListener("hashchange", hashChangedRoute);
window.onload = event => {
    let hash = window.location.hash;
    if(hash != "#home" && hash != "#favorite"){
        history.pushState(null, null, "#home");
    }
    hashChangedRoute();
};
