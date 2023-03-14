const config = require("../../config");
export class LoadTemplate {
  constructor() {}
  private loaderFile = async (templateFileName: string) => {
    const fs = require("fs").promises;
    let filePath = __dirname.replace("utils", "templates");
    filePath = `${filePath}\\${templateFileName}`;
    const htmlTemp = await fs.readFile(filePath, "utf8");
    return htmlTemp;
  };
  public getTemplate = async (templateFileName: string) => {
    return await this.loaderFile(templateFileName);
  };
}
