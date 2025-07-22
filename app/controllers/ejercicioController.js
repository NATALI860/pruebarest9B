const ejercicioModel = require('../models/EjerciciosModel');

function buscarTodo(req, res) {
    ejercicioModel.find({})
        .then(ejercicios => {
            if (ejercicios.length) {
                return res.status(200).send({ ejercicios });
            }
            return res.status(204).send({ mensaje: "No hay información que mostrar" });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: `Error al buscar la información: ${e}` });
        });
}

function guardarEjercicio(req, res) {
    console.log(req.body);
    new ejercicioModel(req.body).save()
        .then(info => {
            return res.status(200).send({ mensaje: "Información guardada con éxito", info });
        })
        .catch(e => {
            return res.status(404).send({ mensaje: "Error al guardar la información", error: e });
        });
}

function buscarEjercicio(req, res, next) {
    const consulta = {};
    consulta[req.params.key] = req.params.value;

    ejercicioModel.find(consulta)
        .then(info => {
            if (!info.length) return next(); 

            req.ejercicios = info; 
            return next();
        })
        .catch(e => {
            req.error = e; 
            return next();
        });
}

function mostrarEjercicio(req, res) {
    if (req.error) {
        return res.status(404).send({
            mensaje: "Error al buscar la información",
            error: req.error
        });
    }

    if (!req.ejercicios) {
        return res.status(204).send({ mensaje: "No hay información que mostrar" });
    }

    return res.status(200).send({ ejercicios: req.ejercicios });
}
function eliminarEjercicio(req, res) {
    const consulta = {};
    consulta[req.params.key] = req.params.value;

    ejercicioModel.deleteMany(consulta)
        .then(resultado => {
            if (resultado.deletedCount === 0) {
                return res.status(404).send({ mensaje: "No se encontró ningún ejercicio para eliminar" });
            }
            return res.status(200).send({
                mensaje: `${resultado.deletedCount} ejercicio(s) eliminado(s) con éxito`
            });
        })
        .catch(error => {
            return res.status(500).send({ mensaje: "Error al eliminar ejercicio", error });
        });
}
function actualizarEjercicio(req, res) {
    const filtro = {};
    filtro[req.params.key] = req.params.value;

    const nuevosDatos = req.body;

    ejercicioModel.updateMany(filtro, nuevosDatos)
        .then(resultado => {
            if (resultado.matchedCount === 0) {
                return res.status(404).send({ mensaje: "No se encontró ningún ejercicio para actualizar" });
            }

            return res.status(200).send({
                mensaje: `${resultado.modifiedCount} ejercicio(s) actualizado(s) con éxito`,
                resultado
            });
        })
        .catch(error => {
            return res.status(500).send({ mensaje: "Error al actualizar ejercicio", error });
        });
}


module.exports = {
    buscarTodo,
    guardarEjercicio,
    buscarEjercicio,
    mostrarEjercicio,
    eliminarEjercicio,
    actualizarEjercicio
};