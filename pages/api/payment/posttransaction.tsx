import React from 'react'

export default function posttransaction(req,res) {
    res.status(200).json({body: req.body})
  
}
