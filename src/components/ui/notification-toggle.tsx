"use client";

import { useNotification } from "hooks/useNotification";
import { useState } from "react";
import ActionButton from "./action-button";

interface NotificationToggleProps {
  className?: string;
}

export default function NotificationToggle({ className = "" }: NotificationToggleProps) {
  const { isSupported, permission, isEnabled, requestPermission } = useNotification();

  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    try {
      await requestPermission();
    } catch (error) {
      console.error("알림 권한 요청 실패:", error);
    } finally {
      setIsRequesting(false);
    }
  };

  // 알림을 지원하지 않는 경우
  if (!isSupported) {
    return (
      <div className={`flex items-center gap-2 text-sm text-gray-500 ${className}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <title>경고 아이콘</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <span>이 브라우저는 알림을 지원하지 않습니다</span>
      </div>
    );
  }

  // 권한이 허용된 경우
  if (isEnabled) {
    return (
      <div className={`flex items-center gap-2 text-sm text-green-600 ${className}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <title>알림 활성화 아이콘</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v10a4 4 0 004 4h10a4 4 0 004-4V6a4 4 0 00-4-4H8a4 4 0 00-2.81 1.19z"
          />
        </svg>
        <span>데스크톱 알림 활성화됨</span>
      </div>
    );
  }

  // 권한이 거부된 경우
  if (permission === "denied") {
    return (
      <div className={`flex items-center gap-2 text-sm text-red-600 ${className}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <title>경고 아이콘</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <span>알림 권한이 거부되었습니다</span>
        <ActionButton
          color="gray"
          onClick={() => {
            // 브라우저 설정으로 안내
            alert("브라우저 설정에서 알림 권한을 허용해주세요.");
          }}
        >
          설정 안내
        </ActionButton>
      </div>
    );
  }

  // 권한 요청이 필요한 경우
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <title>알림 아이콘</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v10a4 4 0 004 4h10a4 4 0 004-4V6a4 4 0 00-4-4H8a4 4 0 00-2.81 1.19z"
          />
        </svg>
        <span>키워드 생성 완료 시 데스크톱 알림을 받으시겠습니까?</span>
      </div>
      <ActionButton color="indigo" onClick={handleRequestPermission} disabled={isRequesting}>
        {isRequesting ? "요청 중..." : "알림 허용"}
      </ActionButton>
    </div>
  );
}
