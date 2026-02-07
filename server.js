const express = require('express')

const fs = require('fs')
const { dirname } = require('path')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { error } = require('console')
const logSymbols = require('log-symbols')
const Week = require('./Models/WeekModel.js')
const { queryObjects } = require('v8')
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:3000' 
}))

mongoose.connect(process.env.DB)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.error("❌ DB ERROR 👉", err));




// const Titles = mohema.week_4.map((item , index)=>{return ( item.title )})
// const Descs = mohema.week_4.map((item , index)=>{return ( item.desc )})
const CreateWeek = async(req, res) => {
    const newWeek = await Week.create(req.body)
    res.json({
        status:"success",
        body:{
            newWeek
        }
    })
}

const GetAllWeeks = async (req, res) => {
    const weeks = await Week.find()

    res.json(weeks)
}

const GetWeek = async (req, res) => {
    const week = await Week.findById(req.params.id)
    res.status(200).json({
        status:"success",
        body:{
            mohema:week
        }
    })

}

const UpdateWeek = async (req, res) => {
    const UpdatedWeek = await Week.findByIdAndUpdate(req.params.id , req.body ,{
        new:true,
        runValidators:true,

    })
    res.status(200).json({
        status: 'success',
        data: {
            UpdatedWeek
        }
    })
}


const deleteWeek = async (req, res) => {
    const UpdatedWeek = await Week.findByIdAndDelete(req.params.id , req.body ,{
        new:true,
        runValidators:true,

    })
    res.status(200).json({
        status: 'success',
        data: {
            UpdatedWeek
        }
    })
}



app.route('/api/v1/mohema')
.post(CreateWeek)
.get(GetAllWeeks)

app.route('/api/v1/mohema/:id')
.get(GetWeek)
.patch(UpdateWeek)
.delete(deleteWeek)




app.listen(PORT, () => {
    console.log('\x1B[32m✔\x1B[39m',"Server Start Listening On PORT:", PORT);

})


