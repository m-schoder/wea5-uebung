export class ErrorMessage {
    constructor(
      public forControl: string,
      public forValidator: string,
      public text: string
    ) { }
  }
  
export const BookFormErrorMessages = [
    new ErrorMessage('title', 'required', 'Ein Buchtitel muss angegeben werden'),
    new ErrorMessage('id', 'required', 'Es muss eine ID angegeben werden'),
    new ErrorMessage('id', 'minlength', 'Die ID  muss mindestens 2 Zeichen enthalten'),
    new ErrorMessage('id', 'maxlength', 'Eine ID darf höchstens 8 Zeichen haben'),
    new ErrorMessage('year', 'required', 'Es muss ein Erscheinungsjahr angegeben werden'),
    new ErrorMessage('author', 'required', 'Es muss ein Autor angegeben werden'),
    new ErrorMessage('isbn', 'required', 'Es muss eine ISBN angegeben werden'),
    new ErrorMessage('isbn', 'wea5IsbnValidator', 'Die ISBN ist in einem ungültigen Format')
];  