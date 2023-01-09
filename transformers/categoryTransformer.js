const category = require("../models/category")


const categoryTransformer = (category)=>{
    //here we will change something
    console.log(category)
    if(category?.icon){
         category.icon =  'http://localhost:3000/uploads/'+category.icon //http://localhost:3000/uploads'
    }
    
    
    return category
    }
    const categoriesTransformer = (categories)=>{
        return categories.map((category) => categoryTransformer(category))
        
    }
    
    module.exports = {
        categoryTransformer,
        categoriesTransformer
    }