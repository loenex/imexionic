import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';

@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNotePage {

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private noteListService: NoteListService) {
  }

  ionViewDidLoad() {
    this.note = this.navParams.get('note');
  }

  updateNote(note: Note) {
    this.noteListService.updateNote(note).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

  removeNote(note: Note) {
    this.noteListService.removeNote(note).then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }
}
