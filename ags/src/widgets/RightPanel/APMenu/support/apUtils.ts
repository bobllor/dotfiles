import { exec, execAsync } from "astal"
import { currentSSID, apPassword, selectedAP } from "../../support/panelVars";
import { isBetween } from "../../support/panelUtils";
import { notifySend } from "../../../../../globals/utils";
import { openWifi, secureWifi } from "./apIcons";

/** Disconnects from the current wifi. */
export async function disconnectFromWifi(): Promise<void>{
    const netStat = await execAsync('nmcli n con');
    const SSID = currentSSID.get();

    if(netStat != 'none' && SSID.toLowerCase() != 'none'){
        await execAsync(`nmcli con down "${SSID}"`);
        selectedAP.set('');
        // TODO: temporary, will make a new notification with astal
        notifySend(`Disconnected from ${SSID}.`);
    }
}

/** Connects to a chosen wireless network. */
export async function connectToWifi(chosenAP: string, 
    oneClickConnect: boolean = false, 
    pw: string = apPassword.get()): Promise<void>{
    const cachedAPs = new Set(exec('nmcli -f NAME con show').split("\n").map(ap => {
            let formattedAP = ap.trim();
            
            if(formattedAP == "NAME" || formattedAP == "lo"){
                return;
            }
            
            return formattedAP;
    }));

    if(cachedAPs.has(chosenAP)){
        disconnectFromWifi();

        try{
            await execAsync(`nmcli con up "${chosenAP}"`);

            return;
        }catch(error){
            // indicates a bad entry in the cached AP, delete and reset
            // NOTE: i think this is only related to a bad password, so it can continue ahead.
            // however this may need more testing.
            print(error);
            exec(`nmcli con delete "${chosenAP}"`);
        }
    }

    /** Connect to a given wifi, this is dependent on if a password is given or not. */
    const connect = async (pw: string): Promise<void> => {
        if(pw.trim() == ''){
            await execAsync(`nmcli d wifi connect "${chosenAP}"`);
        }else if(pw != null){
            await execAsync(`nmcli d wifi connect "${chosenAP}" password "${pw}"`);
        }
    }

    try{
        await connect(pw);
    }catch(error){
        print(chosenAP);
        print(error);

        // TODO: make something to display the error message.

        // final fail, delete the entry.
        exec(`nmcli con delete "${chosenAP}"`);
        return;
    }
}

export function getIcon(flag: number, strength: number): string{
    const icon: string = "󰤯 ";
    if(strength == 0) return icon;

    const wifiIcons: Map<number, string> = flag != 0 ? secureWifi : openWifi;

    const thres: [number, number][] = [[80, 101], [55, 80], [30, 55], [1, 30]]

    for(let i = 0; i < thres.length; i++){
        if(isBetween(strength, thres[i][0], thres[i][1])){
            return wifiIcons.get(i) ?? icon;
        }
    }

    return icon;
}
