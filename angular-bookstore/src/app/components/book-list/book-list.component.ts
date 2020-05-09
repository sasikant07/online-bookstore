import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/common/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  currenCategoryId: number;

  constructor(private _bookService: BookService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    })
  }

  listBooks() {
    
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    
    if(hasCategoryId){
      this.currenCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    } else {
      this.currenCategoryId = 1;
    }

    this._bookService.getBooks(this.currenCategoryId).subscribe(
      data => this.books = data
    )
  }
}
