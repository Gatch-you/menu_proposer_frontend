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
