import  Router  from 'express';
import { Request, Response } from 'express';
import { getAnimals, addAnimal } from '@expressControllers/animal/animals.controller';
import { authMiddleware } from '../../middleware/auth/auth.middleware';

const router = Router();
router.get('/animals', authMiddleware ,async (_ : Request, res : Response): Promise<void> => {
    try {
        const animals = await getAnimals();
        res.status(200).json(animals);
        return;
    } catch (error) {
        console.error("Error fetching animals:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }

})

router.post('/animals', authMiddleware ,async (req: Request, res: Response): Promise<void> => {
    try {
        const newAnimal = req.body;
        const animal = await addAnimal(newAnimal);
        res.status(201).json(animal);
        return;
    } catch (error) {
        console.error("Error agregar animal:", error);
        res.status(500).json({ error: "error interno" });
        return;
    }
});

export default router;
