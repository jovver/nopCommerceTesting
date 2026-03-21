// api/StateAPI.ts
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

    // Fetch all states from the API
    async getStates(): Promise<State[]> {
        const response = await this.request.get(`${this.endpoint}${this.countryId}`);
        expect(response.status()).toBe(200);
        return await response.json();
    }

    // Get all states excluding the placeholder 'Select state' entry (id: 0)
    async getValidStates(): Promise<State[]> {
        const states = await this.getStates();
        return states.filter((state) => state.id !== 0);
    }

    // Randomly select one state
    async getRandomState(): Promise<String> {
        const validStates = await this.getValidStates();

        const randomIndex = Math.floor(Math.random() * validStates.length);
        return String(validStates[randomIndex]?.name);
    }
}