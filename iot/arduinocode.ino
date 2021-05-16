#define temperatureSensor A0
#define	lightSensor A1
#define gasSensor A2

#define R 2
#define B 3
#define G 4

#define DELAY_VALUE 5000
#define TIMER_VALUE 5

int generateValue(int min, int max)
{
  static bool first = true;
  
  if (first) {  
    srand(1);
    first = false;
  }
  
  return min + rand() % (( max + 1 ) - min);
}
 
int* generateBloodPressure()
{
  static int bloodPressure[2];
  bloodPressure[0] = generateValue(80, 120);
  bloodPressure[1] = generateValue(60, 100);
  
  return bloodPressure;
}

int generatePulse() 
{
  return generateValue(60, 100);
}

void setup()
{
  Serial.begin(9600);
  analogReference(INTERNAL);
  
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
}

void loop()                      
{
  // Reading data
  float temperature = convertTemperature(
    analogRead(temperatureSensor));
  int pulse = generatePulse();
  int* bloodPressure = generateBloodPressure();
    
  int light = analogRead(lightSensor);
  int gas = analogRead(gasSensor);

  static int timerValue = 0;
    
  String message = "";
    
  // Processing data 
  processTemperature(temperature, message); 
  processPulse(pulse, message);
  processBloodPressure(bloodPressure[0], bloodPressure[1], message);
  processLight(light, message);
  processAirCondition(gas, message);
    
  if (message.length() > 0) {
    Serial.print("Message: ");
  	Serial.println(message);
    
  	turnLampYellow();
    
    if (timerValue == 0) {
      sendMessageToServer(message, timerValue);
    }
  } else {
   	turnLampGreen();
    Serial.println("Patient's state is ok");
  }
  
  if (timerValue > 0) {
  	timerValue--;  
  }
  
  delay(DELAY_VALUE);
}

float convertTemperature(int analogRead)
{
  float voltage = (analogRead * 1.1) / 1024.0;
  float temperatureC = (voltage - 0.5) * 100 ; 
  return temperatureC;
}

void concatMessage(String& message, String& resultMessage)
{
  if (message.length() > 0) {
    if (resultMessage.length() == 0) {
      resultMessage += message; 
    } else {
      resultMessage += ", " + message; 
    }
  }
}

void processTemperature(float temperature, String& resultMessage)
{
  String message;
  
  if (temperature < 35) {
    message = "Low temperature";
  } else if (temperature > 38) {
   	message = "High temperature"; 
  }
  
  concatMessage(message, resultMessage);
}

void processPulse(int pulse, String& resultMessage)
{
  String message;
  
  if (pulse < 60) {
   	message = "Low pulse"; 
  } else if (pulse > 100) {
   	message = "High pulse"; 
  }
  
  concatMessage(message, resultMessage);
}

void processBloodPressure(int systolic, int dyastolic, String& resultMessage)
{
  String message;
  
  if (systolic <= 80 || dyastolic <= 60) {
   	 message = "Low blood pressure";
  } else if (systolic >= 160 || dyastolic >= 120) {
   	 message = "High blood pressure"; 
  }
  
  concatMessage(message, resultMessage);
}

void processLight(int light, String& resultMessage)
{
  String message;
  
  if (light < 10) {
   message = "Dark lighting";
 } else if (light < 200) {
   message = "Dim lighting";
 } else if (light > 800) {
   message = "Very bright lighting";
 }
  
  concatMessage(message, resultMessage);
}

void processAirCondition(int gas, String& resultMessage)
{
  String message;
  
  if (gas > 700) {
    message = "Very bad air condition";
  } else if (gas > 400) {
    message = "Bad air condition";
  }
  
  concatMessage(message, resultMessage);
}

void turnLampYellow()
{
  analogWrite(R, 255); 
  analogWrite(G, 255);
  analogWrite(B, 0);
}

void turnLampGreen()
{
  analogWrite(R, 0); 
  analogWrite(G, 255);
  analogWrite(B, 0);
}

void sendMessageToServer(String message, int& timerValue) {
  Serial.println("Sending message to server...");
  timerValue = TIMER_VALUE;
}
