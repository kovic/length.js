import { length } from './length';
import { validate, validateUnit, validateValue } from './validate';
import { getValueInStandardUnit, getValueByUnit } from './standard';

function to(unit) {
  validateUnit(unit);

  // Convert value in current unit to value in standard unit.
  var valueInStandardUnit = getValueInStandardUnit(this.value, this.unit);

  // Convert value in standard unit to value in unit passed by user.
  var convertedValue = getValueByUnit(valueInStandardUnit, unit);

  return length(convertedValue, unit);
};


function add(value, unit) {
  if(typeof unit === 'undefined') {
    validateValue(value);

    return length(this.value + value, this.unit);
  } else {
    validate(value, unit);

    // If passed value is equal to 0, just return the same Length object.
    if (value === 0) return length(this.value, this.unit);

    var newValue = this.value + length(value, unit).to(this.unit).getValue();
    
    return length(newValue, this.unit);
  }
};


function getValue() {
  return this.value;
};


function getUnit() {
  return this.unit;
};


function getString() {
  return this.value + this.unit;
};


function toPrecision(digits) {
  var value = digits ? this.value.toFixed(digits) : this.value;
  return length(parseFloat(value), this.unit);
};

export { to, add, getString, getUnit, getValue, toPrecision }
