package com.example.apz_medsystem.ui.home.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.apz_medsystem.data.network.MainApi
import com.example.apz_medsystem.data.repository.MainRepository
import com.example.apz_medsystem.databinding.FragmentCurrentPatientBinding
import com.example.apz_medsystem.db.PatientDatabase
import com.example.apz_medsystem.ui.adapters.CurrentPatientsAdapter
import com.example.apz_medsystem.ui.adapters.PatientsAdapter
import com.example.apz_medsystem.ui.base.BaseFragment
import com.example.apz_medsystem.ui.home.HomeViewModel

class CurrentPatientFragment : BaseFragment<HomeViewModel, FragmentCurrentPatientBinding, MainRepository>() {
    lateinit var currentPatientsAdapter: CurrentPatientsAdapter

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        setupRecyclerView()

        viewModel.getCurrentPatients().observe(viewLifecycleOwner, Observer { patients ->
            Log.d("CURRENT_PATIENT", "Response: $patients")
            currentPatientsAdapter.differ.submitList(patients)
        })
    }

    override fun getViewModel(): Class<HomeViewModel> {
        return HomeViewModel::class.java
    }

    override fun getFragmentBinding(
            inflater: LayoutInflater,
            container: ViewGroup?
    ): FragmentCurrentPatientBinding {
        return FragmentCurrentPatientBinding.inflate(inflater, container, false)
    }

    override fun getFragmentRepository(): MainRepository {
        return MainRepository(
            remoteDataSource.buildApi(MainApi::class.java),
            PatientDatabase(requireActivity()),
            userPreferences
        )
    }

    private fun setupRecyclerView() {
        currentPatientsAdapter = CurrentPatientsAdapter(viewModel)
        binding.rvCurrentPatients.apply {
            adapter = currentPatientsAdapter
            layoutManager = LinearLayoutManager(activity)
        }
    }
}