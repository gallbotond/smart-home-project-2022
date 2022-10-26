#define LED 0
#define LED2 2
#define MQ135_THRESHOLD_1 1000

#include <Adafruit_BMP085.h>

#include <ThingerESP32.h>
#include <WiFi.h>
#define USERNAME "NagyK"
#define DEVICE_ID "projekt"
#define DEVICE_CREDENTIAL "u+lYI@4kqhRSAFxA"

#include <EEPROM.h>
#define EEPROM_SIZE 2
int buttonstate;

ThingerESP32 thing(USERNAME, DEVICE_ID, DEVICE_CREDENTIAL);

Adafruit_BMP085 bmp;;
//MQUnifiedsensor MQ135(MCU_Type, Voltage_Resolution, ADC_Bit_Resolution, MQ_Pin, MQ_Type);

struct Button {
  const uint8_t PIN;
  uint32_t counter;
  bool pressed;

};

struct BMP {
  float pressure;
  float temperature;
};

struct MQ {
  int air;
};

struct POT {
  int analog;
  float voltage;
};

Button button1{4, 0, false};
BMP bmp1{0, 0};
MQ ppm1{0};
POT pot1{0, 0};

unsigned long button_time = 0;
unsigned long last_button_time = 0;
unsigned long led1on = 0, led2on = 0, actual = 0, old = 0, onforbmp = 0, onformq = 0, onforpot = 0, outtimer = 0, uploadtimer;
int led1 = HIGH, led2 = HIGH, state = 0, counter1 = 0, counter2 = 0, interval = 50;
int EMA_S = 0;

const char* ssid = "NagyFamily";
const char* password =  "ilovekisgrofo";

void IRAM_ATTR isr() {
  button_time = millis();
  if (button_time - last_button_time > 250) {

    button1.counter++;
    button1.pressed = true;
    last_button_time = button_time;
    buttonstate = 0;
  }
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  EEPROM.begin(EEPROM_SIZE);
  buttonstate = EEPROM.read(1);
 
  initWiFi();
  thing.add_wifi(ssid, password);
  pinMode(button1.PIN, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  digitalWrite(LED, LOW);
  pinMode(LED2, OUTPUT);
  attachInterrupt(button1.PIN, isr, FALLING);
  if (!bmp.begin())
  {
    Serial.println("BMP180 Sensor not found ! ! !");
    while (1)
    {

    }
  } 
  EMA_S = analogRead(35);
}

void loop() {
  actual = millis();
  while (button1.pressed == false && buttonstate == 0)
  {
    Serial.println("Waiting for calibration! Press the button to continue");
    delay(1000);
  }
  if (buttonstate == 0) {
    calibration();
  }
  if (actual >= old + interval) {
    old = actual;
    if (old > outtimer + 5000) {
      outtimer = old;
      state = 1;
    }
    if (old > uploadtimer + 10000) {
      uploadtimer = old;
      state = 2;
    }

    counter1++;
    counter2++;
    switch (state) {
      case 0:
        if (actual > onforbmp + 4000) {
          onforbmp = actual;
          /* Serial.print("BMP ");
            Serial.println(onforbmp);*/
          bmp180();
        }

        if (actual > onformq + 2000) {
          onformq = actual;
          /* Serial.print("MQ ");
            Serial.println(onformq);*/
          ppm();
        }

        if (actual > onforpot + 100) {
          onforpot = actual;
          analog();
          voltage();
        }
        break;

      case 1:
        state = 0;
        out();
        thing.handle();
        break;

      case 2:
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

        break;

      default:
        break;
    }

    if (counter1 == 20) {
      digitalWrite(LED, HIGH);
      led1on = millis();
      counter1 = 0;
    }
    if (actual - led1on >= 250) {
      digitalWrite(LED, LOW);
    }

    if (counter2 == 100) {
      digitalWrite(LED2, HIGH);
      led2on = millis();
      counter2 = 0;
    }
    if (actual - led2on >= 250) {
      digitalWrite(LED2, LOW);

    }
  }
}

void calibration() {

  float sensor_volt;
  float RS_air;
  float R0;
  float sensorValue;
  for (int x = 0 ; x < 500 ; x++)
  {
    sensorValue = sensorValue + analogRead(33);
  }
  sensorValue = sensorValue / 500.0;
  sensor_volt = sensorValue * (5.0 / 1023.0);
  RS_air = ((5.0 * 10.0) / sensor_volt) - 10.0;
  R0 = RS_air / 4.4;

  Serial.print("R0 = ");
  Serial.println(R0);
  delay(1000);
  buttonstate = 1;
  EEPROM.write(0, R0);
  EEPROM.write(1, buttonstate);
  EEPROM.commit();

}


void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}

void out() {

  Serial.print("Pressure = ");
  Serial.print(bmp1.pressure);
  Serial.print(" hPa");
  Serial.print("  Temp = ");
  Serial.print(bmp1.temperature);
  Serial.println("ºC");
  if (ppm1.air < MQ135_THRESHOLD_1) {
    Serial.print("Fresh Air: ");
  } else {
    Serial.print("Poor Air: ");
  }
  Serial.print(ppm1.air);
  Serial.println(" PPM");
  Serial.print("Analog: ");
  Serial.print(pot1.analog);
  Serial.print(", Voltage: ");
  Serial.println(pot1.voltage);

}
void bmp180() {

  bmp1.pressure = bmp.readPressure();
  bmp1.pressure = bmp1.pressure / 100;
  bmp1.temperature = bmp.readTemperature();

}

void ppm() {
  float R0;
  R0 = EEPROM.read(0);
  float sensor_volt;
  float RS_gas;
  float ratio;
  float sensorValue = analogRead(33);
  sensor_volt = sensorValue * (5.0 / 1023.0);
  RS_gas = ((5.0 * 10.0) / sensor_volt) - 10.0;
  ratio = RS_gas / R0;
  float m = -0.318; //Slope
  float b = 1.133; //Y-Intercept
  double ppm_log = (log10(ratio) - b) / m;
  double ppm = pow(10, ppm_log);
  ppm1.air = ppm;

}

float floatMap(float x, float in_min, float in_max, float out_min, float out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

void analog() {
  int sensorPin = 35;
  int sensorValue = 0;
  float EMA_a = 0.6;
  


  sensorValue = analogRead(sensorPin);
  EMA_S = (EMA_a * sensorValue) + ((1 - EMA_a) * EMA_S);
  pot1.analog = EMA_S;

}

void voltage() {

  pot1.voltage = floatMap(pot1.analog, 0, 4095, 0, 3.3);

}


/*void button() {

  if (button1.pressed) {
    led1();
    Serial.printf("the button has been pressed %u times\n", button1.counter);
    button1.pressed = false;

  }

  if (button1.counter == 10) {
    Serial.printf("now counting on the other led\n");
    int i;
    for (i = 0; i < 10 ; i++) {
      led2();
      Serial.printf("%i ", i + 1);
    }
    Serial.printf("\n");
    button1.counter = 0;
    Serial.printf("counting is over, counter is set to 0\n");
  }
  }


*/