class StorageUtil {
  #storage: Storage;

  constructor(storageType: Storage = sessionStorage) {
    this.#storage = storageType;
  }

  getStorageLength(): number {
    return this.#storage.length;
  }

  saveToStorage(key: string, value: string | object) {
    this.#storage.setItem(key, JSON.stringify(value));
  }

  getFromStorage<T>(key: string): T | null {
    const value = this.#storage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  removeFromStorage(key: string) {
    this.#storage.removeItem(key);
  }
}

export default StorageUtil;
