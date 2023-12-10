import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import JWT from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is taken!']
    },

    password: {
        type: String,
        required: [true, 'Password is required.'],
        minLength: [8, 'Password must be at least 8 character long.']
    },

    address: {
        type: String,
        required: [true, 'address is required.']
    },

    city: {
        type: String,
        required: [true, 'City is required.']
    },

    country: {
        type: String,
        required: [true, 'Country is required.']
    },

    phone: {
        type: String,
        required: [true, 'Phone is required.']
    },

    profilePic: {
        type: String
    }

}, { timestamps: true })

//hashing functions
userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10)
})

//compare the password
userSchema.methods.comparePassword = async function(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password)
}

//JWT token
userSchema.methods.generateToken = function(){
    return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
}

export const userModel = mongoose.model("Users", userSchema)

export default userModel