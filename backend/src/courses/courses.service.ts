import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CoursesService {
  constructor(private supabaseService: SupabaseService) {}

  async getCourses() {
    const { data, error } = await this.supabaseService.client
      .from('courses')
      .select('*')
      .eq('is_published', true);

    if (error) throw error;
    return data;
  }

  async getCourseById(id: string) {
    const { data: course } = await this.supabaseService.client
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();

    const { data: pages } = await this.supabaseService.client
      .from('course_pages')
      .select('*')
      .eq('course_id', id);

    const { data: questions } = await this.supabaseService.client
      .from('questions')
      .select('*, question_options(*)')
      .eq('course_id', id);

    return { course, pages, questions };
  }
}
