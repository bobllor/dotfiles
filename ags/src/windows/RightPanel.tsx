import { Variable, bind } from "astal"
import { Astal, Gdk } from "astal/gtk3"
import AccessPoints from "../widgets/RightPanel/APMenu/AccessPoints";
import PanelButtons from "../widgets/RightPanel/PanelButtons";
import { anchor } from "../../globals/vars";
import { displayPanel } from "../widgets/RightPanel/support/panelVars";
import Notifications from "./Notification";
import BluetoothMenu from "../widgets/RightPanel/BTMenu/BluetoothMenu";

export default function RightPanel(monitor: Gdk.Monitor, showMenu: Variable<boolean>): JSX.Element{
  return (
    <>
        <window
        gdkmonitor={monitor}
        anchor={anchor.TOP | anchor.RIGHT}
        keymode={Astal.Keymode.ON_DEMAND}
        visible={showMenu()}>
          <box 
          orientation={1}
          spacing={10}
          className={"right-panel"}>
            <PanelButtons />
              <stack
              visibleChildName={bind(displayPanel).as(name => name)}>
                <AccessPoints />
                <BluetoothMenu />
              </stack>
          </box>
        </window>
    </>
  )
}