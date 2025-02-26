import chalk from "chalk"

export class Program{
    #args;
    constructor(args){
        this.#args = args
    }

        greet(){
            const name = this.#args[1];
            if (name){
                console.log(chalk.yellowBright(`Hello ${name}`))
            } else {
            console.log(chalk.blue.bold(`Hello World.`))
            }
        }
}