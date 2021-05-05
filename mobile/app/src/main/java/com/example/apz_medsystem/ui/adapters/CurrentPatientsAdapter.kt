package com.example.apz_medsystem.ui.adapters

import android.annotation.SuppressLint
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.AsyncListDiffer
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView
import com.example.apz_medsystem.data.responses.Doc
import com.example.apz_medsystem.databinding.ItemCurrentPatientBinding
import com.example.apz_medsystem.ui.home.HomeViewModel

class CurrentPatientsAdapter(
    private val viewModel: HomeViewModel,
): RecyclerView.Adapter<CurrentPatientsAdapter.PatientViewHolder>() {
    private lateinit var binding: ItemCurrentPatientBinding

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PatientViewHolder {
        binding = ItemCurrentPatientBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return PatientViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return differ.currentList.size
    }

    @SuppressLint("SetTextI18n")
    override fun onBindViewHolder(holder: PatientViewHolder, position: Int) {
        val patient = differ.currentList[position]
        holder.itemView.apply {
            binding.tvPatientText.text = patient.fullName
            binding.tvDeliveryReasonText.text = patient.deliveryReason.name
            binding.tvWardNumberText.text = patient.wardId?.number
            binding.tvMobileNumberText.text = patient.mobileNumber
            binding.tvTemperatureText.text = patient.temperature.toString()
            binding.tvPulseText.text = patient.pulse.toString()
            binding.tvBloodPressureText.text = "${patient.bloodPressure.systolic} / ${patient.bloodPressure.diastolic}"

            binding.bDeletePatient.setOnClickListener {
                viewModel.deletePatient(patient)
            }
        }
    }

    private val differCallback = object : DiffUtil.ItemCallback<Doc>() {
        override fun areItemsTheSame(oldItem: Doc, newItem: Doc): Boolean {
            return oldItem._id == newItem._id
        }

        override fun areContentsTheSame(oldItem: Doc, newItem: Doc): Boolean {
            return oldItem == newItem
        }
    }

    val differ = AsyncListDiffer(this, differCallback)

    inner class PatientViewHolder(binding: ItemCurrentPatientBinding): RecyclerView.ViewHolder(binding.root)
}