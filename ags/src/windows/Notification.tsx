import { Gdk } from "astal/gtk3";
import { anchor } from "../../globals/vars";
import { bind } from "astal";
import { NotificationPopup } from "../widgets/RightPanel/Notifications/notificationComponents/NotificationPopup";
import NotificationBox from "../widgets/RightPanel/Notifications/NotificationBox";

export default function Notification(monitor: Gdk.Monitor): JSX.Element{
    const notifications = new NotificationPopup();

    return (
        <>
            <window
            gdkmonitor={monitor}
            anchor={anchor.TOP | anchor.RIGHT}>
                <box
                vertical>
                    {bind(notifications).as(ele => {

                        return ele.map((noti) => {
                            // this might be bad. i don't know!
                            if(noti == undefined){
                                return <></>;
                            }

                            return NotificationBox({notification: noti,
                                removePopup: () => {notifications.removePopup(noti.id)}
                            });
                        })
                    })}
                </box>
            </window>
        </>
    )
}