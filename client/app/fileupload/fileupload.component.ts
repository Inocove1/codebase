import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FileUploadService } from '../services/fileupload.service';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  fileForm:FormGroup;
  filedetails = new FormControl('', []);
  filetype = new FormControl('', []);
  constructor(private _svc: FileUploadService,private formBuilder: FormBuilder,) {
    this.reset(); // set initial state
  }

  ngOnInit() {

    this.fileForm = this.formBuilder.group({
      filedetails: this.filedetails,    
      filetype:this.filetype
    });
  }
  uploadedFiles = [];
  uploadError;
  currentStatus: number;
  uploadFieldName = 'photos';

  readonly STATUS_INITIAL = 0;
  readonly STATUS_SAVING = 1;
  readonly STATUS_SUCCESS = 2;
  readonly STATUS_FAILED = 3;

 
  filesChange(fieldName: string, fileList: FileList) {
    // handle file changes
    var formData = new FormData();
    
    if (!fileList.length) return;

    // append the files to FormData
    Array
      .from(Array(fileList.length).keys())
      .map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        console.log(fieldName +"   "+ fileList[x]+"    "+ fileList[x].name+"  "+fileList[x].type);
      //  this.fileForm.value.filedetails=(fileList[x]);
      //  this.fileForm.value.filetype=fileList[x].name;
      });
      
    // save it
    this.save(formData);
  }

  reset() {
    this.currentStatus = this.STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;
  }

  save(formData:FormData) {
    // upload data to the server
    this.currentStatus = this.STATUS_SAVING;
   console.log(formData.get('photos'));
   // console.log(formData.value.filedetails.name);
    debugger;
    this._svc.upload(formData) // DEV.filedetails ONLY: delay 1.5s to see the changes
      .subscribe(x => {
        this.uploadedFiles = [].concat(x);
        this.currentStatus = this.STATUS_SUCCESS;
      }, err => {
        this.uploadError = err;
        this.currentStatus = this.STATUS_FAILED;
      })
  }
}