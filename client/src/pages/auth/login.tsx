import onLogin from '../../utils/api/login';

export default function Login() {
    return (
        <div className="flex-1 relative rounded-lg">
            <div className="text-center mt-20">
                <h1 className="item-center text-2xl mb-5 font-bold">로그인 후 이용할 수 있습니다</h1>
                <button className="bg-accent font-black py-[10px] px-[15px] text-bold rounded-4xl" onClick={onLogin}>
                    로그인하기
                </button>
            </div>
        </div>
    );
}
