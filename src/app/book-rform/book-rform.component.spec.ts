import { ComponentFixture, TestBed, async, waitForAsync } from '@angular/core/testing';

import { BookRformComponent } from './book-rform.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { By } from '@angular/platform-browser';
import { Book } from '../shared/book';

describe('BookRformComponent', () => {
  let component: BookRformComponent;
  let fixture: ComponentFixture<BookRformComponent>;

  const expectedBooks = [
    new Book("1", "Test Author", "Test Title", "10.0", "Test Publisher", "2017", "Test abstract", ""),
    new Book("2", "Test Author 2", "Test Title 2", "10.0", "Test Publisher 2", "2017", "Test abstract 2", "")
  ];

  let bookStoreStub;

  let activatedRouteStub;

  let submitEl: any;
  let titleEl: any;

  beforeEach(waitForAsync(() => {
    activatedRouteStub = {
      get snapshot() {
        return { params: { id : "1"} };
      }
    }
    
    bookStoreStub = {
      getAll: () => of(expectedBooks),
      getBookById: () => of(expectedBooks[0])
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ BookRformComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [FormBuilder, {
        provide: ActivatedRoute,
        useValue: activatedRouteStub
      }, {
        provide: BookStoreService,
        useValue: bookStoreStub
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitEl = fixture.debugElement.query(By.css('button'));
    titleEl = fixture.debugElement.query(By.css('input[name=title]'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should activate save button if book is available', () => {
    fixture.whenStable().then(() => {
      titleEl.nativeElement.value = '';
      fixture.detectChanges();
      expect(submitEl.nativeElement.disabled).toBeTruthy();
    });
  });
});
