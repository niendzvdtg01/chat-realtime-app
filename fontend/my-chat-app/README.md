# Frontend Chat App

Frontend cua du an chat realtime, duoc xay dung bang React + Vite.

## Chuc nang chinh

- Dang nhap, dang ky, va hien thong tin user.
- Tim kiem user, ket ban, va quan ly conversation.
- Chat realtime qua SockJS/STOMP.
- Nhan goi y tra loi AI theo conversation.
- Tao lich hop/su kien ngay trong `ChatInfo`.
- Hien calendar notification trong `ChatInfo`.

## Lenh chay nhanh

```bash
npm install
npm run dev
```

Frontend mac dinh chay o:

- `http://localhost:5173`

API backend va websocket hien dang tro den:

- REST API: `http://localhost:8080`
- WebSocket: `http://localhost:8080/ws`

## File quan trong

- `src/pages/ChatDashboard.jsx`: layout chinh cua dashboard.
- `src/hooks/useChat.js`: quan ly state message, suggestions, calendar, notification.
- `src/services/WebSocketService.jsx`: dang ky cac topic STOMP theo `conversationId`.
- `src/features/ChatDashboard/ChatMessage.jsx`: khung chat.
- `src/features/ChatDashboard/ChatInfo.jsx`: profile, scheduler, calendar result, calendar notification.

## Ghi chu ve calendar notification

- Khi nguoi dung mo mot conversation, `ChatInfo` se goi endpoint REST lay notification moi nhat.
- Backend dong thoi push notification len websocket de cac client dang mo cung conversation co the cap nhat.
- UI uu tien du lieu tra ve tu REST de tranh mat message khi websocket subscribe cham hon response.
