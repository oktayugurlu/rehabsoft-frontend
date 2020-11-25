import {Component, Input} from "@angular/core";
import {Exercise} from "../../../../models/exercise/exercise";
import {ExerciseService} from "../../../../shared/services/exercise.service";
import notify from "devextreme/ui/notify";
import {ExerciseImage} from "../../../../models/exercise/exerciseimage";
import {ExerciseVideo} from "../../../../models/exercise/exercisevideo";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-createexercise-component',
  templateUrl: 'doctor-createexercise.component.html',
  styleUrls: ['./doctor-createexercise.component.scss']
})

export class DoctorCreateExerciseComponent{

  @Input()
  isVisible: boolean;

  @Input()
  popupContent: any;

  // Buton options
  yeniButtonOptions = {
    text: 'Ekle',
    icon: 'plus',
    onClick: () => {
      // this.createItem(null);
    }
  };

  allowedPageSizesArray =  [5, 10, 15, 25, 50];
  dataSource: Exercise[];


  constructor(private exerciseService: ExerciseService ) {

    exerciseService.getAll().subscribe(
      (data)=>{
        this.dataSource = data;
      },
      (error)=>{
        notify(error);
      }
    );
  }


  editIconClick = (e: any) => {
    // const tahmingiriszamaniDate = new Date(e.row.data.params.tahmingiriszamani);
    // console.log('editlenen data:', e.row.data.params.tahmingiriszamani);
    // this.popupContent = {
    //   'id' : e.row.data._id,
    //   // "TenantId" : e.row.data.TenantId,
    //   'sayacid' : e.row.data.sayacid,
    //   'sayacadi': e.row.data.sayacadi,  // new
    //   'etsokodu' : e.row.data.etsokodu,
    //   'aboneno': e.row.data.aboneno, // new
    //   'adres': e.row.data.adres, // new
    //   'firma' : e.row.data.firma,
    //   'm2mfirma' : e.row.data.m2mfirma,
    //   'm2msayackodu' : e.row.data.m2msayackodu,
    //   'okumatipi': e.row.data.okumatipi, // new
    //   'dagitimbolgesi': e.row.data.dagitimbolgesi,
    //   // "abonegrubu": e.row.data.abonegrubu,
    //   'talepkalemi': e.row.data.talepkalemi,
    //   'faturaparams' : e.row.data.faturaparams,
    //   'tenzil': e.row.data.tenzil,
    //   'tenzilsayac': e.row.data.tenzilsayac,
    //   'tenzilfatura': e.row.data.tenzilfatura,
    //   'grupfatura': e.row.data.grupfatura,
    //   'sayacgrubu': e.row.data.sayacgrubu,
    //   'grupfaturasayaci': e.row.data.grupfaturasayaci,
    //   'sanalsayac' : e.row.data.sanalsayac,
    //   'otomatikmahsup': e.row.data.otomatikmahsup,
    //   'params': e.row.data.params,
    //   'kayittarihi': e.row.data.kayittarihi,
    //   'aktif': e.row.data.aktif,
    //   'pasiftarihi': e.row.data.pasiftarihi,
    //   'il': e.row.data.il,
    //   'ilce': e.row.data.ilce,
    //   'belediye': e.row.data.belediye,
    //   'abonetipi': e.row.data.abonetipi,
    //   'aboneislemtipi': e.row.data.aboneislemtipi,
    //   'mulktckimlik': e.row.data.mulktckimlik,
    //   'mulkvergino': e.row.data.mulkvergino,
    //   'mulkadi': e.row.data.mulkadi,
    //   'mulksoyadi': e.row.data.mulksoyadi,
    //   'daskno': e.row.data.daskno,
    //   'ulusaladresno': e.row.data.ulusaladresno,
    //   'distributionid': e.row.data.distributionid,
    //   'subscriberprofilegroup': e.row.data.subscriberprofilegroup,
    //   'deleted' : false
    // };
    // if ( this.popupContent.params === undefined) {
    //   this.createParamFieldForPopUpObject();
    //
    // } else {
    //   const tmpDate = new Date(this.popupContent.params.tahmingiriszamani);
    //   this.popupContent['selectedHours'] = tmpDate.getHours();
    //   this.popupContent['selectedMinute'] = tmpDate.getMinutes();
    //   this.popupContent.params = {tahmingiriszamani: tmpDate, tahmingiriskontrol: this.popupContent.params.tahmingiriskontrol};
    // }
    //
    // if (this.popupContent.kayittarihi === undefined) {
    //   this.popupContent.kayittarihi = new Date();
    // } else {
    //   const day    = this.popupContent.kayittarihi.substr(8, 2);
    //   const month  = this.popupContent.kayittarihi.substr(5, 2);
    //   const year   = this.popupContent.kayittarihi.substr(0, 4);
    //   this.popupContent.kayittarihi = new Date(year + '-' + month + '-' + day);
    // }
    //
    // if (this.popupContent.il !== null) {
    //   this.handleChangeIl();
    // }
    // if (this.popupContent.ilce !== null) {
    //   this.handleChangeIlce();
    // }
    // if (this.popupContent.distributionid !== null) {
    //   this.handleChangeDistributor();
    // }
    //
    // this.showModal();
    // this.validationControl();
  }

}
