import { Component, OnInit, Input } from '@angular/core';
import { ICategory } from 'src/app/interfaces/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: ICategory;
  constructor() { }

  ngOnInit() {
  }

}
