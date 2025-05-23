import { Routes } from '@angular/router';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
    { path: 'pokemon', component: PokemonListComponent }
];
