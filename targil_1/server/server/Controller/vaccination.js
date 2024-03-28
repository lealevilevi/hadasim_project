export {

    getVaccinationByPatientId,
    addVaccination,
    deleteVaccination,
    updateVaccination,
    getVaccinations
}
import { createDiffieHellmanGroup } from "crypto";
import vaccinationModel from '../models/vaccinationModel.js';
import axios from "axios";
import patientModel from "../models/patientModel.js";
async function getVaccinations(req, res) {
    try {
        let data =await vaccinationModel.find({});
        res.send(data)
        console.log("found vaccanition");
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Error occurred during getVaccination operation");

    }
}

async function getVaccinationByPatientId(req, res) {
    try{
        console.log("I am in function getVaccinationByPatientId");
        console.log(req.params.id);
        const dom = await vaccinationModel.findOne({Ptientid:req.params.id});
        console.log(dom)
        // let imagePath=dom[0].image;
        // const basedir=path.resolve();
        // const filePath = path.join(basedir,imagePath);
        res.send(dom);
        }
        catch(error){
          console.log(error);
          res.status(500).send("errror")
        }
}



async function addVaccination(req, res) {
    console.log("I am in function addVaccination");
    try {
        const existingVaccination = await vaccinationModel.findOne({ Ptientid: req.body.Ptientid });
        console.log(req.body.Ptientid)
        console.log(existingVaccination);
        const existingPatient = await patientModel.findOne({ id: req.body.Ptientid });
        console.log(existingPatient)
        if (existingVaccination&&!existingPatient) {
            console.log('vaccination already exists|patient not found');
            res.status(409).send('vaccination already exists|patient not found');
            return;
        }
        
        const newVaccination= new vaccinationModel(req.body);
        await newVaccination.save().then(() => {
            console.log(newVaccination);
            res.status(200).send('newVaccination success');
        });
    } catch (error) {
        console.error('Error adding Vaccination: ', error);
        res.status(500).send('Error occurred during  add newVaccination operation '+error);
    }
}




async function updateVaccination(req, res) {
    console.log("I am in function updatePatient");
    try {
        const updatedVaccination = await vaccinationModel.updateOne({ Ptientid: req.body.Ptientid }, req.body);

        if (updatedVaccination)
        {
            console.log(updatedVaccination);
            res.status(200).send('העדכון בוצע בהצלחה');
        } 
        else 
        {
            res.status(404).send('Vaccination not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while updating Vaccination.');
    }
}

async function deleteVaccination(req,res)
 {
   try{
       await vaccinationModel.deleteOne({Ptientid:req.params.id})
       res.send("remove vaccination successed")
   }
   catch(error)
   {
      res.status(500).send('An error occurred while deleting vaccination');
   }
 }
 function Limit(val) {
    return val.length < 4;
}