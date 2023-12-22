import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

}
