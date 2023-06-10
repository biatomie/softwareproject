import dbClientsMd from "../models/client.js";

class clientController {
  
  static pageClient = async(req,res) => {

    // const messages = await req.consumeFlash("info");
    const locals = {
      title: "NodeJs",
      description: "Página cadastro de clientes"
    };
    let perPage = 12;
    let page = req.query.page || 1;
  
    try {
      const clientsList = await dbClientsMd.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await dbClientsMd.count();

      res.render("client", {
        locals,
        clientsList,
        current: page,
        pages: Math.ceil(count / perPage)
        // messages
      });
            
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao remover o cliente `});
    }
  };
  
  static newClient = async (req, res) => {
    try {
      let client = await new dbClientsMd(req.body);
      client.save();     
      // res.status(201).send(client.toJSON());
      res.redirect("client");
    } catch (err) {
      res.status(500).send({ message: `${err.message} - falha ao cadastrar client.` });
    }
  };
    

  static editClient = async (req, res) => {
    try {
      const clientsList = await dbClientsMd.findOne({ _id: req.params.id });
  
      const locals = {
        title: "Editar clientes",
        description: "Função para editar clientes",
      };
  
      res.render("edit", {
        locals,
        clientsList
      });
  
    } catch (err) {
      console.log(err);
    }
  
  };


  static updateClient = async (req, res) => {
    try{
      await dbClientsMd.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.redirect("/client");
      // await res.redirect(`/edit/${req.params.id}`);
  
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao atualizar o cliente com o id` });
    }        
  };
  /**
   * DELETE /
  */
  static deleteClient = async(req,res) => {
    try{
      const id = req.params.id;
      await dbClientsMd.findByIdAndDelete({ _id: id });
      res.redirect("/client");
    } catch(err) {
      res.status(500).send({message: `${err} - falha ao remover o cliente com o id`});
    }
  };

  /**
 * Get /
 * Search Customer Data 
*/
  static searchClient = async (req, res) => {

    const locals = {
      title: "Procurar clientes",
      description: "Função para procurar clientes",
    };

    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

      const clientsList = await dbClientsMd.find({
        $or: [
          { name: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          { email: { $regex: new RegExp(searchNoSpecialChar, "i") }},
          { whatsapp: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        ]
      });

      res.render("search", {
        clientsList,
        locals
      });
      
    } catch (error) {
      console.log(error);
    }

  };

}

export default clientController;