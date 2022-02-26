import {Div} from "../atoms/Div";
import Link from "next/link";

const HeaderMenu = () => {
    return (
        <Div width="150px" height="100px">
            <Link href="/info">
                <a>내 정보</a>
            </Link>
            <Link href="/">
                <a>로그아웃</a>
            </Link>
        </Div>
    );
}

export default HeaderMenu;