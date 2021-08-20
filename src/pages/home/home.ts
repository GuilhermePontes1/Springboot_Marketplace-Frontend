import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

creds : CredenciaisDTO = {
  email: "",
  senha: ""

};

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController, 
    public auth: AuthService) {

  }
  
  ionViewWillEnter() {
   
    this.menu.swipeEnable(false);
   
  }
  ionViewDidLeave() {
   
      this.menu.swipeEnable(true);
    }
  login() {
    this.auth.authenticate(this.creds).subscribe(response => {
      console.log(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },  error => {} )
    
  }
}
