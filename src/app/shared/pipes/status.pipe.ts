import { Pipe, PipeTransform, NgModule } from '@angular/core';

interface StatusMap {
  [key: string]: string;
}
@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  private statusMap: StatusMap = {
    'ACTIVO': 'status status--active',
    'INACTIVO': 'status status--inactive',
  };

  transform(value: string): string {
    return this.statusMap[value] || '';
  }
}