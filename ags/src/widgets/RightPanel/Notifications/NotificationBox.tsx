import { Gtk } from "astal/gtk3"
import Notifd from "gi://AstalNotifd"
import { defaultIcon } from "../../../../globals/vars"

type NotiProps = {
    removePopup(id: number): void
    notification: Notifd.Notification
}

export default function NotificationBox(props: NotiProps): JSX.Element{
    const { notification, removePopup } = props;

    return (
        <>
            <eventbox
            onClick={(_, event) => {
                removePopup(notification.id);
            }}>
                <box
                orientation={1}
                spacing={5}
                className={"noti-box"}>
                    <box
                    valign={Gtk.Align.CENTER}
                    spacing={10}
                    className={"noti-header"}>
                        {notification.appIcon ? 
                        <icon icon={notification.appIcon}/> :
                        <label label={defaultIcon}/>}
                        <label label={notification.appName + ' ' + notification.summary}/>
                    </box>
                    <Gtk.Separator visible />
                    <box
                    valign={Gtk.Align.CENTER}
                    className={"noti-body"}>
                        <label 
                        wrap
                        label={notification.body}/>
                    </box>
                </box>
            </eventbox> 
        </>
    )
}