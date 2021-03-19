class Router {

    startRouter(){
        let hash = window.location.hash;
        if(hash != "#home" && hash != "#favorite" && hash != "#deleted"){
            history.pushState(null, null, "#home");
        }
        this.hashChangedRoute();
    };

    home(view){
        let div = document.createElement('div');
        div.id = "divMain";

        let button = document.createElement('button');
        button.innerHTML = "Roll";
        button.setAttribute("onclick", "affichageChienRandom()");
        
        view.appendChild(div);
        view.appendChild(button);

        affichageChienRandom();
    }

    favorite(view){
        let div = document.createElement('div');
        div.id = "divMain";
        
        view.appendChild(div);

        readDogo(1);
    };

    deleted(view){
        let div = document.createElement('div');
        div.id = "divMain";
        
        view.appendChild(div);

        readDogo(2);
    };



    hashChangedRoute() {
        const hash = window.location.hash;  
        console.log(hash);
        const view = document.getElementById("view");
        view.innerHTML = "";

        switch (hash) {
            case "#home":
                router.home(view);
            break;

            case "#favorite":
                router.favorite(view);
            break;

            case "#deleted":
                router.deleted(view);
            break;

            default:
                view.innerHTML = "<h1>404 - Page Not Found</h1>";
            break;
        } 
    }  
}

let router = new Router();
window.addEventListener("hashchange", router.hashChangedRoute);

