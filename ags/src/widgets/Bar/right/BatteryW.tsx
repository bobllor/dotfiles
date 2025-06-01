import { bind } from "astal"
import Battery from "gi://AstalBattery"

export default function BatteryW(){
    const bat = Battery.get_default();


    return (
        <>
            <box className={"Battery"}>
                <icon icon={bind(bat, "batteryIconName")} />
                <label>{bind(bat, "percentage").as(p =>
                    `${Math.floor(p * 100).toString()}%`
                )}</label>
            </box>    
        </>
    )
}