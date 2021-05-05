import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, sName: string,maxp: string,minp: string,dis: string): any {
    let comp:number = 0;
    let compmin: number = 0;
    let maxprice: number = Number.MAX_SAFE_INTEGER;
    let minprice: number = 0;
    let discount: number = 0;
    console.log(comp);
    let maxlen = maxp.length;
    
    if(sName=="" && maxp=="" && minp=="" && dis==""){
      return value;
    }

    if (maxp != "" && maxp[maxlen-1]!='+') {
      maxprice = parseInt(maxp);
    }

    if (minp != "") {
      minprice = parseInt(minp);
    }

    if(sName.length!=0){
      comp = parseInt(sName[0]);
    }

    if(dis!=""){
      discount = parseInt(dis.substring(0,2));
    }

    console.log(comp);

    const prodArray: any[]=[];
    for(let i=0;i<value.length;i++)
    {
      let prodRat:any=value[i].productRating;
      let prodPrice:any=value[i].productSalePrice;
      let prodDis:any = value[i].productDiscount;
      if(prodRat>=comp && prodPrice<=maxprice && prodPrice>=minprice && prodDis>=discount)
      {
        prodArray.push(value[i]);
      }
    }
    return prodArray;
  }

}
