import { APIRequestContext, expect } from '@playwright/test';
import { State } from '../types/state.api.types.js';

export class StateAPI {
    private request: APIRequestContext;
    private endpoint: string
    readonly countryId: string;

    constructor(request: APIRequestContext, url: string, countryId: string) {
        this.request = request;
        this.endpoint = url;
        this.countryId = countryId;
    }

    async getStates(): Promise<State[]> {
        const response = await this.request.get(`${this.endpoint}${this.countryId}`);
        expect(response.status()).toBe(200);
        return await response.json();
    }

    async getValidStates(): Promise<State[]> {
        const states = await this.getStates();
        return states.filter((state) => state.id !== 0);
    }

    async getRandomState(): Promise<String> {
        const validStates = await this.getValidStates();

        const randomIndex = Math.floor(Math.random() * validStates.length);
        return String(validStates[randomIndex]?.name);
    }
}