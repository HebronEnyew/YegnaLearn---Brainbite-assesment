import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCourses() {
    return this.coursesService.getCourses();
  }
  @Get(':id')
  async getCourse(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }
}
