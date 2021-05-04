import React, { useEffect, useState } from 'react';
import { Page, View, Text, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { api } from '../../../config';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf'
});

const pdfStyle = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto'
  },
  root: {
    padding: 16
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 16,
    marginBottom: 40
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 12
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  infoData: {
    fontSize: 14,
    fontWeight: 'light'
  },
  bottom: {
    display: 'flex',
    fontSize: 12
  },
  bottomText: {
    flex: 1
  }
});

const EntrancePDF = ({ patientData }) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    api
      .get(`/config/${process.env.REACT_APP_CONFIG_ID}`)
      .then((result) => {
        setConfig(result.data.data.doc);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Document>
      <Page style={pdfStyle.page}>
        <View style={pdfStyle.root}>
          <View style={pdfStyle.titleContainer}>
            <Text style={{ ...pdfStyle.title, marginBottom: 10 }}>Довідка</Text>
            <Text style={pdfStyle.title}>про надходження пацієнта до лікарні</Text>
          </View>
          <View style={pdfStyle.info}>
            <View style={pdfStyle.infoContainer}>
              <Text style={pdfStyle.infoText}>Пацієнт: </Text>
              <Text style={pdfStyle.infoData}>{patientData.fullName}</Text>
            </View>
            <View style={pdfStyle.infoContainer}>
              <Text style={pdfStyle.infoText}>Дата народження:</Text>
              <Text style={pdfStyle.infoData}>
                {patientData.dateOfBirth
                  ? new Date(patientData.dateOfBirth).toLocaleDateString()
                  : 'не вказана'}
              </Text>
            </View>
            <View style={pdfStyle.infoContainer}>
              <Text style={pdfStyle.infoText}>Причина надходження:</Text>
              <Text style={pdfStyle.infoData}> {patientData.deliveryReason.name}</Text>
            </View>
            <View style={pdfStyle.infoContainer}>
              <Text style={pdfStyle.infoText}>Мобільний телефон:</Text>
              <Text style={pdfStyle.infoData}>
                {patientData.mobileNumber ? patientData.mobileNumber : 'Не вказаний'}
              </Text>
            </View>
          </View>
          <View style={pdfStyle.bottom}>
            <Text style={pdfStyle.bottomText}>Лікарня: {config && config.clinicName}</Text>
            <Text style={pdfStyle.bottomText}>Керівник лікарні: {config && config.mainDoctorName}</Text>
          </View>
          <View></View>
        </View>
      </Page>
    </Document>
  );
};

export default EntrancePDF;
