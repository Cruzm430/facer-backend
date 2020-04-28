const getProfile = (req, res, knex) =>{
  const {id} = req.params;
  knex.select('*').from('users').where({id})
  .then(user => {  
    if(user.length){
      res.send(user[0])
    }else{
      res.status(400).json('Not Found')
    }
  })
  .catch(err => res.status(400).json('Error getting user'))
}

module.exports={
  getProfile:getProfile
}