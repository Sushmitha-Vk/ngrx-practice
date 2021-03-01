import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { CourseActions } from "./action-types";
import { CoursesHttpService } from "./services/courses-http.service";

@Injectable()
export class CoursesEffects {
    constructor(private actions$: Actions, private courseHttpService: CoursesHttpService) {}

    loadCourses$ = createEffect(
        () => this.actions$.pipe(
            ofType(CourseActions.loadAllCourses),
            concatMap(action => this.courseHttpService.findAllCourses()),
            map(courses => CourseActions.allCoursesLoaded({courses}))
        )
    );

    saveCourse$ = createEffect(
        () => this.actions$.pipe(
            ofType(CourseActions.courseUpdated),
            concatMap(action => this.courseHttpService.saveCourse(
                action.update.id,
                action.update.changes
            ))
        ),
        {dispatch: false}
    )
}
