import onLogin from '../../utils/auth/spotify';

export default function Login() {
    return (
        <div className="flex-1">
            <div className="text-center mt-20">
                <h1 className="text-2xl font-bold item-center ">정책으로 인해 등록된 회원만 이용할 수 있습니다</h1>
                {/* <button className="bg-accent text-white font-bold mt-4 p-3 rounded-3xl" onClick={onLogin}>
                    로그인하기
                </button> */}
                <button className="bg-accent text-white font-bold mt-4 p-3 rounded-3xl" onClick={onLogin}>
                    등록 요청
                </button>
            </div>
        </div>
    );
}
