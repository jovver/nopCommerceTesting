import { v4 as uuidv4 } from 'uuid';

export function randomUserName() : string{
    const prefix = 'testuser';
    const randomSuffix = uuidv4().replaceAll('-', '');
    return `${prefix}_${randomSuffix}`;
}

export function randomPassword(len: number) : string {
    const randomUUIDpw = uuidv4().replaceAll('-', '').slice(0, len-1);
    return randomUUIDpw;
}

export function randomEmail(userName: string) : string {
    const suffix = '@test.com';
    return `${userName}${suffix}`;
}

export function randomGender(): string {
    return Math.random() < 0.5 ? 'Male' : 'Female';
}

export function randomPWLength(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}