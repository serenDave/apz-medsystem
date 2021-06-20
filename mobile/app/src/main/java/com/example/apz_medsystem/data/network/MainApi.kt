package com.example.apz_medsystem.data.network

import com.example.apz_medsystem.data.responses.DoctorResponse
import com.example.apz_medsystem.data.responses.PatientsResponse
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.GET
import retrofit2.http.POST

interface MainApi {

    @GET("/api/patients")
    suspend fun getPatients(): PatientsResponse

    @FormUrlEncoded
    @POST("/api/requests/doctor-response")
    suspend fun doctorRespond(
        @Field("isTaking") isTaking: Boolean,
        @Field("patientId") patientId: String,
        @Field("doctorId") doctorId: String
    ): DoctorResponse

    @FormUrlEncoded
    @POST("/api/requests/doctor-finished")
    suspend fun doctorFinished(
        @Field("doctorId") doctorId: String,
        @Field("patientId") patientId: String
    ): DoctorResponse
}
