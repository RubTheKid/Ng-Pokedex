import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { MoveDetails } from '../../interfaces/move-details.interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-modal.component.html',
  styleUrl: './pokemon-modal.component.scss'
})
export class PokemonModalComponent implements OnChanges {
  @Input() pokemon: Pokemon | null = null;
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  moveDetails: MoveDetails[] = [];
  isLoadingMoves = false;

  constructor(private pokemonService: PokemonService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon'] && this.pokemon) {
      this.loadMoveDetails();
    }
  }

  close(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  private loadMoveDetails(): void {
    if (!this.pokemon?.moves?.length) return;

    this.isLoadingMoves = true;
    const moveNames = this.pokemon.moves.slice(0, 4).map(move => move.move.name);

    this.pokemonService.getMultipleMoveDetails(moveNames).subscribe({
      next: (details) => {
        this.moveDetails = details;
        this.isLoadingMoves = false;
      },
      error: (error) => {
        console.error('Error loading move details:', error);
        this.isLoadingMoves = false;
      }
    });
  }

  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
    };
    return typeColors[type] || '#68A090';
  }

  formatStatName(statName: string): string {
    const statNames: { [key: string]: string } = {
      'hp': 'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      'speed': 'Speed'
    };
    return statNames[statName] || statName;
  }

  formatAbilityName(abilityName: string): string {
    return abilityName.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
}
