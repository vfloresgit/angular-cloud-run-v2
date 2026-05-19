import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface AppConfig {
  environmentName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config?: AppConfig;

  constructor(private http: HttpClient) {}

  async loadConfig() {
    try {
      this.config = await firstValueFrom(this.http.get<AppConfig>('/config.json'));
    } catch (error) {
      console.error('Could not load configuration', error);
      // Provide a default config in case of error
      this.config = { environmentName: 'development (local)' };
    }
  }

  get environmentName(): string {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }
    return this.config.environmentName;
  }
}
