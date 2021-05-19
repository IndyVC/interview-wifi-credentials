import * as NodeCache from "node-cache";

let cache = new NodeCache();

export function store(key, value): boolean {
  return cache.set(key, value);
}

export function fetch(key): any {
  return cache.get(key);
}

export function exists(key): boolean {
  return cache.has(key);
}

export function remove(key): number {
  return cache.del(key);
}
