import { Variable, } from "astal"
import { Astal, Gdk } from "astal/gtk3"
import AccessPoints from "../widgets/WifiMenu/AccessPoints";
import PanelButtons from "../widgets/WifiMenu/PanelButtons";
import { anchor } from "../../globals/vars";

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
            <box
            className={"waps-box"}>
              <AccessPoints />
            </box>
          </box>
        </window>
    </>
  )
}