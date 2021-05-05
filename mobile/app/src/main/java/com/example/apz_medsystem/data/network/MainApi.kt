package com.example.apz_medsystem.data.network

import com.example.apz_medsystem.data.responses.PatientsResponse
import retrofit2.http.GET

interface MainApi {

    @GET("/api/patients")
    suspend fun getPatients(): PatientsResponse
}
