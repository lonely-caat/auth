import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SECRET_KEY = 'verysecret'; // move  this to gh secrets or something
const USERS_FILE = path.join(__dirname, '../users.json');


export class RegisterRepository {

    async readUsersFromFile() {
        const fileContents = await fs.readFile(USERS_FILE, 'utf-8');
        return JSON.parse(fileContents);
    };

    async writeUsersToFile(users) {
        const fileContents = JSON.stringify(users);

        await fs.writeFile(USERS_FILE, fileContents);
    }

    async getAllUsers() {
        return await this.readUsersFromFile();
    }

    async getUser(username) {
        const users = await this.readUsersFromFile();
        return users[username];
    }
    async addUser(username, password) {
        const users = await this.readUsersFromFile();

        users.push({ username: username, password: password });
        console.log(username, password, users, 'add user !!! repository');

        await this.writeUsersToFile(users);
    }
     generateToken(username) {
        const token = jwt.sign({ username: username }, SECRET_KEY, {
            expiresIn: '1h'
        });
        return token;
    }

     verifyToken(token) {
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            return decoded;
        } catch (err) {
            throw new Error('Invalid token');
        }
    }
}
