const firebaseConfig = {
	apiKey: "AIzaSyBSKsGt9pv-7onTTxB5b4Rl9S5u4vMoTn8",
	authDomain: "wonderlabs-homeword-db.firebaseapp.com",
	databaseURL: "https://wonderlabs-homeword-db.firebaseio.com",
	projectId: "wonderlabs-homeword-db",
	storageBucket: "",
	messagingSenderId: "746560383765"
}

export const Firebase = require('firebase');
export const firebaseApp = Firebase.initializeApp(firebaseConfig);

