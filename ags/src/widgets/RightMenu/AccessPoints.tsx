import { bind, Variable } from "astal";
import Network from "gi://AstalNetwork"
import { Widget } from "astal/gtk3";
import { execAsync, exec } from "astal";
import { currentSSID } from "./networkUtils/utils";

const NETWORK = Network.get_default();

function APs(): JSX.Element{
    /** Connects to the chosen AP.*/
    const handleConnectToAP = async (self: Widget.Button) => {
        const chosenAP = self.name;

        let cachedAPs = new Set(exec('nmcli -f NAME con show').split("\n").map(ap => {
            let formattedAP = ap.trim();
            
            if(formattedAP == "NAME" || formattedAP == "lo"){
                return;
            }
            
            return formattedAP;
        }));
        
        if(cachedAPs.has(chosenAP)){
            exec(`nmcli con down ${currentSSID.get()}`);

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

        try{
            // i may or may not make a custom dialog for this.
            const psk = await execAsync('yad --entry --hide-text');

            await execAsync(`nmcli d wifi connect ${chosenAP} password ${psk}`);
        }catch (error){
            print(error);
            return;
        }
    }

    const apBind = Variable.derive(
        [bind(NETWORK, 'wifi'), bind(NETWORK, 'connectivity')],
        (wifi) => {
            const ssidSet = new Set();

            const apArr = wifi.accessPoints.filter(ap => {
                if(!ssidSet.has(ap.ssid)){
                    ssidSet.add(ap.ssid);
                }else{
                    return;
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
                                <label>{bind(ap, "ssid")}</label>
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