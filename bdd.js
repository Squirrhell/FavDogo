
var db;
const request = indexedDB.open("DogoDB", 3);
request.onerror = event => {console.log('Erreur au chargement de la BDD')};
request.onupgradeneeded = event => {
    db = event.target.result;

    let objectStore = db.createObjectStore("dogo", { keyPath: "url" });
    objectStore.createIndex("isSaved", "isSaved", { unique: false });

    objectStore.transaction.oncomplete = event => {console.log("BDD màj");};
    objectStore.transaction.onerror = event => {console.log("Erreur : la màj de la BDD a échoué");};

};
request.onsuccess = event => {
    db = event.target.result;
    console.log('Succes du chargement de la BDD');
    router.startRouter();
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
            //console.log(cursor.value.url);
            affichageDogo(cursor.value.url);
            document.getElementById('divMain').appendChild(addButton(status, cursor.value.url));
            cursor.continue();
        }
        console.log('Chien affichés');
    };

    index.onerror = event => {console.log('Erreur lors d\'une requete READ');};
}


function deleteDogo(url){
    let transaction = db.transaction(["dogo"], "readwrite");
    let objectStore = transaction.objectStore("dogo");
    let request = objectStore.delete(url);

    request.onsuccess = event => {console.log('Succes lors d\'une requete DELETE');};
    request.onerror = event => {console.log('Erreur lors d\'une requete DELETE');};
}

function updateDogo(url, value){
    let transaction = db.transaction(["dogo"], "readwrite")
    let objectStore = transaction.objectStore("dogo");
    let request = objectStore.get(url);

    request.onerror = event => {console.log('Erreur lors d\'une requete update');};
    request.onsuccess = event => {
        let data = request.result;
        data.isSaved = value;

        let requestUpdate = objectStore.put(data);
        
        requestUpdate.onerror = event => {console.log('Erreur lors de la màj de la ligne');};
        requestUpdate.onsuccess = event => {console.log('Ligne màj');};
    };
}
