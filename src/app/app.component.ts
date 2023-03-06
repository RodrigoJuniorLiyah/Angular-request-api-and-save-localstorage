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
  data: Cep = {
    bairro: '',
    cep: '',
    complemento: '',
    ddd: '',
    gia: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };

  teste = [];

  constructor(private listService: ListService, private storage: StorageMap) {
    this.getApi();
    this.handleSave();
  }

  handleSave() {
    let user = { firstName: 'Henri', lastName: 'Bergson' };

    this.storage.set('user', user).subscribe(() => {});
  }

  getApi(): void {
    this.listService.getAll().subscribe((objectJson) => {
      this.data = objectJson;
      [this.data].map(
        (item, index) => (this.teste = Object.entries(item).map((e) => e))
      );
    });
  }
}
