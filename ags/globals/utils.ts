import { exec } from "astal";

/** Send a notification. */
export function notifySend(body: string, time: number = 3000, summary?: string): void{
    if(summary != undefined){
        exec(`notify-send -t ${time} "${summary}" "${body}"`);
    }else{
        exec(`notify-send -t ${time} "${body}"`);
    }
}