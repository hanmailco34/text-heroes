interface AnimateProgressParams {
    totalDuration: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    onComplete: () => void;
    intervalTime?: number;
}

/**
 * 지정된 시간 동안 점진적으로 진행률을 업데이트하고 완료 시 콜백을 호출합니다.
 * React 컴포넌트의 useEffect와 함께 사용하기 적합하며, 언마운트 시 인터벌을 정리합니다.
 *
 * @param params - 함수 파라미터 객체
 * @param params.totalDuration - 총 진행 시간 (밀리초)
 * @param params.setProgress - 진행률 상태를 업데이트하는 함수 (React의 setState와 유사)
 * @param params.onComplete - 진행률이 100%에 도달했을 때 호출될 콜백 함수
 * @param [params.intervalTime=50] - 진행률 업데이트 간격 (밀리초, 기본값 50)
 * @returns 인터벌을 정리하는 함수 (useEffect의 cleanup 함수로 사용)
 */
const animateProgress = ({
    totalDuration,
    setProgress,
    onComplete,
    intervalTime = 50,
}: AnimateProgressParams): (() => void) => {
    if (typeof totalDuration !== "number" || totalDuration <= 0) {
        console.error("totalDuration은 0보다 큰 숫자여야 합니다.");
        return () => {};
    }
    if (typeof setProgress !== "function") {
        console.error("setProgress는 함수여야 합니다.");
        return () => {};
    }
    if (typeof onComplete !== "function") {
        console.error("onComplete는 함수여야 합니다.");
        return () => {};
    }
    if (typeof intervalTime !== "number" || intervalTime <= 0) {
        console.error("intervalTime은 0보다 큰 숫자여야 합니다.");
        return () => {};
    }

    const increment = 100 / (totalDuration / intervalTime);
    let intervalId: NodeJS.Timeout | null = null;

    const tick = (): void => {
        setProgress((prevProgress: number) => {
            const nextProgress = prevProgress + increment;
            if (nextProgress >= 100) {
                if (intervalId) {
                    clearInterval(intervalId);
                }
                onComplete();
                return 100;
            }
            return nextProgress;
        });
    };

    intervalId = setInterval(tick, intervalTime);

    return (): void => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    };
};

export default animateProgress;
