import HeadTitle from "../components/others/headTitle"
import SignForm from "../components/organisms/SignForm";
import { PageDiv } from "../components/atoms/Div";

const Sign = () => {
    return (
        <PageDiv dis="flex" jus="center" ali="center">
            <HeadTitle title="login"/>
            <SignForm />
        </PageDiv>
    )
}

export default Sign;