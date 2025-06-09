import { connectToWifi, disconnectFromWifi } from "../support/apUtils";
import { apPassword, currentSSID } from "../support/vars";

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
                onClick={self => connectToWifi(self.name,
                    false, apPassword.get()
                )}
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