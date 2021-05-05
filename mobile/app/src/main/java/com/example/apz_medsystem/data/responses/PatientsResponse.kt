package com.example.apz_medsystem.data.responses

data class PatientsResponse(
    val `data`: DataPatients,
    val results: Int,
    val status: String
)