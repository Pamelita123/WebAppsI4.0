import { AnimalPayLoad , AnimalAtributes} from "@app/api/models/animals/animals.types";
import Animal  from "@sequelize/models/animals.model";

export const getAnimals = async () => {
    try{
        const animals =await Animal.findAll();
        return animals;

    }
    catch(error){
        console.error("Error no se encontraron animales", error);
        throw error;
    }
}

export const addAnimal =async (newAnimal: AnimalPayLoad) : Promise<AnimalAtributes> =>{
    try{
        const animal = await Animal.create(newAnimal as any);
        return animal;
    }
    catch(error){
        console.error("Error al agregar un nuevo animal", error);
        throw error;
    }
}