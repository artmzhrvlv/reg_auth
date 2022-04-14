const ApiError = require('../error/ApiError')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email) => {
    return jwt.sign({id, email},
    process.env.SECRET_KEY,
    //{expiresIn: '24h'}
    )
}

class UserController{
    async registration(req,res,next){
        const{name,email,password} = req.body
        if(!name || !email || !password){
            return next(ApiError.BadRequest('Incorrect name, email or password '))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.BadRequest('email already in use'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, email, password:hashPassword})
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }
    async login(req,res,next){
        const {email,password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('user not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('incorrect password'))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }
    async getUsersInfo(req,res){
        const users = await User.findAll()
        return res.json(users)
    }
    async removeUser(req,res){
        const {userId} = req.body
        const userToRemove = await User.findOne({where: {id: userId}})
        userToRemove.destroy();
        return res.json(userToRemove)
    }
}

module.exports = new UserController()