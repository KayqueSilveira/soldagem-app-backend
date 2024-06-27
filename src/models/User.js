const pool = require('../config');

class User {
  constructor(username, password, name) {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  static async findByUsername(username) {
    const [rows, fields] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  }

  async save() {
    await pool.execute('INSERT INTO users (username, password, name) VALUES (?, ?, ?)', [this.username, this.password, this.name]);
  }

  async update() {
    await pool.execute('UPDATE users SET password = ?, WHERE username = ?', [this.password, this.username]);
  }

  static async delete(username) {
    await pool.execute('DELETE FROM users WHERE username = ?', [username]);
  }
}

module.exports = User;
