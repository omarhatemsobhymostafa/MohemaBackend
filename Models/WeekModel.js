const mongoose = require('mongoose')
const WeekSchema = new mongoose.Schema({
    weekNumber:Number,
    babySize:String,    
    WhappenInBody:String,
    AmIpregnancy:String,
    sympotyms:String,
    babyLooks:String,
    importantSteps:String,
})
const Week = mongoose.model('Week' , WeekSchema)
module.exports = Week