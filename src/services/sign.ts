import { got } from "utils/helpers"

export const signout = async () => {
    const response = await got("/signout")
    if(response.ststue == 1) {
        location.reload()
    };
}