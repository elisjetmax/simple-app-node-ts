"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadTemplate = void 0;
const config = require("../../config");
class LoadTemplate {
    constructor() {
        this.loaderFile = (templateFileName) => __awaiter(this, void 0, void 0, function* () {
            const fs = require("fs").promises;
            let filePath = __dirname.replace("utils", "templates");
            filePath = `${filePath}\\${templateFileName}`;
            const htmlTemp = yield fs.readFile(filePath, "utf8");
            return htmlTemp;
        });
        this.getTemplate = (templateFileName) => __awaiter(this, void 0, void 0, function* () {
            return yield this.loaderFile(templateFileName);
        });
    }
}
exports.LoadTemplate = LoadTemplate;
