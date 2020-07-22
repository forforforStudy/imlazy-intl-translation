"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.warnningLogger = exports.infoLogger = void 0;
var chalk_1 = __importDefault(require("chalk"));
var log = console.log;
exports.infoLogger = function (text) { return log(chalk_1.default.green(text)); };
exports.warnningLogger = function (text) { return log(chalk_1.default.bold.yellow(text)); };
