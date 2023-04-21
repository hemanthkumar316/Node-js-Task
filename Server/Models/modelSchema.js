
const mongoose = require('mongoose')
const Employee = new mongoose.Schema({
 employee_name: {
  type: String,
  required: true
 },
 email: {
  type: String,
  required: true
 },
 company_name: {
  type: String,
  required: true
 },
 role: {
  type: String,
  required: true
 },
 forecast: {
  type: String,
  required: true
 },
})
module.exports = mongoose.model('Employees', Employee)