import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Note } from '../../model/note/note.model';
import { NoteListService } from '../../services/note-list.service';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
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
  loading: any;
  imgPreview = 'assets/imgs/blank-avatar.jpg';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private noteListService: NoteListService,
    public loadingCtrl: LoadingController,
    private file: File,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private fileOpener: FileOpener) {
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

//  async presentLoading(msg) {
//  const loading = await this.loadingCtrl.create({
    //message: msg
//  });
//  return await loading.present();
//}

exportPdf() {
  //this.presentLoading('Creating PDF file...');
  const div = document.getElementById("printable-area");
  const options = { background: "white", height: div.clientWidth, width: div.clientHeight };
  domtoimage.toPng(div, options).then((dataUrl)=> {
    //Initialize JSPDF
    var doc = new jsPDF("p","mm","a4");
    //Add image Url to PDF
    doc.addImage(dataUrl, 'PNG', 20, 20, 240, 180);

    let pdfOutput = doc.output();
    // using ArrayBuffer will allow you to put image inside PDF
    let buffer = new ArrayBuffer(pdfOutput.length);
    let array = new Uint8Array(buffer);
    for (var i = 0; i < pdfOutput.length; i++) {
        array[i] = pdfOutput.charCodeAt(i);
    }


    //This is where the PDF file will stored , you can change it as you like
    // for more information please visit https://ionicframework.com/docs/native/file/
    const directory = this.file.dataDirectory ;
    const fileName = "invoice.pdf";
    let options: IWriteOptions = { replace: true };

    this.file.checkFile(directory, fileName).then((success)=> {
      //Writing File to Device
      this.file.writeFile(directory,fileName,buffer, options)
      .then((success)=> {
        this.loading.dismiss();
        console.log("File created Succesfully" + JSON.stringify(success));
        this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
      })
      .catch((error)=> {
        this.loading.dismiss();
        console.log("Cannot Create File " +JSON.stringify(error));
      });
    })
    .catch((error)=> {
      //Writing File to Device
      this.file.writeFile(directory,fileName,buffer)
      .then((success)=> {
        this.loading.dismiss();
        console.log("File created Succesfully" + JSON.stringify(success));
        this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file', e));
      })
      .catch((error)=> {
        this.loading.dismiss();
        console.log("Cannot Create File " +JSON.stringify(error));
      });
    });
  })
  .catch(function (error) {
    this.loading.dismiss();
    console.error('oops, something went wrong!', error);
  });
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
