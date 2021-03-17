
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
    console.log(isSavedKeyRange);

    let transaction = db.transaction(["dogo"]);
    let objectStore = transaction.objectStore("dogo");
    let index = objectStore.index("isSaved");
   
    index.openCursor(isSavedKeyRange).onsuccess = event => {
        console.log(event);
        let cursor = event.target.result;
        if (cursor) {
            console.log(cursor.value.url);
            affichageDogo(cursor.value.url);
            document.getElementById('divMain').appendChild(addButton(status, cursor.value.url));
            cursor.continue();
        }
        console.log('Chien affichés');
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

function updateDogo(url, value){
    let transaction = db.transaction(["dogo"], "readwrite")
    let objectStore = transaction.objectStore("dogo");
    console.log(url);
    let request = objectStore.get(url);

    request.onerror = event => {console.log('Erreur lors d\'une requete update');};
    request.onsuccess = event => {
        // On récupère l'ancienne valeur que nous souhaitons mettre à jour
        console.log(request);
        var data = request.result;

        // On met à jour ce(s) valeur(s) dans l'objet
        console.log(data);
        data.isSaved = value;

        // Et on remet cet objet à jour dans la base
        var requestUpdate = objectStore.put(data);
        requestUpdate.onerror = event => {console.log('Erreur lors de la màj de la ligne');};
        requestUpdate.onsuccess = event => {console.log('Ligne màj');};
    };
}
