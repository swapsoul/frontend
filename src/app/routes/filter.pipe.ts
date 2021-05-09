import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, maxp: string[]): any {
    //let comp:number = 0;
    //let compmin: number = 0;
    let maxprice: number = Number.MAX_SAFE_INTEGER;
    let minprice: number = 0;
    let left: number;
    let right: number = Number.MAX_SAFE_INTEGER;
    //let discount: number = 0;
    //let maxlen = maxp.length;
    
    if(maxp.length==0){
      return value;
    }

    const prodArray: any[] = [];

    for(let range of maxp)
    {
      if(range[range.length-1]!='+'){
      left = parseInt(range.substr(0,range.indexOf('-')));
      right = parseInt(range.substr(range.indexOf('-')+1,range.length-1));
      }
      else{
        left = parseInt(range.substr(0,range.indexOf('+')));
        right = Number.MAX_SAFE_INTEGER;
      }
      for(let i=0;i<value.length;i++)
      {
        let prodPrice: any = value[i].productSalePrice;
        if (prodPrice >= left && prodPrice <= right) {
          prodArray.push(value[i]);
        }
      }
    }
    return prodArray;


    /*if (minp != "") {
      minprice = parseInt(minp);
    }

    if(sName.length!=0){
      comp = parseInt(sName[0]);
    }

    if(dis!=""){
      discount = parseInt(dis.substring(0,2));
    }

    console.log(comp);

    
    for(let i=0;i<value.length;i++)
    {
      //let prodRat:any=value[i].productRating;
      let prodPrice:any=value[i].productSalePrice;
      //let prodDis:any = value[i].productDiscount;
      if(prodPrice<=maxprice)
      {
        prodArray.push(value[i]);
      }
    }
    return prodArray;*/
  }

}
