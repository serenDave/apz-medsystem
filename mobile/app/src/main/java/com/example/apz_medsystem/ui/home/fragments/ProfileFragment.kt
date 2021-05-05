package com.example.apz_medsystem.ui.home.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.lifecycle.asLiveData
import com.example.apz_medsystem.data.UserPreferences
import com.example.apz_medsystem.data.network.MainApi
import com.example.apz_medsystem.data.repository.MainRepository
import com.example.apz_medsystem.databinding.FragmentProfileBinding
import com.example.apz_medsystem.db.PatientDatabase
import com.example.apz_medsystem.ui.auth.AuthActivity
import com.example.apz_medsystem.ui.base.BaseFragment
import com.example.apz_medsystem.ui.home.HomeViewModel
import com.example.apz_medsystem.ui.startNewActivity

class ProfileFragment : BaseFragment<HomeViewModel, FragmentProfileBinding, MainRepository>() {
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        val userPreferences = UserPreferences(requireContext())

        userPreferences.userEmail.asLiveData().observe(viewLifecycleOwner, Observer { email ->
            binding.tvEmailText.text = email
        })

        userPreferences.userName.asLiveData().observe(viewLifecycleOwner, Observer { name ->
            binding.tvNameText.text = name
        })

        binding.bLogout.setOnClickListener {
            viewModel.logout()
            requireActivity().startNewActivity(AuthActivity::class.java)
        }
    }

    override fun getViewModel(): Class<HomeViewModel> {
        return HomeViewModel::class.java
    }

    override fun getFragmentBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentProfileBinding {
        return FragmentProfileBinding.inflate(inflater, container, false)
    }

    override fun getFragmentRepository(): MainRepository {
        return MainRepository(
            remoteDataSource.buildApi(MainApi::class.java),
            PatientDatabase(requireActivity()),
            userPreferences
        )
    }
}