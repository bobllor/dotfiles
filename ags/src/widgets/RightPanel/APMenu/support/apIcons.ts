/** Returns a map of icons for the wifi. */
function mapIcons(isOpenFlag: boolean = false): Map<number, string>{
    const icons: string = isOpenFlag ? "󰤨 |󰤥 |󰤢 |󰤟 |󰤯 " : "󰤪 |󰤧 |󰤤 |󰤡 |󰤯 ";

    const iconsArr: string[] = icons.split("|");
    const map: Map<number, string> = new Map();

    // 0 - 100 to 80 ; 1 - 79 to 60 ; 2 - 59 to 30 ; 3 - 29 to 1 ; 4 - 0 or none
    for(let i = 0; i < iconsArr.length; i++){
        map.set(i, iconsArr[i]);
    }

    return map;
}

export const openWifi: Map<number, string> = mapIcons(true);
export const secureWifi: Map<number, string> = mapIcons();