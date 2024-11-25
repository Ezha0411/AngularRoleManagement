import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalueNoSorting'
})
export class KeyvalueNoSortingPipe implements PipeTransform {

  transform(value: any): any {
    // if (!value) return value; 
    return Object.entries(value);
  }

} 
