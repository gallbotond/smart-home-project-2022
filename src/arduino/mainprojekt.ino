
#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE  DHT11

DHT dht(DHTPIN, DHTTYPE);

int interval = 50, getdatafromDHT = 0, getdatafromsonicsensor = 0, printdatatomonitor = 0, uploaddatatofirebase = 0, state = 0; 
unsigned long actual = 0, old = 0;



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

      /*case 2:
        state = 0;
        thing["bmp180"] >> [](pson & out) {
          out["temperature"] = bmp1.temperature;
          out["pressure"] = bmp1.pressure;
        };
        thing["mq135"] >> [](pson & out) {
          out["Air Quality"] = ppm1.air;
        };
        thing["potmeter"] >> [](pson & out) {
          out["Analog"] = pot1.analog;
          out["Voltage"] = pot1.voltage;
        };

        break;*/

      default:
        break;
    }
} 

void printdata(){
    Serial.print("Humidity: ");
    Serial.print(dhtsensor.humi);
    Serial.print("%");

    Serial.print("  |  "); 

    Serial.print("Temperature: ");
    Serial.print(dhtsensor.tempC);
    Serial.print("°C ~ ");
    Serial.print(dhtsensor.tempF);
    Serial.println("°F");

    Serial.print("Noise level: ");
    Serial.println(sonicsensor.currentnoiselevel);
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
