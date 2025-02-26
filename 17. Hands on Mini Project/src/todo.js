/**
 * Class ToDo
 * Represents the tasks for the user.
 * @constructor (title)
 */
class ToDo {
    #id;
    #title;
    #description;
    #dueDate;
    /**
     * @constructor
     * @param {*} id
     * @param {*} title
     * @param {*} description
     * @param {*} dueDate
     */
    constructor(title, description, dueDate) {
        this.#id = id;
        this.#description = description;
        this.#title = title;
        this.#dueDate = dueDate;
        this.#dateCompleted = null;
    }
}
