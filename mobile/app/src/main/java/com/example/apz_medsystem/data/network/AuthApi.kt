package com.example.apz_medsystem.data.network

import com.example.apz_medsystem.data.responses.LoginResponse
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface AuthApi {

    @FormUrlEncoded
    @POST("/api/users/signin")
    suspend fun login(
        @Field("email") email: String,
        @Field("password") password: String,
        @Field("deviceIdToken") deviceIdToken: String
    ): LoginResponse
}

