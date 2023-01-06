import fs from 'fs/promises';

type FsOps = {
  fileName: string;
  fileContent: string;
};

class FileManager {
  fs: typeof fs;
  constructor() {
    this.fs = fs;
  }

  async createFile({ fileName, fileContent }: FsOps) {
    try {
      await this.fs.writeFile(fileName, fileContent);
      console.log(`${fileName} has been created`);
    } catch (err) {
      throw err;
    }
  }

  async readFile({ fileName }: Pick<FsOps, 'fileName'>) {
    try {
      const data = await this.fs.readFile(fileName, 'utf8');
      console.log(data);
    } catch (err) {
      throw err;
    }
  }

  async updateFile({ fileName, fileContent }: FsOps) {
    try {
      await this.fs.writeFile(fileName, fileContent);
      console.log(`${fileName} has been updated`);
    } catch (err) {
      throw err;
    }
  }

  async deleteFile({ fileName }: Pick<FsOps, 'fileName'>) {
    try {
      await this.fs.unlink(fileName);
      console.log(`${fileName} has been deleted`);
    } catch (err) {
      throw err;
    }
  }

  async createDirectory({ dirName }: { dirName: string }) {
    try {
      await this.fs.mkdir(dirName);
      console.log(`${dirName} has been created`);
    } catch (err) {
      throw err;
    }
  }

  async renameDirectory({
    oldDirName,
    newDirName,
  }: {
    oldDirName: string;
    newDirName: string;
  }) {
    try {
      await this.fs.rename(oldDirName, newDirName);
      console.log(`${oldDirName} has been renamed to ${newDirName}`);
    } catch (err) {
      throw err;
    }
  }

  async deleteDirectory({ dirName }: { dirName: string }) {
    try {
      await this.fs.rmdir(dirName);
      console.log(`${dirName} has been deleted`);
    } catch (err) {
      throw err;
    }
  }

  async listDirectory({ dirName }: { dirName: string }) {
    try {
      const files = await this.fs.readdir(dirName);
      console.log(files);
    } catch (err) {
      throw err;
    }
  }
}

export default FileManager;
