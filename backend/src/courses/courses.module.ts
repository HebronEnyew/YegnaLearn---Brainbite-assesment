import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { SupabaseModule } from '../supabase/supabase.module'; // Make sure this exists

@Module({
  imports: [SupabaseModule], // so CoursesService can inject SupabaseService
  controllers: [CoursesController],
  providers: [CoursesService], // CoursesService must be here
  exports: [CoursesService], // optional, if other modules use it
})
export class CoursesModule {}
