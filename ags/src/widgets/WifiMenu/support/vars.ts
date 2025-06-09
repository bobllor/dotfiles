import { Variable } from "astal";
import Network from "gi://AstalNetwork";

export const NETWORK = Network.get_default();

// main panel vars
export const displayPanel = Variable<string>('main');

// AP related vars
export const currentSSID = Variable('');
export const apPassword = Variable<string>('');

export const selectedAP = Variable<string>('');

export const authFailed = Variable<boolean>(false);