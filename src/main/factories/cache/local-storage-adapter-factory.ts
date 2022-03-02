import { LocalStorageAdpater } from '@/infra/cache/local-storage-adapter'

export const makeLocalStorageAdapter = (): LocalStorageAdpater => {
  return new LocalStorageAdpater()
}
