import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDfCHm8VvWUsfF-0y9kqnQsWRi0UE5P7KI",
  authDomain: "crwn-db-425ad.firebaseapp.com",
  databaseURL: "https://crwn-db-425ad.firebaseio.com",
  projectId: "crwn-db-425ad",
  storageBucket: "crwn-db-425ad.appspot.com",
  messagingSenderId: "625873136703",
  appId: "1:625873136703:web:bd75ee0f7dafa1b92f1c8a",
  measurementId: "G-EMJVT8ZJR6"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if(!userAuth) return;

	const userRef = firestore.doc(`user/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if(!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;