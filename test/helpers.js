const chai = require('chai')
global.expect = chai.expect
const fs = require('fs')
const jsdom = require('mocha-jsdom')
const path = require('path')
const babel = require("@babel/core");
const url = "http://localhost"

const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8')

const babelResult = babel.transformFileSync(
  path.resolve(__dirname, '..', 'index.js'), {
    presets: ['@babel/env']
  }
);

const src = babelResult.code

jsdom({
  html, src, url
});

function updateEmployeeWithKeyAndValue(employee, key, value) {
  return { ...employee, [key]: value };
}

function destructivelyUpdateEmployeeWithKeyAndValue(employee, key, value) {
  employee[key] = value;
  return employee;
}

function deleteFromEmployeeByKey(employee, key) {
  const newEmployee = { ...employee };
  delete newEmployee[key];
  return newEmployee;
}

function destructivelyDeleteFromEmployeeByKey(employee, key) {
  delete employee[key];
  return employee;
}

module.exports = {
  updateEmployeeWithKeyAndValue,
  destructivelyUpdateEmployeeWithKeyAndValue,
  deleteFromEmployeeByKey,
  destructivelyDeleteFromEmployeeByKey
};
