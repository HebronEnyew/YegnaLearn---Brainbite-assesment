import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class VideosService {
  constructor(private supabaseService: SupabaseService) {}

  async addVideo(
    courseId: string,
    title: string,
    url: string,
    description?: string,
    duration?: number,
    pageIndex?: number,
  ) {
    const { data, error } = await this.supabaseService.client
      .from('videos')
      .insert([
        {
          course_id: courseId,
          title,
          url,
          description,
          duration,
          page_index: pageIndex,
        },
      ] as any)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getVideosByCourse(courseId: string) {
    const { data, error } = await this.supabaseService.client
      .from('videos')
      .select('*')
      .eq('course_id', courseId);

    if (error) throw error;
    return data;
  }
}
