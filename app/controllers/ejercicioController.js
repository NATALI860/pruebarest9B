const ejercicioModel = require('../models/EjerciciosModel')

function buscarTodo(req, res){
    ejercicioModel.find({})
    .then(ejercicios=>{
        if (ejercicios.length) {
            return res.status(200).send({ ejercicios})

        }
        return res.status(204).send ({mensaje:"no hay informacion que mostrar"})
    })
    .catch(e=>{return res.status(404).send ({mensaje:`error al buscar la informacion ${e}`})})
}

module.exports = {
    buscarTodo
}