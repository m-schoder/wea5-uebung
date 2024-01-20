import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { BookFormErrorMessages } from './book-form-error-messages';

@Component({
  selector: 'wea5-book-form',
  templateUrl: './book-form.component.html',
  styles: [],
})
export class BookFormComponent {
  @ViewChild('myForm', { static: true }) myForm!: NgForm;
  book = new Book();
  errors: { [key: string]: string } = {};

  constructor(private bs: BookStoreService) {}

  submitForm() {
    // this.book.title = this.myForm.value.title;
    this.bs.save(this.book).subscribe((_) => {
      this.book = new Book();
      this.myForm.reset(this.book);
    });
  }

  ngOnInit() {
    this.myForm.statusChanges?.subscribe(() => this.updateErrorMessages());
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of BookFormErrorMessages) {
      const control = this.myForm.form.get(message.forControl) || {
        dirty: false,
        invalid: false,
        errors: [],
      };

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
