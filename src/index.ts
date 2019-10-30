#!/usr/bin/env node
import chalk from 'chalk';
import minimist from 'minimist';
import { getCommandType } from './argsHelpers';
import { handleConfigFile, helpHandler } from './handlers';
import { Args } from './intefaces/Args.interface';

let args = minimist<Args>(process.argv.slice(2));

let handleAll = async (args: Args) => {
    switch (getCommandType(args)) {
        case 'help':
            helpHandler(args);
            break;
        case 'config':
            handleConfigFile(args);
            break;
        default:
            console.log(chalk.red(`This command is not available check the help guide below`));
            helpHandler(args);
            break;
    }
};

handleAll(args);



