
function Chien(message, status){
    this.message = message;
    this.status = status;
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
            let chiensRandom = new Chien(data.message, data.status);
            return chiensRandom;
        })
        .then(chiensRandom => {
            let original = document.getElementById('divMain');
            original.innerHTML = "";

            for(ii = 0 ; ii < 3 ; ii++){
                let secondDiv = document.createElement('div');
                secondDiv.width = "30%";
                
                original.appendChild(secondDiv);
        
                let newImg = document.createElement('img');
                newImg.src = chiensRandom.message[ii];
                newImg.alt = "chienRandom"+ii;
            
                secondDiv.appendChild(newImg);
            }
        })
        .catch(error => console.log(error));
}
