import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCourses from './course.reducer';

export const selectCourseState = createFeatureSelector<fromCourses.CourseState>('courses');

export const selectAllCourses = createSelector(
    selectCourseState,
    fromCourses.selectAll
);

export const selectBeginnersCourse = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'BEGINNER')
);

export const selectAdvancedCourse = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category == 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo).length
);

export const areCoursesLoaded = createSelector(
    selectCourseState,
    state => state.allCoursesLoaded
);
