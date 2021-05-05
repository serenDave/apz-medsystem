package com.example.apz_medsystem.db

import androidx.room.TypeConverter
import com.example.apz_medsystem.data.responses.BloodPressure
import com.example.apz_medsystem.data.responses.DeliveryReason
import com.example.apz_medsystem.data.responses.WardId

class Converters {

    @TypeConverter
    fun fromBloodPressure(bloodPressure: BloodPressure): String {
        return "${bloodPressure.systolic}/${bloodPressure.diastolic}"
    }

    @TypeConverter
    fun toBloodPressure(bloodPressure: String): BloodPressure {
        val values = bloodPressure.split("/")
        return BloodPressure(values[0].toInt(), values[1].toInt())
    }

    @TypeConverter
    fun fromDeliveryReason(deliveryReason: DeliveryReason): String {
        return deliveryReason.name
    }

    @TypeConverter
    fun toDeliveryReason(name: String): DeliveryReason {
        return DeliveryReason(name, name)
    }

    @TypeConverter
    fun fromWardId(wardId: WardId): String {
        return wardId.number
    }

    @TypeConverter
    fun toWardId(number: String): WardId {
        return WardId(1, number, number, 0)
    }
}