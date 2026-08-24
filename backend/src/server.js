require('dotenv').config();
const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const {connectDatabase}=require('./config/db');

const app=express();
app.use(cors({origin:process.env.CLIENT_URL || 'http://localhost:4200'}));
app.use(express.json({limit:'6mb'}));
app.use(morgan('dev'));

app.get('/api/health',(req,res)=>res.json({success:true,service:'PlantUno API'}));
app.use('/api/auth',require('./routes/auth.routes'));
app.use('/api/plants',require('./routes/plant.routes'));
app.use('/api/nurseries',require('./routes/nursery.routes'));
app.use('/api/me',require('./routes/me.routes'));
app.use('/api/orders',require('./routes/order.routes'));
app.use('/api/admin',require('./routes/admin.routes'));
app.use('/api/admin/admin-users',require('./routes/admin-users.routes'));

const port=process.env.PORT || 5000;
connectDatabase().then(()=>{
  app.listen(port,()=>console.log(`PlantUno backend running at http://localhost:${port}`));
}).catch(error=>{
  console.error('Database connection failed:',error.message);
  process.exit(1);
});
