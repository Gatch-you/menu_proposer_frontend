import { Food , newFood} from "./Food"

export type Recipe = {
    id: number;
    name: string;
    description: string;
    making_method: string;
    use_amount: number;
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
    use_amount: 0.0,
    foods: [newFood],
}