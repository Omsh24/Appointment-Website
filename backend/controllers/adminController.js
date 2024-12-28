import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from "cloudinary"
import doctorModel from '../models/doctorModel'

//api for adding doctor
exports.addDoctor=async (req,res)=>{
    try{
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body
        const imageFile=req.file
        if(!name || !email || !password || !speciality || !degree || !experience|| !about ||!fees || !address ){
            return res.json({
                success:false,
                message:"missing details"
            })
        }

        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message:"enter a valid email"
            })
        }

        if(password.length<8){
            return res.json({
                success:false,
                message:"enter a strong password"
            })
        }
        //hashing the password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resourse_type:"image"})
        const imageUrl= imageUpload.secure_url

        const doctorData={
            name,email,
            image:imageUrl,
            password:hashedPassword,
            speciality,degree,
            experience,about,fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"Doctor added"})


    }
    catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

export {addDoctor}