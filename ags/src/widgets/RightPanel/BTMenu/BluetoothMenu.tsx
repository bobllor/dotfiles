import { bind, Variable } from "astal";
import Bluetooth from "gi://AstalBluetooth";

const bluetooth: Bluetooth.Bluetooth = Bluetooth.get_default();

const searchPair = (adapter: Bluetooth.Adapter) => {
    
}

function DevicesList(): JSX.Element{    
    const bindings = Variable.derive([
        bind(bluetooth, "isPowered"),
        bind(bluetooth, "adapter"),
        bind(bluetooth.adapter, "discoverable")
    ], (_, adapter, discoverable) => {
        print(adapter.powered);
        print(discoverable);

        return (
            <>
                <button
                onClick={() => searchPair(adapter)}>

                </button>
            </>
        )
    })

    return (
        <>
            {bindings()}
        </>
    )
}

export default function BluetoothMenu(): JSX.Element{
    return (
        <>
            <box
            name={"btPanel"}>
                <DevicesList />
            </box>
        </>
    )
}