import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebase from 'firebase/compat/app';

export const authService = {
  loginWithGoogle: async (): Promise<any> => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const auth = firebase.auth();
      const userCredential = await auth.signInWithPopup(provider);
      return {
        user: userCredential.user,
      };
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {
    const auth = firebase.auth();
    await auth.signOut();
  },
};
