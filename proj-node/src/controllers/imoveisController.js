import dbImoveisMd from "../models/Imovel.js";


class ImovelController {

    static listarImovel = async (req, res) => {
        try{
            const todosImoveis = await dbImoveisMd.find();
            res.redirect("imoveis")
            // res.status(200).json(todosImoveis)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static listarImovelPorId = async (req, res) => {
        try{
            const id = req.params.id;
            const todosImoveisId = await dbImoveisMd.findById(id);
            res.redirect("imoveis")
            //  res.status(200).json(todosImoveisId)
        } catch (err) {
            res.status(400).send({message: `${err.message} - Imóvel com o id ${id} não foi localizado.`})
        }
    }
 
    static cadastrarImovel = async (req, res) => {
        try {
            let imovel = await new dbImoveisMd(req.body);
            imovel.save();            
            // res.status(201).send(imovel.toJSON());
            res.redirect("imoveis")
        } catch (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar imovel.` });
        }
    };
    

    static atualizarImovel = async (req, res) => {
        try{
            const id = req.params.id;
            await dbImoveisMd.findByIdAndUpdate(id, {$set: req.body});
            res.redirect("imoveis")
            // res.status(201).send({message: `Imóvel com o id: ${id} foi atualizado com sucesso`});
        } catch(err) {
            res.status(500).send({message: `${err} - falha ao atualizar o imóvel com o id: ${id}` });
        }        
    }

    static excluirImovel = async(req,res) => {
        try{
            const id = req.params.id;
            await dbImoveisMd.findByIdAndDelete(id);
            res.redirect("imoveis")
            // res.status(201).send({message: `Imóvel com o id: ${id} removido com sucesso`})
        } catch(err) {
            res.status(500).send({message: `${err} - falha ao remover o imóvel com o id: ${id}`})
        }
    }

    static page = async(req,res) => {
        try{
            dbImoveisMd.find({}, function(imoveis) {
                res.render('index', {
                    imoveisList: imoveis
                })
            })
            res.render('index')
            
        } catch(err) {
            res.status(500).send({message: `${err} - falha ao remover o imóvel `})
        }
    }

}

export default ImovelController