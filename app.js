const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

//Download this from firestore following the README.md instructions
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});

const firestore = admin.firestore();
const uploadPath = path.join(__dirname, 'upload');

fs.readdir(uploadPath, (err, files) => {
    if(err) console.error(`Firestore upload failed: ${err}`);

    files.forEach((file) => {
        let lastDotIndex = file.lastIndexOf('.');
        let item = require('./upload/' + file);
        let key;
        item.forEach(function(obj) {
            key = obj.Name //uuidv4();  //Change this to key common to your date set like obj.id or obj.name if you don't want dups.
            firestore
                .collection(file.substring(0, lastDotIndex))
                .doc(key)
                .set(obj)
                .then(() => {
                    console.log('Document written/updated with ID: ', key);
                })
                .catch(function(error){
                    console.error("Error adding document: ", error);
                });
        })
    });
});



