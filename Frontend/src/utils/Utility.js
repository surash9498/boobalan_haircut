export const isInvalid = (value, type) => {
    return false

}
export const isLoggedIn = () => {
    let value = sessionStorage.getItem("role");
    if (value == "admin") {
        return true
    } else return false

}