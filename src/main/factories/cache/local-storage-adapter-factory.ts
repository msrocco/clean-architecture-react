import { SetStorage } from '@/data/protocols/cache'
import { LocalStorageAdpater } from '@/infra/cache/local-storage-adapter'

export const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdpater()
}
