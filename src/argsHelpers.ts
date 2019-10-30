import { Args } from "./intefaces/Args.interface"

export let isHelp = (args: Args) => {
    if (args.help)
        return true;

    return false;
}
export let getCommandType = (args: Args) => {
    if (args.help) {
        return 'help';
    }

    if (args.config) {
        return 'config';
    }
};