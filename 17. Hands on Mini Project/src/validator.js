/**
 * 
 * @param {*} title 
 * @param {*} description 
 * @param {*} dueDate 
 */
export function validateToDo(title,description,dueDate){
    if(!isTitleValid(title)){
        throw new Error("'Title' is not valid!")
    }
    if(!isDescriptionValid(description)){
        throw new Error("'Description' is not valid!")
    }
    if(!isDueDateValid(dueDate)){
        throw new Error("'Due Date' is not valid!")
    }
}

/**
 * 
 * @param {*} title 
 */
function isTitleValid(title){
    if(typeof title != "string") return false;
    if(!title) return false;
    return true;
}
function isDescriptionValid(description){
    if(typeof description != "string") return false;
    if(!description) return false;
    return true;
}
function isDueDateValid(dueDate){
    if(!dueDate) return false;
    let today = Date.now();
    if(dueDate < today) return false;
    return true;
}