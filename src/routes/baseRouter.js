const user  =  require('../routes/userRouter');

module.exports = function(app){
    app.use('/user',user)
};