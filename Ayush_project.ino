#include <dht11.h>
#include <Wire.h>
#include <BH1750.h>
#include <AHT20.h>
#include <LiquidCrystal_I2C.h>

#define DHT11PIN 4
BH1750 lightMeter;
AHT20 aht20;

dht11 DHT11;
LiquidCrystal_I2C lcd(0x27,20,4);

const int fanPin = 8; // Pin to control the fan
const float HUMIDITY_THRESHOLD = 70.0; // Example threshold

void  setup()
{
  Serial.begin(9600);
  Wire.begin();
  lcd.init();
  lcd.backlight();
  lightMeter.begin();
// if (aht20.begin() == false)
//   {
//     Serial.println("AHT20 not detected. Please check wiring. Freezing.");
//     while (1);
//   }
//   Serial.println("AHT20 acknowledged.");
pinMode(5,OUTPUT);
pinMode(6,OUTPUT);
pinMode(7,OUTPUT);
digitalWrite(5,HIGH);
digitalWrite(6,HIGH);
digitalWrite(7,HIGH);

 
}

void loop()
{
  Serial.println();

  int chk = DHT11.read(DHT11PIN);
  // lcd.clear();
  Serial.print("Air Humidity (%): ");
  Serial.println((float)DHT11.humidity, 2);
  lcd.setCursor(0,0);
  lcd.print("Air Humidity:");
  lcd.print((float)DHT11.humidity, 2);
  lcd.print(" %");


  Serial.print("Air Temperature  (C): ");
  Serial.println((float)DHT11.temperature, 2);
  lcd.setCursor(0,1);
  lcd.print("Air Temp:");
  lcd.print((float)DHT11.temperature, 2);
  lcd.write(byte(223));
  lcd.print("C");


  float lux = lightMeter.readLightLevel();
  Serial.print("Light Intensity: ");
  Serial.print(lux);
  Serial.println("lux");
  lcd.setCursor(0,2);
  lcd.print("Light Int.:");
  lcd.print(lux);
  lcd.print("lux");


if (aht20.available() == true)
  {
    //Get the new temperature and humidity value
    float temperature = aht20.getTemperature();
    float humidity = aht20.getHumidity();

    //Print the results
    Serial.print("Soil Temperature: ");
    Serial.print(temperature, 2);
    Serial.print(" C\t");
    Serial.print("Soil Humi.: ");
    Serial.print(humidity, 2);
    Serial.print("% RH");

  lcd.setCursor(0,3);
  lcd.print("Soil Humidity:");
  lcd.print(humidity, 2);
  lcd.print("%");

  if(humidity>80)
  {
    digitalWrite(5,LOW);
    digitalWrite(6,LOW);
  }
  else
  {
    digitalWrite(5,HIGH);
    digitalWrite(6,HIGH);
  }

  if((float)DHT11.humidity>70)
  {
    digitalWrite(7,LOW);
  }
  else
  {
    digitalWrite(7,HIGH);
  }

    Serial.println();
    // lcd.clear();
  }




  delay(2000);

}