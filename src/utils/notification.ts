// Web Notifications API를 사용한 알림 유틸리티

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
}

/**
 * 브라우저가 알림을 지원하는지 확인
 */
export const isNotificationSupported = (): boolean => {
  return "Notification" in window;
};

/**
 * 알림 권한 상태 확인
 */
export const getNotificationPermission = (): NotificationPermission => {
  if (!isNotificationSupported()) {
    return "denied";
  }
  return Notification.permission;
};

/**
 * 알림 권한 요청
 */
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!isNotificationSupported()) {
    throw new Error("이 브라우저는 알림을 지원하지 않습니다.");
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error("알림 권한 요청 실패:", error);
    return "denied";
  }
};

/**
 * 데스크톱 알림 표시
 */
export const showNotification = (options: NotificationOptions): Notification | null => {
  if (!isNotificationSupported()) {
    console.warn("이 브라우저는 알림을 지원하지 않습니다.");
    return null;
  }

  if (getNotificationPermission() !== "granted") {
    console.warn("알림 권한이 허용되지 않았습니다.");
    return null;
  }

  try {
    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon || "/favicon.ico",
      badge: options.badge,
      tag: options.tag,
      requireInteraction: options.requireInteraction || false,
    });

    // 알림 클릭 시 포커스
    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // 자동으로 5초 후 닫기 (requireInteraction이 false인 경우)
    if (!options.requireInteraction) {
      setTimeout(() => {
        notification.close();
      }, 5000);
    }

    return notification;
  } catch (error) {
    console.error("알림 표시 실패:", error);
    return null;
  }
};

/**
 * 키워드 생성 완료 알림
 */
export const showKeywordGenerationComplete = (keywordCount: number): void => {
  showNotification({
    title: "키워드 생성 완료! 🎉",
    body: `${keywordCount}개의 키워드 아이디어가 생성되었습니다.`,
    tag: "keyword-generation",
    requireInteraction: false,
  });
};

/**
 * 키워드 생성 시작 알림
 */
export const showKeywordGenerationStarted = (keyword: string): void => {
  showNotification({
    title: "키워드 생성 시작 🔍",
    body: `"${keyword}" 키워드로 아이디어를 생성하고 있습니다...`,
    tag: "keyword-generation",
    requireInteraction: false,
  });
};

/**
 * 연관도 평가 완료 알림
 */
export const showSimilarityEvaluationComplete = (keywordCount: number): void => {
  showNotification({
    title: "연관도 평가 완료! 📊",
    body: `${keywordCount}개 키워드의 연관도 평가가 완료되었습니다.`,
    tag: "similarity-evaluation",
    requireInteraction: false,
  });
};
