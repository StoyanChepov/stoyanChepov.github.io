import { Service } from '@angular/core';

import { ContactForm } from '../models/contact-form';

@Service()
export class ContactService {

  async sendMessage(
    form: ContactForm
  ): Promise<void> {

    console.log('Sending message:', form);

    await new Promise(resolve =>
      setTimeout(resolve, 1500)
    );
  }
}