import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-modal.component.html',
  styleUrls: ['./upload-image-modal.component.css']
})
export class UploadImageModalComponent implements OnInit {

 // Inject service
 constructor(private httpClient: HttpClient) { }
 title = 'ImageUploaderFrontEnd';

 public selectedFile:any;
 public event1:any;
 imgURL: any;
 receivedImageData: any;
 base64Data: any;
 convertedImage: any;

 ngOnInit(): void {
 }
 onUpload() {
   const uploadData = new FormData();
   uploadData.append('myFile', this.selectedFile, this.selectedFile.name);


   this.httpClient.post('http://localhost:8080/check/upload', uploadData)
   .subscribe(
                res => {console.log(res);
                        this.receivedImageData = res;
                        this.base64Data = this.receivedImageData.pic;
                        this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
                err => console.log('Error Occured duringng saving: ' + err)
             );


  }
  public  onChange(event:any) {
   console.log(event);
   this.selectedFile = event.target.files[0];

   // Below part is used to display the selected image
   let reader = new FileReader();
   reader.readAsDataURL(event.target.files[0]);
   reader.onload = (event2) => {
     this.imgURL = reader.result;
 };

}
}
