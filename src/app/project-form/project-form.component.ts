import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl('Critical'),
      'isActive': new FormControl(null)
    });

    //console.log(this.projectForm);
  }

  submitProject(){
    console.log(this.projectForm.value);
  }

}
