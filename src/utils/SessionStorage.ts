export class SessionStorage {
  static get = <T>(key: string): T => JSON.parse(sessionStorage.getItem(key));

  static set = (key: string, value) => sessionStorage.setItem(key, JSON.stringify(value));
}
