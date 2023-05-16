import dbImoveisMd from "../models/Imovel.js";
// import mongoose from "mongoose";


class ImovelController {
  
  static page = async(req,res) => {

    // const messages = await req.consumeFlash("info");
    const locals = {
      title: "NodeJs",
      description: "Página cadastro de imóveis"
    };
    let perPage = 12;
    let page = req.query.page || 1;
  
    try {
      const imoveisList = await dbImoveisMd.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await dbImoveisMd.count();

      res.render("index", {
        locals,
        imoveisList,
        current: page,
        pages: Math.ceil(count / perPage)
        // messages
      });
            
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao remover o imóvel `});
    }
  };
  
  static cadastrarImovel = async (req, res) => {
    try {
      let imovel = await new dbImoveisMd(req.body);
      imovel.save();     
      // res.status(201).send(imovel.toJSON());
      res.redirect("imoveis");
    } catch (err) {
      res.status(500).send({ message: `${err.message} - falha ao cadastrar imovel.` });
    }
  };
    

  static editar = async (req, res) => {
    try {
      const imoveisList = await dbImoveisMd.findOne({ _id: req.params.id });
  
      const locals = {
        title: "Editar imóveis",
        description: "Função para editar imóveis",
      };
  
      res.render("edit", {
        locals,
        imoveisList
      });
  
    } catch (err) {
      console.log(err);
    }
  
  };


  static atualizarImovel = async (req, res) => {
    try{
      await dbImoveisMd.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.redirect("/imoveis");
      // await res.redirect(`/edit/${req.params.id}`);
  
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao atualizar o imóvel com o id` });
    }        
  };
  /**
   * DELETE /
  */
  static excluirImovel = async(req,res) => {
    try{
      const id = req.params.id;
      await dbImoveisMd.findByIdAndDelete({ _id: id });
      res.redirect("/imoveis");
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao remover o imóvel com o id`});
    }
  };

  /**
 * Get /
 * Search Customer Data 
*/
  static procurar = async (req, res) => {

    const locals = {
      title: "Procurar imóveis",
      description: "Função para procurar imóveis",
    };

    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

      const imoveisList = await dbImoveisMd.find({
        $or: [
          { bairro: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          { logradouro: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          { cidade: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        ]
      });

      res.render("search", {
        imoveisList,
        locals
      });
      
    } catch (error) {
      console.log(error);
    }

  };

}

export default ImovelController;