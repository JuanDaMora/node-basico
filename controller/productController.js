const {response, json} = require('express')
const {Product, Categoria}=require('../models')

//obtener products - Paginado - total - populate
const obtenerProducts =async(req,res=response)=>{
    const {limite=5,desde=0}=req.query;
    const query={estado:true}

    const [total,product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
              .populate('categoria','nombre')
              .skip(desde)
              .limit(limite)
      ]);
    
    res.json({
        total,product
    });
}
const obtenerProduct=async(req,res=response)=>{
    const {id}=req.params;
    const product=await Product.findById(id).populate('categoria','nombre').populate('usuario','nombre')

    res.json(product)
}

  
//crear product
const crearProduct=async(req,res=response)=>{
    const nombre=req.body.nombre.toUpperCase();
    const catId=req.body.catId;

    const productBD = await Product.findOne({nombre});
    const catDB=await Categoria.findById(catId)
    if(productBD){
        return res.status(400).json({
            msg:`El producto ${nombre} ya existe`
        });
    }
    if(catDB==null){
        return res.status(400).json({
            msg:`La categoria con id ${catId} no existe`
        });
    }

    //mirar la data a guardar
    const data={
        nombre,
        usuario:req.usuario._id,
        categoria:catId
    }
    const product=await new Product(data);

    await product.save();

    res.status(201).json({product});
}

//actualizar product
const actualizarProducto=async(req,res=response)=>{
    const {id}=req.params;
    const {usuario, ...data}=req.body;

    data.nombre=data.nombre.toUpperCase();
    data.usuario=req.usuario._id;

    const product=await Product.findByIdAndUpdate(id,data,{new:true})
    res.json(product)

}

//actualizar product
const borrarProducto=async(req,res=response)=>{
    const {id}=req.params;
    const producto=await Product.findByIdAndUpdate(id,{estado:false},{new:true})
    producto.disponible=false;
    res.json(producto)
}


module.exports={
    obtenerProducts,
    crearProduct,
    actualizarProducto,
    borrarProducto,
    obtenerProduct
}