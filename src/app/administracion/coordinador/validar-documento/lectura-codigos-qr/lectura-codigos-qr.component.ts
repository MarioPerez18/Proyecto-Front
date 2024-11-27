import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jsQR, { QRCode } from 'jsqr';
import { DialogoComponent } from './dialogo/dialogo.component'; 

@Component({
  selector: 'app-lectura-codigos-qr',
  templateUrl: './lectura-codigos-qr.component.html',
  styleUrls: ['./lectura-codigos-qr.component.css']
})
export class LecturaCodigosQrComponent {
  @Output() enviar_qr = new EventEmitter<string>();
  @ViewChild('video', { static: true }) videoElm!: ElementRef;
  @ViewChild('canvas', { static: true }) canvasElm!: ElementRef;

  videoStart = false;
  medias: MediaStreamConstraints = {
    audio: false,
    video: false,
  };

  constructor(public dialog: MatDialog) {}

  toggleVideoMedia() {
    this.videoStart ? this.stopVideo() : this.startVideo();
  }

  startVideo() {
    this.medias.video = true;
    navigator.mediaDevices.getUserMedia(this.medias).then(
      (localStream: MediaStream) => {
        this.videoElm.nativeElement.srcObject = localStream;
        this.videoStart = true;
        this.checkImage();
      }
    ).catch(error => {
      console.error(error);
      this.videoStart = false;
    });
  }

  stopVideo() {
    this.medias.video = false;
    const tracks = this.videoElm.nativeElement.srcObject.getVideoTracks();
    if (tracks.length > 0) {
      tracks[0].stop();
    }
    this.videoElm.nativeElement.srcObject = null;
    this.videoStart = false;
  }

  checkImage() {
    const WIDTH = this.videoElm.nativeElement.clientWidth;
    const HEIGHT = this.videoElm.nativeElement.clientHeight;
    this.canvasElm.nativeElement.width = WIDTH;
    this.canvasElm.nativeElement.height = HEIGHT;

    const ctx = this.canvasElm.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    ctx.drawImage(this.videoElm.nativeElement, 0, 0, WIDTH, HEIGHT);
    const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });

    if (code) {
      this.openDialog(code);
      this.enviar_qr.emit(code["data"]);
    } else {
      setTimeout(() => this.checkImage(), 100);
    }
  }

  openDialog(code: QRCode): void {
    const dialogRef = this.dialog.open(DialogoComponent, {
      width: '360px',
      data: { qrcode: code }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.checkImage();
    });
  }

}
