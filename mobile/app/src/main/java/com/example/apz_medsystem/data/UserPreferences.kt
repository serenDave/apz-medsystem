package com.example.apz_medsystem.data

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.preferencesDataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import com.example.apz_medsystem.data.responses.User
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

private val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "app_data")

class UserPreferences(
    context: Context
) {
    private val appContext = context.applicationContext

    val authToken: Flow<String?>
        get() = appContext.dataStore.data.map { preferences ->
            preferences[ACCESS_TOKEN]
        }

    val userName: Flow<String?>
        get() = appContext.dataStore.data.map { preferences ->
            preferences[USER_NAME]
        }

    val userEmail: Flow<String?>
        get() = appContext.dataStore.data.map { preferences ->
            preferences[USER_EMAIL]
        }

    suspend fun saveAuthToken (authToken: String) {
        appContext.dataStore.edit { preferences ->
            preferences[ACCESS_TOKEN] = authToken
        }
    }

    suspend fun saveUserName (name: String) {
        appContext.dataStore.edit { preferences ->
            preferences[USER_NAME] = name
        }
    }

    suspend fun saveUserEmail (email: String) {
        appContext.dataStore.edit { preferences ->
            preferences[USER_EMAIL] = email
        }
    }

    suspend fun clear() {
        appContext.dataStore.edit { preferences ->
            preferences.clear()
        }
    }

    companion object {
        private val ACCESS_TOKEN = stringPreferencesKey("access_token")
        private val USER_NAME = stringPreferencesKey("user_name")
        private val USER_EMAIL = stringPreferencesKey("user_email")
    }
}