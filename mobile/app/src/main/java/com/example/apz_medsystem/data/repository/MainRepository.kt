package com.example.apz_medsystem.data.repository

import com.example.apz_medsystem.data.UserPreferences
import com.example.apz_medsystem.data.network.MainApi
import com.example.apz_medsystem.data.responses.Doc
import com.example.apz_medsystem.data.responses.PatientsResponse
import com.example.apz_medsystem.db.PatientDatabase

class MainRepository(
    private val api: MainApi,
    private val db: PatientDatabase,
    private val preferences: UserPreferences
): BaseRepository() {
    suspend fun getPatients() = api.getPatients()

    suspend fun upsert(patient: Doc) = db.getPatientsDao().upsert(patient)

    fun getCurrentPatients() = db.getPatientsDao().getCurrentPatients()

    suspend fun deletePatient(patient: Doc) = db.getPatientsDao().deletePatient(patient)

    suspend fun logOutUser() {
        preferences.clear()
    }
}