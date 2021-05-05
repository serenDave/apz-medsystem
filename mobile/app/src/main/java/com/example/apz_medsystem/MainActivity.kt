package com.example.apz_medsystem

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.lifecycle.Observer
import androidx.lifecycle.asLiveData
import com.example.apz_medsystem.data.UserPreferences
import com.example.apz_medsystem.ui.auth.AuthActivity
import com.example.apz_medsystem.ui.home.HomeActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val userPreferences = UserPreferences(this)
        userPreferences.authToken.asLiveData().observe(this, Observer {
            val activity = if (it == null) AuthActivity::class.java else HomeActivity::class.java
            startActivity(Intent(this, activity))
        })
    }
}