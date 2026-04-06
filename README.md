# Chat Realtime App

Ung dung chat realtime gom 3 phan chinh:

- `fontend/my-chat-app`: frontend su dung React + Vite.
- `backend/chatapp`: backend su dung Spring Boot, MySQL, MongoDB, WebSocket/STOMP va Spring Security.
- `AIService`: microservice Python/Flask dung de sinh goi y tin nhan AI.

Du an nay cho phep dang ky, dang nhap, tim kiem user, ket ban, tao cuoc tro chuyen 1-1, tao group, chat realtime, nhan goi y tra loi AI, va hien tai da co giao dien dat hen cuoc hop/su kien trong khu vuc thong tin chat.

## 1. Tinh nang chinh

- Dang ky tai khoan va dang nhap bang email/password.
- Xac thuc bang JWT cookie.
- Tim kiem user theo tu khoa.
- Gui va xu ly loi moi ket ban.
- Lay danh sach ban be.
- Tao private conversation.
- Tao nhom chat.
- Gui va nhan tin nhan realtime qua WebSocket/STOMP.
- Luu message trong MongoDB.
- Quan ly user va conversation metadata trong MySQL.
- Goi AI service de sinh goi y phan hoi theo ngu canh hoi thoai.
- Giao dien scheduler tren frontend de dat lich hop/su kien ngay trong khung thong tin chat.

## 2. Kien truc tong quan

```text
React/Vite Frontend
    |
    | HTTP + Cookie + WebSocket(STOMP)
    v
Spring Boot Backend
    |-- MySQL: users, contacts, conversations, members, friend requests
    |-- MongoDB: message documents
    |-- Async call --> Flask AI Service
                             |
                             | Local AI provider (Ollama)
                             v
                       Suggested replies
```

Luong chat AI:

1. Frontend mo conversation va goi backend lay lich su tin nhan.
2. Backend tra ve message va dong thoi goi bat dong bo sang `AIService`.
3. `AIService` phan tich hoi thoai va sinh cac cau goi y.
4. Backend day goi y AI ve frontend qua topic WebSocket `/topic/suggestion/{conversationId}`.

## 3. Cong nghe su dung

### Frontend

- React 18
- Vite
- React Router
- Axios
- Bootstrap
- Sass
- SockJS
- STOMPJS

### Backend

- Java 21
- Spring Boot 4
- Spring Web MVC
- Spring Security
- Spring Data JPA
- Spring WebSocket
- MySQL
- MongoDB
- Cloudinary
- JWT

### AI Service

- Python 3
- Flask
- Requests
- Local AI qua Ollama HTTP API

## 4. Cau truc thu muc

```text
ChatApp/
├── AIService/
│   ├── Models/
│   │   └── AI.py
│   ├── Services/
│   │   ├── AIAgentsService.py
│   │   ├── Analyzer.py
│   │   └── Planner.py
│   ├── .env
│   └── main.py
├── backend/
│   └── chatapp/
│       ├── pom.xml
│       └── src/main/
│           ├── java/com/example/chatapp/
│           │   ├── controller/
│           │   ├── services/
│           │   ├── security/
│           │   ├── entity/
│           │   ├── dto/
│           │   └── config/
│           └── resources/
│               └── application.yaml
└── fontend/
    └── my-chat-app/
        ├── package.json
        └── src/
            ├── features/
            ├── services/
            ├── pages/
            └── styles/
```

## 5. Chuc nang tung module

### Frontend `fontend/my-chat-app`

- `src/pages/LoginPage.jsx`: trang dang nhap/dang ky.
- `src/pages/ChatDashboard.jsx`: man hinh chat chinh.
- `src/features/ChatDashboard/ChatMessage.jsx`: khung chat, input va goi y AI.
- `src/features/ChatDashboard/ChatInfo.jsx`: thong tin user/group, quick actions, scheduler.
- `src/features/GroupChat/*`: giao dien tao group va them thanh vien.
- `src/services/WebSocketService.jsx`: ket noi SockJS/STOMP den backend.
- `src/services/UserService/*`: cac API axios lien quan den user, conversation, group, request.

### Backend `backend/chatapp`

- `controller/AuthController.java`: dang nhap, dang xuat.
- `controller/UsersController.java`: tao user, search user, lay thong tin user, cap nhat profile.
- `controller/FriendRequestController.java`: gui, lay va cap nhat request ket ban.
- `controller/GroupChatController.java`: tao group, lay group, lay message group.
- `controller/ChatController.java`: lay message private, WebSocket send message, kick AI generation.
- `services/AIService.java`: goi `AIService` Flask va publish ket qua len WebSocket.
- `config/WebConfig.java`: khai bao endpoint `/ws`, broker `/topic`, app prefix `/app`.

### AI Service `AIService`

- `main.py`: Flask app va endpoint `/ai/chat`.
- `Models/AI.py`: ket noi local AI provider qua HTTP API.
- `Services/Analyzer.py`: phan tich ngu canh hoi thoai.
- `Services/Planner.py`: xay dung chien luoc phan hoi.
- `Services/AIAgentsService.py`: tong hop phan tich + lap ke hoach + sinh goi y + fallback.

## 6. Yeu cau moi truong

Can co cac thanh phan sau:

- Node.js 18+
- npm
- Java 21
- Maven wrapper hoac Maven cai san
- Python 3
- MySQL
- MongoDB
- Ollama neu muon dung AI local that

## 7. Cau hinh hien tai trong repo

### Backend

File [application.yaml](/home/nien/Project/ChatApp/backend/chatapp/src/main/resources/application.yaml) dang dung:

- Backend port: `8080`
- MySQL: `jdbc:mysql://localhost:3310/chatapp_database`
- MySQL user: `admin`
- MySQL password: `1234`
- MongoDB: `mongodb://admin:1234@localhost:27018/chatapp_database?authSource=admin`

### Frontend

File [httpClient.js](/home/nien/Project/ChatApp/fontend/my-chat-app/src/services/UserService/httpClient.js) dang tro den:

- Base URL API: `http://localhost:8080`

File [WebSocketService.jsx](/home/nien/Project/ChatApp/fontend/my-chat-app/src/services/WebSocketService.jsx) dang tro den:

- WebSocket endpoint: `http://localhost:8080/ws`

### AI Service

File [AIService/.env](/home/nien/Project/ChatApp/AIService/.env) dang co:

```env
AI_TIMEOUT=30
AI_MAX_TOKENS=256
AI_RETRY_MAX_TOKENS=512
```

Neu muon su dung Ollama ro rang hon, ban co the them:

```env
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama3.2:3b
OLLAMA_KEEP_ALIVE=10m
AI_CACHE_SIZE=100
```

## 8. Cach chay du an

Can chay theo thu tu:

1. Database services
2. AI service
3. Spring Boot backend
4. React frontend

### 8.1. Chay MySQL va MongoDB

Repo co:

- `backend/chatapp/image.yaml`
- `backend/chatapp/mongo.yaml`

Neu ban dang dung Docker hoac Kubernetes, co the tham khao 2 file nay de khoi dong database. Neu khong, hay tu tao:

- MySQL o port `3310`
- MongoDB o port `27018`

Va tao database:

- `chatapp_database`

### 8.2. Chay AI Service

Tu thu muc goc project:

```bash
cd AIService
python3 -m venv .venv
source .venv/bin/activate
pip install flask requests
python3 main.py
```

AI service mac dinh chay tai:

- `http://localhost:5000`

Test nhanh:

```bash
curl http://localhost:5000/
```

Test endpoint goi y:

```bash
curl -X POST http://localhost:5000/ai/chat \
  -H "Content-Type: application/json" \
  -d '[{"content":"Hom nay ban the nao?"},{"content":"Toi kha met"}]'
```

Ket qua mau:

```json
{
  "reply": [
    "Nghe hop ly do, de minh noi them voi ban ve viec \"Toi kha met\" nhe.",
    "Ok nhe, minh thay vay cung on do."
  ]
}
```

Ghi chu:

- Neu Ollama chua chay, service van co the tra ve goi y fallback.
- Neu ban muon AI local that, hay bat Ollama va pull model phu hop.

### 8.3. Chay Spring Boot backend

```bash
cd backend/chatapp
./mvnw spring-boot:run
```

Tren Windows:

```bash
mvnw.cmd spring-boot:run
```

Backend mac dinh chay tai:

- `http://localhost:8080`

Test nhanh:

```bash
curl http://localhost:8080/test_cookie
```

Lenh nay can auth cookie hop le, nen neu chua dang nhap co the se bi chan boi security.

### 8.4. Chay frontend

```bash
cd fontend/my-chat-app
npm install
npm run dev
```

Frontend mac dinh chay tai:

- `http://localhost:5173`

Build production:

```bash
npm run build
```

## 9. Route frontend

File [App.jsx](/home/nien/Project/ChatApp/fontend/my-chat-app/src/App.jsx):

- `/`: trang dang nhap / dang ky
- `/chat`: trang dashboard chat

## 10. API backend chinh

Duoi day la nhung endpoint chinh hien dang co trong source.

### Auth

- `POST /auth/login`
- `POST /auth/logout`

Payload login:

```json
{
  "email": "user@example.com",
  "userpassword": "123456"
}
```

### User

- `POST /user/create_user`
- `GET /user/getAllUser`
- `GET /user/find_user?keyword=...`
- `GET /user/get_userinfo`
- `GET /user/find_all_friends`
- `POST /user/update_user`

`/user/update_user` nhan form-data va co ho tro upload avatar.

### Friend request

- `POST /api/friend_request`
- `GET /api/find_request`
- `POST /api/status`

### Group chat

- `POST /api/group/create_group`
- `GET /api/group/get_group`
- `GET /api/group/get_messages?conversationId=...`

### Chat

- `POST /get_messages`
- `GET /get_conversation`
- `GET /test_cookie`

## 11. WebSocket/STOMP

Backend khai bao:

- STOMP endpoint: `/ws`
- App destination prefix: `/app`
- Topic prefix: `/topic`

Frontend hien dang su dung:

- Gui tin nhan toi `/app/sendMessage`
- Lang nghe message moi tai `/topic/conversation/{conversationId}`
- Lang nghe goi y AI tai `/topic/suggestion/{conversationId}`

## 12. AI integration

Backend [AIService.java](/home/nien/Project/ChatApp/backend/chatapp/src/main/java/com/example/chatapp/services/AIService.java) dang hoat dong nhu sau:

1. Lay toi da 15 tin nhan gan nhat.
2. Goi Flask service o `http://localhost:5000/ai/chat`.
3. Nhan JSON co key `reply`.
4. Publish danh sach goi y len `/topic/suggestion/{conversationId}`.

Phia frontend trong `ChatMessage.jsx` se nhan goi y nay va hien thanh cac nut suggestion de click.

## 13. Giao dien scheduler

Trong [ChatInfo.jsx](/home/nien/Project/ChatApp/fontend/my-chat-app/src/features/ChatDashboard/ChatInfo.jsx), nut quick action hien da cho phep mo form:

- dat lich hop
- dat su kien
- chon ngay gio
- chon hinh thuc online/office/cafe/hybrid
- them dia diem
- them ghi chu

Hien tai day la giao dien frontend va state local. Chua co API backend luu lich hen that.

## 14. Bao mat va luu y quan trong

Repo hien tai dang co mot so thong tin cau hinh hard-code trong source va config, vi du:

- thong tin MySQL/MongoDB
- Cloudinary key trong `application.yaml`
- URL localhost cho frontend/backend/AI service

Khuyen nghi:

- dua toan bo secret vao bien moi truong hoac file `.env` khong commit
- tach config dev/staging/prod
- doi `httpOnly(false)` trong cookie thanh `true` neu khong co ly do bat buoc phai doc cookie o frontend
- bo sung CORS, CSRF va secure cookie phu hop khi deploy

## 15. Kiem tra nhanh sau khi khoi dong

Sau khi tat ca service da chay, quy trinh test thu cong co the la:

1. Dang ky 2 tai khoan.
2. Dang nhap 1 tai khoan.
3. Tim kiem tai khoan con lai.
4. Gui friend request.
5. Chap nhan friend request.
6. Mo private conversation.
7. Gui tin nhan va quan sat realtime qua WebSocket.
8. Kiem tra chip goi y AI trong khung chat.
9. Mo `ChatInfo` va thu form scheduler.
10. Tao group va kiem tra message group.

## 16. Cac van de co the gap

### Frontend khong goi duoc backend

Kiem tra:

- backend da chay o port `8080` chua
- `withCredentials: true` co bi browser chan do CORS khong
- cookie login da duoc tao chua

### WebSocket khong nhan duoc tin nhan

Kiem tra:

- backend da bat endpoint `/ws`
- frontend dang connect dung `http://localhost:8080/ws`
- conversationId co hop le khong

### AI khong tra goi y

Kiem tra:

- Flask AI service da chay o port `5000` chua
- backend co goi duoc `http://localhost:5000/ai/chat` khong
- Ollama co dang chay neu ban dung AI local that khong

### Backend loi database

Kiem tra:

- MySQL da chay o `3310`
- MongoDB da chay o `27018`
- user/password/database dung voi `application.yaml`

## 17. Huong phat trien tiep theo

- Ket noi scheduler voi backend de luu lich hen that.
- Them notification cho lich hop/su kien.
- Tach config theo moi truong.
- Viet test cho backend, frontend va AI service.
- Them Docker Compose de chay full stack bang mot lenh.
- Chuyen mot so hard-coded URL sang env.
- Cai thien logging va error handling cho AI pipeline.

## 18. Lenh nhanh tong hop

### Frontend

```bash
cd fontend/my-chat-app
npm install
npm run dev
```

### Backend

```bash
cd backend/chatapp
./mvnw spring-boot:run
```

### AI Service

```bash
cd AIService
python3 main.py
```

## 19. Ghi chu

- Ten thu muc frontend hien dang la `fontend/my-chat-app`, khong phai `frontend/my-chat-app`.
- Mot so endpoint va ten field trong source con chua dong nhat hoan toan. Khi mo rong du an, nen refactor naming de de bao tri hon.
- README nay mo ta theo code hien co trong repo o thoi diem hien tai.
