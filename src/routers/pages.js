
const express = require('express')
const router = new express.Router()
const auth2 = require('../middleware/auth2')



router.get('',(req,res)=>{
   
    res.render('tasks')

})
router.get('/sudoku',(req,res)=>{
   
    res.render('sudoku')

})
//router.get('/auth',auth2,(req,res)=>{
    //if(res.logged===true) {hbs.registerHelper('loginBar',()=>{return 'headerLogged'})}
    
//})
router.get('/login',(req,res)=>{
   
    res.render('login')

})
router.get('/tasksPage',(req,res)=>{
    res.render('tasks')


})

router.get('/registration',(req,res)=>{
    res.render('registration')


})
router.get('/about',(req,res)=>{
    res.render('about')


})
router.get('/profile',(req,res)=>{
    res.render('profile')


})
router.get('*',(req,res)=>{
   
    res.render('error')

})
module.exports = router

