import * as path from 'path';
import * as fs from 'fs';

export let getCurrentDirectory = () => {
    return path.basename(process.cwd());
}


export let directoryExists = (filePath: string) => {
    return fs.existsSync(filePath);
}