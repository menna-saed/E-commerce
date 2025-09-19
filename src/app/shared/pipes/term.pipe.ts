import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'term'
})
export class TermPipe implements PipeTransform {

  transform(title:string, numberofchar:number ): string {
    return (title.split(' ',numberofchar).join(' '));
  }

}
