const express = require('express')
const router = express.Router()
const Employee = require('../Models/modelSchema')

/* CRUD OPERATIONS TO CREATE APIS */

/*POST API*/

router.post('/employee', async (req, res) => {
  try {
    const newuser = new Employee({
      employee_name: req.body.employee_name,
      email: req.body.email,
      company_name: req.body.company_name,
      role: req.body.role,
      forecast: req.body.forecast
    })
    console.log(newuser)
    const saveuser = await newuser.save()
    res.status(200).json({ result: 'employee is added', saveuser })
  }
  catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

/* GET API */

router.get('/employees', async (req, res) => {
  try {
    const alldata = Employee.find();
    return res.json(await alldata)
  }
  catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})

/* GET SINGLE API */

router.get('/employee/:id', async (req, res) => {
  try {
    let employeeId = req.params.id;
    let employee = await Employee.findById(employeeId);
    res.status(200).json(employee);
  }
  catch (err) {
    console.error(err);
    response.status(500).json({
      msg: err.message
    });
  }
});

/* DELETE API */

router.delete("/employee/:id", async (req, res) => {
  try {
    let employeeId = req.params.id
    employee = await Employee.findByIdAndDelete(employeeId)
    res.status(200).json({ result: "employee is  deleted " })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

/* EDIT API */

 router.put('/employee/:id', async (req, res) => {
  let employeeId = req.params.id;
  try {
    let updatedEmployee = {
      employee_name: req.body.employee_name,
      email: req.body.email,
      company_name: req.body.company_name,
      role: req.body.role,
      forecast: req.body.forecast,
    };
    //  check employee is exists or not
    let employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(401).json({
        msg: 'Employee not Found'
      });
    }
    // update
    employee = await Employee.findByIdAndUpdate(employeeId, {
      $set: updatedEmployee
    }, { new: true });
    res.status(200).json({
      result: 'Employee is Updated',
      employee: employee
    });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      msg: err.message
    });
  }
});

module.exports = router