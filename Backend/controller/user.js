const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const userSignUp = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password is required" })
    }
    if (!emailRegex.test(email)) {
    return res.status(400).json({
        error: "Please enter a valid email address"
    })
}

if (!passwordRegex.test(password)) {
    return res.status(400).json({
        error: "Password must be at least 8 characters and contain uppercase, lowercase, number and special character"
    })
}
    let user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({ error: "Email is already exist" })
    }
    const hashPwd = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        email, password: hashPwd
    })
    let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY)
    return res.status(200).json({ token, user:newUser })

}

const userLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password is required" })
    }
    let user = await User.findOne({ email })
    if (user && await bcrypt.compare(password, user.password)) {
        let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY)
        return res.status(200).json({ token, user })
    }
    else {
        return res.status(400).json({ error: "Invaild credientials" })
    }
}

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json({email:user.email})
}

module.exports = { userLogin, userSignUp, getUser }