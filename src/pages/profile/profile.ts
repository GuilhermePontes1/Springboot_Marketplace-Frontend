import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage_service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;

  constructor
 (public navCtrl: NavController, 
  public navParams: NavParams,
  public storage: StorageService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser()// se exister localucer, conseguimos localizar
    if (localUser && localUser.email) {
      this.email = localUser.email // provisório
    }
  }

}
