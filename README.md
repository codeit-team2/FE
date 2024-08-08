# 프로젝트 소개
**취ZONE**은 '취향 존중'이라는 의미를 담아, 취향이 비슷한 사람들을 연결해 원하는 모임을 쉽게 만들고 참여할 수 있는 플랫폼입니다.</br>
각자의 개성과 취향을 존중하며, 다양한 관심사를 공유하고 사람들 간의 소통과 교류를 하기 위한 서비스를 제작했습니다.

- **서비스 개요** : 취향이 비슷한 사람들을 연결해 원하는 모임을 만드는 플랫폼
- **목표** : 사용자가 간편하게 모임을 생성하고 참여할 수 있는 환경 제공
- **기간** : 24.06.28 ~ 24.08.07

</br>

# 배포 링크
### [취ZONE Link](https://hostinghobbyzone--hostinghobbyzone.us-central1.hosted.app/)
> Test ID : pasobe8017@sablecc.com</br>
> Test PW : test1234

</br>

# 팀원
### Front-end
#### [박준성(팀장)](https://github.com/juncastle97)
- 모임 상세 페이지
- 활동 후기 페이지
#### [문필겸](https://github.com/MoonPillGyeom)
- 메인 페이지
- 북마크 페이지
#### [박세은](https://github.com/marchfirst01)
- 모임 생성 모달
- 마이페이지
#### [유미정](https://github.com/ymj0828)
- 회원가입 모달
- 로그인 모달

### Back-end
#### [김지민](https://github.com/apptie)

### Design
#### [이예빈](leeyebin951@gmail.com)

</br>

# 주요 기능
### 메인 페이지
https://github.com/user-attachments/assets/f54a4c20-e242-4c66-ad9b-eaa43d0f0a00

### 회원가입/로그인 모달
https://github.com/user-attachments/assets/a16d1019-068b-4406-95eb-4fbfa202313c

### 모임 생성 모달
https://github.com/user-attachments/assets/4bcd9902-3c5c-4088-b06a-0f73cf3ad7fd

### 모임 상세 페이지
https://github.com/user-attachments/assets/e4d175a4-16bd-428e-a2d9-bf96643657c9

### 찜목록 페이지
https://github.com/user-attachments/assets/1dfb15d5-caf8-413f-88b4-d5c5581a3f36

### 마이페이지
https://github.com/user-attachments/assets/df692994-9ebb-4692-b609-a0eeca8db8b2

### 활동후기 페이지
https://github.com/user-attachments/assets/7538de8b-1c3a-47cd-8d32-292fa4b135db

</br>

# 기술 스택

</br>

# 폴더 구조

```
codeit-team2-fe
├─ .eslintrc.json
├─ .firebase
├─ public
│  ├─ 404.html`
│  ├─ icons
│  ├─ images
│  └─ index.html
├─ src
│  ├─ apis
│  ├─ components
│  │  ├─ Card
│  │  ├─ Review
│  │  ├─ ...
│  │  ├─ common
│  │  └─ ui
│  ├─ constants
│  ├─ context
│  │  └─ AuthProvider.tsx
│  ├─ hooks
│  ├─ lib
│  │  ├─ axios.ts
│  │  └─ utils.ts
│  ├─ pages
│  │  ├─ index.tsx
│  │  ├─ 404.tsx
│  │  ├─ _app.tsx
│  │  ├─ _document.tsx
│  │  ├─ bookmark
│  │  ├─ detail
│  │  │  └─ [id]
│  │  ├─ login
│  │  ├─ make-club
│  │  ├─ my
│  │  ├─ review
│  │  └─ signup
│  ├─ styles
│  │  └─ globals.css
│  └─ types
├─ tailwind.config.ts
└─ tsconfig.json
```
</br>

# 프로젝트 실행 방법
1. Clone the repository

  ```bash
  git clone https://github.com/codeit-team2/codeit-team2-fe.git
  ```

2. Install dependencies

  ```bash
  npm install
  ```

3. Start the development server

  ```bash
  npm run dev
  ```

4. Open the project in your browser

  ```bash
  http://localhost:3000
  ```
