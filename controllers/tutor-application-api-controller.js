import TutorApplication from '../Models/Tutor-Application.js';
import User from  '../Models/User.js'

const getAllApplications = async (req,res)=>{

   
    TutorApplication.find()
    .then(allApplications => {

        res.json({
            allApplications,
        })
    })
    .catch(() => {
        res.status.json({
            message: "Sorry something went wrong"
        })
    })
}

const applyForTutor = async (req,res)=>{

    const applicationDetails = req.body;
    
    // checking if all the information is available
    if( applicationDetails.nameOfStudent === undefined || applicationDetails.regNumber === undefined || applicationDetails.regNumber === undefined){
        res.status(500).json({
            message: "Please provide all the required information"
        })
    }else {
        
        new TutorApplication(applicationDetails).save()
        .then(()=>{
            res.json({
                message: "Application sent successfully"
            })
        })
        .catch(()=>{
            res.status(500).json({
                message: "Application was not sent"
            })
        })
    }
}

const rejectApplication = async (req, res)=> {

    const {id} = req.body;

    // checking if the application with provided id exists
    const tutorApplication =  await TutorApplication.find({id});

    if(tutorApplication){
        
        TutorApplication.findByIdAndUpdate(id, {applicationStatus: "rejected"})
        .then(()=>{
            res.json({
                message: "The application has been rejected successfully"
            })
        })
        .catch(()=>{
            res.status(500).json({
                message: "Something went wrong in rejecting the application"
            })
        })
    }else {
        res.send("This application does not exist")
    }
}


const acceptApplication = async (req, res)=> {

    const {id} = req.body;

    // checking if the application with provided id exists
    const tutorApplication =  await TutorApplication.findOne({id});

    if(tutorApplication){
        
        TutorApplication.findByIdAndUpdate(id, {applicationStatus: "accepted"})
        .then(()=>{

            const regNumber = tutorApplication.regNumber;

            // updating user to tutor
            User.findOneAndUpdate({regNumber}, {tutor: true})
            .then(()=>{
                res.json({
                    message: "The application has been accepted successfully"
                })
            })
            .catch(()=>{
                res.status(500).json({
                    message: "Something went wrong"
                })
            })
            
            
        })
        .catch(()=>{
            res.status(500).json({
                message: "Something went wrong in accepting the application"
            })
        })
    }else {
        res.send("This application does not exist")
    }
}


const getAcceptedTutorApplications = async (req, res)=> {

    const acceptedTutorApplications = await TutorApplication.find({applicationStatus: "accepted"});
    
    // checking if error occured when getting applications
    if(acceptedTutorApplications){
        res.json( acceptedTutorApplications);
    }else {
        res.status.json({
            message: "Sorry something went wrong"
        })
    }
}

const getRejectedTutorApplications = async (req, res)=> {

    const rejectedTutorApplications = await TutorApplication.find({applicationStatus: "rejected"});

    // checking if error occured when getting applications

    if(rejectedTutorApplications){
        res.json(rejectedTutorApplications);
    }else {
        res.status.json({
            message: "Sorry something went wrong"
        })
    }
}

const getActiveTutorApplications = async (req, res)=> {

    const activeTutorApplications = await TutorApplication.find({applicationStatus: "active"});

    // checking if error occured when getting applications

    if(activeTutorApplications){
        res.json( activeTutorApplications);
    }else {
        res.status.json({
            message: "Sorry something went wrong"
        })
    }
}


const disableTutor = (req,res)=>{

    const {id} = req.body;

    User.findByIdAndUpdate(id, {tutor: false})
    .then(()=> {
        res.json({
            message: "Tutor priviledges disabled successfully"
        })
    })
    .catch(() => {
        res.status(500).json({
            message: "Something went wrong,please try again"
        })
    })
}


const getAllTutors = (req, res)=>{

    User.find({tutor: true})
    .then(tutors => {
        res.json(tutors)
    })
    .catch(() => {
        res.status.json({
            message: "Could not get tutor accounts,try again"
        })
    })
}

export default {
    getAllApplications,
    applyForTutor,
    rejectApplication,
    acceptApplication, 
    getAcceptedTutorApplications,
    getRejectedTutorApplications,
    getActiveTutorApplications,
    disableTutor,
    getAllTutors
}