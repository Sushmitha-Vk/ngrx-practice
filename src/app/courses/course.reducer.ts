import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "./action-types";
import { compareCourses, Course } from "./model/course";

export interface CourseState extends EntityState<Course> {
    allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});

export const initialState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const courseReducer = createReducer(
    initialState,
    on(CourseActions.allCoursesLoaded,
        (state, action) => adapter.addAll(action.courses, 
            {...state, allCoursesLoaded: true})
    ),
    on(CourseActions.courseUpdated, 
        (state, action) => adapter.updateOne(
            action.update, state)
    )
)

export const { selectAll } = adapter.getSelectors();