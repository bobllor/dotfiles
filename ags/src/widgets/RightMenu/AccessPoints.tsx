import { bind, Variable, execAsync, exec } from "astal";
import Network from "gi://AstalNetwork"
import { Widget } from "astal/gtk3";
import { currentSSID } from "./networkUtils/utils";

const NETWORK = Network.get_default();

const firstScan = Variable<boolean>(true);

function APs(): JSX.Element{
    /** Connects to the chosen AP.*/
    const handleConnectToAP = async (self: Widget.Button) => {
        const disconnect = (wifiStatus: string): void => {
            if(wifiStatus != 'none'){
                exec(`nmcli con down ${currentSSID.get()}`);
            }
        }
        
        const chosenAP = self.name;

        let cachedAPs = new Set(exec('nmcli -f NAME con show').split("\n").map(ap => {
            let formattedAP = ap.trim();
            
            if(formattedAP == "NAME" || formattedAP == "lo"){
                return;
            }
            
            return formattedAP;
        }));

        const status = exec('nmcli n con');
        
        if(cachedAPs.has(chosenAP)){
            disconnect(status);

            // catch in case the PSK has changed
            try{
                await execAsync(`nmcli con up ${chosenAP}`);
                
                return;
            }catch (error){
                // delete the cached AP to restart from scratch
                // TODO: this might need some testing. it looks bad...
                exec(`nmcli con delete ${chosenAP}`);
            }
        }

        // it will always assume that the given network does not have a PSK
        try{
            exec(`nmcli d wifi connect ${chosenAP}`);

            return;
        }catch (error){
            print(error);
            exec(`nmcli con delete ${chosenAP}`);
        }

        try{
            // i may or may not make a custom dialog for this.
            const psk = await execAsync('yad --entry --hide-text');
            
            if(psk.trim() == ''){
                print('No password given');
                return;
            }
            
            disconnect(status);
            await execAsync(`nmcli d wifi connect ${chosenAP} password ${psk}`);

            return;
        }catch (error){
            print('Failed to connect to the network');
            return;
        }
    }

    const apBind = Variable.derive(
        [bind(NETWORK, 'wifi'), bind(NETWORK, 'connectivity')],
        (wifi) => {
            const ssidSet = new Set();

            // needed to get the access points initially.
            // TODO: make this a manual refresh button
            if(firstScan.get()){
                wifi.scan();
                firstScan.set(false);
            }

            const apArr = wifi.accessPoints.filter(ap => {
                if(!ssidSet.has(ap.ssid)){
                    ssidSet.add(ap.ssid);
                }else{
                    return false;
                }
                return ap.ssid != null && ap.ssid != currentSSID.get();
            })

            return (
                <>
                    {apArr.map(ap => (
                        <>
                            <button
                            name={bind(ap, "ssid").get()}
                            onClick={handleConnectToAP}>
                                <label>{ap.ssid}</label>
                            </button>
                        </>
                    ))}
                </>
            )
        }
    )

    return (
        <>
            <box
            vertical
            onDestroy={() => {
                apBind.drop();
            }}>
                {apBind()}
            </box>
        </>
    )
}

export default function AccessPoints(): JSX.Element{
    return (
        <>
            <APs />
        </>
    )
}   