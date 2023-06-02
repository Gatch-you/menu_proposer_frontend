export interface Food {
    id: number
    name: string
    quantity: number
    unit: string
    expiration_date: Date
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
    recipe_number: number
    food_number: number
    use_amount: number
}
