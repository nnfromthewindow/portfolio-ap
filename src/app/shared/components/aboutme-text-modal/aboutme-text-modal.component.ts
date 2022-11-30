import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Component, NgZone, ViewChild, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';
@Component({
  selector: 'app-aboutme-text-modal',
  templateUrl: './aboutme-text-modal.component.html',
  styleUrls: ['./aboutme-text-modal.component.scss']
})
export class AboutmeTextModalComponent implements OnInit {

  constructor(private _ngZone: NgZone) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
  }

}
