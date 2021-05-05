package com.example.apz_medsystem.data.responses

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(
    tableName = "patients"
)
data class Doc(
    @PrimaryKey(autoGenerate = false)
    val __v: Int,
    val _id: String,
    val bloodPressure: BloodPressure,
    val dateOfBirth: String?,
    val deliveryReason: DeliveryReason,
    val fullName: String,
    val iotDeviceId: String?,
    val mobileNumber: String?,
    val pulse: Int,
    val temperature: Double,
    val wardId: WardId?
)