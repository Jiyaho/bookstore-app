# 📚 Bookstore App - README

- **Bookstore App**은 온라인 서점을 위한 웹 애플리케이션으로, 책의 등록, 조회, 수정, 삭제와 같은 기능을 제공합니다.
- 본 문서는 프로젝트 설치 방법, 구현된 기능, 그리고 개발 과정 등을 설명합니다.

---

## 🌐 배포 URL

👉 [Bookstore App](https://bookstore-app-murex.vercel.app/)

---

## 📹 구현 동영상

애플리케이션의 주요 기능을 확인할 수 있는 데모 동영상:  
👉 [Demo Video](https://youtu.be/Lkdk3hQdMxU)

---

## 🛠️ 설치 가이드

### 사전 요구사항

- Node.js (v18.8 이상)
- npm 또는 yarn 패키지 매니저

### 설치 방법

1. **저장소 클론**

   ```bash
   git clone https://github.com/your-username/bookstore-app.git
   cd bookstore-app
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **환경 변수 설정**

   1. `Supabase`에서 생성한 프로젝트의 `Dashboard`에서 `Connect`를 클릭하여 프로젝트 연결 정보를 확인합니다.
   2. `ORMs` 탭을 클릭하여 `DATABASE_URL`과 `DIRECT_URL`을 확인합니다.
   3. 프로젝트 루트 디렉토리에 `.env` 파일을 생성합니다.
   4. `.env.example` 파일을 참고하여 필요한 환경 변수를 설정합니다:

      ```plaintext
      DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>"
      DIRECT_URL="postgresql://<username>:<password>@<host>:<port>/<database>"
      ```

4. **데이터베이스 설정을 위한 Prisma CLI 명령어: 데이터베이스 초기화 및 Prisma 마이그레이션**

   - Prisma 마이그레이션: 데이터베이스 스키마를 생성하거나 업데이트합니다.

     - 개발 환경:

     ```bash
     npx prisma migrate dev
     ```

     - 프로덕션 환경:

     ```bash
     npx prisma migrate deploy
     ```

   - Prisma Client 생성: 프로젝트에서 Prisma Client를 생성하기 위한 명령어입니다.

     ```bash
     npx prisma generate
     ```

   - Prisma Studio 실행: 데이터베이스 브라우저 실행하려면 아래 명령어를 실행합니다.

     ```bash
     npx prisma studio
     ```

5. **서버 실행**

   - 개발 환경:

   ```bash
   npm run dev
   ```

   - 프로덕션 환경:

   ```bash
   npm run build && npm run start
   ```

---

## 🚀 구현 기능

### I. 백엔드

- 기술 스택

  - Framework: Next.js (API Routes)
  - Database: Supabase + PostgreSQL (프로덕션 환경), SQLite (개발/테스트 환경)
  - ORM: Prisma

- 구현 내용
  - Book 모델: 도서명, 저자, 카테고리, 출판사, 출판일, 가격, 재고, 책 대표 이미지 및 이미지 배열과 같은 필드를 포함.
  - CRUD API 구현:
    - GET: 책 목록 및 상세 정보 조회.
    - POST: 새 책 추가.
    - PUT: 기존 책 수정.
    - DELETE: 책 삭제.
    - GET: 전체, 도서명, 저자명으로 필터링 검색 API 구현.
  - 서버 페이지네이션: 필요한 데이터만 전송하여 성능 최적화.
  - 테스트 코드 작성: POST /api/books와 관련된 테스트 코드 작성.

### II. 프론트엔드

- 기술 스택

  - Framework: Next.js
  - State Management: React Query
  - Styling: Tailwind CSS, NextUI

- 구현 내용
  - 책 목록 페이지:
    - 책의 주요 정보(도서명, 저자, 출판사, 출판일, 가격, 이미지 등) 표시.
    - 페이지네이션(한 페이지당 10권).
    - 검색 기능(도서명 및 저자명으로 필터링 가능).
  - 책 상세 페이지: 선택된 책의 세부 정보 제공.
  - 책 관리 기능:
    - 추가/수정: Modal을 통해 구현.
    - 삭제: 확인 절차 포함.
  - Lazy Loading: 책 커버 이미지에 적용하여 로딩 시간 최적화.

### III. 성능 최적화

- 서버 페이지네이션: 백엔드에서 skip/take를 활용하여 요청된 페이지의 데이터만 반환.
- React Query: 데이터 캐싱과 retry 옵션 설정 등을 통해 성능 향상.
  - staleTime: 5000, // 5초 동안 캐싱된 데이터를 사용
  - gcTime: 100000, // 100초 동안 캐싱된 데이터를 유지
  - retry: false, // 404 에러 시 재시도 하지 않음
  - refetchOnWindowFocus: false, // 윈도우 포커스 시 재시도 하지 않음
- Lazy Loading: 책 커버 이미지의 지연 로딩을 통해 초기 로딩 속도 개선.

---

## 🧪 테스트

- 테스트 코드 주요 내용
  - POST /api/books API에 대한 유효성 검증:
    - 필수 필드 누락 시 400 Bad Request 상태 반환 확인.
    - 올바른 데이터 입력 시 데이터베이스에 정상적으로 저장되는지 검증.
    - 중복 책 등록 방지 확인(도서명, 저자, 출판사가 모두 동일한 경우).
    - 가격 또는 재고가 음수일 경우 요청 거부 확인

---

## 🛠️ 개발 노트

- 페이지네이션을 구현 시, 백엔드에서 받아온 모든 책 데이터들을 slice 함수를 이용하여 클라이언트에서 페이지네이션을 처리하게 되면, 모든 데이터를 불러온 후에 클라이언트 측에서 나누게 되므로 데이터가 많을 경우에는 성능과 네트워크 사용량이 증가하게 될 것을 고려해야 했습니다. 따라서 백엔드에서 페이지네이션 처리를 수행 후 필요한 데이터만 요청하도록 API 호출하도록 하고 React Query의 캐싱 기능을 통해 데이터 캐싱 및 재사용성을 확보할 수 있었습니다.
- 책(키워드) 검색 결과가 없을 때 404 Not Found 에러가 발생하고 여러번 호출하는 것을 막기 위해 React-query의 Retry 옵션을 사용하여 실패 시 재호출을 막았습니다.
- 백엔드 API는 개발 단계에서 프론트엔드 개발 전 Postman을 사용하여 테스트를 진행하여 API 테스트를 효율적으로 진행할 수 있었습니다.
- DB의 경우 개발/테스트 환경에서는 SQLite를 사용하여 개발 환경에서 테스트를 진행했습니다. 프로덕션 환경에서는 PostgreSQL을 사용하여 대용량 데이터 처리를 지원하도록 구성했습니다.

---

## 🧩 보완하면 좋을 점과 기능 등

- 핵심 비즈니스 로직에 대한 추가 테스트 코드 작성.
- 에러 핸들링 및 예외 처리 개선.
- 보안을 위한 추가 기능 구현(예: 사용자 인증, 관리자 권한 관리 등).
- 관리자를 위한 추가 기능 구현(예: 재고 및 판매 통계 데이터 등).
- 다양한 디바이스를 고려한 반응형 디자인 적용.

---

## 🌲 폴더 구조

```
📦 bookstore-app
├─ .eslintrc.json
├─ .gitignore
├─ README.md
├─ TODO.md
├─ jest.config.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ prisma
│  ├─ dev.db
│  ├─ migrations
│  └─ schema.prisma
├─ public
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  ├─ books
│  │  │  │  ├─ [id]
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ route.ts
│  │  │  └─ search
│  │  │     └─ route.ts
│  │  ├─ books
│  │  │  └─ [id]
│  │  │     └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ search
│  │     └─ page.tsx
│  ├─ components
│  │  ├─ Context
│  │  │  ├─ BookDetail
│  │  │  │  ├─ BookDetailPage.tsx
│  │  │  │  └─ UpdateBookDetail.tsx
│  │  │  ├─ Common
│  │  │  │  ├─ Header
│  │  │  │  │  ├─ CreateBook.tsx
│  │  │  │  │  ├─ Header.tsx
│  │  │  │  │  └─ Search.tsx
│  │  │  │  └─ Providers
│  │  │  │     └─ Providers.tsx
│  │  │  ├─ Main
│  │  │  │  ├─ Book
│  │  │  │  │  ├─ Book.tsx
│  │  │  │  │  └─ BookList.tsx
│  │  │  │  └─ MainPage.tsx
│  │  │  └─ SearchResult
│  │  │     ├─ SearchResultList.tsx
│  │  │     └─ SearchResultPage.tsx
│  │  └─ UI
│  │     ├─ BookDetail
│  │     │  └─ BookDetailForm.tsx
│  │     ├─ Common
│  │     │  ├─ Book
│  │     │  │  └─ BookCoverImage.tsx
│  │     │  ├─ Footer
│  │     │  │  └─ Footer.tsx
│  │     │  ├─ Form
│  │     │  │  └─ BookInputForm.tsx
│  │     │  ├─ Header
│  │     │  │  └─ HeaderButtons.tsx
│  │     │  └─ Title
│  │     │     └─ PageTitle.tsx
│  │     └─ Main
│  │        ├─ Book
│  │        │  ├─ BookActionButtons.tsx
│  │        │  └─ BookDescription.tsx
│  │        └─ Pagination
│  │           └─ Pagination.tsx
│  ├─ hooks
│  │  ├─ useCreateBook.ts
│  │  ├─ useDeleteBook.ts
│  │  ├─ useGetBookDetail.ts
│  │  ├─ useGetBookList.ts
│  │  ├─ useGetSearchResult.ts
│  │  └─ useUpdateBook.ts
│  ├─ lib
│  │  ├─ api
│  │  │  ├─ apiUrls.ts
│  │  │  ├─ axiosInstance.ts
│  │  │  ├─ book
│  │  │  │  └─ api.ts
│  │  │  └─ search
│  │  │     └─ api.ts
│  │  ├─ models
│  │  │  └─ Book.model.tsx
│  │  ├─ prisma.ts
│  │  ├─ query
│  │  │  ├─ queryClient.ts
│  │  │  └─ queryKeys.ts
│  │  └─ types
│  │     └─ BookInterface.ts
│  └─ tests
│     ├─ api
│     │  └─ postBook.test.ts
│     └─ helpers
│        └─ testServer.ts
├─ tailwind.config.ts
└─ tsconfig.json
```
