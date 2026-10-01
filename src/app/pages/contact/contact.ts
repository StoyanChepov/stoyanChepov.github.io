import {
  Component,
  inject,
  signal
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ContactService } from '../../core/services/contact';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {

  private readonly contactService =
    inject(ContactService);

  readonly loading = signal(false);

  readonly sent = signal(false);

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2)
      ]
    }),

    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),

    subject: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(5)
      ]
    }),

    message: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10)
      ]
    })
  });

  async submit(): Promise<void> {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    try {

      await this.contactService.sendMessage(
        this.form.getRawValue()
      );

      this.sent.set(true);

      this.form.reset({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } finally {

      this.loading.set(false);

    }
  }
}