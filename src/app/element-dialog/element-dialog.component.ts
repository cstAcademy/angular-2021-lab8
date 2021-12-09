import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css'],
})
export class ElementDialogComponent implements OnInit {
  chemicalForm!: FormGroup;
  isOnEdit: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isOnEdit = this.data ? true : false;
    this.chemicalForm = this.fb.group({
      position: [this.data?.position, Validators.required],
      name: [
        this.data?.name,
        {
          validators: Validators.minLength(3),
          updateOn: 'blur',
        },
      ],

      weight: [
        this.data?.weight,
        {
          validators: [Validators.compose([Validators.required])],
          updateOn: 'blur',
        },
      ],

      symbol: [this.data?.symbol],
    });
  }

  onAdd() {}

  onCancel(): void {
    this.dialogRef.close();
  }

  get name() {
    return this.chemicalForm.get('name');
  }

  get weight() {
    return this.chemicalForm.get('weight');
  }
}
