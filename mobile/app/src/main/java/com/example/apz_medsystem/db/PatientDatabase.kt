package com.example.apz_medsystem.db

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.example.apz_medsystem.data.responses.Doc

@Database(
    entities = [Doc::class],
    version = 2
)
@TypeConverters(Converters::class)
abstract class PatientDatabase: RoomDatabase() {
    abstract fun getPatientsDao(): PatientDao

    companion object {
        @Volatile
        private var instance: PatientDatabase? = null
        private var LOCK = Any()

        operator fun invoke(context: Context) = instance ?: synchronized(LOCK) {
            instance ?: createDatabase(context).also { instance = it }
        }

        private fun createDatabase(context: Context) =
            Room.databaseBuilder(
                context.applicationContext,
                PatientDatabase::class.java,
                "patient_db.db"
            ).fallbackToDestructiveMigration().build()
    }
}