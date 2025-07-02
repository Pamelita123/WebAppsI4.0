import { Component, signal, OnInit } from "@angular/core";  
import { ListComponent } from "@app/components/list/list.component";
import { AnimalAtributes, AnimalPayLoad } from "@app/models/animals/animals.types";
import { getAnimals, addAnimal } from "@app/services/animals/animals.service";
import { FormComponent } from "@app/components/form/form.component";
import { getTokenFromLocalStorage } from '@expressControllers/auth/auth.controller';

@Component({
  selector: "app-home",
  templateUrl: "./home.view.html",
  imports:[ListComponent, FormComponent],
  standalone: true
})
export class HomeView implements OnInit {

  animals = signal<AnimalAtributes[]>([]);

  async ngOnInit(): Promise<void> {
    try {
      this.animals.set(await getAnimals());
    } catch (error) {
      console.error("Error fetching animals:", error);
      // Handle the error appropriately, e.g., show a notification or alert
    }
  }

  async addAnimalFunction(newAnimal: AnimalPayLoad){
    await addAnimal(newAnimal)
    await this.ngOnInit()
  }
}