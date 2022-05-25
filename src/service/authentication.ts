import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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
      if (typeof error === "object" && error !== null) {
        console.log(error.toString());
      } else {
        console.log("Unexpected error", error);
      }
    }
  },

  logout: async () => {
    const auth = firebase.auth();
    await auth.signOut();
  },
};
