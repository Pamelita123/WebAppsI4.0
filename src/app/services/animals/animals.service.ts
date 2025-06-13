import { AnimalAtributes, AnimalPayLoad } from "@app/models/animals/animals.types";

const backUrl='http://localhost:4200/api/animals';

export const getAnimals = async () => {
    try {
        const response = await fetch(backUrl);
        const animals = await response.json();
        return animals;
    } catch (error) {
        console.error("Error fetching animals:", error);
        throw error;
    }
}

export const addAnimal = async (newAnimal: AnimalPayLoad) : Promise<AnimalAtributes> => {
    try {
        const fetchOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAnimal),
        }; 
        const response = await fetch(backUrl, fetchOptions);
        const animals = await response.json();
        return animals;

    } catch (error) {
        console.error("Error al anadir animal:", error);
        throw error;
    }
}