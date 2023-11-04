import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransferDataService } from '../transfer-data.service';
import { Clipboard } from '@angular/cdk/clipboard';
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  fileToUpload: File | null = null;
  summary: string | null = null;
  keyPoints: [] | null = null;
  borderColor: boolean = false;
  transcribeProgressBar: boolean = false;
  keyPointProgressBar: boolean = false;

  constructor(private http: HttpClient, private transferService: TransferDataService, private clipboard: Clipboard) {}


  // DRAG FILE SELECT 
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files?.length > 0) {
      this.fileToUpload = files[0];
      this.borderColor = true;
    }
    else{
      this.borderColor = false;
      this.fileToUpload = null;
    }
    this.summary = null;
    this.keyPoints = null;
  }


  // SELECT FILE ON CLICKING AREA
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files?.length > 0) {
      this.fileToUpload = files[0];
      this.borderColor = true;
    }
    else{
      this.borderColor = false;
      this.fileToUpload = null;
    }
    this.summary = null;
    this.keyPoints = null;
  }



  // GENERATE TRANSCIBE TEXT FUNCTION
  generateTranscribeText() {
    if (this.fileToUpload) {
      this.transcribeProgressBar = true;
      const formData = new FormData();
      formData.append('audio', this.fileToUpload);  

      this.transferService.generateTranscribeText(formData).subscribe(
        (response:any) => {
          this.summary = response.transcription;
          this.transcribeProgressBar = false;
          this.fileToUpload = null;
          this.borderColor = false;
        },
        (error:any) => {
          console.error(error);
          this.transcribeProgressBar = false;
          this.fileToUpload = null;
          this.borderColor = false;
        }
      );
    }
  }


  // GENERATE KEY POINTS
  generateKeyPoints(){
      if(this.summary){
        this.keyPointProgressBar = true;
        this.transferService.generateKeyPoint({text: this.summary}).subscribe(
        (response:any) => {
          console.log(response);
          let keyPointParagraph = response.message;
          this.keyPoints = keyPointParagraph.split('\n');
          console.log(this.keyPoints);
          this.keyPointProgressBar = false;
        },
        (error:any) => {
          console.error(error);
          this.keyPointProgressBar = false;
        }
      );
      }
  }


  copyToClipboard(text: string | null): void {
    if(text != null){
      this.clipboard.copy(text);
    }
  }

}
