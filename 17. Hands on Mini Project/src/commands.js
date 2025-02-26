import fs from "node:fs";

const defaultOutputFile = "agenda.json";

/**
 * @param {*} title 
 * @param {*} description 
 * @param {*} dueDate 
 */
function CreateToDo(title,description,dueDate){
    if (!fs.existsSync(defaultOutputFile)){
        fs.writeFileSync(defaultOutputFile);
    }
}

/**
 * @param {number} id 
 * @param {ToDo} newToDo 
 */
function EditToDo(id, newToDo){
    
}

/**
 * @param {number} id 
 */
function CloseToDo(id){
    
}

/**
 * @param {boolean} includeClosed
 */
function ListToDo(includeClosed){
    
}

/**
 * @param {number} id 
 */
function DeleteToDo(title,description,dueDate){
    
}

CreateToDo()