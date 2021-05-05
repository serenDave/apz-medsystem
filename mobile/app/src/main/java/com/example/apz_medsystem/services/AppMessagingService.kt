package com.example.apz_medsystem.services

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.media.RingtoneManager
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationCompat
import com.example.apz_medsystem.MainActivity
import com.example.apz_medsystem.R
import com.example.apz_medsystem.broadcasts.AppBroadcastReceiver
import com.example.apz_medsystem.data.responses.NotificationData
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.google.gson.Gson

class AppMessagingService : FirebaseMessagingService() {

    private val TAG = "APP_MESSAGING_SERVICE"

    companion object {
        private const val CHANNEL_ID = "apz-medsystem"
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        // [START_EXCLUDE]
        // There are two types of messages data messages and notification messages. Data messages are handled
        // here in onMessageReceived whether the app is in the foreground or background. Data messages are the type
        // traditionally used with GCM. Notification messages are only received here in onMessageReceived when the app
        // is in the foreground. When the app is in the background an automatically generated notification is displayed.
        // When the user taps on the notification they are returned to the app. Messages containing both notification
        // and data payloads are treated as notification messages. The Firebase console always sends notification
        // messages. For more see: https://firebase.google.com/docs/cloud-messaging/concept-options
        // [END_EXCLUDE]

        // Not getting messages here? See why this may be: https://goo.gl/39bRNJ
        Log.d(TAG, "From: ${remoteMessage.from}")

        // Check if message contains a data payload.
        remoteMessage.data.isNotEmpty().let {
            Log.d(TAG, "Message data payload: " + remoteMessage.data)
        }

        // Check if message contains a notification payload.
        remoteMessage.notification?.let {
            sendNotification(remoteMessage.notification, remoteMessage.data.toString())
        }
    }

    private fun sendNotification(notification: RemoteMessage.Notification?, data: String) {
        val intent = Intent(this, MainActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)

        val acceptRequestIntent = Intent(this, AppBroadcastReceiver::class.java).apply {
            action = "ACCEPT_REQUEST"
            putExtra("PATIENT_DATA", data)
        }

        val actionIntent = PendingIntent.getBroadcast(this, 0, acceptRequestIntent, PendingIntent.FLAG_UPDATE_CURRENT)

        val pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT)

        val defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION)
        val notificationBuilder = NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_baseline_add_24)
                .setContentTitle(notification?.title)
                .setContentText(notification?.body)
                .setColor(Color.GREEN)
                .setSound(defaultSoundUri)
                .setContentIntent(pendingIntent)
                .setAutoCancel(true)
                .addAction(R.mipmap.ic_launcher_round, "Accept", actionIntent)
                .setAutoCancel(true)

        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        // Since android Oreo notification channel is needed.
        // https://developer.android.com/training/notify-user/build-notification#Priority
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(CHANNEL_ID, "Channel human readable title", NotificationManager.IMPORTANCE_HIGH)
            notificationManager.createNotificationChannel(channel)
        }
        notificationManager.notify(0, notificationBuilder.build())
    }

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d(TAG, "NEW_TOKEN: $token")
    }
}
