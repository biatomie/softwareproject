import dbPropertiesMd from "../models/property.js";
// import mongoose from "mongoose";


class propertyController {
  
  static page = async(req,res) => {

    // const messages = await req.consumeFlash("info");
    const locals = {
      title: "NodeJs",
      description: "Página cadastro de imóveis"
    };
    let perPage = 12;
    let page = req.query.page || 1;
  
    try {
      const propertiesList = await dbPropertiesMd.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await dbPropertiesMd.count();

      res.render("index", {
        locals,
        propertiesList,
        current: page,
        pages: Math.ceil(count / perPage)
        // messages
      });
            
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao remover o imóvel `});
    }
  };
  
  static newProperty = async (req, res) => {
    try {
      let imovel = await new dbPropertiesMd(req.body);
      imovel.save();     
      // res.status(201).send(imovel.toJSON());
      res.redirect("imoveis");
    } catch (err) {
      res.status(500).send({ message: `${err.message} - falha ao cadastrar imovel.` });
    }
  };
    

  static editProperty = async (req, res) => {
    try {
      const propertiesList = await dbPropertiesMd.findOne({ _id: req.params.id });
  
      const locals = {
        title: "Editar imóveis",
        description: "Função para editar imóveis",
      };
  
      res.render("edit", {
        locals,
        propertiesList
      });
  
    } catch (err) {
      console.log(err);
    }
  
  };


  static updateProperty = async (req, res) => {
    try{
      await dbPropertiesMd.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.redirect("/imoveis");
      // await res.redirect(`/edit/${req.params.id}`);
  
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao atualizar o imóvel com o id` });
    }        
  };
  /**
   * DELETE /
  */
  static deleteProperty = async(req,res) => {
    try{
      const id = req.params.id;
      await dbPropertiesMd.findByIdAndDelete({ _id: id });
      res.redirect("/imoveis");
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao remover o imóvel com o id`});
    }
  };

  /**
 * Get /
 * Search Customer Data 
*/
  static searchProperty = async (req, res) => {

    const locals = {
      title: "Procurar imóveis",
      description: "Função para procurar imóveis",
    };

    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

      const propertiesList = await dbPropertiesMd.find({
        $or: [
          { bairro: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          { logradouro: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          { cidade: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        ]
      });

      res.render("search", {
        propertiesList,
        locals
      });
      
    } catch (error) {
      console.log(error);
    }

  };

}

export default propertyController;