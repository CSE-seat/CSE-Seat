import { selector } from "recoil";

const checkAuth = selector({
    key: 'user',
    get: ({get}) => {
        return get;
    }
});

export default checkAuth;