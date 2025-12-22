import { Controller, Get, Param } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get('course/:courseId')
  async getCourseVideos(@Param('courseId') courseId: string) {
    return this.videosService.getVideosByCourse(courseId);
  }
}
