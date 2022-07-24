import { getItemFromLs } from "./localStorage";

const isLogin = () => !!getItemFromLs("myToken");

export default isLogin;
