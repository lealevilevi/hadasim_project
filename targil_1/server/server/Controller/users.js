import userModel from '../models/userModel.js'
export {

    addUser,
    getUserById

}

async function addUser(req, res) {
    console.log("I am in function addUser");
    try {
        const existingUser = await userModel.findOne({ id: req.body.id });
        console.log(existingUser);

        if (existingUser) {
            console.log('user already exists');
            res.status(409).send('user already exists');
            return;
        }
        
        const newUser= new userModel(req.body);
        await newUser.save().then(() => {
            console.log(newUser);
            res.status(200).send('newUser success');
        });
    } catch (error) {
        console.error('Error adding newUser: ', error);
        res.status(500).send('Error occurred during  add newUser operation '+error);
    }
}
function getUserById(req, res)
{
  console.log("I am in function getUserById");
  console.log(req.params.id);
  userModel.find({id:req.params.id})
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json("Error occurred during getUserById operation");
    });
}