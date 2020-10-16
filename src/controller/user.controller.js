const User = require('../models/user.model');

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