const {response}= require('express');

const getUser=(req, res)=> {

  const query = req.query;
    res.json({
        msg: 'get API Controller',
        query
    });
  }

  const postUser =(req, res)=> {
    const {nombre,edad} = req.body;

    res.json({
        msg: 'post API Controller',
        nombre,edad
    });
  }

  const putUser =(req, res)=> {
    const {id }= req.params;
    res.json({
        msg: 'put API Controller',
        id
    });
  }
  
  const patchUser =(req, res)=> {

    res.json({
        msg: 'patch API Controller'
    });
  }
  const deleteUser =(req, res)=> {

    res.json({
        msg: 'delete API Controller'
    });
  }

  module.exports={
    getUser,
    patchUser,
    putUser,
    deleteUser,
    postUser
  }