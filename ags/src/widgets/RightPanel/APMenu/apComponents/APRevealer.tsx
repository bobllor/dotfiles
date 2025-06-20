import { connectToWifi, disconnectFromWifi } from "../support/apUtils";
import { apPassword, currentSSID, selectedAP } from "../../support/panelVars";

export function APReavealer(ssid: string): JSX.Element{

    return (
        <>
            <entry
            visibility={false}
            name={ssid}
            onKeyPressEvent={((self, event) => {
                const enterKey = event.get_keycode()[1];
                apPassword.set(self.text);

                if(enterKey == 36){
                    connectToWifi(self.name, false, self.text);
                    self.text = '';
                }
            })}></entry>
            {
                ssid != currentSSID.get() ? 
                <button
                name={ssid}
                onClick={async (self) => {
                    const status: Promise<boolean> = connectToWifi(
                        self.name,false, apPassword.get());
                    // reset the selectedAP to remove the revealer in AP menu.
                    if(await status){
                        selectedAP.set('');
                    }
                }}
                className={"ap-wifi-button"}>
                    Connect
                </button> :
                <button
                className={"ap-wifi-button"}
                onClick={disconnectFromWifi}>
                    Disconnect
                </button>
            }
        </>
    )
}