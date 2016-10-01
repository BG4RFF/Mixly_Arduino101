'use strict';

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');

Blockly.Blocks.IMU = {
  init: function() {
    this.setColour(220);
    this.appendDummyInput("")
	      .appendTitle(Blockly.xmaker_IMU)
	      .appendTitle(new Blockly.FieldDropdown([["ax", "ax"], ["ay", "ay"],["az", "az"],["gx", "gx"], ["gy", "gy"],["gz", "gz"]]), "IMUSENSOR");
    this.setOutput(true, Number);
    this.setTooltip(Blockly.LKL_TOOLTIP_IMU);
  }
};

Blockly.Blocks.IMU_Motion = {
  init: function() {
    this.setColour(220);
    this.appendDummyInput("")
      	.appendTitle(Blockly.xmaker_Motion)
      	.appendTitle(new Blockly.FieldDropdown([["X向上", "1"], ["X向下", "2"],["Y向上", "yU"],["Y向下", "yD"], ["Z向上", "zU"],["Z向下", "zD"]]), "motionDir");
	this.appendStatementInput('DO')
        .appendTitle(Blockly.LKL_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.LKL_TOOLTIP_IMUMotion);
  }
 
};

Blockly.Blocks.IMU_StepCount = {
  init: function() {
	this.setColour(220);
    this.appendDummyInput()
        .appendField(Blockly.xmaker_StepCount);
    this.setOutput(true);
    this.setTooltip(Blockly.LKL_TOOLTIP_StepCount);
	  }
};  
	  
	  
Blockly.Blocks.BLE_Name = {
  init: function() {
    this.setColour(220);
//    this.appendTitle(Blockly.xmaker_BLEName);
//		.appendValueInput("NAME", String)
    this.appendDummyInput()
		.appendTitle(Blockly.xmaker_BLEName)
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(this.newQuote_(false));
	this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.LKL_TOOLTIP_BLEName);
  },
   newQuote_: function(open) {
    if (open == this.RTL) {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==';
    } else {
      var file = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC';
    }
    return new Blockly.FieldImage(file, 12, 12, '"');
  }
};

Blockly.Blocks.BLE_LED = {
  init: function() {
   this.setColour(220);
   this.appendDummyInput("")
	   .appendTitle(Blockly.xmaker_BLELED);
   this.setOutput(true, String);
   this.setTooltip(Blockly.LKL_TOOLTIP_BLELED);
  }
};

Blockly.Blocks.BLE_Send = {
  init: function() {
	this.setColour(220);
    this.appendValueInput("SEND",Number)
        .appendTitle(Blockly.xmaker_BLESend);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.LKL_TOOLTIP_Send);
  }
};