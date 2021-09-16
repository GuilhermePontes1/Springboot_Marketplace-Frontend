import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage_service';


@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items: EnderecoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public storage:StorageService,
    public clienteService: ClienteService ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser()// se exister localuser, conseguimos localizar e inicar a classe
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {this.items = response['enderecos']; 
    }, 
        error => {
          if(error.status == 403) {
            this.navCtrl.setRoot('HomePage')
          }

        }) 
       
    }
    else {
      this.navCtrl.setRoot('HomePage')
    }
  }

}