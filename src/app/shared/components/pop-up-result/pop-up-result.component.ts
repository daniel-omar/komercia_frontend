import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pop-up-result',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './pop-up-result.component.html',
  styleUrls: ['./pop-up-result.component.scss'],
  standalone: true,
})
export class PopUpResultComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit() {
  }
}
