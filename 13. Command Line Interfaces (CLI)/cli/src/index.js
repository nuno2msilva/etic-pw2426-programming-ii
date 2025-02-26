import { getLogger } from "./logger.js";
import { Program } from "./program.js";
import chalk from "chalk";

const logger = getLogger("debug", "programa.log")

logger.info("Program started");


try{
    const [ command, ...args ] = process.argv.slice(2)

    const program = new Program(args)

    if (command.toString().toLowerCase() === "greet"){
        program.greet();
    } else {
        throw new Error("Invalid command. Run 'node index.js greet <name>'.")
    }
} catch(exc){
    logger.error(exc);
    console.error(chalk.red.bold(exc.message))
}