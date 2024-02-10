import { Food , newFood} from "./Food"

export type Recipe = {
    id: number;
    name: string;
    description: string;
    making_method: string;
    foods: Food[];
}

export type RecipeFoodRelation = {
    food_id: number;
    use_amount: number;
}

export const newRecipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    making_method: '',
    foods: [newFood],
}