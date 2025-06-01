import { bind, Variable } from "astal";
import Network from "gi://AstalNetwork"
import { Widget } from "astal/gtk3";
import { exec } from "astal";
import { currentSSID } from "./networkUtils/utils";

const NETWORK = Network.get_default();

function APs(): JSX.Element{
    const handleClick = (self: Widget.Button) => {
        print(self.name);
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
                            onClick={handleClick}>
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