import { bind, Variable, execAsync, exec } from "astal";
import Network from "gi://AstalNetwork"
import { Gtk, Widget } from "astal/gtk3";
import { currentSSID, selectedAP, authFailed, displayPanel } from "../support/panelVars";
import APDisplay from "./apComponents/APDisplay";
import { APReavealer } from "./apComponents/APRevealer";

const NETWORK = Network.get_default();

const firstScan = Variable<boolean>(true);

function APs(): JSX.Element{
    /** Reveal the selected network option revealer. */
    const revealWifiBox = (self: Widget.Button) => {
        const state = selectedAP.get();

        if(state == '' || state != self.name){
            selectedAP.set(self.name);
        }else{
            selectedAP.set('');
        }
    }

    const apBind = Variable.derive(
        [bind(NETWORK, 'wifi'), bind(NETWORK, 'connectivity'),
            bind(selectedAP)
        ],
        (wifi, con, selectedButton) => {
            const ssidSet = new Set();

            // handles updating the network.
            if(con == 1 || con == 0){
                currentSSID.set('None');
            }else{
                currentSSID.set(wifi.ssid);
            }

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

            if(currentSSID.get().toLowerCase() != 'none'){
                apArr.unshift(wifi.activeAccessPoint);
            }

            return (
                <>
                    {apArr.map(ap => (
                        ap != null &&
                        <>
                            <box
                            spacing={1}
                            className={ap.ssid == selectedButton ? 'ap-is-active' : ''}
                            orientation={1}>
                                <button
                                className={`ap-option 
                                    ${ap.ssid == selectedButton ? 'ap-option-no-hover' : ''}`}
                                name={bind(ap, "ssid").get()}
                                onClick={revealWifiBox}>
                                    <box
                                    className={'ap-info'}
                                    spacing={2}>
                                        {APDisplay(ap.ssid, bind(ap, 'strength'), ap.flags)}
                                    </box>
                                </button>
                                <revealer
                                className={"ap-option-con"}
                                name={ap.ssid}
                                setup={self => {
                                    self.revealChild = self.name == selectedButton;
                                }}>
                                    <box
                                    spacing={7}
                                    halign={Gtk.Align.CENTER}>
                                        {APReavealer(ap.ssid)}
                                    </box>
                                </revealer>
                            </box>
                        </>
                    ))}
                </>
            )
        }
    )

    return (
        <> 
            <scrollable
            heightRequest={300} widthRequest={320}>
                <box
                vertical
                hexpand
                onDestroy={() => {
                    apBind.drop();
                }}>
                    {apBind()}
                </box>
            </scrollable>
        </>
    )
}

export default function AccessPoints(): JSX.Element{
    return (
        <>
            <box
            name={"wifiPanel"}
            className={"waps-box"}>
                <APs />
            </box>     
        </>
    )
}   