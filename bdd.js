
var db;
const request = indexedDB.open("DogoDB", 3);
request.onerror = event => {console.log('Erreur au chargement de la BDD')};
request.onsuccess = event => {db = event.target.result;console.log('Succes du chargement de la BDD')};
request.onupgradeneeded = event => {
    db = event.target.result;

    let objectStore = db.createObjectStore("dogo", { keyPath: "url" });
    objectStore.createIndex("isSaved", "isSaved", { unique: false });

    objectStore.transaction.oncomplete = event => {console.log("BDD màj");};
    objectStore.transaction.onerror = event => {console.log("Erreur : la màj de la BDD a échoué");};

};

//db.onerror = event => {console.log('Erreur lors d\'une requete :' + event.target.errorCode);};


function createDogo(url){
    let chienAddFav = new Chien(url, 1);

    let transaction = db.transaction(["dogo"], "readwrite");
    let objectStore = transaction.objectStore("dogo");

    let request = objectStore.add(chienAddFav);

    request.onsuccess = event => {console.log('Chien ajouté aux favoris');};
    request.onerror = event => {console.log('Erreur lors d\'une requete CREATE');};
}

function readDogo(status){
    let isSavedKeyRange = IDBKeyRange.only(status);
    
    let transaction = db.transaction(["dogo"]);
    let objectStore = transaction.objectStore("dogo");
    let index = objectStore.index("isSaved");
   
    index.openCursor(isSavedKeyRange).onsuccess = event => {
        let cursor = event.target.result;
        if (cursor) {
            console.log(cursor.value.url);
            affichageDogo(cursor.value.url);
            document.getElementById('divMain').appendChild(addButton(status));
            cursor.continue();
        }
        console.log('Chien favoris affichés');
    };

    index.onerror = event => {console.log('Erreur lors d\'une requete READ');};
}


function deleteDogo(){
    /* COPY DOC
    let request = db.transaction(["dogo"], "readwrite")
                .objectStore("dogo")
                .delete("444-44-4444");
    request.onsuccess = event => {
    // c'est supprimé !
    };

    request.onerror = event => {console.log('Erreur lors d\'une requete DELETE');};
    */
}

function updateDogo(){
    /* COPY DOC
    var objectStore = db.transaction(["customers"], "readwrite").objectStore("customers");
    var request = objectStore.get("444-44-4444");
    request.onerror = function(event) {
    // Gestion des erreurs!
    };
    request.onsuccess = function(event) {
        // On récupère l'ancienne valeur que nous souhaitons mettre à jour
        var data = request.result;

        // On met à jour ce(s) valeur(s) dans l'objet
        data.age = 42;

        // Et on remet cet objet à jour dans la base
        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = function(event) {
            // Faire quelque chose avec l’erreur
        };
        requestUpdate.onsuccess = function(event) {
            // Succès - la donnée est mise à jour !
        };
    };
    */
}
