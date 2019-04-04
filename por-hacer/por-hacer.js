const fs = require('fs');

//Variable global
let listadoPorHacer = [];


let crear = (descripcion) => {
    //Obtiene los datos del JSON
    cargarDB();

    let datos = {
        descripcion,
        estatus: false
    }

    listadoPorHacer.push(datos);

    guardarDB();

    return datos;
}

let guardarDB = () => {

    let datos = JSON.stringify(listadoPorHacer);
    console.log("Guardar: ", listadoPorHacer);
    fs.writeFile('./db/data.json', datos, (err) => {
        if (err) throw err
        console.log('El archivo se guardo correctamente');
    })
}

let cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (err) {
        listadoPorHacer = [];
    }
}


let getListado = (completado) => {
    cargarDB();
    let lista = listadoPorHacer.filter(tarea => tarea.completado === completado);
    return lista;
}

let actualizar = (descripcion, completado) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();

        return true;
    } else {
        return false;
    }
}

let borrar = (descripcion) => {
    cargarDB();
    let nuevaLista = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (listadoPorHacer.length === nuevaLista.length) {
        return false;
    } else {
        listadoPorHacer = nuevaLista;
        //console.log('Nueva lista: ', listadoPorHacer);
        guardarDB();
        return true;

    }
}

function deleteRow(arr, row) {
    arr = arr.slice(0); // make copy
    arr.splice(row - 1, 1);
    return arr;
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}