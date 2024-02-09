import { Food , newFood} from "./Food"

export type Recipe = {
    id: number;
    name: string;
    description: string;
    making_method: string;
    Food: Food;
}

export const newRecipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    making_method: '',
    Food: newFood,
}