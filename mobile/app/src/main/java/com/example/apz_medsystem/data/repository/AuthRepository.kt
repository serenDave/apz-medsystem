package com.example.apz_medsystem.data.repository

import com.example.apz_medsystem.data.UserPreferences
import com.example.apz_medsystem.data.network.AuthApi
import com.example.apz_medsystem.data.responses.User

class AuthRepository(
    private val api: AuthApi,
    private val preferences: UserPreferences
) : BaseRepository() {
    suspend fun login(
        email: String,
        password: String,
        deviceIdToken: String
    ) = safeApiCall {
        api.login(email, password, deviceIdToken)
    }

    suspend fun saveAuthToken(token: String) {
        preferences.saveAuthToken(token)
    }

    suspend fun saveUserName(name: String) {
        preferences.saveUserName(name)
    }

    suspend fun saveUserEmail(email: String) {
        preferences.saveUserEmail(email)
    }

    suspend fun saveDoctorId(doctorId: String) {
        preferences.saveDoctorId(doctorId)
    }
}