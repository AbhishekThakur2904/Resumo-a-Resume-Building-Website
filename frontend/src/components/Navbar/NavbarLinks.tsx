type Props = {};
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useLogoutUserMutation } from "../../services/api";
import { Button } from "@mui/material";
import { resetTokens } from "../../redux/reducer/authSlice";
import { useTranslation } from "react-i18next";

function NavbarLinks({}: Props) {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { accessToken } = useAppSelector((state) => state.auth);
  const [logoutUser] =
    useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      const res = await logoutUser({}).unwrap();
      console.log(res);
      if (res?.success) {
        dispatch(resetTokens());
        navigate("/")
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Link to={"/"}> {t("header.home")}</Link>
      {!accessToken && (
        <>
          <Link to={"/register"}>{t("header.register")}</Link>
          <Link to={"/login"}>{t("header.login")}</Link>
        </>
      )}
      {accessToken && <a onClick={handleLogout}>{t("header.logout")}</a>}
    </>
  );
}

export default NavbarLinks;
