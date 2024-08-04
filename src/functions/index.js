// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate((snap, context) => {
    const notification = snap.data();

    const payload = {
      notification: {
        title: 'New Notification',
        body: notification.message,
      }
    };

    return admin.messaging().sendToTopic('notifications', payload)
      .then(response => {
        console.log('Successfully sent message:', response);
      })
      .catch(error => {
        console.log('Error sending message:', error);
      });
  });
 
