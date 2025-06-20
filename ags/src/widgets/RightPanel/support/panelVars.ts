import { Binding, Variable } from "astal";
import Network from "gi://AstalNetwork";

export const NETWORK = Network.get_default();

// main panel vars
export const displayPanel = Variable<string>('wifiPanel');

export type panelButtonType = {
    name: string,
    label: string,
    action: () => void,
    hasMenu: boolean
}

// AP related vars
export const currentSSID = Variable('');
export const apPassword = Variable<string>('');

export const selectedAP = Variable<string>('');

export const authFailed = Variable<boolean>(false);

// BT related vars
export const btStatus: Variable<boolean> = Variable<boolean>(false);

    // this will be on/off.
export const currentBt: Variable<string> = Variable<string>('');

// panel related vars
export const panelButtonIcons: Map<string, string> = new Map([
    ['wifiPanel', '󰖩'],
    ['btPanel', '󰂯'],
])

    // TODO: action is going to be used to disable the interface
export const panelElements: Array<{
    name: string, action: () => void, meta: string, labelBind: Binding<string>}> = [
        {name: "wifiPanel", action: () => {}, meta: 'Wi-Fi', labelBind: currentSSID()},
        {name: "btPanel", action: () => {}, meta: 'Bluetooth', labelBind: currentBt()},
]