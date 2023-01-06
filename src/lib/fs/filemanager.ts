import fs from 'fs/promises';

type FsOpsInput = {
  fileName: string;
  data: string;
};

type DirOpsInput = {
  dirName: string;
};

type RenameDirOpsInput = {
  oldDirName: string;
  newDirName: string;
};

class FileManager {
  fs: typeof fs;
  dir: string;
  constructor() {
    this.fs = fs;
    this.dir = '__data'; // root dir
  }

  setCWDir(dirPath: string): void {
    this.dir = dirPath;
  }

  getCWPath(fileName: FsOpsInput['fileName']): string {
    return this.dir + '/' + fileName;
  }

  async createFile({ fileName, data }: FsOpsInput): Promise<void> {
    try {
      if (!fileName) return console.log(`CreateFile: error`);
      await this.fs.writeFile(this.getCWPath(fileName), data);
      console.log(`${fileName} has been created`);
    } catch (err) {
      throw err;
    }
  }

  async readFile({
    fileName,
  }: Pick<FsOpsInput, 'fileName'>): Promise<string | void> {
    try {
      if (!fileName) {
        console.log(`ReadFile: error`);
        throw new Error('fileName must be provided');
      }
      const data = await this.fs.readFile(this.getCWPath(fileName), 'utf8');
      console.log('createFile data', data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async updateFile({ fileName, data }: FsOpsInput): Promise<void> {
    try {
      if (!fileName) return console.log(`UpdateFile: error`);
      await this.fs.writeFile(this.getCWPath(fileName), data);
      console.log(`${fileName} has been updated`);
    } catch (err) {
      throw err;
    }
  }

  async deleteFile({ fileName }: Pick<FsOpsInput, 'fileName'>): Promise<void> {
    try {
      if (!fileName) return console.log(`DeleteFile: error`);
      await this.fs.unlink(this.getCWPath(fileName));
      console.log(`${fileName} has been deleted`);
    } catch (err) {
      throw err;
    }
  }

  async createDirectory({ dirName }: DirOpsInput): Promise<void> {
    try {
      if (!dirName) return console.log(`CreateDir: error`);
      await this.fs.mkdir(dirName);
      console.log(`${dirName} has been created`);
    } catch (err) {
      throw err;
    }
  }

  async renameDirectory({
    oldDirName,
    newDirName,
  }: RenameDirOpsInput): Promise<void> {
    try {
      if (!oldDirName || !newDirName) return console.log('RenameDir: error');
      await this.fs.rename(oldDirName, newDirName);
      console.log(`${oldDirName} has been renamed to ${newDirName}`);
    } catch (err) {
      throw err;
    }
  }

  async deleteDirectory({ dirName }: DirOpsInput): Promise<void> {
    try {
      if (!dirName) return console.log(`DeleteDir: error`);
      await this.fs.rmdir(dirName);
      console.log(`${dirName} has been deleted`);
    } catch (err) {
      throw err;
    }
  }

  async listDirectory({
    dirName = this.dir,
  }: // make dirName optional
  Omit<DirOpsInput, 'dirName'> & { dirName?: string }): Promise<void> {
    try {
      if (!dirName) return console.log(`ListDir: error`);
      const files = await this.fs.readdir(dirName);
      console.log(files);
    } catch (err) {
      throw err;
    }
  }
}

export const fsManager = new FileManager();
