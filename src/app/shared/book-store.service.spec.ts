import { TestBed, inject } from '@angular/core/testing';

import { BookStoreService } from './book-store.service';
import { Book } from './book';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('BookStoreService', () => {
  const expectedBooks = [
    new Book("1", "Test Author", "Test Title", "10.0", "Test Publisher", "2017", "Test abstract", ""),
    new Book("2", "Test Author 2", "Test Title 2", "10.0", "Test Publisher 2", "2017", "Test abstract 2", "")
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        BookStoreService
      ]
    });
  });

  it('should be created', inject([BookStoreService], (service: BookStoreService) => {
    expect(service).toBeTruthy();
  }));

  it('should GET a list of all books', inject([BookStoreService, HttpTestingController], (service: BookStoreService, backend: HttpTestingController) => {
    service.getAll().subscribe(res => {
      expect(res).toBeTruthy();
      
      expect(res[0].id).toBe("1");
      expect(res[1].id).toBe("2");
    });

    backend.expectOne(`${environment.server}/books`).flush({ books: expectedBooks });
  }));
});