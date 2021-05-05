package com.example.apz_medsystem.data.responses

data class LoginResponse(
    val `data`: DataLogin,
    val status: String,
    val token: String
)