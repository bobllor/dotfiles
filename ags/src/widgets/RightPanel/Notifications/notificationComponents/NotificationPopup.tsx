import { Variable } from "astal";
import Notifd from "gi://AstalNotifd"
import { type Subscribable } from "astal/binding";

const MAX_NOTIFICATIONS: number = 25;

export class NotificationPopup implements Subscribable{
    private notiService= Notifd.get_default();

    // theoretically a map makes this simpler, but the time it takes
    // is roughly the same since i have to convert the values to an array anyways.
    private notifications: Variable<Notifd.Notification[]> = Variable([]);

    // used to display on the notification list
    private history: Variable<Notifd.Notification[]> = Variable([]);

    constructor(){
        this.notiService.connect("notified", (_, id) => {
            const noti = this.notiService.get_notification(id);
            
            this.updateNotifications(this.notifications, noti);
            
            if(this.history.get().length < MAX_NOTIFICATIONS){
                this.updateNotifications(this.history, noti);
            }else{
                // removes oldest notification, it will be at the end
                this.history.set([...this.history.get().slice(0, -1)]);
                this.updateNotifications(this.history, noti);
            }
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

    private updateNotifications(
        variable: Variable<Notifd.Notification[]>,
        notification: Notifd.Notification
    ): void{
        // since the latest notification is at 0, we have to unreverse the array
        variable.set([...variable.get().reverse(), notification].reverse());
    }

    get(){
        return this.notifications.get();
    }

    subscribe(callback: (value: Notifd.Notification[]) => void){
        return this.notifications.subscribe(callback);
    }
}