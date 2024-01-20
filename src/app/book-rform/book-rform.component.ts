import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { isbnValidator } from '../shared/isbn-validator.directive';
import { BookRFormErrorMessages } from './book-rform-error-messages';

@Component({
  selector: 'wea5-book-rform',
  templateUrl: './book-rform.component.html',
  styles: [],
})
export class BookRformComponent {
  isUpdatingBook = false;
  myForm!: FormGroup;
  book = new Book();
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bs: BookStoreService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingBook = true;
      this.bs.getBookById(id).subscribe((book) => {
        this.book = book;
        this.initForm();
      });
    }
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({
      title: [this.book.title, Validators.required],
      description: [this.book.description],
      author: [this.book.author],
      year: [this.book.year],
      isbn: [this.book.isbn, [Validators.required, isbnValidator()]],
      price: [this.book.price],
      picture: [this.book.picture],
      publisher: [this.book.publisher],
    });

    this.myForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }

  submitForm() {
    //this.book.author = this.myForm.value.author;
    const book: Book = this.myForm.value;
    book.id = this.book.id;

    if (this.isUpdatingBook) {
      this.bs.update(book).subscribe((_) => {
        this.router.navigate(['../../books', book.id], {
          relativeTo: this.route,
        });
      });
    } else {
      this.bs.save(book).subscribe((_) => {
        this.book = new Book();
        this.initForm();
      });
    }
  }

  updateErrorMessages() {
    this.errors = {};

    for (const message of BookRFormErrorMessages) {
      const control = this.myForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors != null &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
