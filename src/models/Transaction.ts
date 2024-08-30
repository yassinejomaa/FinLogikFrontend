export interface Transaction{
    id:string,
    actif:string,
    TypeTransaction:string ,
    quantuite:number,
    date:Date ,
    prixTotal:Float64Array,
    limitBuy:boolean,
    limitBuyPrice:Float64Array ,
    userID:string,
    buyOrsell:string, 
    porteFeuilleID:number,
}