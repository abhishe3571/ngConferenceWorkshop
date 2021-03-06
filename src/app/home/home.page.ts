import { async } from "@angular/core/testing";
import { ModalComponent } from "./../modal/modal.component";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertController, ModalController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  items = [];
  location;
  photo: string;

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  async takePhoto() {
    const { Camera } = Plugins;
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
    this.photo = image.dataUrl;
  }

  ngOnInit() {
    const { Geolocation } = Plugins;
    Geolocation.getCurrentPosition().then(
      res => console.log(res)
    );
    console.log("onInit fire");
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      message: "Show an alert",
      subHeader: "My subHeader",
      header: "My Header",
      buttons: [
        {
          role: "Cancel",
          text: "Close",
          handler: () => console.log("button clicked"),
        },
      ],
    });

    alert.present();
  }

  async showModal(item) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        item,
      },
    });

    modal.present();
  }

  ionViewDidEnter() {
    this.http
      .get("https://randomuser.me/api/")
      .subscribe((res: any) => (this.items = res.results));
  }
}
