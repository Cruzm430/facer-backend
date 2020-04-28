const clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: 'd008925bf504447f853fe6b625a0e8de'
 });

const handleApiCall = (req,res) =>{
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => res.json(data))
  .catch(err=>res.status(400).json('unable to hit API'))
} 

const imageSubmission = (req, res, knex) =>{
  const {id} = req.body;
  knex('users').where({id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>res.json(entries[0]))
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports= {
  imageSubmission : imageSubmission,
  handleApiCall: handleApiCall
}