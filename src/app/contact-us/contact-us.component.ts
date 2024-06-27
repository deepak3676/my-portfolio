import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../enivronments/environment';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  constructor() { }

  public sendEmail(e: Event): void {
    e.preventDefault();

    // Collect the form data
    const templateParams = {
      to_name:'Divyanshu',
      from_name: (document.getElementById('your_name') as HTMLInputElement).value,
      reply_to: (document.getElementById('reply_to') as HTMLInputElement).value,
      message: (document.getElementById('message') as HTMLTextAreaElement).value
    };

    // Send the email using EmailJS
    emailjs.send(environment.emailjs.serviceID, environment.emailjs.templateID, templateParams, environment.emailjs.userID)
      .then((response: EmailJSResponseStatus) => {
        console.log('Email sent successfully:', response.text);
        alert('Message sent successfully!');
        this.resetForm();
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send message. Please try again.');
      });
  }

  private resetForm(): void {
    // Reset the form after successful submission
    (document.getElementById('form') as HTMLFormElement).reset();
  }
}
