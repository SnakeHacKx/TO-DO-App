require('colors');

const showMenu = () => {

    return new Promise((resolve, reject) => { 
        console.clear();
        console.log('================================='.green);
        console.log('  Seleccione una opción'.cyan);
        console.log('================================='.green);
    
        console.log(`${'1.'.yellow} Crear una nueva tarea`);
        console.log(`${'2.'.yellow} Listar todas las tareas`);
        console.log(`${'3.'.yellow} Listar las tareas completadas`);
        console.log(`${'4.'.yellow} Listar las tareas pendientes`);
        console.log(`${'5.'.yellow} Completar tarea(s)`);
        console.log(`${'6.'.yellow} Borrar tarea`);
        console.log(`${'0.'.yellow} Salir \n`.red);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        });
    });
}

const pause = () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.green} para continuar:\n`, (opt) => {
            readline.close();
            resolve();
        });
    });
 }

module.exports = {
    showMenu,
    pause,
}