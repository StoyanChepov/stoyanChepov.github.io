import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ContactForm } from '../models/contact-form';

@Service()
export class ContactService {
  private readonly http = inject(HttpClient);

  private readonly endpoint =
    environment.formspreeEndpoint;

  async sendMessage(form: ContactForm): Promise<void> {
    await firstValueFrom(
      this.http.post(
        this.endpoint,
        form,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )
    );
  }
}