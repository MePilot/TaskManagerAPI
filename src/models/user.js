
  const mongoose = require('mongoose')
  const validator = require('validator')
  const brypt = require('bcryptjs')
  const jwt = require('jsonwebtoken')
  const Task = require('../models/task')
  const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value) {
            if(!validator.isEmail(value)) throw new Error('Email is invalid')
        }
    },

    password:{
        type:String,
        required:true,
        validate(value) {
            if(value.length<6 || value.toLowerCase().includes('password')) throw new Error('Password is invalid')
        }
    },

    age:{
        type:Number,
        default:0,
        validate(value) {
            if(value<0) throw new Error('Age must be positive')
        }
    },
    avatar: {
        type:Buffer
    },

    tokens: [{token:{
        type:String,
        required:true
    }}]
    }, {timestamps:true})
    
    userSchema.virtual('tasks',{
        ref: 'tasks',
        localField:'_id',
        foreignField:'owner'
    })

    userSchema.methods.generateAuthToken = async function () {
        const token = jwt.sign({_id:this._id.toString()}, process.env.JWT_SECRET)
        this.tokens=this.tokens.concat({token})
        await this.save()
        return token

    }
    
    userSchema.methods.toJSON = function () {
        const userObject = this.toObject()
        delete userObject.password
        delete userObject.tokens
        delete userObject.avatar
        return userObject

    }
    
    userSchema.statics.findByCredentials = async (email,password)=> {
        const user = await User.findOne({email})
        
        if (!user) throw new Error('Unable to login!')

        const isMatch= await brypt.compare(password, user.password)

        if(!isMatch) throw new Error('Unable to login!')

        return user

    }
    
    userSchema.pre('save', async function (next) {
        const user = this
        
        if(user.isModified('password')) {
            user.password=await brypt.hash(user.password, 8)
        }
        next()

    })
    
    userSchema.pre('remove', async function (next) {
        const user = this
        await Task.deleteMany({owner:user._id})
        next()

    })
    
    const User = mongoose.model('users',userSchema)
    
    module.exports=User

