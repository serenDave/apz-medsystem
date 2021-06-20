package com.example.apz_medsystem.ui.auth

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.apz_medsystem.data.network.Resource
import com.example.apz_medsystem.data.repository.AuthRepository
import kotlinx.coroutines.launch
import com.example.apz_medsystem.data.responses.LoginResponse
import com.example.apz_medsystem.data.responses.User

class AuthViewModel(
    private val repository: AuthRepository
): ViewModel() {

    private val _loginResponse: MutableLiveData<Resource<LoginResponse>> = MutableLiveData()
    val loginResponse: LiveData<Resource<LoginResponse>>
        get() = _loginResponse

    fun login (
        email: String,
        password: String,
        deviceIdToken: String
    ) = viewModelScope.launch {
        _loginResponse.value  = repository.login(email, password, deviceIdToken)
    }

    fun saveAuthToken(token: String) = viewModelScope.launch {
        repository.saveAuthToken(token)
    }

    fun saveUserName(name: String) = viewModelScope.launch {
        repository.saveUserName(name)
    }

    fun saveUserEmail(email: String) = viewModelScope.launch {
        repository.saveUserEmail(email)
    }

    fun saveDoctorId(doctorId: String) = viewModelScope.launch {
        repository.saveDoctorId(doctorId)
    }
}