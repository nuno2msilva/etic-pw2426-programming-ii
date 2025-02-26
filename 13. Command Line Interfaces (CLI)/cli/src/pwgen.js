import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import { PasswordManager } from './pwgen.manager.js';

try {
  const pm = new PasswordManager();
  const argv = yargs(hideBin(process.argv))
    .option('length', { type: 'number', default: pm.config.length })
    .option('uppercase', { type: 'boolean', default: pm.config.uppercase })
    .option('numbers', { type: 'boolean', default: pm.config.numbers }).argv;

  pm.updateConfig(argv);
  console.log(chalk.green(pm.generatePassword(argv)));

} catch (error) {
  console.log(chalk.red(error.message));
}