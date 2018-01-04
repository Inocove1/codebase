import * as express from 'express'
import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'
import * as formidable from 'formidable'


export default class FileUploadCtrl{


//upload = multer({ storage: this.storage }).single('file');

profileupload = (req, res) => {
	var uploadedFile = { name: "", path: "", size: 0, type: "", uploadDir: "" };
   var form = new formidable.IncomingForm();
   form.parse(req);
   form.uploadDir = path.join(__dirname, '../../../client/assets/images/profile');
   form.on('file', function (field, file) {
	   uploadedFile.name = file.name;
	   uploadedFile.path = file.path;
	   uploadedFile.size = file.size;
	   uploadedFile.type = file.type;
	   uploadedFile.uploadDir = '/client/assets/images/profile' + uploadedFile.name;
	   fs.rename(uploadedFile.path, path.join(form.uploadDir, file.name));
	   res.json({});
   });
}

fileupload = (req, res) => {
 	var uploadedFile = { name: "", path: "", size: 0, type: "", uploadDir: "" };
	var form = new formidable.IncomingForm();
	form.parse(req);
	form.uploadDir = path.join(__dirname, '../../../client/assets/content');
	form.on('file', function (field, file) {
		uploadedFile.name = file.name;
		uploadedFile.path = file.path;
		uploadedFile.size = file.size;
		uploadedFile.type = file.type;
		uploadedFile.uploadDir = '/client/assets/content' + uploadedFile.name;
        fs.rename(uploadedFile.path, path.join(form.uploadDir, file.name));
        res.json({});
	});
 
  }

}