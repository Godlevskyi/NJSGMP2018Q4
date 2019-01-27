import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

export default class DirWatcher extends EventEmitter{
  
  constructor() {
    super();
    this.filesPathsInDirectory = new Map();
  }

  watch(dirPath, delay) {
    fs.stat(dirPath, (error, stats) => {
      if (stats && !stats.isDirectory()) {
        throw new Error(`${dirPath} is not a directory`);
      }
      if (error) {
        throw new Error(`Wrong path ${dirPath}`);
      }
      this.interval = setInterval(() => {
        fs.readdir(dirPath, (error, files) => {
          if (error) {
            throw new Error(`Wrong path ${dirPath}`);
          }
          
          files.forEach((fileName) => {
            const filePath = `${dirPath}${path.sep}${fileName}`;
            
            fs.stat(filePath, (error, stats) => {
              if (error || !stats.isFile()) {
                throw new Error(`${filePath} is not a file`);
              }
              
              this._handleFileAdded(filePath, stats);
              this._handleFileChanged(filePath, stats);
              this._handleFileDeleted(dirPath, files);
            });
          });
        });
      }, delay);
    });
  }

  unWatch() {
    clearInterval(this.interval);
  }

  _handleFileAdded(filePath, stats) {
    if (!this.filesPathsInDirectory.has(filePath)) {
      this.filesPathsInDirectory.set(filePath, stats.size);
      this.emit('dirwatcher:changed', filePath);
    }
  }
  
  _handleFileChanged(filePath, stats) {
    if (this.filesPathsInDirectory.has(filePath) && this.filesPathsInDirectory.get(filePath) !== stats.size) {
      this.filesPathsInDirectory.set(filePath, stats.size);
      this.emit('dirwatcher:changed', filePath);
    }
  }
  
  _handleFileDeleted(path, files) {
    if (this.filesPathsInDirectory.size !== files.length) {
      for(let filePath of this.filesPathsInDirectory.keys()) {
        const fileName = filePath.substring(path.length + 1);
        if (!~files.indexOf(fileName)) {
          this.filesPathsInDirectory.delete(filePath);
        }
      }
    }
  }
}