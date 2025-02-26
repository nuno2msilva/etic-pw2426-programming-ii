import fs from 'fs';

export class PasswordManager {
  #configPath = '.pw-config.json';
  #defaults = { length: 12, uppercase: false, numbers: false };

  constructor() {
    if (!fs.existsSync(this.#configPath)) {
      fs.writeFileSync(this.#configPath, JSON.stringify(this.#defaults, null, 2));
    }
  }

  get config() {
    return JSON.parse(fs.readFileSync(this.#configPath));
  }

  #updateFile(settings) {
    fs.writeFileSync(this.#configPath, JSON.stringify(settings, null, 2));
  }

  updateConfig(newSettings) {
    const clean = Object.fromEntries(
      Object.entries(newSettings).filter(([k]) => k in this.#defaults)
    );
    this.#updateFile({ ...this.config, ...clean });
  }

  generatePassword({ length, uppercase, numbers }) {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) chars += '0123456789';
    return Array.from({ length }, () => chars[~~(Math.random() * chars.length)]).join('');
  }
}