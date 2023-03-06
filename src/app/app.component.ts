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

  data: any = [];
  // formData: any = {};

  constructor(private listService: ListService, private storage: StorageMap) {
    this.fetchData();
    this.handleSave();
  }

  handleSave() {
    let user = { firstName: 'Henri', lastName: 'Bergson' };

    this.storage.set('user', user).subscribe(() => {});
  }

  onSubmit() {
    // Salvar no local storage
    /*  this.localStorage.setItem('formData', JSON.stringify(this.formData)).subscribe(() => {
      console.log('Dados do formulário salvos com sucesso no LocalStorage');
    }); */

    // Mostrar no console
    console.log(this.formData);
  }

  fetchData(): void {
    this.listService.getAll().subscribe((remoteData) => {
      [remoteData].map(
        (dataEntry, index) =>
          (this.data = Object.entries(dataEntry).map((item: any) => item))
      );
    });
  }
}
