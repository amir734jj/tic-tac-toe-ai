import * as md5 from 'md5';

export function genericHash<T>(instance: T): string {
  return md5(JSON.stringify(instance));
}
