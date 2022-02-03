const mongooese = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt')
const userSchema = new mongooese.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
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
            default: 0,
            validate(v) {
                if (v < 0) throw new Error('Age must be a positive number')
            }
        },
        password: {
            type: String,
            trim: true,
            required: true,
            minlength: 7,
            validate(v) {
                if (v.toLowerCase().includes("password")) throw new Error("can't give 'password' in password")
            }
        }
    }
)

userSchema.pre('save',async function(next){
    const user = this
    console.log("just befor saving")
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }

    next()
})

const User = mongooese.model('User', userSchema)

module.exports = User