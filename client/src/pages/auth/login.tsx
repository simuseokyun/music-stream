import onLogin from '../../utils/auth/spotify';

export default function Login() {
    return (
        <div className="flex-1">
            <div className="text-center mt-20">
                <h1 className="text-2xl font-bold item-center ">로그인 후 이용해주세요</h1>
                <button className="bg-accent text-white font-bold mt-4 p-3 rounded-3xl" onClick={onLogin}>
                    로그인하기
                </button>
            </div>
        </div>
    );
}
