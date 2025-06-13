import { execAsync } from "astal";

/** Send a notification. */
export async function notifySend(body: string, summary?: string): Promise<void>{
    // swapped to async, issues happened with exec when i added my new notification code.
    if(summary != undefined){
        await execAsync(`notify-send "${summary}" "${body}"`);
    }else{
        await execAsync(`notify-send "" "${body}"`);
    }
}