import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import useAuthStore from "@/store/authStore";

const Header: React.FC = () => {
    const { isLoggedIn, logout } = useAuthStore();

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b-4 border-brand-green-dark px-6 py-4 bg-brand-bg-content">
            <Logo />{" "}
            <nav
                className="flex items-center gap-6"
                aria-label="메인 네비게이션"
            >
                <a
                    className="text-brand-green-light text-sm font-pixel hover:text-white transition-colors"
                    href="/"
                >
                    홈
                </a>
                <a
                    className="text-brand-green-light text-sm font-pixel hover:text-white transition-colors"
                    href="/about"
                >
                    소개
                </a>
                {isLoggedIn ? (
                    <Button className="text-xs px-3 py-2" onClick={logout}>
                        로그아웃
                    </Button>
                ) : (
                    <Button asLink href="/signup" className="text-xs px-3 py-2">
                        히어로 등록
                    </Button>
                )}
            </nav>
        </header>
    );
};

export default Header;
