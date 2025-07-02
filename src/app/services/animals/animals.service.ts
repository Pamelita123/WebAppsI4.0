import { AnimalAtributes, AnimalPayLoad } from "@app/models/animals/animals.types";
import { getAuthHeaders } from "@app/services/auth/auth.service";

const backUrl='http://localhost:4200/api/animals';

export const getAnimals = async () => {
    try {
        const headers = getAuthHeaders();
        const fetchOptions: RequestInit = {
            method: 'GET',
            headers: headers,
        };
        const response = await fetch(backUrl, fetchOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 401) {
            throw new Error('Unauthorized access. Please log in.');
        }
        const animals = await response.json();
        return animals;
    } catch (error) {
        console.error("Error fetching animals:", error);
        throw error;
    }
}

export const addAnimal = async (newAnimal: AnimalPayLoad) : Promise<AnimalAtributes> => {
    try {
        const headers = getAuthHeaders();
        const fetchOptions: RequestInit = {
            method: 'POST',
            headers: headers,
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