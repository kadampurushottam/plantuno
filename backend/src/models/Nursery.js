const mongoose = require('mongoose');

const NurserySchema = new mongoose.Schema({
  owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  name:{type:String,required:true,trim:true},
  address:{type:String,default:''},
  locality:{type:String,default:''},
  city:{type:String,default:''},
  district:{type:String,default:''},
  state:{type:String,default:''},
  pincode:{type:String,default:''},
  latitude:{type:Number,required:true},
  longitude:{type:Number,required:true},
  location:{
    type:{type:String,enum:['Point'],default:'Point'},
    coordinates:{type:[Number],required:true}
  },
  rating:{type:Number,default:0},
  phone:{type:String,default:''},
  openNow:{type:Boolean,default:true}
},{timestamps:true});

NurserySchema.index({ location: '2dsphere' });

module.exports=mongoose.model('Nursery',NurserySchema);
