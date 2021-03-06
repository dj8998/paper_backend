const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var randomize = require('randomatic');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec(async (error, user) => {
        if(error) return res.status(400).json({ error });
        
        if(user) return res.status(400).json({
            error: 'User already registered'
        });

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({ 
            firstName, 
            lastName, 
            email, 
            hash_password,
            username: randomize('0', 6),
            role: 'user'
        });

        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    error: 'Something went wrong'
                });
            }

            if(data){
                return res.status(201).json({
                    error: 'User created Successfully..!',
                    data: data

                })
            }
        });



    });
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        
        if(user){

            if(user.authenticate(req.body.password) && user.role === 'user'){
                const token = jwt.sign({_id: user._id, username: user.username , role: user.role}, "heheh", { expiresIn: '1h' });
                const { _id, firstName, lastName,username, email, role, fullName } = user;
                res.cookie('token', token, { expiresIn: '1d' });
                res.status(200).json({
                    token,
                    user: {_id, username, firstName, lastName, email, role, fullName},
                    error: 'undefined'
                });
            }else{
                return res.status(400).json({
                    error: 'Invalid Password'
                })
            }

        }else{
            return res.status(400).json({message: 'User does not exist'});
        }
    });
}


exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout successfully...!'
    })
}