import { v4 as uuidv4 } from 'uuid';

export class CredentialGenerator {

    static randomUserName(): string {
        const prefix = 'testuser';
        const randomSuffix = Date.now();
        return `${prefix}_${randomSuffix}`;
    }

    static randomPassword(len: number): string {
        const randomUUIDpw = uuidv4().replaceAll('-', '').slice(0, len - 1);
        return randomUUIDpw;
    }

    static randomEmail(userName: string): string {
        const suffix = '@test.com';
        return `${userName}${suffix}`;
    }

    static randomGender(): string {
        return Math.random() < 0.5 ? 'Male' : 'Female';
    }

    static randomPWLength(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default CredentialGenerator;