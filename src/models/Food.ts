export type Food = {
    id: number;
    name: string;
    quantity: number;
    unit_id: number;
    unit: FoodUnit;
    expiration_date: Date;
    type_id: number;
    type: FoodType;
    user_id: number;
};

type FoodUnit = {
    id: number;
    unit: string;
};

type FoodType = {
    id: number;
    type: string;
};

export const newFood: Food = {
    id: 0,
    name: '',
    quantity: 0,
    unit_id: 0,
    unit: {id: 0, unit: ''},
    expiration_date: new Date(),
    type_id: 0,
    type: {id: 0, type: ''},
    user_id: 0,
}
