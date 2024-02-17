import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC7yZ8vFbk3v10I7iEJr06NjWK5rlNXxgE",
    authDomain: "fir-2c9ce.firebaseapp.com",
    projectId: "fir-2c9ce",
    storageBucket: "fir-2c9ce.appspot.com",
    messagingSenderId: "566467935049",
    appId: "1:566467935049:web:e0e870272eef013549b898",
    measurementId: "G-SDWJHY9CLM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb = getStorage(app)