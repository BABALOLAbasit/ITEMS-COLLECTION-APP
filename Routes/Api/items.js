const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const items = require('../../Items');
const { default: rateLimit } = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

// Create a custom regex pattern for email validation
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;



//Get all items
router.get('/', (req, res) => {
    res.json(items);
  });

  
  //Get Single member by ID
  router.get('/:id', (req, res) => {
    const found = items.some(item => item.id === parseInt(req.params.id));
  
    if(found) {
    res.json(items.filter(item => item.id === parseInt(req.params.id)));
    } else{
      res.status(400).json({ msg: `No item with the id of ${req.params.id}`});
    }
  });

  /*
  //Create item
  router.post('/', (req, res) => {
    const newsItem = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        quantity:req.body.quantity,
        status: 'active'
    }

    if(!newsItem.name  || !newsItem.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }

    items.push(newsItem);
    res.json(items);

});

*/

// Create item
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .matches(emailPattern)
      .withMessage('Invalid email format'),
    body('quantity').notEmpty().withMessage('Quantity is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newItem = {
      id: uuid.v4(),
      name: req.body.name,
      email: req.body.email,
      quantity: req.body.quantity,
      status: 'active',
    };

    items.push(newItem);
    res.json(items);
  }
);

//Update Item
router.put('/:id', (req, res) => {
    const found = items.some(item => item.id === parseInt(req.params.id));
  
    if(found) {
    const updItem = req.body;
    items.forEach(item => {
        if(item.id === parseInt(req.params.id)) {
            item.name = updItem.name ? updItem.name : item.name;
            item.email = updItem.email ? updItem.email : item.email;
            item.quantity = updItem.quantity ? updItem.quantity : item.quantity;

            res.json({msg: 'Item updated', item});
        }
    })
    } else{
      res.status(400).json({ msg: `No item with the id of ${req.params.id}`});
    }
  });
 
  //Delete Item
  router.delete('/:id', (req, res) => {
    const found = items.some(item => item.id === parseInt(req.params.id));
  
    if(found) {
    res.json({msg: 'Item deleted',
     items: items.filter(item => item.id !== parseInt(req.params.id))});
    } else{
      res.status(400).json({ msg: `No item with the id of ${req.params.id}`});
    }
  });
  module.exports = router;