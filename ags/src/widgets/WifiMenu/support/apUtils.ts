import { exec, execAsync } from "astal"
import { currentSSID, apPassword, selectedAP } from "./vars";
import { isBetween } from "./utils";

/** Disconnects from the current wifi. */
export function disconnectFromWifi(): void{
    const netStat = exec('nmcli n con');
    const SSID = currentSSID.get();

    if(netStat != 'none' && SSID.toLowerCase() != 'none'){
        exec(`nmcli con down "${SSID}"`);
        selectedAP.set('');
        exec(`notify-send "Disconnected from ${SSID}."`)
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
            await execAsync(`nmcli d wifi connect "${chosenAP}"`)
        }else if(pw != null){
            await execAsync(`nmcli d wifi connect "${chosenAP}" password "${pw}"`)
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

export function getIcon(status: number, strength: number): string{
    if(status == 0 || strength == 0) return "󰤯 ";

    if(status == 1 || status == 2)return "󰤭 ";

    if(isBetween(strength, 80, 100)){
        return "󰤨 ";
    }else if(isBetween(strength, 60, 80)){
        return "󰤥 ";
    }else if(isBetween(strength, 40, 60)){
        return "󰤢 ";
    }else if(isBetween(strength, 1, 40)){
        return "󰤟 ";
    }

    return "󰤯 ";
}