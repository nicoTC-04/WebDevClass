// import { Component, inject, signal } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { PokemonService } from '../../core/services/pokemon/pokemon.service';

// @Component({
//   selector: 'app-poke-api-page',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './poke-api-page.component.html',
//   styleUrls: ['./poke-api-page.component.css'],
// })
// export class PokeApiPageComponent {
//   private pokeApiService = inject(PokemonService);
//   pokemonList = this.pokeApiService.pokemonList;
//   searchQuery = signal('');

//   // Derived filtered list based on searchQuery
//   pokemonListFiltered = () => {
//     const query = this.searchQuery().toLowerCase();
//     return this.pokemonList()?.filter(pokemon => pokemon.name.toLowerCase().startsWith(query)) || [];
//   };
  

//   updateSearchQuery(event: Event) {
//     const target = event.target as HTMLInputElement;
//     this.searchQuery.set(target?.value || '');
//   }  
// }

import { Component, inject, signal } from '@angular/core';
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
  searchQuery = signal('');
  currentPage = signal(1);
  pageSize = 5; // 5 Pokémon per page

  // Filtered list based on search query
  pokemonListFiltered = () => {
    const query = this.searchQuery().toLowerCase();
    return this.pokemonList()?.filter(pokemon => pokemon.name.toLowerCase().startsWith(query)) || [];
  };

  // Paginated list based on current page
  paginatedPokemonList = () => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    return this.pokemonListFiltered().slice(startIndex, startIndex + this.pageSize);
  };

  updateSearchQuery(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target?.value || '');
    this.currentPage.set(1); // Reset to page 1 on new search
  }

  nextPage() {
    if (this.currentPage() * this.pageSize < this.pokemonListFiltered().length) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }
}
