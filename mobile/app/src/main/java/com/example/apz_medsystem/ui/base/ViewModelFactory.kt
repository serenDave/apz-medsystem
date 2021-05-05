package com.example.apz_medsystem.ui.base

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.apz_medsystem.data.repository.AuthRepository
import com.example.apz_medsystem.data.repository.BaseRepository
import com.example.apz_medsystem.data.repository.MainRepository
import com.example.apz_medsystem.db.PatientDatabase
import com.example.apz_medsystem.ui.auth.AuthViewModel
import com.example.apz_medsystem.ui.home.HomeViewModel
import java.lang.IllegalArgumentException

@Suppress("UNCHECKED_CAST")
class ViewModelFactory(
    private val repository: BaseRepository,
): ViewModelProvider.NewInstanceFactory() {
    override fun <T : ViewModel?> create(modelClass: Class<T>): T {
        return when {
            modelClass.isAssignableFrom(AuthViewModel::class.java) -> AuthViewModel(repository as AuthRepository) as T
            modelClass.isAssignableFrom(HomeViewModel::class.java) -> HomeViewModel(repository as MainRepository) as T
            else -> throw IllegalArgumentException("View Model class not found")
        }
    }
}