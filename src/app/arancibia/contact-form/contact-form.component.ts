import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

interface MailChimpResponse {
  result: string;
  msg: string;
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  private mailChimpEndPoint = 'https://gmail.us17.list-manage.com/subscribe/' +
    'post-json?u=79d161c2c6d19193041762737&id=c8e6cca2e8';
  submitted = false;
  error = null;

  formData = new FormGroup({
    firstNameControl: new FormControl('', [
      Validators.required,
    ]),
    lastNameControl: new FormControl('', [
      Validators.required,
    ]),
    dniControl: new FormControl('', [
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    phoneControl: new FormControl('', [
      Validators.required,
    ]),
    emailControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    messageControl: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private http: HttpClient) {
    // Nothing.
  }

  ngOnInit() {
  }

  onSubmit(data) {
    const params = new HttpParams()
      .set('FIRST_NAME', data.firstNameControl)
      .set('LAST_NAME', data.lastNameControl)
      .set('DNI', data.dniControl)
      .set('EMAIL', data.emailControl)
      .set('PHONE', data.phoneControl)
      .set('MESSAGE', data.messageControl)
      .set('b_79d161c2c6d19193041762737_c8e6cca2e8', ''); // hidden input name

    const mailChimpUrl = this.mailChimpEndPoint + '&' + params.toString();

    console.log(mailChimpUrl);

    this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
      if (response.result && response.result !== 'error') {
        this.submitted = true;
      } else {
        this.error = response.msg;
        console.error(this.error);
      }
    }, error => {
      this.error = 'Sorry, an error occurred.';
      console.error(this.error);
    });
  }
}
