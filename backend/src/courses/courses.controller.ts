import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Get all published courses
  @Get()
  async getCourses() {
    return this.coursesService.getCourses();
  }

  // Get a single course by ID
  @Get(':id')
  async getCourse(@Param('id') id: string) {
    return this.coursesService.getCourseById(id);
  }

  // Generate course using AI
  @Post('generate')
  async generateCourse(
    @Body() body: { courseTitle: string },
  ): Promise<{ course_id: string }> {
    const { courseTitle } = body;

    if (!courseTitle || courseTitle.trim() === '') {
      throw new BadRequestException('Missing courseTitle');
    }

    const result = await this.coursesService.generateAICourse(courseTitle);

    if (!result || !result.course_id) {
      throw new BadRequestException('Course generation failed');
    }

    return {
      course_id: result.course_id,
    };
  }
}
