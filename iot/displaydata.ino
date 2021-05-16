void printValues(float temperature, int pulse, int* bloodPressure, int light, int gas) {
  Serial.print("Temperature: ");
  Serial.print(temperature);
    
  Serial.print("Pulse: ");
  Serial.println(pulse);
    
  Serial.print("Blood pressure: ");
  Serial.print(bloodPressure[0]);
  Serial.print(" / ");
  Serial.println(bloodPressure[1]);
    
  Serial.print("Light: ");
  Serial.println(light);

  Serial.print("Gas: ");
  Serial.println(gas);
}