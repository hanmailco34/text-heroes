import Footer from "../Footer";
import Header from "../Header";

interface MainLayoutProps {
    children: React.ReactNode; // 페이지 콘텐츠가 들어갈 자리
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="relative flex size-full min-h-screen flex-col bg-brand-bg dark group/design-root overflow-x-hidden font-pixel">
            <div className="flex h-full grow flex-col">
                <Header />
                <main className="flex-1">{children} </main>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
