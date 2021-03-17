function startRouter(){
    let hash = window.location.hash;
    if(hash != "#home" && hash != "#favorite" && hash != "#deleted"){
        history.pushState(null, null, "#home");
    }
    hashChangedRoute();
};

function home(view){
    let div = document.createElement('div');
    div.id = "divMain";

    let button = document.createElement('button');
    button.innerHTML = "Roll";
    button.setAttribute("onclick", "affichageChienRandom()");
    
    view.appendChild(div);
    view.appendChild(button);

    affichageChienRandom();
}

function favorite(view){
    let div = document.createElement('div');
    div.id = "divMain";
    
    view.appendChild(div);

    readDogo(1);
};

function deleted(view){
    let div = document.createElement('div');
    div.id = "divMain";
    
    view.appendChild(div);

    readDogo(2);
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

        case "#deleted":
            deleted(view);
        break;

        default:
            view.innerHTML = "<h1>404 - Page Not Found</h1>";
        break;
    } 
}  

window.addEventListener("hashchange", hashChangedRoute);

