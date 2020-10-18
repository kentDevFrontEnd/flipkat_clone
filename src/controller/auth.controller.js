const User = require('../models/auth.model');
const jwt = require('jsonwebtoken');

module.exports.signup = (req, res)=>{

    User.findOne({email: req.body.email})
        .exec((err, user)=>{
            if(user) return res.status(400).json({
                message: 'User already registered'
            })

            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;

            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                userName: Math.random().toString()
            });

            _user.save((err, data)=>{
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        message: "Something went wrong"
                    })
                }

                if(data){
                    return res.status(201).json({
                        user: data
                    })
                }
            })
        })
}

module.exports.signin = (req, res)=>{
    User.findOne({email: req.body.email})
        .exec((err, user)=>{
            if(err) return res.status(400).json({err});
            if(user){
                console.log(user)
                if(user.authenticate(req.body.password)){
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
                    const { firstName, lastName, email, role, fullName } = user;
                    res.status(200).json({
                        token,
                        user: {
                            firstName, lastName, email, role, fullName
                        }
                    })
                } else {
                    res.status(400).json({
                        message: 'Invalid password'
                    })
                }

            } else {
                return res.status(400).json({
                    message: "Something went wrong"
                });
            }
        })
}

module.exports.requiresignin = (req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);

    console.log(user);
    // jwt.decode()

    next();
}