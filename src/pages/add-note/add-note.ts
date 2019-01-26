import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
@IonicPage()
@Component({
  selector: 'page-add-note',
  templateUrl: 'add-note.html'
})
export class AddNotePage {

  note: Note = {
    vehicle_registration: '',
    product_id: '',
    serial_id: '',
    image: '',
    date: '',
    tag_id: '',
    weight: '',
    gross_weight: '',
    net_weight: '',
    general_info: ''
  };
imgPreview = 'assets/imgs/blank-avatar.jpg';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private noteListService: NoteListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNotePage');
  }

  addNote(note: Note) {
    this.noteListService.addNote(note).then(ref => {
      this.navCtrl.setRoot('HomePage');
    })
  }

  getPhoto() {
  let options = {
    maximumImagesCount: 1
  };
  this.imagePicker.getPictures(options).then((results) => {
    for (var i = 0; i < results.length; i++) {
        this.imgPreview = results[i];
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.note.image = base64File;
        }, (err) => {
          console.log(err);
        });
    }
  }, (err) => { });
}

}
