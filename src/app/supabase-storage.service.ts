import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { File } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class SupabaseStorageService {
  supabaseCliente: SupabaseClient

  constructor(){
    this.supabaseCliente = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY)
  }

  edge = async() => {
    this.supabaseCliente.functions.invoke('publish-location-mqtt')
  }

}
