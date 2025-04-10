import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  pokemonList = signal<Pokemon[]>([]);

  constructor() {
    this.fetchFirstPokemon();
  }

  fetchFirstPokemon() {
    this.http.get<{ results: { name: string; url: string }[] }>(
      'https://pokeapi.co/api/v2/pokemon?limit=40'
    ).subscribe(response => {
      const requests = response.results.map((p, index) =>
        this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${index + 1}`)
      );

      Promise.all(requests.map(req => req.toPromise())).then(data => {
        const formattedPokemon = data.map(p => ({
          id: p.id,
          name: p.name,
          sprite: p.sprites.front_default,
        }));
        this.pokemonList.set(formattedPokemon);
      });
    });
  }
}