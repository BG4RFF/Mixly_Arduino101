'use strict';

goog.provide('Blockly.Arduino.base');
goog.require('Blockly.Arduino');

Blockly.Arduino.IMU = function() {
  Blockly.Arduino.definitions_['define_IMU'] = '#include <CurieIMU.h>';
  Blockly.Arduino.setups_['IMUBegin'] = 'CurieIMU.begin();\n';
  Blockly.Arduino.setups_['IMUSetGyro'] ='CurieIMU.setGyroRange(250);\n';
  Blockly.Arduino.setups_['IMUSetAcc'] ='CurieIMU.setAccelerometerRange(2);\n';
  var what = this.getTitleValue('IMUSENSOR');
  var funcName='IMU_get'+what;
  var code='float'+ ' ' + funcName + '() {\n' 
  +' int gxRaw, gyRaw, gzRaw;\n'
  +' float gx, gy, gz;\n'
  +' int axRaw, ayRaw, azRaw;\n'
  +' float ax, ay, az;\n'
  +' CurieIMU.readGyro(gxRaw, gyRaw, gzRaw);\n'
  +' CurieIMU.readAccelerometer(axRaw, ayRaw, azRaw);\n'
  +' gx = (gxRaw * 250.0) / 32768.0;\n'
  +' gy = (gyRaw * 250.0) / 32768.0;\n'
  +' gz = (gzRaw * 250.0) / 32768.0;\n'
  +' ax = (axRaw * 2.0) / 32768.0;\n'
  +' ay = (ayRaw * 2.0) / 32768.0;\n'
  +' az = (azRaw * 2.0) / 32768.0;\n'
  +' return '+what+';\n'
  +' }\n';
  Blockly.Arduino.definitions_[funcName] = code;
  return [funcName+'()',Blockly.Arduino.ORDER_ATOMIC];
};


 Blockly.Arduino.IMU_Motion = function() {
  Blockly.Arduino.definitions_['define_IMU'] = '#include <CurieIMU.h>';
  Blockly.Arduino.setups_['IMUBegin'] = 'CurieIMU.begin();\n';
  Blockly.Arduino.setups_['attachInterrupt'] ='CurieIMU.attachInterrupt(eventCallback);\n';
  Blockly.Arduino.setups_['setDetectionThreshold'] ='CurieIMU.setDetectionThreshold(CURIE_IMU_MOTION, 20);\n';
  Blockly.Arduino.setups_['setDetectionDuration'] ='CurieIMU.setDetectionDuration(CURIE_IMU_MOTION, 10);\n';
  Blockly.Arduino.setups_['interrupts'] ='CurieIMU.interrupts(CURIE_IMU_MOTION);\n';
 
  var motionDir = this.getTitleValue('motionDir');
  var funcName='static void eventCallback(void)';
  var branch = Blockly.Arduino.statementToCode(this, 'DO' );
  var code = '{\n'
  +' int xUP=1; int xDOWN=2;int yUP=3; int yDOWN=4;int zUP=5; int zDOWN=6;\n'
  +' if (CurieIMU.getInterruptStatus(CURIE_IMU_MOTION)) {\n'
  +' if ('+motionDir+'==xUP&&CurieIMU.motionDetected(X_AXIS, POSITIVE)){\n'
  + branch
  +'}\n'
  +' if ('+motionDir+'==xDOWN&&CurieIMU.motionDetected(X_AXIS, NEGATIVE)){\n'
  + branch
  +'}\n'
  +' if ('+motionDir+'==yUP&&CurieIMU.motionDetected(Y_AXIS, NEGATIVE)){\n'
  + branch
  +'}\n'
  +' if ('+motionDir+'==yDOWN&&CurieIMU.motionDetected(Y_AXIS, NEGATIVE)){\n'
  + branch
  +'}\n'
  +' if ('+motionDir+'==zUP&&CurieIMU.motionDetected(Z_AXIS, NEGATIVE)){\n'
  + branch
  +'}\n'
  +' if ('+motionDir+'==zDOWN&&CurieIMU.motionDetected(Z_AXIS, NEGATIVE)){\n'
  + branch
  +'}\n'
  +'}\n'
  +'}\n';
 Blockly.Arduino.definitions_[funcName] =funcName+ code;
  
};

Blockly.Arduino.IMU_StepCount= function() {
  Blockly.Arduino.definitions_['define_IMU'] = '#include <CurieIMU.h>';
  Blockly.Arduino.definitions_['stepEventsEnabeled'] = 'boolean stepEventsEnabeled = true;';
  Blockly.Arduino.definitions_['lastStepCount'] = 'long lastStepCount = 0;';
  Blockly.Arduino.setups_['IMUBegin'] = 'CurieIMU.begin();\n';
  Blockly.Arduino.setups_['setStepDetectionMode'] ='CurieIMU.setStepDetectionMode(CURIE_IMU_STEP_MODE_NORMAL);\n';
  Blockly.Arduino.setups_['setStepCountEnabled'] ='CurieIMU.setStepCountEnabled(true);\n';
 Blockly.Arduino.setups_['stepEventsEnabeled'] ='if (stepEventsEnabeled) {\n'
  + 'CurieIMU.attachInterrupt(eventCallback);\n'
  + 'CurieIMU.interrupts(CURIE_IMU_STEP);  \n'
  + '}\n';
var funcName='updateStepCount';
	code= '{\n'
  + 'if (!stepEventsEnabeled) {\n'
  + 'long stepCount = CurieIMU.getStepCount();\n'
  + ' if (stepCount != lastStepCount) {\n'
  + 'lastStepCount = stepCount;\n'
  + 'return stepCount;\n'
  + '}\n'
  + '}\n'
  + '}\n';
Blockly.Arduino.definitions_[funcName] ='long '+funcName+'()'+code;
var funcName1='static void eventCallback';
    code1= '{\n'
    + 'if (CurieIMU.stepsDetected())\n'
    + 'updateStepCount();\n'
	+ '}\n';
  Blockly.Arduino.definitions_[funcName1] =funcName1+'(void)'+code1;
  return [funcName+'()',Blockly.Arduino.ORDER_ATOMIC];
	};

Blockly.Arduino.BLE_Name = function() {
  Blockly.Arduino.definitions_['define_BLE'] = '#include <CurieBLE.h>';
  Blockly.Arduino.definitions_['define_BLE1'] = 'BLEPeripheral blePeripheral;\n'; 
  var name = this.getFieldValue('TEXT');
  Blockly.Arduino.setups_['setBLEName'] = 'blePeripheral.setLocalName("'+name+'");\n';
  return '';
};

Blockly.Arduino.BLE_LED = function() {
	
   Blockly.Arduino.definitions_['define_BLELED1'] = 'BLEService ledService("19B10000-E8F2-537E-4F6C-D104768A1214");\n'; 
   Blockly.Arduino.definitions_['define_BLELED2'] = 'BLEUnsignedCharCharacteristic switchCharacteristic("19B10001-E8F2-537E-4F6C-D104768A1214", BLERead | BLEWrite);\n'; 
   Blockly.Arduino.setups_['setAdvertisedServiceUuid']='blePeripheral.setAdvertisedServiceUuid(ledService.uuid());\n'; 
   Blockly.Arduino.setups_['setups_ledService'] = 'blePeripheral.addAttribute(ledService);\n'; 
   Blockly.Arduino.setups_['setups_switchCharacteristic'] = 'blePeripheral.addAttribute(switchCharacteristic);\n'; 
   Blockly.Arduino.setups_['setups_begin'] = 'blePeripheral.begin();\n'; 
  var funcName='BLE_get';
  var code ='long '+funcName+'(){\n'
  +'BLECentral central = blePeripheral.central();\n'
  +'while (central.connected()) {\n'
  +'if (switchCharacteristic.written()) {\n'
  +'return switchCharacteristic.value();\n'
  +'}\n'
  +'}\n'
  +'}\n';
  Blockly.Arduino.definitions_[funcName] = code;
  return [funcName+'()',Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.BLE_Send = function() {
 Blockly.Arduino.definitions_['define_Send1'] = 'BLEService SendService("180F");\n'; 
   Blockly.Arduino.definitions_['define_SendLevelChar'] = 'BLEUnsignedCharCharacteristic SendLevelChar("2A19",BLERead | BLENotify);\n'; 
   Blockly.Arduino.setups_['setAdvertisedServiceUuid']='blePeripheral.setAdvertisedServiceUuid(SendService.uuid());\n'; 
   Blockly.Arduino.setups_['setups_SendService'] = 'blePeripheral.addAttribute(SendService);\n'; 
   Blockly.Arduino.setups_['setups_switchCharacteristic'] = 'blePeripheral.addAttribute(SendLevelChar);\n'; 
   Blockly.Arduino.setups_['setups_begin'] = 'blePeripheral.begin();\n'; 
   var SEND = Blockly.Arduino.valueToCode(this, 'SEND', Blockly.Arduino.ORDER_ATOMIC) || '\"\"'
//  var funcName='BLE_Send';
  var code ='SendLevelChar.setValue('+SEND+'); \n';
//  +'SendLevelChar.setValue(batteryLevel);\n'
//  +'}\n';
//  Blockly.Arduino.definitions_[funcName] = code;
  return code;
};