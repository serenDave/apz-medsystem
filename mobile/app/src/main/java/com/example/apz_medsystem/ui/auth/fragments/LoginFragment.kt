package com.example.apz_medsystem.ui.auth.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.widget.addTextChangedListener
import androidx.lifecycle.Observer
import com.example.apz_medsystem.databinding.FragmentLoginBinding
import com.example.apz_medsystem.data.network.AuthApi
import com.example.apz_medsystem.data.network.Resource
import com.example.apz_medsystem.data.repository.AuthRepository
import com.example.apz_medsystem.ui.auth.AuthViewModel
import com.example.apz_medsystem.ui.base.BaseFragment
import com.example.apz_medsystem.ui.enable
import com.example.apz_medsystem.ui.home.HomeActivity
import com.example.apz_medsystem.ui.startNewActivity
import com.example.apz_medsystem.ui.visible
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.messaging.FirebaseMessaging

class LoginFragment: BaseFragment<AuthViewModel, FragmentLoginBinding, AuthRepository>() {
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        binding.progressBar.visible(false)
        binding.buttonLogin.enable(false)

        viewModel.loginResponse.observe(viewLifecycleOwner, { response ->
            binding.progressBar.visible(false)

            when (response) {
                is Resource.Success -> {
                    viewModel.saveAuthToken(response.value.token)
                    viewModel.saveUserName(response.value.data.user.name)
                    viewModel.saveUserEmail(response.value.data.user.email)
                    response.value.data.user.doctorId?.let { it1 -> viewModel.saveDoctorId(it1) }
                    requireActivity().startNewActivity(HomeActivity::class.java)
                }
                is Resource.Failure -> {
                    Toast.makeText(requireContext(), "Login failure", Toast.LENGTH_SHORT).show()
                }
            }
        })

        binding.editTextTextPassword.addTextChangedListener {
            val email = binding.editTextTextEmailAddress.text.toString().trim()
            binding.buttonLogin.enable(email.isNotEmpty() && it.toString().isNotEmpty())
        }

        binding.buttonLogin.setOnClickListener {
            val email = binding.editTextTextEmailAddress.text.toString().trim()
            val password = binding.editTextTextPassword.text.toString().trim()

            binding.progressBar.visible(true)

            FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
                if (!task.isSuccessful) {
                    Log.w("FIREBASE_TOKEN", "Fetching FCM registration token failed", task.exception)
                    return@OnCompleteListener
                }

                // Get new FCM registration token
                val token = task.result

                // Log and toast
                if (token != null) {
                    Log.d("FIREBASE_TOKEN", token)
                    viewModel.login(email, password, token)
                }
            })
        }
    }

    override fun getViewModel(): Class<AuthViewModel> {
        return AuthViewModel::class.java
    }

    override fun getFragmentBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentLoginBinding {
        return FragmentLoginBinding.inflate(inflater, container, false)
    }

    override fun getFragmentRepository(): AuthRepository {
        return AuthRepository(remoteDataSource.buildApi(AuthApi::class.java), userPreferences)
    }
}
