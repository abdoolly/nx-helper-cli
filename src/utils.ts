import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';
import { CommandJSON, ConcurrentlyCMD, CommandObject } from './intefaces/Args.interface';

export let getCurrentDirectory = () => {
    return path.basename(process.cwd());
}

export let directoryExists = (filePath: string) => {
    return fs.existsSync(filePath);
}

export let getRandomChalkColor = () => {
    let colors = ['green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'];
    return colors[Math.floor(Math.random() * colors.length)];
}

export let configToConcurrentlyAdapter = async (filePath: string): Promise<ConcurrentlyCMD[]> => {
    let extension = filePath.split('.').pop();
    if (extension === 'json') {
        // directly require the file then use it 
        let json = await importModule(filePath);
        return parseToConcurrent(json);
    }

    if (extension === 'js' || extension === 'ts') {
        // remove the extension from the path then require it then use it 
        let mod: CommandJSON = await importModule(filePath);
        return parseToConcurrent(mod);
    }

    // error message that the extension is not a valid extension 
    throw Error('This file extension is not supported only json , js , ts are the supported file extensions');
}

let parseToConcurrent = (module: CommandJSON) => {
    let concurrentlyCmds = [];
    let commandObject = {} as ConcurrentlyCMD;

    // deleting the default value in the object
    delete module['default'];

    for (let [key, commandValue] of Object.entries(module)) {
        commandObject = {
            command: commandValue.command,
            name: getCommandName(commandValue, key),
            prefixColor: getCommandPrefixColor(commandValue)
        }

        concurrentlyCmds.push(commandObject);
    }

    return concurrentlyCmds;
}

let importModule = async (filePath: string) => {
    return await import(`${path.join(process.cwd(), filePath)}`);
}

let getCommandName = (moduleObject: CommandObject, commandName: string) => {
    if (moduleObject.options && moduleObject.options.name)
        return moduleObject.options.name;

    return commandName;
};

let getCommandPrefixColor = (moduleObject: CommandObject) => {
    if (moduleObject.options && moduleObject.options.color)
        return moduleObject.options.color as string;

    return getRandomChalkColor();
};