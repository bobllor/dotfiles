import { Variable } from "astal";
import { Gtk } from "astal/gtk3";
import Notifd from "gi://AstalNotifd"
import NotificationBox from "../NotificationBox";
import { type Subscribable } from "astal/binding";

export class NotificationPopup implements Subscribable{
    private notiService= Notifd.get_default();

    private notifications: Variable<Notifd.Notification[]> = Variable([]);

    constructor(){
        this.notiService.connect("notified", (_, id) => {
            const noti = this.notiService.get_notification(id);
            
            // this is not pretty...
            this.notifications.set([...this.notifications.get().reverse(), noti].reverse());
        })

        this.notiService.connect("resolved", (_, id) => {
            // WIP
        })
    }

    public removePopup(id: number): void{
        this.notifications.set(
            this.notifications.get().filter(noti => {
                return noti.id != id;
            })
        );
    }

    get(){
        return this.notifications.get();
    }

    subscribe(callback: (value: Notifd.Notification[]) => void){
        return this.notifications.subscribe(callback);
    }
}