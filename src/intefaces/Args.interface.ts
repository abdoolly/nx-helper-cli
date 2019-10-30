export interface Args {
    help: boolean;
    config: string;
}

export interface CommandJSON {
    [key: string]: CommandObject;
}

export interface CommandObject {
    command: string;
    options: {
        color?: 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray' | String,
        name?: string;
    }
}

// { command: 'npm run koko', name: 'KOKO MAN 1', prefixColor: 'yellow' },
export interface ConcurrentlyCMD {
    command: string;
    name?: string;
    prefixColor?: string;
}