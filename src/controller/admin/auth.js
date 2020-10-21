const Admin = require('../../models/admin');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
var randomize = require('randomatic');

exports.signup = (req, res) => {



	Admin.findOne({ email: req.body.email })
	.exec(async (error, user) => {
		if(user)
			return res.status(400).json({
				message:"admin already registered"
			});

		const { 
			firstName,
			lastName,
			email,
			password
		} = req.body;

		const hash_password =  await bcrypt.hash(password, 10);

		const _user = new Admin({ 		
			firstName,
			lastName,
			email,
			hash_password,
			username: randomize('0', 4),
			role: 'admin'
		});

		console.log(_user)
		_user.save((errr, data) => {
			if(errr){
				console.log(errr)
				return res.status(400).json({
				message: 'something went wrong'
				
			})
			};

			if(data){
				return res.status(201).json({
				message: 'Admin created Sucessfully',
				
			});
			}
		})
	})
}

exports.signin = (req, res) => {
	Admin.findOne({email: req.body.email}).exec((error, user) => {
		if(error)
			return res.status(404).json({error});
		if(user){
			console.log(user)
			if(user.authenticate(req.body.password ) && user.role === 'admin'){
				var token = jwt.sign({_id: user._id, role: user.role}, "heheh", {expiresIn: '1h'});
				const { _id, firstName, lastName, email, role, fulname,username} = user;
				res.cookie('token', token, {expiresIn: '2h'})
				res.status(200).json({
					token,
					user: {
						_id, firstName, lastName, email, role, fulname, username
					}
				});
			}else{
				return res.status(400).json({
					message:"Invalid password"
				})
			}


		}else{
			return res.status(404).json({message:"Admin dsoes not exist"})
		}
	})
}


exports.signout = (req, res) => {
	res.clearCookie('token');
	res.status(200).json({
		message: 'Signout Sucessfully'
	})
}