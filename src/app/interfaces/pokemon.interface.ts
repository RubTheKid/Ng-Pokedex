export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Array<{
        is_hidden: boolean;
        slot: number;
        ability: {
            name: string;
            url: string;
        };
    }>;
    forms: Array<{
        name: string;
        url: string;
    }>;
    game_indices: Array<{
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }>;
    location_area_encounters: string;
    moves: Array<{
        move: {
            name: string;
            url: string;
        };
    }>;
    species: {
        name: string;
        url: string;
    };
    sprites: {
        front_default: string;
        front_female: string | null;
        other: {
            dream_world: {
                front_default: string;
                front_female: string | null;
            };
            home: {
                front_default: string;
                front_female: string | null;
                front_shiny: string;
                front_shiny_female: string | null;
            };
            'official-artwork': {
                front_default: string;
                front_shiny: string;
            };
        };
    };
    stats: Array<{
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }>;
    types: Array<{
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }>;
} 