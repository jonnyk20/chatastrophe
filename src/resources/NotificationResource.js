export default class NotificationResource {
  allTokens = [];
  tokensLoaded = false;
  constructor(messaging, database) {
    this.messaging = messaging;
    this.database = database;
    try {
      this.messaging
        .requestPermission()
        .then(res => {
          console.log('Permission granted');
        })
        .catch(err => {
          console.log('no access', err);
        })
    } catch (err) {
      console.log('No notification support. ', err);
    }
    this.setupTokenRefresh()
    this.database.ref('fcmTokens').on('value', snapshot => {
      this.allTokens = snapshot.val();
      this.tokensLoaded = true;
    })
  }

  setupTokenRefresh() {
    this.messaging.onTokenRefresh(() => {

    });
  }

  saveTokenToServer() {
    this.messaging.getToken().then(res => {
      if (this.tokensLoaded) {
        const existingToken = this.findExistingToken(res);
        if (existingToken) {
          // If it exists, replace
          firebase
            .database()
            .ref(`/fcmTokens/${existingToken}`)
            .set({
              token: res,
              user_id: this.user.uid
            });
        } else {
          this.registerToken(res);
        }
      }
    })
  }

  findExistingToken(tokenToSave) {
    for (let tokenKey in this.allTokens) {
      const token = this.allTokens[tokenKey].token;
      if (token === tokenToSave) {
        return tokenKey;
      }
    }
  }

  changeUser(user) {
    this.user = user;
    this.saveTokenToServer();
  }

  registerToken(token) {
    firebase
      .database()
      .ref('fcmTokens/')
      .push({
        token: token,
        user_id: this.user.uid
      });
  }




}
