import dbUsersMd from "../models/User.js";
// import mongoose from "mongoose";


class userController {
  
  static pageUser = async(req,res) => {

    res.render("register");
  };
  static pageTable = async(req,res) => {

    // const messages = await req.consumeFlash("info");
    const locals = {
      title: "NodeJs",
      description: "Cadastro de usuários"
    };
    let perPage = 12;
    let page = req.query.page || 1;
  
    try {
      const usersList = await dbUsersMd.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await dbUsersMd.count();

      res.render("registerTable", {
        locals,
        usersList,
        current: page,
        pages: Math.ceil(count / perPage)
        // messages
      });
            
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao remover o usuário `});
    }
  };
  
  static newUser = async (req, res) => {
    try {
      let user = await new dbUsersMd(req.body);
      user.save();     
      // res.status(201).send(imovel.toJSON());
      res.redirect("register");
    } catch (err) {
      res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` });
    }
  };
    

  static editUser = async (req, res) => {
    try {
      const usersList = await dbUsersMd.findOne({ _id: req.params.id });
  
      const locals = {
        title: "Editar usuário",
        description: "Editar usuário cadastrado",
      };
  
      res.render("editUser", {
        locals,
        usersList
      });
  
    } catch (err) {
      console.log(err);
    }
  
  };


  static updateUser = async (req, res) => {
    try{
      await dbUsersMd.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.redirect("/registerTable");
      // await res.redirect(`/edit/${req.params.id}`);
  
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao atualizar o imóvel com o id` });
    }        
  };
  /**
   * DELETE /
  */
  static deleteUser = async(req,res) => {
    try{
      const id = req.params.id;
      await dbUsersMd.findByIdAndDelete({ _id: id });
      res.redirect("/registerTable");
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao remover o imóvel com o id`});
    }
  };

  /**
 * Get /
 * Search Customer Data 
*/
  static searchUser = async (req, res) => {

    const locals = {
      title: "Procurar usuário",
      description: "Procurar usuário cadastrado",
    };

    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

      const usersList = await dbUsersMd.find({
        $or: [
          { username: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          { senha: { $regex: new RegExp(searchNoSpecialChar, "i") }}
        ]
      });

      res.render("searchUser", {
        usersList,
        locals
      });
      
    } catch (error) {
      console.log(error);
    }

  };

}

export default userController;