import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(arr:any[] , string:string): any[] {

    // filert بيعمل بfor loop يعدي عليهم واحد واحد ويحط in item

    return arr.filter((item) => item.title.toLowerCase().includes(string.toLowerCase().trim()));
  }

}
