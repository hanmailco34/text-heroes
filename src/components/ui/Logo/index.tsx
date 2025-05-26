import logoImage from "@/assets/images/logo.png";

interface LogoProps {
    className?: string; // 외부에서 추가 스타일링을 위한 클래스
    iconClassName?: string; // 아이콘 SVG 자체에 적용할 클래스 (주로 색상)
}

const Logo: React.FC<LogoProps> = ({
    className = "",
    iconClassName = "size-10",
}) => {
    const content = (
        <>
            <img
                src={logoImage}
                alt="텍스트 히어로즈 로고"
                className={iconClassName}
                aria-hidden="true"
            />
        </>
    );

    const wrapperClasses = `flex items-center gap-3 ${className}`;

    return <div className={wrapperClasses}>{content}</div>;
};

export default Logo;
