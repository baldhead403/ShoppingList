const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const db = require('../../config/keys').mongoURI

mongoose.connect(db ,  { useNewUrlParser: true })
.then(() => console.log('MongoDb Connected...'))
.catch(err => console.log(err))

// Items Model
const Item = require('../../models/Item')

// Get request to get api/items
router.get('/', (req, res) => {
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
})

// Post to api/items
router.post('/', (req, res) => {
   const newItem = new Item({
       name: req.body.name
   })
   newItem.save().then(item =>res.json(item))
})
// delete
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(()=> res.json({success: true})))
    .catch(err => res.status(404).json({success:false}));
})

module.exports = router