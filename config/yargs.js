//crear archivo de configuracion
const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripción de tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
}

const argv = require('yargs')
    .command('crear', 'Sirve para crear', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completo', {
        descripcion,
        completado
    })
    .command('borrar', 'Borra registro por descripción', {
        descripcion
    })
    .command('listar', 'Lista elementos encontrado', {
        completado
    })
    .help()
    .argv

module.exports = {
    argv
}