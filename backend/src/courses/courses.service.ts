import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CoursesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Get all published courses
  async getCourses() {
    const { data, error } = await this.supabaseService.client
      .from('courses')
      .select('*')
      .eq('is_published', true);

    if (error) throw error;
    return data;
  }

  // Get course by ID
  async getCourseById(id: string) {
    const { data: course, error: courseError } =
      await this.supabaseService.client
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

    if (courseError) throw courseError;

    const { data: pages } = await this.supabaseService.client
      .from('course_pages')
      .select('*')
      .eq('course_id', id);

    const { data: questions } = await this.supabaseService.client
      .from('questions')
      .select('*, question_options(*)')
      .eq('course_id', id);

    const { data: videos } = await this.supabaseService.client
      .from('videos')
      .select('*')
      .eq('course_id', id)
      .order('page_index');

    return { course, pages, questions, videos };
  }

  // Generate course (TEMP: without AI, safe & stable)
  async generateAICourse(courseTitle: string): Promise<{ course_id: string }> {
    if (!courseTitle || courseTitle.trim() === '') {
      throw new BadRequestException('Invalid course title');
    }

    const { data, error } = await this.supabaseService.client
      .from('courses')
      .insert({
        title: courseTitle,
        subject: 'Generated',
        is_published: true,
      } as any)
      .select('id')
      .single();

    if (error) throw error;

    return {
      course_id: (data as { id: string }).id,
    };
  }
}
