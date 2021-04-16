interface IStorageEngine  {

    addItem(item:Product):void;
    getCount():number;
    getItem(index:number):Product;
   
}

class ScalesStorageEngineArray implements IStorageEngine {

    productsArray:Product[];

    constructor() {
        this.productsArray=[];
    }
    
    addItem(item:Product):void {
        this.productsArray.push(item);
    }

    getItem(index:number):Product {
        return this.productsArray[index];
    }

    getCount():number {
        return this.productsArray.length;
    }
    
}

class ScalesStorageEngineLocalStorage implements IStorageEngine {

    LSkey:string='productsarr';
    
    addItem(item:Product):void {
        if (localStorage.getItem(this.LSkey)) {
            let newItemarr:any[]=JSON.parse(localStorage.getItem(this.LSkey));
            newItemarr.push(item);
            localStorage.setItem(this.LSkey, JSON.stringify(newItemarr));
        }
        else {
            let newItemarr:Product[]=[];
            newItemarr.push(item);
            localStorage.setItem(this.LSkey, JSON.stringify(newItemarr));
        }
    }

    getItem(index:number):Product {
            let newItemarr:any[]=JSON.parse(localStorage.getItem(this.LSkey));
            let parsedProd:Product=new Product (newItemarr[index].name, newItemarr[index].weight);
            return parsedProd;
    }

    getCount():number {
            let newItemarr:any[]=JSON.parse(localStorage.getItem(this.LSkey));
            return newItemarr.length;
    }
    
}

class Scales<StorageEngine extends IStorageEngine> {

    storageengine:StorageEngine;

    constructor(_storageengine:StorageEngine) {
        this.storageengine=_storageengine;
    }

    add(item:Product):void {
        this.storageengine.addItem(item);
    }

    getSumScale():number { 
        let count:number=0;
        for (let i=0; i<this.storageengine.getCount(); i++) {
            count+=this.storageengine.getItem(i).getScale();
        }
        return count;
    }

    getNameList ():Array<string> { 
        let namelist:Array<string>=[];
        for (let i=0; i<this.storageengine.getCount(); i++) {
            namelist.push(this.storageengine.getItem(i).getName());
        };
        return namelist;
    }
};

class Product {
    private name:string;
    private weight:number;

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



var myApple_antonovka:Product=new Product('Антоновка', 20);
var myApple_krimskoe:Product=new Product('Крымское', 7.3);

var myTomato_vityaz:Product=new Product('Витязь', 14);
var myTomato_koenigsberg:Product=new Product('Кенигсберг', 3);

var newscalesSEA:ScalesStorageEngineArray = new ScalesStorageEngineArray();
var scales_01=new Scales<ScalesStorageEngineArray>(newscalesSEA);

scales_01.add(myApple_antonovka);
scales_01.add(myApple_krimskoe);
scales_01.add(myTomato_vityaz);
scales_01.add(myTomato_koenigsberg);


console.log(scales_01.getSumScale());
console.log(scales_01.getNameList());


var newscalesSELS:ScalesStorageEngineLocalStorage = new ScalesStorageEngineLocalStorage();
var scales_02=new Scales<ScalesStorageEngineLocalStorage>(newscalesSELS);


localStorage.removeItem('productsarr');
scales_02.add(myApple_antonovka);
scales_02.add(myApple_krimskoe);
scales_02.add(myTomato_vityaz);
scales_02.add(myTomato_koenigsberg);


console.log(scales_02.getSumScale());
console.log(scales_02.getNameList());
//gt