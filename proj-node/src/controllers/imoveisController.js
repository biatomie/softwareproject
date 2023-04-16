import mongoose from "mongoose";
import dbImoveisMd from "../models/Imovel.js";


class ImovelController {

  static listarImovel = async (req, res) => {
    try{
      // const todosImoveis = await dbImoveisMd.find();
      await dbImoveisMd.find();
      // res.redirect("imoveis");
      // res.status(200).json(todosImoveis)
    } catch (err) {
      res.status(500).json(err);
    }
  };
  static listarImovelPorId = async (req, res) => {
    try{
      const id = req.params.id;
      const imoveisId = await dbImoveisMd.findById(id);
      await dbImoveisMd.findById(id);
      if (imoveisId !== null) {
        res.status(200).json(imoveisId);
      } else {
        res.status(404).send({message: "Id do Imóvel não localizado."});
      }
      res.redirect("imoveis");
      //  res.status(200).json(todosImoveisId)
    } catch (err) {
      if (err instanceof mongoose.Error.CastError){
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
      }
      res.status(500).send({message: "Erro interno de servidor"});
    }
  };
 
  static cadastrarImovel = async (req, res) => {
    try {
      let imovel = await new dbImoveisMd(req.body);
      imovel.save();            
      // res.status(201).send(imovel.toJSON());
      // res.redirect("imoveis");
    } catch (err) {
      res.status(500).send({ message: `${err.message} - falha ao cadastrar imovel.` });
    }
  };
    

  static atualizarImovel = async (req, res) => {
    try{
      const id = req.params.id;
      await dbImoveisMd.findByIdAndUpdate(id, {$set: req.body});
      // res.redirect("imoveis");
      // res.status(201).send({message: `Imóvel com o id: ${id} foi atualizado com sucesso`});
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao atualizar o imóvel com o id` });
    }        
  };

  static excluirImovel = async(req,res) => {
    try{
      const id = req.params.id;
      await dbImoveisMd.findByIdAndDelete(id);
      // res.redirect("imoveis");
      // res.status(201).send({message: `Imóvel com o id: ${id} removido com sucesso`})
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao remover o imóvel com o id`});
    }
  };

  static page = async(req,res) => {
    try{
      dbImoveisMd.find({}, function(imoveis) {
        res.render("index", {
          imoveisList: imoveis
        });
      });
      res.render("index");
            
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao remover o imóvel `});
    }
  };

  static listarImoveisPorBairro = async (req, res, next) => {
    try {
      // const bairro = req.query.bairro;

      // const imoveisResultado = await dbImoveisMd.find({"bairro": bairro});

      let searchTerm = req.body.searchTerm;
      let imovelResult = await dbImoveisMd.find( { $text: { $search: searchTerm, $diacriticSensitive: true}});
      res.status(200).send(imovelResult);
      res.json(dbImoveisMd);
      // res.render("search", {title: "Resultado da Pesquisa por Bairro", imovelResult});
    } catch (err) {
      next(err);
    }
  };

}

export default ImovelController;