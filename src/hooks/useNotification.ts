import { useCallback, useEffect, useState } from "react";
import {
  getNotificationPermission,
  isNotificationSupported,
  requestNotificationPermission,
  showKeywordGenerationComplete,
  showKeywordGenerationStarted,
  showSimilarityEvaluationComplete,
} from "../utils/notification";

export interface UseNotificationReturn {
  isSupported: boolean;
  permission: NotificationPermission;
  isEnabled: boolean;
  requestPermission: () => Promise<NotificationPermission>;
  showKeywordGenerationComplete: (keywordCount: number) => void;
  showKeywordGenerationStarted: (keyword: string) => void;
  showSimilarityEvaluationComplete: (keywordCount: number) => void;
}

/**
 * 알림 기능을 관리하는 커스텀 훅
 */
export const useNotification = (): UseNotificationReturn => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isEnabled, setIsEnabled] = useState(false);

  // 초기 상태 설정
  useEffect(() => {
    const supported = isNotificationSupported();
    setIsSupported(supported);

    if (supported) {
      const currentPermission = getNotificationPermission();
      setPermission(currentPermission);
      setIsEnabled(currentPermission === "granted");
    }
  }, []);

  // 권한 요청 함수
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!isSupported) {
      throw new Error("이 브라우저는 알림을 지원하지 않습니다.");
    }

    try {
      const newPermission = await requestNotificationPermission();
      setPermission(newPermission);
      setIsEnabled(newPermission === "granted");
      return newPermission;
    } catch (error) {
      console.error("알림 권한 요청 실패:", error);
      return "denied";
    }
  }, [isSupported]);

  // 알림 표시 함수들 (권한이 허용된 경우에만)
  const showKeywordGenerationCompleteNotification = useCallback(
    (keywordCount: number) => {
      if (isEnabled) {
        showKeywordGenerationComplete(keywordCount);
      }
    },
    [isEnabled],
  );

  const showKeywordGenerationStartedNotification = useCallback(
    (keyword: string) => {
      if (isEnabled) {
        showKeywordGenerationStarted(keyword);
      }
    },
    [isEnabled],
  );

  const showSimilarityEvaluationCompleteNotification = useCallback(
    (keywordCount: number) => {
      if (isEnabled) {
        showSimilarityEvaluationComplete(keywordCount);
      }
    },
    [isEnabled],
  );

  return {
    isSupported,
    permission,
    isEnabled,
    requestPermission,
    showKeywordGenerationComplete: showKeywordGenerationCompleteNotification,
    showKeywordGenerationStarted: showKeywordGenerationStartedNotification,
    showSimilarityEvaluationComplete: showSimilarityEvaluationCompleteNotification,
  };
};
