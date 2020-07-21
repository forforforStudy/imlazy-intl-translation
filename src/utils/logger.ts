import chalk from 'chalk'

const log = console.log

export const infoLogger = (text: string) => log(chalk.green(text))
export const warnningLogger = (text: string) => log(chalk.bold.yellow(text))