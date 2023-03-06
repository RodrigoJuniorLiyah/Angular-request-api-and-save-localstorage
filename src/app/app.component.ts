import { StorageMap } from '@ngx-pwa/local-storage';
import { Component, VERSION } from '@angular/core';
import { ListService } from './app.service';
import { Cep } from './interfaces/models-api';

interface States {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  data: any = {};
  states: States[] = [
    { value: 'AC', viewValue: 'AC' },
    { value: 'AL', viewValue: 'AL' },
    { value: 'AP', viewValue: 'AP' },
    { value: 'AM', viewValue: 'AM' },
    { value: 'BA', viewValue: 'BA' },
    { value: 'CE', viewValue: 'CE' },
    { value: 'DF', viewValue: 'DF' },
    { value: 'ES', viewValue: 'ES' },
    { value: 'GO', viewValue: 'GO' },
    { value: 'MA', viewValue: 'MA' },
    { value: 'MT', viewValue: 'MT' },
    { value: 'MS', viewValue: 'MS' },
    { value: 'MG', viewValue: 'MG' },
    { value: 'PA', viewValue: 'PA' },
    { value: 'PB', viewValue: 'PB' },
    { value: 'PR', viewValue: 'PR' },
    { value: 'PE', viewValue: 'PE' },
    { value: 'PI', viewValue: 'PI' },
    { value: 'RJ', viewValue: 'RJ' },
    { value: 'RN', viewValue: 'RN' },
    { value: 'RS', viewValue: 'RS' },
    { value: 'RO', viewValue: 'RO' },
    { value: 'RR', viewValue: 'RR' },
    { value: 'SC', viewValue: 'SC' },
    { value: 'SP', viewValue: 'SP' },
    { value: 'SE', viewValue: 'SE' },
    { value: 'TO', viewValue: 'TO' },
  ];

  localStorageData: Cep = {
    bairro: '',
    cep: '',
    complemento: '',
    ddd: '',
    gia: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };

  formData: Cep = {
    bairro: '',
    cep: '',
    complemento: '',
    ddd: '',
    gia: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };

  isFormValid: string;

  constructor(private listService: ListService, private storage: StorageMap) {
    this.fetchData();
  }

  onSubmit() {
    // Save in local storage
    this.storage.set('formData', this.formData).subscribe(() => {});
    this.storage.get('formData').subscribe((data: Cep) => {
      this.localStorageData = data;
    });

    // View in console
    console.log(this.formData);
    console.log('variável', this.localStorageData);

    //Notifyer
    alert('Formulário salvo com sucesso! 🎉');
  }

  checkFormValidity() {
    this.isFormValid =
      this.formData.bairro &&
      this.formData.cep &&
      this.formData.complemento &&
      this.formData.ddd &&
      this.formData.localidade &&
      this.formData.logradouro &&
      this.formData.uf;
  }

  fetchData(): void {
    this.listService.getAll().subscribe((remoteData) => {
      [remoteData].map(
        (dataEntry, index) =>
          (this.data = Object.entries(dataEntry).map((item: any) => item))
      );
      // Define default value with data of API
      const currentStorage = this.storage
        .get('formData')
        .subscribe((data: Cep) => {
          return data ? (this.formData = data) : (this.formData = remoteData);
        });
    });
  }
}
