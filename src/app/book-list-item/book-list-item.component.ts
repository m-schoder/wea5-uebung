import { Component, Input } from '@angular/core';
import { Book } from '../shared/book';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'a.wea5-book-list-item',
  templateUrl: './book-list-item.component.html',
  styles: [
  ]
})
export class BookListItemComponent {

  @Input() book: Book = new Book();

  constructor(private sanitizer: DomSanitizer) { }

  imageUrl() {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.images}/${this.book.picture}`)
  }

}
