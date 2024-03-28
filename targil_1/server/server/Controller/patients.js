export {

    addPatient,
    // getPatientById,
    updatePatient,
    getPatients,
    deletePatient,
    getImageById


}

import { createDiffieHellmanGroup } from "crypto";
import patientModel from '../models/patientModel.js';
import axios from "axios";
import path from "path";
import { error } from "console";
import vaccinationModel from "../models/vaccinationModel.js";
async function getPatients(req, res) {
    try {
        let data = await patientModel.find({});
        res.send(data)
        console.log("found patients");
    }
    catch (error) {
        console.log(error);
        res.status(500).json("Error occurred during getPatients operation");

    }
}

async function addPatient(req, res) {
    console.log("I am in function addPatient");
    try {
        

        //Check if the patient already exists in the database
        const existingPatient = await patientModel.findOne({ id: req.body.id });
        console.log(existingPatient);

        if (existingPatient) {
            console.log('patient already exists');
            res.status(409).send('patient already exists');
            return;
        }
        const newPatient = new patientModel({
            ...req.body,
            image: req.file?.path // Optional image path
          });

        await newPatient.save().then(() => {
            console.log(newPatient);
            res.status(200).send(newPatient);
        });
    
    } 
    catch (error) {
        console.error('Error adding patient:', error.message);
        res.status(500).send(error.message);
    }
}




async function updatePatient(req, res) {
    console.log("I am in function updatePatient");
    try {
        const updatedPatient = await patientModel.updateOne({ id: req.body.id }, req.body);
        if (updatedPatient) {
            console.log(updatedPatient)
            console.log(updatedPatient);
            res.status(200).send(updatedPatient);
        }
        else {
            res.status(404).send('Patient not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while updating patient.');
    }
}

async function deletePatient(req, res) {
    try {
        let patientDelete = await patientModel.findOne({ id: req.params.id })
        const vac = await vaccinationModel.findOne({ Ptientid: req.params.id })
        console.log(vac)
        if (patientDelete) {
            if(vac!=null)
            {
                await vaccinationModel.deleteOne({Ptientid:req.params.id})
                console.log(vac)
            }
            await patientModel.deleteOne({id:req.params.id})    

        }
        res.send("remove patient successed")
    }
    catch (error) {
        res.status(500).send('An error occurred while deleting patient');
    }
}
async function getImageById(req, res) {
    try {
        console.log("I am in function getDomainsByName");
        console.log(req.params.id);
        const dom = await patientModel.find({ id: req.params.id });
        console.log(dom)
        let imagePath = dom[0].image;
        const basedir = path.resolve();
        const filePath = path.join(basedir, imagePath);
        res.status(200).sendFile(filePath);
    }
    catch (error) {
        console.error(error);
    }
}








