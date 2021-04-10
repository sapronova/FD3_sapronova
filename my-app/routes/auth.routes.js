const { Router, request } = require("express");
const bcrypt=require('bcryptjs');
const {check, validationResult, body}=require('express-validator');
const jwt=require('jsonwebtoken');
const config=require('config');
const router=Router();
const User=require('../models/User')


// /api/auth/register
router.post('/register', 
    [
        check('email', 'e-mail введен некорректно').isEmail(),
        check('password', 'пароль должен состоять не менее чем из 6 символов').isLength({ min: 6 })
    ],
    async (req, res)=> {
    try {

        const errors=validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'некоторые данные были введены некорректно'
            });
        }
        
        const{email, password}=req.body;

        const candidate=await User.findOne({email});

        if (candidate) {
           return res.status(400).json({message: 'Такой e-mail уже зарегистрирован'});
        }

        const hashedPassword=await bcrypt.hash(password, 12);
        const user = new User ({email, password: hashedPassword});

        await user.save();

        res.status(201).json({message: 'Пользователь зарегистрированн'});

    } catch (e) {
        res.status(500).json({message: 'При попытке передачи данных возникла ошибка. Попробуйте снова :)'});
    }
});

router.post('/login', 
        [
            check('email', 'e-mail введен некорректно').normalizeEmail().isEmail(),
            check('password', 'введите пароль').exists()
        ],
        async (req, res)=> {
    try {
        const errors=validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'некоторые данные при попытке входа были введены некорректно'
            });
        }
              
        const {email, password}=req.body;

        const user=await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                message: 'пользователь с таким e-mail не найден'
            });
        }

        const isMatch=await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: 'пароль указан неверно..попробуйте снова'
            });
        }

        const token=jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn:'1h'}
            
        );

        res.json({token, userId: user.id});
        
    } catch (e) {
        res.status(500).json({message: 'При попытке передачи данных возникла ошибка. Попробуйте снова :)'});
    }
        });

module.exports=router;