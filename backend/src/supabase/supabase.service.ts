import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DB } from './db.types';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient<DB>;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables!');
    }

    this.supabase = createClient<DB>(supabaseUrl, supabaseKey);
  }

  get client() {
    return this.supabase;
  }
}
