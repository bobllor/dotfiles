import Tray from "gi://AstalTray"
import { bind } from "astal";

export default function SysTray(){
    const tray = Tray.get_default();

    return (
        <>
            <box className={"SysTray"}>
                {bind(tray, "items").as(items => items.map(item => (
                    <menubutton
                    tooltipMarkup={bind(item, "tooltipMarkup")}
                    actionGroup={bind(item, "actionGroup").as(ag => ["dbusmenu", ag])}
                    menuModel={bind(item, "menuModel")}
                    usePopover={false}>
                        <icon gicon={bind(item, "gicon")} />
                    </menubutton>
                )))}
            </box>
        </>
    )
}