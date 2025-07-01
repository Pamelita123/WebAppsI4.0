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
  isAuthenticated = false;

  async ngOnInit(): Promise<void> {
    const token = getTokenFromLocalStorage();
    this.isAuthenticated = !!token;

    if (this.isAuthenticated) {
      this.animals.set(await getAnimals());
    } else {
      this.animals.set([]); // Vacía la lista si no hay token
    }
  }

  async addAnimalFunction(newAnimal: AnimalPayLoad){
    await addAnimal(newAnimal)
    await this.ngOnInit()
  }
}