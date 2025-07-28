interface IPokemonModal {
    id: number;
    name: string;
    types: string[];
    abilities: string[];
    image: string;
    stats: { name: string; value: number }[];
    description: string;
    moves: string[];
    evolutionChain: number[];
}
