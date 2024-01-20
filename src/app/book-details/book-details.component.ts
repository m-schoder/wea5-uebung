import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../shared/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'wea5-book-details',
  templateUrl: './book-details.component.html',
  styles: [],
})
export class BookDetailsComponent {
  @Input() book: Book = new Book();
  @Output() showListEvent = new EventEmitter<any>();

  constructor(
    private route: ActivatedRoute,
    private bookStoreService: BookStoreService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    // this.book = this.bookStoreService.getBookById(params['id']);
    this.bookStoreService
      .getBookById(params['id'])
      .subscribe((res) => (this.book = res));
  }

  imageUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `${environment.images}/${this.book.picture}`
    );
  }

  showBookList() {
    this.router.navigateByUrl('/books');
    //  this.showListEvent.emit();
  }

  addToShoppingCart() {
    const data = localStorage.getItem('WEA5.shoppingCart') || '[]';
    const items = JSON.parse(data);
    items.push(this.book.id);
    localStorage.setItem('WEA5.shoppingCart', JSON.stringify(items));
  }
}
