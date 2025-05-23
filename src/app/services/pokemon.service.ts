import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private baseUrl = 'https://pokeapi.co/api/v2';

    constructor(private http: HttpClient) { }

    getPokemon(id: number): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${id}`);
    }

    getPokemonList(limit: number = 20, offset: number = 0): Observable<{
        count: number;
        next: string | null;
        previous: string | null;
        results: Array<{ name: string; url: string }>;
    }> {
        return this.http.get<{
            count: number;
            next: string | null;
            previous: string | null;
            results: Array<{ name: string; url: string }>;
        }>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
    }

    getPokemonByName(name: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${name.toLowerCase()}`);
    }
} 