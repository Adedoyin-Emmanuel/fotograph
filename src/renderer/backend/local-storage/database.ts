/**
 * Base Class For localstorage  DB custom library
 **/

class Database {
  get(key: string): string {
    let data = localStorage.getItem(key);

    return data != null ? data : 'undefined';
  }

  create(key: string, value: string): void {
    key == undefined || value == undefined
      ? console.warn('cannot create db item, key or value not specified')
      : localStorage.setItem(key, value);
  }

  update(key: string, value: string): void {
    this.create(key, value);
  }
  delete(key: string): void {
    this.update(key, 'NULL');
  }
  destroy(): void {
    localStorage.clear();
  }
}

export default Database;
