import { LocalStorage } from '@ngx-pwa/local-storage';
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

  constructor(private listService: ListService) {
    this.getApi();
  }

  getApi(): void {
    this.listService.getAll().subscribe((objectJson) => {
      this.data = objectJson;
      [this.data].map(
        (item, index) =>
          (this.teste = Object.entries(item).map((e) => e))
      );
    });
  }
}
