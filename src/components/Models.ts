import { ReactNode } from "react"

export interface Food {
    id: number
    name: string
    quantity: number
    unit: string
    expirationDate: Date
    type: string  
}

export interface Recipe {
    id: number
    name: string
    description: string
    image: string
    making_method: string
}

export interface Recipe_Food {
    id: number
    recipe_id: number
    food_id: number
    use_amount: number
}

export interface Recipe_With_Food {
    id: number
    recipe_id: number
    recipe_name: string
    recipe_description: string
    food_id: number
    food_name: string
    use_amount: number
    food_unit: string
    recipe_making_method: string
}

export interface RecipeFood {
    id: number;
    recipe_id: number;
    recipe_name?: string;
    recipe_description?: string;
    food_id: number;
    food_name: string;
    use_amount: number;
    food_unit: string;
    recipe_making_method?: string;
  }

export interface FoodwithExiration {
    id: number;
    food_id: number;
    food_name: string;
    food_quantity: number;
    food_unit: string;
    expirationDate: ReactNode
    formatted_date: string;
    recipe_id: number;
    recipe_name: string;
    use_amount: number;

}
