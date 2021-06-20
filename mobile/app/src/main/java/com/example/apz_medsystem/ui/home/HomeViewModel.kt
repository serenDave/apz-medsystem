package com.example.apz_medsystem.ui.home

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.apz_medsystem.data.network.Resource
import com.example.apz_medsystem.data.repository.MainRepository
import com.example.apz_medsystem.data.responses.Doc
import com.example.apz_medsystem.data.responses.PatientsResponse
import kotlinx.coroutines.launch

class HomeViewModel(
    private val repository: MainRepository,
): ViewModel() {
    val patientsResponse: MutableLiveData
        <Resource<PatientsResponse>> = MutableLiveData()

    fun getPatients() = viewModelScope.launch {
        val response = repository.getPatients()
        patientsResponse.postValue(handlePatientsResponse(response))
    }

    private fun handlePatientsResponse(
       response: PatientsResponse
    ): Resource<PatientsResponse> {
        response.let {
            return Resource.Success(it)
        }
    }

    fun getCurrentPatients() = repository.getCurrentPatients()

    fun deletePatient(patient: Doc) = viewModelScope.launch {
        repository.deletePatient(patient)
        repository.doctorFinished(patient._id)
    }

    fun logout() = viewModelScope.launch {
        repository.logOutUser()
    }
}