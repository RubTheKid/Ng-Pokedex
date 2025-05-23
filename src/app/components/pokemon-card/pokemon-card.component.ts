import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
    selector: 'app-pokemon-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pokemon-card.component.html'
})
export class PokemonCardComponent {
    @Input() pokemon!: Pokemon;

    getCardBackground(): { [key: string]: string } {
        return { backgroundColor: this.getCardColor(this.pokemon.types[0].type.name) };
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
            fairy: '#EE99AC'
        };
        return typeColors[type] || '#777777';
    }

    getCardColor(type: string): string {
        const typeColors: { [key: string]: string } = {
            normal: '#C6C6A7',
            fire: '#F5AC78',
            water: '#9DB7F5',
            electric: '#FAE078',
            grass: '#A7DB8D',
            ice: '#BCE6E6',
            fighting: '#D67873',
            poison: '#C183C1',
            ground: '#EBD69D',
            flying: '#C6B7F5',
            psychic: '#FA92B2',
            bug: '#C6D16E',
            rock: '#D1C17D',
            ghost: '#A292BC',
            dragon: '#A27DFA',
            dark: '#A29288',
            steel: '#D1D1E0',
            fairy: '#F4BDC9'
        };
        return typeColors[type] || '#777777';
    }

    getTextColor(): string {
        const type = this.pokemon.types[0].type.name;
        const lightTypes = ['ice', 'electric', 'fairy', 'flying', 'psychic'];
        return lightTypes.includes(type) ? 'text-gray-800' : 'text-white';
    }

    getHP(): number | string {
        const hpStat = this.pokemon.stats.find(s => s.stat.name === 'hp');
        return hpStat ? hpStat.base_stat : '?';
    }

    getTypeIcon(): string | null {
        const type = this.pokemon.types[0].type.name;
        return `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg`;
    }

    getPokedexNumber(): string {
        return this.pokemon.id.toString().padStart(4, '0');
    }

    getHeight(): string {
        return `${(this.pokemon.height / 10).toFixed(1)}m`;
    }

    getWeight(): string {
        return `${(this.pokemon.weight / 10).toFixed(1)}kg`;
    }

    getMoveName(): string {
        return this.pokemon.moves && this.pokemon.moves.length > 0 ? this.pokemon.moves[0].move.name.charAt(0).toUpperCase() + this.pokemon.moves[0].move.name.slice(1) : 'Tackle';
    }

    getMoveDamage(): number {
        // Placeholder
        return 20;
    }

    getFlavorText(): string {
        // Placeholder
        return 'When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.';
    }

    getMovesToShow(): string[] {
        return this.pokemon.moves.slice(0, 2).map(m => m.move.name.charAt(0).toUpperCase() + m.move.name.slice(1));
    }
} 