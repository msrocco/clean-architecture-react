import { SetStorage } from '@/data/protocols/cache/set-storage';

export class LocalStorageAdpater implements SetStorage {
  set (key: string, value: any): void {
    localStorage.setItem(key, value)
  }
}
