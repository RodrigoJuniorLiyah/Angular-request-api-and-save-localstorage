import { StorageMap } from '@ngx-pwa/local-storage';
import { Component, VERSION } from '@angular/core';
import { ListService } from './app.service';
import { Cep } from './interfaces/models-api';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  data: any = {};

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
      // Define os valores padrão com os dados da API
      const currentStorage = this.storage
        .get('formData')
        .subscribe((data: Cep) => {
          return data ? (this.formData = data) : (this.formData = remoteData);
        });
    });
  }
}
