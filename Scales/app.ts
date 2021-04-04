class Product {

    name:string;
    weight:number;

    constructor(_name:string, _weight:number) {
        this.name=_name; 
        this.weight=_weight; 
    }

    getName():string {
        return this.name;
    }

    getScale():number {
        return this.weight;
    }
};


class Scales {

    productsArray:Array<Product>;

    constructor() {
        this.productsArray=[];
    }

    add(_newProd:Product):void {
        this.productsArray.push(_newProd);
    }

    getSumScale():number { 
        let totalweight:number=this.productsArray.reduce( (acc, obj) => {return acc+obj.getScale();}, 0);
        return totalweight;
    }

    getNameList ():Array<string> { 
        let namelist:Array<string>=[];
        this.productsArray.forEach(v => { namelist.push(v.getName());});
        return namelist;
    }
};

class Apple extends Product {  };
class Tomato extends Product {  };
class Orange extends Product {  };

var myApple_antonovka:Apple=new Apple('Антоновка', 20);
var myApple_krimskoe:Apple=new Apple('Крымское', 7.3);

var myTomato_vityaz:Tomato=new Tomato('Витязь', 14);
var myTomato_koenigsberg:Tomato=new Tomato('Кенигсберг', 3);

var myOrange_sanguinello:Orange=new Orange('Сангвинелло', 58);
var myOrange_tarocco:Orange=new Orange('Тарокко', 5);

var scales_0404:Scales=new Scales;

scales_0404.add(myApple_antonovka);
scales_0404.add(myApple_krimskoe);
scales_0404.add(myTomato_vityaz);
scales_0404.add(myTomato_koenigsberg);
scales_0404.add(myOrange_sanguinello);
scales_0404.add(myOrange_tarocco);


console.log(scales_0404.getSumScale());
console.log(scales_0404.getNameList());