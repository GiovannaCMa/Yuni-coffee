import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slogan'
})
export class SloganPipe implements PipeTransform {

   transform(value: any): any {
    return null;
  }

}
