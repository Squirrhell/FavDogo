
class Chien {
    constructor(url, isSaved){
    this.url = url;
    this.isSaved = isSaved;
    };
}


function affichageChienRandom() {
    fetch("https://dog.ceo/api/breeds/image/random/3")
        .then(result => {
            //console.log(result);
            if (result.ok){
                return result.json();
            } else {
                throw new Error('Erreur durant le fetch');
            }
        })
        .then(data => {
            let chiensRandom = new Chien(data.message, 0);
            return chiensRandom;
        })
        .then(chiensRandom => {
            let mainDiv = document.getElementById('divMain');
            mainDiv.innerHTML = "";

            for(ii = 0 ; ii < 3 ; ii++){
                affichageDogo(chiensRandom.url[ii]);
                mainDiv.appendChild(addButton(0, chiensRandom.url[ii]));
            
            }
        })
        .catch(error => console.log(error));
}

function affichageDogo(url){
    let mainDiv = document.getElementById('divMain');
    let dogoDiv = document.createElement('div');
    
    mainDiv.appendChild(dogoDiv);

    let newImg = document.createElement('img');
    newImg.src = url;

    dogoDiv.appendChild(newImg);
}

function addButton(status,url){
    let button = document.createElement('button');
    switch(status){
        case 0:
        button.innerHTML = "add";
        button.setAttribute("onclick", "createDogo('"+url+"')");
        break;

        case 1:
        button.innerHTML = "delete";
        button.setAttribute("onclick", "updateDogo('"+url+"',2)");
        break;   

        case 2:
        button.innerHTML = "restore";
        button.setAttribute("onclick", "updateDogo('"+url+"',1)");
        break;

    }
    return button;
}

