import React from 'react';
import { Page, View, Text, Document, StyleSheet, Font } from '@react-pdf/renderer';

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
    marginBottom: 24
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 100
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
              <Text style={pdfStyle.infoData}> {new Date(patientData.dateOfBirth).toLocaleDateString()}</Text>
            </View>
            <View style={pdfStyle.infoContainer}>
              <Text style={pdfStyle.infoText}>Причина надходження:</Text>
              <Text style={pdfStyle.infoData}> {patientData.deliveryReason.name}</Text>
            </View>
            <View style={pdfStyle.infoContainer}>
              <Text style={pdfStyle.infoText}>Стать: </Text>
              <Text style={pdfStyle.infoData}>Чоловіча</Text>
            </View>
            <View style={pdfStyle.infoContainer}>
              <Text style={pdfStyle.infoText}>Мобільний телефон:</Text>
              <Text style={pdfStyle.infoData}> {patientData.mobileNumber}</Text>
            </View>
          </View>
          <View style={pdfStyle.bottom}>
            <Text style={pdfStyle.bottomText}>Керівник лікарні: Амосов С.Л.</Text>
            <Text>{new Date().toLocaleDateString()}</Text>
          </View>
          <View></View>
        </View>
      </Page>
    </Document>
  );
};

export default EntrancePDF;
