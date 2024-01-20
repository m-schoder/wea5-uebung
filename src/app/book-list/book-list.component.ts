import { Component, EventEmitter, Output } from '@angular/core';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'wea5-book-list',
  templateUrl: './book-list.component.html',
  styles: [
  ]
})
export class BookListComponent {

  books: Book[] = [];

  @Output() showDetailsEvent = new EventEmitter<Book>();

  constructor(private bookStoreService: BookStoreService) {}

  ngOnInit() {
    // this.initBooks();
    // this.books = this.bookStoreService.getAll();
    this.bookStoreService.getAll().subscribe(res => this.books = res);
  }

  showDetails(book: Book) {
    this.showDetailsEvent.emit(book);
  }

}
