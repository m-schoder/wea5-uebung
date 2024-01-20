export class Book {
    constructor(
      public id?: string,
      public author?: string,
      public title?: string,
      public price?: string,
      public publisher?: string,
      public year?: string,
      public description?: string,
      public picture?: string,
      public isbn?: string
    ) {
      console.log(id);
    }
  }
