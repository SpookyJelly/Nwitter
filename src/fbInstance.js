// 가끔 코드들 보면 import * as firebase로 되어있는데, 그건 7버전 이하인 경우에 뜨는거다
// 나는 8버전이라 무관하다
// 이거 run 해보니까 콘솔창에 firebase 싹 다 로드하는 것 보다는 진짜로 사용할 기능만 꺼내와서 사용하라고하네
// ex. /database, /auth 이런 식으로.
// firebase를 init 하려면 firebase/app 을 가져오면 된다
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbservice = firebase.firestore();
export const storageService = firebase.storage();
