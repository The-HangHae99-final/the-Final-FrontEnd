import { getItemFromLs } from "../components/localStorage";

const isLogin = () => !!getItemFromLs("myToken");

export default isLogin;
