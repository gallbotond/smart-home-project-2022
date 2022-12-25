
#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE  DHT11
#define LED 7
#define LED2 8

DHT dht(DHTPIN, DHTTYPE);

unsigned long interval = 50, getdatafromDHT = 0, getdatafromsonicsensor = 0, printdatatomonitor = 0, uploaddatatofirebase = 0, state = 0; 
unsigned long actual = 0, old = 0;

byte led;

struct dhtsensorstruct {
  float humi;
  float tempC;
  float tempF;
};

struct sonicsensorstruct {
  float currentnoiselevel;
};

dhtsensorstruct dhtsensor{0,0,0};
sonicsensorstruct sonicsensor{0};

void setup() {
  Serial.begin(9600);
  dht.begin(); // initialize the sensor
  pinMode(LED , OUTPUT);
  pinMode(LED2 , OUTPUT);
}

void loop() {
  
 actual = millis();
 if (actual >= old + interval) {
    old = actual;
    /*if (old > getdatafromsensors + 2000) {
      getdatafromsensors = old;
      state = 1;
      }*/
    if (old > printdatatomonitor + 5000) {
      printdatatomonitor = old;
      state = 1;
    }
    if (old > uploaddatatofirebase + 10000) {
      uploaddatatofirebase = old;
      state = 3;
    }
 }
  switch (state) {
      case 0:
        if (Serial.available()){
         led = Serial.parseInt();

         if(led == 4){
           digitalWrite(LED2 , HIGH);
          }     

           if(led == 3){
           digitalWrite(LED2 , LOW);
          }
         if(led == 2){
           digitalWrite(LED , HIGH);
          }     

           if(led == 1){
           digitalWrite(LED , LOW);
          }
        }
        if (actual > getdatafromDHT + 2000) {
          getdatafromDHT = actual;
          dhtsensorfunction();
        }

        if (actual > getdatafromsonicsensor + 100) {
          getdatafromsonicsensor = actual;
          sonicsensorread();
        }
        
        break;

      case 1:
        state = 0;
        
        printdata();
        /*thing.handle();*/
        break;

      default:
        break;
    }
} 

void printdata(){
    Serial.print("{\"SENSOR1\":");
    Serial.print(dhtsensor.humi);
    Serial.print(",\"SENSOR2\":");
    Serial.print(dhtsensor.tempC);
    Serial.print(",\"SENSOR3\":");
    Serial.print(dhtsensor.tempF);
    Serial.print(",\"SENSOR4\":");
    Serial.print(sonicsensor.currentnoiselevel);
    Serial.println("}");
  }

void sonicsensorread(){
  sonicsensor.currentnoiselevel = analogRead(A0);
  }

void dhtsensorfunction(){

  //read humidity
  dhtsensor.humi  = dht.readHumidity();
  //read temperature in celsius
  dhtsensor.tempC = dht.readTemperature();
  //read temperature in fahrenheit
  dhtsensor.tempF = dht.readTemperature(true);

  // check if any reads failed
  if (isnan(dhtsensor.humi) || isnan(dhtsensor.tempC) || isnan(dhtsensor.tempF)) {
    Serial.println("Failed to read from DHT sensor!");
  }
}

