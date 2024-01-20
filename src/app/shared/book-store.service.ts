import { Injectable } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, retry } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookStoreService {
  books: Book[] = [];

  constructor(private http: HttpClient) {}

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.server}/books`).pipe(
      map<any, Book[]>((res) => res['books']),
      catchError(this.errorHandler)
    );
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<any>(`${environment.server}/book/${id}`).pipe(
      map<any, Book>((res) => res['book']),
      catchError(this.errorHandler)
    );
  }

  save(book: Book): Observable<any> {
    return this.http
      .post<any>(`${environment.server}/save`, book)
      .pipe(catchError(this.errorHandler));
  }

  update(book: Book): Observable<any> {
    return this.http
      .put<any>(`${environment.server}/update`, book)
      .pipe(catchError(this.errorHandler));
  }

  search(searchTerm: String): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${environment.server}/search/${searchTerm}`)
      .pipe(
        retry(3),
        map<any, Book[]>((res) => res['books']),
        catchError(this.errorHandler)
      );
  }

  private initBooks() {
    this.books = [
      new Book(
        '1',
        'Mann Thomas',
        'Die Bekenntnisse des Hochstaplers Felix Krull',
        '9,90',
        'Fischer',
        '2000',
        '...',
        'Die_Bekenntnisse_des_Hochstaplers_Felix_Krull.jpg'
      ),
      new Book(
        '2',
        'Buchberger Bruno',
        'Mathematik, Management, Mediation',
        '22,90',
        'Molden',
        '2016',
        'Mathematik die Kunst des Denkens Management die Kunst des Handelns Meditation die ' +
          'Kunst des Nicht-Denkens und Nicht-Handelns Der vielfach ausgezeichnete Mathematiker, ' +
          'Computerwissenschafts-Pionier und Softwarepark-Gründer Bruno Buchberger kondensiert in ' +
          'diesem Buch seine Gedanken zu diesen zentralen Aspekten seines Lebens. Dafür wählt er ' +
          'nicht die Form einer klassischen Autobiografie, sondern setzt sich mit Fragen auseinander, ' +
          'die ihm in dieser oder ähnlicher Form im Lauf der Jahre in Interviews gestellt wurden. ' +
          'Für Eilige formuliert er die Antworten als kurze, mitunter provokante Schlaglichter. ' +
          'Für Leser, die in die Tiefe gehen wollen, erarbeitet der Autor die Zusammenhänge in ' +
          'umfassenderen Diskursen und Anekdoten. Ein Buch für alle, die denken, handeln und sich ' +
          'manchmal nach dem Nicht-Denken und Nicht-Handeln sehnen.',
        'Mathematik-Management-Meditation.jpg'
      ),
      new Book(
        '3',
        'Erik Brynjolfsson',
        'The Second Machine Age: Work, Progress, and Prosperity in a Time of Brilliant Technologies',
        '99,90',
        'Springer',
        '2000',
        'In The Second Machine Age MIT s Erik Brynjolfsson and Andrew McAfee two thinkers at' +
          ' the forefront of their field reveal the forces driving the reinvention of our lives ' +
          'and our economy. As the full impact of digital technologies is felt, we will realize ' +
          'immense bounty in the form of dazzling personal technology, advanced infrastructure, ' +
          'and near-boundless access to the cultural items that enrich our lives.' +
          'Amid this bounty will also be wrenching change. Professions of all kinds from lawyers ' +
          'to truck drivers will be forever upended. Companies will be forced to transform or die. ' +
          'Recent economic indicators reflect this shift: fewer people are working, and wages are ' +
          'falling even as productivity and profits soar.',
        'The_Second_Machine_Age.jpg'
      ),
      new Book(
        '4',
        'Ford Martin',
        'The Rise of the Robots',
        '9,90',
        'Oneworld Publications',
        '2015',
        "If a 'robot' could do your job quicker than you and better than you for no pay, would " +
          "you still be employed? Today it's travel agents, data-analyst and paralegals whose jobs " +
          'are under threat. Soon it will be doctors, taxi-drivers and, ironically, even computer ' +
          'programmers. Without a radical reassessment of our economic and political structures, we ' +
          'risk the implosion of the capitalist economy itself. In a frightening tour of artificial ' +
          "intelligence's rapid advances, technology expert Martin Ford draws on a wealth of economic" +
          ' data from both the US and the UK to outline the terrifying societal implications of the ' +
          "robots' rise. From health and education to finance and technology, his warning is stark: " +
          'any job that is on some level routine is likely to be automated and if we are to see a ' +
          'future of prosperity rather than catastrophe we must act now.',
        'Rise_of_the_Robots.jpg'
      ),
      new Book(
        '5',
        'Klüpfel Volker und Kobr Michael',
        'Milchgeld. Kommissar Kluftingers erster Fall',
        '9,90',
        'Droemer',
        '2006',
        'Ein Mord in Kommissar Kluftingers beschaulichem Allgäuer Heimatort Altusried – jäh ' +
          'verdirbt diese Nachricht sein gemütliches Kässpatzenessen. Ein Lebensmittelchemiker des ' +
          'örtlichen Milchwerks ist stranguliert worden. Mit eigenwilligen Ermittlungsmethoden ' +
          'riskiert der liebenswert-kantige Kommissar einen Blick hinter die Fassade der Allgäuer ' +
          'Postkartenidylle – und entdeckt einen scheinbar vergessenen Verrat, dunkle Machenschaften ' +
          'und einen handfesten Skandal.',
        'Milchgeld_Kluftingers_erster_Fall.jpg'
      ),
      new Book(
        '6',
        'Klüpfel Volker und Kobr Michael',
        'Entedank. Kommissar Kluftingers zweiter Fall',
        '9,90',
        'Droemer',
        '2007',
        '...',
        'Erntedank_Kluftingers_zweiter_Fall.jpg'
      ),
      new Book(
        '7',
        'Klüpfel Volker und Kobr Michael',
        'Seegrund. Kommissar Kluftingers dritter Fall',
        '9,90',
        'Droemer',
        '2008',
        '...',
        'Seegrund_Kluftingers_dritter_Fall.jpg'
      ),
      new Book(
        '8',
        'Klüpfel Volker und Kobr Michael',
        'Laienspiel. Kommissar Kluftingers vierter Fall',
        '9,90',
        'Droemer',
        '2009',
        '...',
        'Laienspiel_Kluftingers_vierter_Fall.jpg'
      ),
      new Book(
        '9',
        'Klüpfel Volker und Kobr Michael',
        'Rauhnacht. Kommissar Kluftingers fuenfter Fall',
        '9,90',
        'Droemer',
        '2010',
        '...',
        'Rauhnacht_Kluftingers_fünfter_Fall.jpg'
      ),
      new Book(
        '9',
        'Klüpfel Volker und Kobr Michael',
        'Schutzpatron. Kommissar Kluftingers sechster Fall',
        '9,90',
        'Droemer',
        '2011',
        '...',
        'Schutzpatron_Kluftingers_sechster_Fall.jpg'
      ),
      new Book(
        '10',
        'Klüpfel Volker und Kobr Michael',
        'Herzblut. Kommissar Kluftingers siebter Fall',
        '9,90',
        'Droemer',
        '2012',
        '...',
        'Herzblut_Kluftingers_siebter_Fall.jpg'
      ),
      new Book(
        '10',
        'Klüpfel Volker und Kobr Michael',
        'Grimbart. Kommissar Kluftingers achter Fall',
        '9,90',
        'Droemer',
        '2014',
        '...',
        'Grimmbart_Kluftingers_achter_Fall.jpg'
      ),
      new Book(
        '10',
        'Klüpfel Volker und Kobr Michael',
        'Himmelhorn: Kluftingers neuer Fall',
        '9,90',
        'Droemer',
        '2016',
        'Der neunte Fall der Bestseller-Autoren Volker Klüpfel und Michael Kobr führt den Kult-Kommissar Kluftinger ' +
          'in die Allgäuer Alpen, genauer gesagt auf das Himmelhorn, einen der gefährlichsten Berge des Allgäus. ' +
          'Natürlich liebt Klufti die Berge – wenn sie kässpatzenförmig auf seinem Teller aufragen. Doch der neueste ' +
          'Streich von Gesundheitsfetischist Langhammer befördert den Kommissar samt E-Bike tief in die Allgäuer Alpen, ' +
          'wo die beiden prompt auf drei Leichen stoßen: ein bekannter Dokumentarfilmer und zwei einheimische Bergführer, ' +
          'die einen Film über die Erstbesteigung des Himmelhorns drehen wollten. Wie es scheint, waren sie dem als ' +
          'äußerst gefährlich geltenden Gipfel nicht gewachsen. Die Ermittlungen im Umfeld der Toten führt Klufti in ' +
          'sehr abgelegene Alpentäler und zu deren starrköpfigen Bewohnern, die noch wortkarger sind als er. ',
        'Himmelhorn_Kluftingers_ neuer_Fall.jpg'
      ),
    ];
  }
}
