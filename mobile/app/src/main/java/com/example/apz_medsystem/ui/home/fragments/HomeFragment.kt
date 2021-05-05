package com.example.apz_medsystem.ui.home.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.lifecycle.Observer
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.apz_medsystem.data.network.MainApi
import com.example.apz_medsystem.data.network.Resource
import com.example.apz_medsystem.data.repository.MainRepository
import com.example.apz_medsystem.databinding.FragmentHomeBinding
import com.example.apz_medsystem.db.PatientDatabase
import com.example.apz_medsystem.ui.adapters.PatientsAdapter
import com.example.apz_medsystem.ui.base.BaseFragment
import com.example.apz_medsystem.ui.home.HomeViewModel

class HomeFragment : BaseFragment<HomeViewModel, FragmentHomeBinding, MainRepository>() {
    lateinit var patientsAdapter: PatientsAdapter

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        setupRecyclerView()

        viewModel.getPatients()
        showProgressBar()

        viewModel.patientsResponse.observe(viewLifecycleOwner, Observer {
            when (it) {
                is Resource.Success -> {
                    hideProgressBar()
                    it.value.data.let { patientsResponse ->
                        patientsAdapter.differ.submitList(patientsResponse.docs)
                    }
                }
                is Resource.Failure -> {
                    hideProgressBar()
                    it.errorBody?.let { message ->
                        Toast.makeText(requireContext(), "Error getting patients: $message", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        })
    }

    private fun hideProgressBar() {
        binding.paginationProgressBar.visibility = View.INVISIBLE
    }

    private fun showProgressBar() {
        binding.paginationProgressBar.visibility = View.VISIBLE
    }

    override fun getViewModel(): Class<HomeViewModel> {
        return HomeViewModel::class.java
    }

    override fun getFragmentBinding(
        inflater: LayoutInflater,
        container: ViewGroup?
    ): FragmentHomeBinding {
        return FragmentHomeBinding.inflate(inflater, container, false)
    }

    override fun getFragmentRepository(): MainRepository {
        return MainRepository(
            remoteDataSource.buildApi(MainApi::class.java),
            PatientDatabase(requireActivity()),
            userPreferences
        )
    }

    private fun setupRecyclerView() {
        patientsAdapter = PatientsAdapter()
        binding.rvPatients.apply {
            adapter = patientsAdapter
            layoutManager = LinearLayoutManager(activity)
        }
    }
}