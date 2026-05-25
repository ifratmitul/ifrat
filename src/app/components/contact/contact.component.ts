import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';
  statusMessage = '';

  // Web3Forms access key
  private readonly WEB3FORMS_KEY = '78adcb5b-adca-46c1-a2d5-1a6e417e4ad2';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      // Honeypot field - should remain empty (bots will fill it)
      honeypot: ['']
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    // Check honeypot - if filled, it's likely a bot
    if (this.contactForm.value.honeypot) {
      console.log('Bot detected');
      return;
    }

    if (this.contactForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = 'idle';

    const formData = {
      access_key: this.WEB3FORMS_KEY,
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
      subject: 'New Contact Form Submission - Portfolio'
    };

    this.http.post('https://api.web3forms.com/submit', formData)
      .subscribe({
        next: (response: any) => {
          this.isSubmitting = false;
          if (response.success) {
            this.submitStatus = 'success';
            this.statusMessage = 'Thank you! Your message has been sent successfully.';
            this.contactForm.reset();
          } else {
            this.submitStatus = 'error';
            this.statusMessage = 'Something went wrong. Please try again.';
          }
        },
        error: () => {
          this.isSubmitting = false;
          this.submitStatus = 'error';
          this.statusMessage = 'Failed to send message. Please try again later.';
        }
      });
  }
}
