import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-loader',
  imports: [
    CommonModule
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  protected readonly loaderService = inject(LoaderService);
}
