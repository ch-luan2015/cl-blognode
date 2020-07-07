let express= require('express');
let app = express();

indexHandler =(req,res)=>{
    return res.send('hello world');
}
app.get('/',indexHandler)



app.listen(8000,function(){
console.log('server started at : 127.0.0.1:8000');

})
