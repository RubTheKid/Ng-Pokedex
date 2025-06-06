export interface MoveDetails {
    id: number;
    name: string;
    power: number | null;
    accuracy: number | null;
    pp: number;
    type: {
        name: string;
        url: string;
    };
}