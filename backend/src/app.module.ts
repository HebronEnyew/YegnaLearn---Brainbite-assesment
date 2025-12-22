import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseService } from './supabase/supabase.service';
import { CoursesModule } from './courses/courses.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CoursesModule],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
