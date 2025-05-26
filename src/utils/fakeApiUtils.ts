type FakeApiType = "auth/login" | "auth/signup" | "character/create";

export type FakeApiRequestMap = {
    "auth/login": { userId: string; password: string };
    "auth/signup": {
        userId: string;
        email: string;
        password: string;
        passwordConfirm: string;
    };
    "character/create": {
        characterName: string;
        job: string;
    };
};

type FakeApiResponseMap = {
    "auth/login": { userId: string; token: string };
    "auth/signup": { success: true };
    "character/create": { success: true; characterId: string; message: string };
};

export function fakeApi<T extends FakeApiType>(
    type: T,
    data: FakeApiRequestMap[T]
): Promise<FakeApiResponseMap[T]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                switch (type) {
                    case "auth/login": {
                        const { userId, password } =
                            data as FakeApiRequestMap["auth/login"];
                        if (userId === "test" && password === "1") {
                            resolve({
                                userId,
                                token: "fake-token",
                            } as FakeApiResponseMap[T]);
                        } else {
                            throw new Error(
                                "아이디 또는 비밀번호가 일치하지 않습니다."
                            );
                        }
                        break;
                    }

                    case "auth/signup": {
                        const { userId, email, password, passwordConfirm } =
                            data as FakeApiRequestMap["auth/signup"];
                        if (
                            userId &&
                            email &&
                            password &&
                            password === passwordConfirm
                        ) {
                            resolve({ success: true } as FakeApiResponseMap[T]);
                        } else if (password !== passwordConfirm) {
                            throw new Error("비밀번호가 일치하지 않습니다.");
                        } else {
                            throw new Error(
                                "모든 필드를 올바르게 입력해주세요."
                            );
                        }
                        break;
                    }

                    case "character/create": {
                        const { characterName, job } =
                            data as FakeApiRequestMap["character/create"];

                        if (!characterName || !job) {
                            throw new Error("캐릭터 이름과 직업은 필수입니다.");
                        }

                        if (characterName.toLowerCase() === "test") {
                            throw new Error(
                                `캐릭터 이름 "${characterName}"은 사용할 수 없습니다.`
                            );
                        }

                        const newCharacterId = `char_${Date.now()}_${Math.random()
                            .toString(36)
                            .substring(7)}`;

                        resolve({
                            success: true,
                            characterId: newCharacterId,
                            message: `캐릭터 "${characterName}" (${job})이(가) 성공적으로 생성되었습니다. ID: ${newCharacterId}`,
                        } as FakeApiResponseMap[T]);
                        break;
                    }

                    default: {
                        throw new Error(`정의되지 않은 API 타입입니다:`);
                    }
                }
            } catch (err) {
                reject(err);
            }
        }, 1000);
    });
}
