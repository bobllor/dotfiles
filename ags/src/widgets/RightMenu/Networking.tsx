import { bind, Variable } from "astal";
import Network from "gi://AstalNetwork"
import { isBetween } from "./networkUtils/utils";
import { currentSSID } from "./networkUtils/utils";

const NETWORK = Network.get_default();

const getIcon = (status: number, strength: number) => {
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
}

function NetworkInfo(): JSX.Element{
    const bindings = Variable.derive(
        [bind(NETWORK, "wifi"), bind(NETWORK, "connectivity")],
        (wifi, con) => {
            // handles updating the network.
            if(con == 1 || con == 0){
                currentSSID.set('None');
            }else{
                currentSSID.set(wifi.ssid);
            }

            return (
                <>
                    <label>{bind(wifi, "strength").as(str => {
                        return getIcon(con, str);
                    })}</label>
                    <label>{currentSSID.get()}</label>
                </>
            )
        }
    )

    return (
            <>
              <box
              onDestroy={() => {
                bindings.drop();
              }}>
                {bindings()}
              </box>
        </>
    )
}

export default function Networking(){
    return (
        <>  
            <NetworkInfo />
        </>
    )
}
