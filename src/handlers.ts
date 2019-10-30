import { Args, ConcurrentlyCMD } from "./intefaces/Args.interface";
import chalk from "chalk";
import figlet from 'figlet';
import concurrently from 'concurrently';
import { configToConcurrentlyAdapter } from './utils';
const clear = require('clear');
import clui from 'clui';

export let helpHandler = (args: Args) => {
    console.log(
        chalk.bold.white(
            figlet.textSync('Nxer', { horizontalLayout: 'full', font: 'Doom' })
        )
    );

    let padMe = (text: string) => text.padEnd(10, ' ');

    console.log(chalk.white('Usage: nxer <options>'));
    console.log(chalk.white(''));
    console.log(chalk.white(`\t${padMe('--help')}this is an option to see the available options for the nxer cli\n`));
    console.log(chalk.white(`\t${padMe('--config')}specify the config file you want to run the commands ex: --config file.json or --config myconfig.js\n`));
}

export let handleConfigFile = async (args: Args) => {
    clear();
    let spinnerController = new clui.Spinner('Loading...');
    spinnerController.start();
    let concurrentlyCommandArray: ConcurrentlyCMD[];

    // catching any errors that happen inside that 
    try {
        concurrentlyCommandArray = await configToConcurrentlyAdapter(args.config);
    } catch (err) {
        console.log(chalk.red(err));
    }

    if (concurrentlyCommandArray && concurrentlyCommandArray.length === 0)
        return console.log(chalk.red(`No commands found in your config path given`));

    try {
        spinnerController.stop();
        concurrently(concurrentlyCommandArray);
    } catch (err) {
        console.log(chalk.red(err));
    }
};