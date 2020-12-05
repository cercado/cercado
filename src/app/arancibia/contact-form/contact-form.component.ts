import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { invalid } from '@angular/compiler/src/render3/view/util';

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
  private static ID: number = 0;

  @Input() title : String;

  private id : number;
  private mailChimpEndPoint = 'https://gmail.us17.list-manage.com/subscribe/' +
    'post-json?u=79d161c2c6d19193041762737&id=c8e6cca2e8';
  private stepIndex = 0;
  submitted = false;
  displayValidation = false;
  error = null;

  formData = new FormGroup({
    firstNameControl: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastNameControl: new FormControl('', [
      Validators.required,
    ]),
    dniControl: new FormControl('', [
      Validators.required,
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
    ]),
    wantsInstallmentsControl: new FormControl(false, [
      Validators.required,
    ]),
    downPaymentControl: new FormControl(30000, [
      Validators.required,
    ]),
    bankCreditControl: new FormControl(30000, [
      Validators.required,
    ]),
  });

  constructor(private http: HttpClient) {
    // Nothing.
  }

  ngOnInit() {
    this.id = ++ContactFormComponent.ID;
  }

  rollStep(delta: number) {
    if (!this.validateForm()) {
      return;
    }
    this.stepIndex += delta;
  }

  validateForm() {
    if (this.formData.invalid) {
      this.displayValidation = true;
      return false;
    }
    return true;
  }

  onSubmit(data) {
    if (!this.validateForm()) {
      return false;
    }

    let params = new HttpParams()
      .set('FIRST_NAME', data.firstNameControl)
      .set('LAST_NAME', data.lastNameControl)
      .set('DNI', data.dniControl)
      .set('EMAIL', data.emailControl)
      .set('PHONE', data.phoneControl)
      .set('MESSAGE', data.messageControl);
    if (data.wantsInstallmentsControl) {
      params = params.set('DOWN_PAY', data.downPaymentControl);
      params = params.set('BANK_CRED', data.bankCreditControl);
    }
    // hidden input name
    params = params.set('b_79d161c2c6d19193041762737_c8e6cca2e8', '');

    const mailChimpUrl = this.mailChimpEndPoint + '&' + params.toString();

    this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c').subscribe(response => {
      if (response.result && response.result !== 'error') {
        this.error = null;
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
