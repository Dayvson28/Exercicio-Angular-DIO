import { Component, OnInit } from "@angular/core";
import { Course } from "./course";
import { CourseService } from "./course.services";

@Component({
    templateUrl: './course-list.components.html'
})
export class CourseListComponent implements OnInit {

    filteredCourse: Course[] = [];

    _courses: Course[] = [];

    _filterBy: string;

     constructor(private courseService: CourseService) {}

    ngOnInit(): void {
        this.retrievelAll();
    }

    retrievelAll(): void {
        this.courseService.retrieveAll().subscribe({
            next: courses => {
                this._courses = courses;
                this.filteredCourse = this._courses;
            },
            error: err => console.log('Error', err)
        })
    }

    deleteById(courseId: number): void {
        this.courseService.deleteById(courseId).subscribe({
            next: () => {
                console.log('Delete with success');
                this.retrievelAll();
            },
            error: err => console.log('Error', err)
        })
    }

    set filter(value: string) {
        this._filterBy = value;
        this.filteredCourse = this._courses.filter((course: Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
    }

    get filter() {
        return this._filterBy;
    }

}