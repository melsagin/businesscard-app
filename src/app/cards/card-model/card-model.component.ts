import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-model',
  templateUrl: './card-model.component.html',
  styleUrls: ['./card-model.component.scss']
})
export class CardModelComponent implements OnInit {

  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModelComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private _snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.cardForm = this.fb.group({
      name: [this.data?.name || '', Validators.maxLength(50)],
      title: [this.data?.title || '', [Validators.required, Validators.maxLength(255)]],
      phone: [this.data?.phone || '', [Validators.required, Validators.maxLength(20)]],
      email: [this.data?.email || '', [Validators.email, Validators.maxLength(50)]],
      address: [this.data?.address || '', Validators.maxLength(255)],
    });
}

addCard(): void {
  this.showSpinner = true;
  this.cardService.addCard(this.cardForm.value)
    .subscribe((res: any) => {
      this.getSuccess(res || 'Kartvizit başarıyla eklendi.');
    }, (err: any) => {
      this.getError(err.message || 'Kartvizit eklenirken bir sorun oluştu');
    });
}

updateCard(): void {
  this.showSpinner = true;
  this.cardService.updateCard(this.cardForm.value, this.data.id)
    .subscribe((res: any) => {
      this.getSuccess(res || 'Kartvizit başarıyla güncellendi.');
    }, (err: any) => {
      this.getError(err.message || 'Kartvizit güncellenirken bir sorun oluştu');
    });
}

deleteCard(): void {
  this.showSpinner = true;
  this.cardService.deleteCard(this.data.id)
    .subscribe((res: any) => {
      this.getSuccess(res || 'Kartvizit başarıyla silindi.');
    }, (err: any) => {
      this.getError(err.message || 'Kartvizit silinirken bir sorun oluştu');
    });
}

  getSuccess(message: string): void {
    this.snackbarService.createSnackbar('success', message);
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message: string): void {
    this.snackbarService.createSnackbar('error', message);
    this.showSpinner = false;
  }


}
