export function isBetween(value: number, lowVal: number, highVal: number): boolean{
    if(lowVal <= value && value < highVal){
        return true;
    }

    return false;
}