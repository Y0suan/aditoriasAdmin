import mongoose, { model, Schema, models } from "mongoose";


const ProductSchema = new Schema({
  interes: String,
  sintesis: String,
  motivo: String,
  direccion: String,
  lugar: String,
  fecha: String,
  participants: [{type:Object}], 
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);