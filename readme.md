# Nx helper Cli
This is a helper cli which helps get things done fast in a monorepo.
mainly it's used with [nx.dev](http://google.com) tool but has many tools that may benefit anybody working in a monorepo architecture.

[![npm version](https://badge.fury.io/js/nx-helper-cli.svg)](https://badge.fury.io/js/nx-helper-cli)

## Installation

usually this tool is installed globally 

```
npm i -g nx-helper-cli
```

or 

```
yarn global add nx-helper-cli
```

## Usage

first to see all the available commands you just need to type the following command in your terminal

```
nxer --help
```

### run multiple concurrent commands

the use case for this is that you have many microservices and you want to run all of them with just one command so you make the following file assuming it's called 
`mycommands.json`

```
{
	"firstCommand":  {
		"command":  "npm run firstCMD",
		"options":  {
			"color":  "cyan",
			"name":  ""
		}
	},
	"secondCommand":  {
		"command":  "npm run secondCMD",
		"options":  {
			"color":  "cyan",
			"name":  ""
		}
	}
}
```

The json object above is just a way to tell the `nxer` what to run and how to output it 

```
{
	"<command name>":{
		"command": "< (required) the command you want to run>",
		"options": {
			"color": "< (optional) choose from chalk package colors>",
			"name": "< (optional) command output prefix if does not exist the command name above is used>"
		}
	}
}
```
also .ts and .js files are supported and this how they should look like

```
module.exports = {
	"firstCommand":  {
		"command":  "npm run firstCMD",
		"options":  {
			"color":  "cyan",
			"name":  ""
		}
	}
};
```

after your file is ready you just need `nxer` to run the commands you specified

```
nxer --config <file path>

// Example
nxer --config mycommands.json
nxer --config mycommands.ts
nxer --config mycommands.js
```

all your commands are going to run parallel in the same terminal.

Please raise any issues if there is any problem and don't forget to put a star ⭐️  😉 if you like this package.

**Made with  ❤️  to my organization and to the opensource world**. 