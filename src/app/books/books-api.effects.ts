import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, map, exhaustMap, concatMap } from "rxjs/operators";
import { BooksService } from "../shared/services/book.service";
import { BooksPageActions, BooksApiActions } from "./actions";

@Injectable()
export class BooksApiEffects {
  @Effect()
  loadBooks$ = this.actions$.pipe(
    ofType(BooksPageActions.enter),
    exhaustMap(() =>
      this.booksService
        .all()
        .pipe(map(books => BooksApiActions.booksLoaded({ books })))
    )
  );

  @Effect()
  createBook$ = this.actions$.pipe(
    ofType(BooksPageActions.createBook),
    concatMap(action =>
      this.booksService
        .create(action.book)
        .pipe(map(book => BooksApiActions.bookCreated({ book })))
    )
  );

  @Effect()
  updateBook$ = this.actions$.pipe(
    ofType(BooksPageActions.updateBook),
    concatMap(action =>
      this.booksService
        .update(action.bookId, action.changes)
        .pipe(map(book => BooksApiActions.bookUpdated({ book })))
    )
  );

  @Effect()
  deleteBook$ = this.actions$.pipe(
    ofType(BooksPageActions.deleteBook),
    mergeMap(action =>
      this.booksService
        .delete(action.bookId)
        .pipe(map(() => BooksApiActions.bookDeleted({ bookId: action.bookId })))
    )
  );

  constructor(private booksService: BooksService, private actions$: Actions) {}
}
