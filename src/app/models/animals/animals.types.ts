export interface AnimalAtributes extends AnimalPayLoad {
    animal_id: number;
}

export interface AnimalPayLoad{
    name: string;
    age: number;
    weight: number;
    image_url?: string | null| undefined;
}