export interface IPokemonList {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[];
}
export interface IPokemon {
  name: string;
  url: string;
}
export interface PokemonCard {
  name: string;
  id: number;
  weight: number;
  height: number;
  types: string;
  sprite: string;
  description: string;
}
