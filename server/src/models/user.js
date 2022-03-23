const mongooese = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Auditorium = require('./auditorium')
const userSchema = new mongooese.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
              
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid Email..')
                }
            }
        },
        age: {
            type: Number,
            required:true,
            validate(v) {
                if (v < 0) throw new Error('Age must be a positive number')
            }
        },
        role: {
            type: String,
            required: true,
            trim: true
            // validate(v) {
            //     if (!v.toLowerCase().includes("user") || 
            //         !v.toLowerCase().includes("manager") || 
            //         !v.toLowerCase().includes("organizer") ||
            //         !v.toLowerCase().includes("admin")) throw new Error("Role doesn't exist..")
            // }
        },
        verificationStatus: {
            type: String,
            trim: true,
            default: true
        },
        password: {
            type: String,
            trim: true,
            required: true,
            minlength: 7,
            validate(v) {
                if (v.toLowerCase().includes("password")) throw new Error("can't give 'password' in password")
            }
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    }
)


// create method to get only public details of logged user
//1) userSchema.methods.getPublicProfile =  function () {
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}


//create findByCredentials method in User schema
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })// verificationStatus:"pending"
    if (!user)
        throw new Error("Invalid email or password")

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch)
        throw new Error("Invalid email or password")
    //console.log("user : ", user.name)
    return user
}
//create method for generating auth token for user login
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ _id: user._id.toString() }, 'thisismysecretforkwttoken')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

//Hash plain password using bcrypt and save in DB
userSchema.pre('save', async function (next) {
    const user = this
    console.log("just before saving")
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    if (user.role == "manager") {
        user.verificationStatus = "pending";
        
    }
    else
        user.verificationStatus = "true"
    next();
})


const User = mongooese.model('User', userSchema)

module.exports = User