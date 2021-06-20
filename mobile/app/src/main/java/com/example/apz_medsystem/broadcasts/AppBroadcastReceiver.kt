package com.example.apz_medsystem.broadcasts

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import android.widget.Toast
import androidx.lifecycle.asLiveData
import com.example.apz_medsystem.data.UserPreferences
import com.example.apz_medsystem.data.network.MainApi
import com.example.apz_medsystem.data.network.RemoteDataSource
import com.example.apz_medsystem.data.repository.MainRepository
import com.example.apz_medsystem.data.responses.NotificationData
import com.example.apz_medsystem.data.responses.PatientsResponse
import com.example.apz_medsystem.db.PatientDatabase
import com.google.gson.Gson
import kotlinx.coroutines.*
import java.util.concurrent.Flow

class AppBroadcastReceiver: BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val patientDataString = intent.getStringExtra("PATIENT_DATA")

        val gson = Gson()
        val data = gson.fromJson(patientDataString, NotificationData::class.java)

        val remoteDataSource = RemoteDataSource()
        val userPreferences = UserPreferences(context)
        val repository = MainRepository(
            remoteDataSource.buildApi(MainApi::class.java),
            PatientDatabase(context),
            userPreferences
        )

        val scope = CoroutineScope(Dispatchers.Main)
        scope.launch {
            repository.upsert(data.patient)
            repository.doctorRespond(data.patient._id)
            Toast.makeText(context, "Request accepted!", Toast.LENGTH_LONG).show()
        }
    }
}