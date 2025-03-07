import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../core/services/pokemon/pokemon.service';

@Component({
  selector: 'app-poke-api-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './poke-api-page.component.html',
  styleUrls: ['./poke-api-page.component.css'],
})
export class PokeApiPageComponent {
  private pokeApiService = inject(PokemonService);
  pokemonList = this.pokeApiService.pokemonList;
}
