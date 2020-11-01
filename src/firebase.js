import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCkh8RK5cxdgdzpUtUIF1Bp1hWUOJNZYSo",
    authDomain: "nba-full-e2e7b.firebaseapp.com",
    databaseURL: "https://nba-full-e2e7b.firebaseio.com",
    projectId: "nba-full-e2e7b",
    storageBucket: "nba-full-e2e7b.appspot.com",
    messagingSenderId: "619946042679",
    appId: "1:619946042679:web:2f3d69cbc99a89015966b2",
    measurementId: "G-L3PBJNTSG7"
  };

  firebase.initializeApp(firebaseConfig);

  const firebaseDB = firebase.database();
  const firebaseArticles = firebaseDB.ref('articles');
  const firebaseTeams = firebaseDB.ref('teams');
  const firebaseVideos = firebaseDB.ref('videos');

  const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })
    return data;
  }

  export {
      firebase,
      firebaseDB,
      firebaseArticles,
      firebaseTeams,
      firebaseVideos,
      firebaseLooper
  }