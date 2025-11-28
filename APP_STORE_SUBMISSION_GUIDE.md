# 애플 앱 스토어 제출 가이드

## 📋 사전 준비사항

### 1. Apple Developer 계정 확인
- [Apple Developer Program](https://developer.apple.com/programs/) 가입 필요 (연간 $99)
- App Store Connect 접근 권한 확인

### 2. App Store Connect에서 앱 생성
1. [App Store Connect](https://appstoreconnect.apple.com) 로그인
2. "내 앱" → "+" 버튼 클릭
3. 앱 정보 입력:
   - 이름: "에푸"
   - 기본 언어: 한국어
   - 번들 ID: `com.efoo.app` (app.config.js에 설정된 값)
   - SKU: 고유 식별자 (예: `efoo-ios-001`)

### 3. 앱 정보 미리 준비
- 앱 설명 (한국어, 영어)
- 키워드
- 스크린샷 (필수):
  - iPhone 6.7" (iPhone 14 Pro Max 등)
  - iPhone 6.5" (iPhone 11 Pro Max 등)
  - iPhone 5.5" (iPhone 8 Plus 등)
- 앱 아이콘 (1024x1024px)
- 개인정보 처리방침 URL (필수)

---

## 🚀 빌드 및 제출 단계

### 방법 1: EAS Build 사용 (권장)

#### Step 1: EAS CLI 로그인
```bash
cd frontend
eas login
```

#### Step 2: 프로덕션 빌드 생성
```bash
# iOS 프로덕션 빌드 생성
eas build --platform ios --profile production
```

빌드 옵션 선택:
- **빌드 타입**: App Store 배포용
- **자동 제출**: 선택 가능 (자동으로 App Store Connect에 업로드)

#### Step 3: 빌드 완료 대기
- 빌드는 약 10-20분 소요
- EAS 대시보드에서 진행 상황 확인: https://expo.dev

#### Step 4: App Store Connect에 업로드 (자동 제출 선택 안 한 경우)
```bash
eas submit --platform ios --latest
```

또는 특정 빌드 ID 지정:
```bash
eas submit --platform ios --id <BUILD_ID>
```

---

### 방법 2: Xcode 사용

#### Step 1: EAS Build로 아카이브 다운로드
```bash
eas build --platform ios --profile production --local
```

또는 클라우드 빌드 후 다운로드:
```bash
eas build:list
eas build:download --id <BUILD_ID>
```

#### Step 2: Xcode에서 아카이브 열기
1. Xcode 실행
2. Window → Organizer 열기
3. 다운로드한 `.xcarchive` 파일을 드래그 앤 드롭

#### Step 3: App Store Connect에 업로드
1. Organizer에서 아카이브 선택
2. "Distribute App" 클릭
3. "App Store Connect" 선택
4. "Upload" 선택
5. 배포 옵션 확인 후 "Upload" 클릭

---

## 📝 App Store Connect에서 앱 정보 입력

### 1. 앱 정보 페이지 접속
- App Store Connect → "에푸" 앱 선택
- "앱 정보" 탭 클릭

### 2. 필수 정보 입력
- **카테고리**: 
  - 주 카테고리: 음식 및 음료
  - 부 카테고리: (선택)
- **개인정보 처리방침 URL**: (필수)
- **지원 URL**: (필수)
- **마케팅 URL**: (선택)

### 3. 가격 및 판매 범위
- 가격: 무료
- 판매 범위: 모든 국가 또는 특정 국가 선택

### 4. 버전 정보 입력
- **버전**: `1.0.0` (app.config.js의 version과 일치)
- **빌드**: 업로드한 빌드 선택
- **앱 설명**: 
  ```
  에푸는 에리카 대학생들을 위한 맛집 추천 앱입니다.
  
  주요 기능:
  - 주변 맛집 검색 및 추천
  - 실시간 학식 메뉴 확인
  - 맛집 리뷰 및 평점 확인
  - 위치 기반 맛집 정렬
  ```
- **키워드**: 맛집, 학식, 에리카, 대학생, 음식점 (쉼표로 구분, 최대 100자)
- **프로모션 텍스트**: (선택, 최대 170자)
- **스크린샷**: 필수 (각 기기 크기별로 최소 1장)

### 5. 앱 심사 정보
- **연락처 정보**: 
  - 이름, 성명, 이메일, 전화번호
- **참고사항**: (선택)
  - 테스트 계정 정보 (로그인이 필요한 경우)
  - 특별한 테스트 방법 설명

### 6. 버전 출시
- **자동 출시**: 심사 통과 후 자동 출시
- **수동 출시**: 심사 통과 후 수동으로 출시

---

## ✅ 제출 전 체크리스트

- [ ] 앱이 정상적으로 작동하는지 테스트 완료
- [ ] 모든 필수 권한 요청 설명 추가 (Info.plist 확인)
- [ ] 개인정보 처리방침 URL 설정 완료
- [ ] 스크린샷 준비 완료 (최소 3개 기기 크기)
- [ ] 앱 설명 및 키워드 입력 완료
- [ ] 연락처 정보 입력 완료
- [ ] 버전 번호 확인 (app.config.js와 일치)
- [ ] 빌드 번호 확인 (iOS buildNumber)

---

## 🔍 심사 제출 후

### 심사 기간
- 일반적으로 24-48시간 소요
- 복잡한 앱의 경우 최대 7일 소요

### 심사 상태 확인
- App Store Connect → "앱 심사" 탭에서 확인
- 이메일 알림 수신

### 심사 거부 시
- 거부 사유 확인
- 문제 수정 후 새 빌드 업로드
- 재제출

---

## 📚 유용한 명령어

```bash
# 빌드 목록 확인
eas build:list

# 특정 빌드 다운로드
eas build:download --id <BUILD_ID>

# 제출 상태 확인
eas submit:list

# 프로필 확인
eas build:configure
```

---

## ⚠️ 주의사항

1. **번들 ID**: `com.efoo.app`이 App Store Connect에 등록되어 있어야 함
2. **버전 번호**: 각 제출마다 증가시켜야 함 (1.0.0 → 1.0.1 → 1.1.0)
3. **빌드 번호**: 각 빌드마다 증가시켜야 함
4. **인증서**: EAS Build가 자동으로 관리하지만, 수동 빌드 시 인증서 필요
5. **개인정보 처리방침**: 필수 항목이므로 반드시 준비

---

## 🆘 문제 해결

### 빌드 실패 시
```bash
# 빌드 로그 확인
eas build:view <BUILD_ID>

# 로컬 빌드로 디버깅
eas build --platform ios --profile production --local
```

### 제출 실패 시
- App Store Connect에서 에러 메시지 확인
- 인증서 문제인 경우 EAS가 자동으로 처리
- 수동으로 해결해야 하는 경우 Xcode 사용

---

## 📞 추가 도움말

- [EAS Build 문서](https://docs.expo.dev/build/introduction/)
- [App Store Connect 도움말](https://help.apple.com/app-store-connect/)
- [Apple 앱 심사 가이드라인](https://developer.apple.com/app-store/review/guidelines/)

