import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-header.component.html',
  styles: [`
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 3s linear infinite;
    }
    input::-webkit-search-decoration,
    input::-webkit-search-cancel-button,
    input::-webkit-search-results-button,
    input::-webkit-search-results-decoration {
      display: none;
    }
  `]
})
export class PokemonHeaderComponent {
  searchTerm: string = '';
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onClear() {
    this.searchTerm = '';
    this.clear.emit();
  }
}
