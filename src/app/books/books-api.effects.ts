import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, map } from "rxjs/operators";
import { BooksService } from "../shared/services/book.service";
import { BooksPageActions, BooksApiActions } from "./actions";

@Injectable()
export class BooksApiEffects {
  @Effect()
  loadBooks$ = this.actions$.pipe(
    ofType(BooksPageActions.enter),
    mergeMap(() =>
      this.booksService
        .all()
        .pipe(map(books => BooksApiActions.booksLoaded({ books })))
    )
  );

  constructor(private booksService: BooksService, private actions$: Actions) {}
}
