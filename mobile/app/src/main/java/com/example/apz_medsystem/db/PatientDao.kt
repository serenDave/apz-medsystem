package com.example.apz_medsystem.db

import androidx.lifecycle.LiveData
import androidx.room.*
import com.example.apz_medsystem.data.responses.Doc

@Dao
interface PatientDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(patient: Doc): Long

    @Query("SELECT * FROM patients")
    fun getCurrentPatients(): LiveData<List<Doc>>

    @Delete
    suspend fun deletePatient(patient: Doc)
}