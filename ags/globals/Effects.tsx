import { bind } from "astal";
import { showMenu } from "./vars";
import { selectedAP } from "../src/widgets/WifiMenu/support/vars";

// to be honest i don't know if this is a good idea.
// my main concerns are potential peformance issues, i need to ask
// people in the discord for more info.

/** Run side effects when Variables are changed. */
export default function Effects(){
    return (
        <>
            <revealer
            visible={false}>
                {bind(showMenu).as(stat => {
                    if(!stat && selectedAP.get() != ''){
                        selectedAP.set('');
                    }
                })}
            </revealer>
        </>
    )
}