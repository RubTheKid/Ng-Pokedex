import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { FormsModule } from '@angular/forms';
import { PokemonHeaderComponent } from "../../components/pokemon-header/pokemon-header.component";
import { PokemonModalComponent } from "../../components/pokemon-modal/pokemon-modal.component";
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, PokemonCardComponent, FormsModule, PokemonHeaderComponent, PokemonModalComponent],
  templateUrl: './pokemon-list.component.html'
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  offset = 0;
  limit = 20;
  hasNextPage = false;
  hasPreviousPage = false;
  searchTerm: string = '';

  // Modal state
  selectedPokemon: Pokemon | null = null;
  isModalOpen = false;

  constructor(private pokemonService: PokemonService) { }

  private extractIdFromUrl(url: string): number | null {
    const matches = url.match(/\/pokemon\/(\d+)\//);
    return matches ? parseInt(matches[1], 10) : null;
  }

  loadPokemons() {
    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe(response => {
      this.hasNextPage = !!response.next;
      this.hasPreviousPage = !!response.previous;

      const pokemonRequests: Observable<Pokemon>[] = response.results
        .map(pokemon => {
          const id = this.extractIdFromUrl(pokemon.url);
          return id ? this.pokemonService.getPokemon(id) : null;
        })
        .filter((request): request is Observable<Pokemon> => request !== null);

      forkJoin(pokemonRequests).subscribe(pokemonDetails => {
        this.pokemons = pokemonDetails;
      });
    });
  }

  ngOnInit() {
    this.loadPokemons();
  }

  nextPage() {
    this.offset += this.limit;
    this.pokemons = [];
    this.loadPokemons();
  }

  previousPage() {
    this.offset = Math.max(0, this.offset - this.limit);
    this.pokemons = [];
    this.loadPokemons();
  }

  searchPokemon() {
    if (!this.searchTerm.trim()) {
      this.offset = 0;
      this.pokemons = [];
      this.loadPokemons();
      return;
    }
    this.pokemonService.getPokemonByName(this.searchTerm.trim().toLowerCase()).subscribe({
      next: (pokemon) => {
        this.pokemons = [pokemon];
        this.hasNextPage = false;
        this.hasPreviousPage = false;
      },
      error: () => {
        this.pokemons = [];
        this.hasNextPage = false;
        this.hasPreviousPage = false;
      }
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.offset = 0;
    this.pokemons = [];
    this.loadPokemons();
  }

  onPokemonCardClick(pokemon: Pokemon): void {
    this.selectedPokemon = pokemon;
    this.isModalOpen = true;
  }

  onModalClose(): void {
    this.isModalOpen = false;
    this.selectedPokemon = null;
  }

} 