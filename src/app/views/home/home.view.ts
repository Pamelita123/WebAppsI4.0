import { Component, signal } from "@angular/core";  
import { ListComponent } from "@app/components/list/list.component";
import { AnimalAtributes, AnimalPayLoad } from "@app/models/animals/animals.types";
import { getAnimals, addAnimal } from "@app/services/animals/animals.service";
import { FormComponent } from "@app/components/form/form.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.view.html",
  imports:[ListComponent, FormComponent]
})
export class HomeView {

animals = signal<AnimalAtributes[]>([]);
async ngOnInit(): Promise<void> {
  this.animals.set( await getAnimals())

}

async addAnimalFunction(newAnimal: AnimalPayLoad){
  await addAnimal(newAnimal)
  await this.ngOnInit()
}


 
}