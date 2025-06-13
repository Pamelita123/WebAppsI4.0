import { Component, OnInit } from '@angular/core';
import { MainCardComponent } from '../../layout/cards/mainCard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tabla-productos',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  standalone: true,
  imports: [MainCardComponent, CommonModule],
})
export class TablaProductosComponent implements OnInit {
  productos: any[] = [];

  ngOnInit() {
    fetch('products.json')
      .then(res => res.json())
      .then(data => this.productos = data);
  }
}