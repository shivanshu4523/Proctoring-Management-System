// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // If you're using Firebase Storage

// Your Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyBRqlcQvbM5QfzVNUsOaIVsVMZhg9UghVw",
        authDomain: "disipline-360.firebaseapp.com",
        projectId: "disipline-360",
        storageBucket: "disipline-360.appspot.com",
        messagingSenderId: "1083655016878",
        appId: "1:1083655016878:web:1759d2bcd4ca794081783f",
        measurementId: "G-3LSRBM3XWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage (optional, if you're using it)
const storage = getStorage(app);

// Export initialized Firebase app and services if needed elsewhere
export { app, storage };
