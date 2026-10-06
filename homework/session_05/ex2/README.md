# BÁO CÁO BÀI TẬP 2: TÁI CẤU TRÚC LỊCH SỬ COMMIT BẰNG INTERACTIVE REBASE

**Họ và tên:** Nguyễn Văn Toàn  
**Môn học:** Git & Version Control  
**Bài tập:** Session 05 - Bài tập 2: Tái cấu trúc lịch sử commit bằng Interactive Rebase  
**Đường dẫn nộp bài:** `homework/session_05/ex2/`

---

## 1. MỤC TIÊU BÀI TẬP

- Sử dụng công cụ **Interactive Rebase** (`git rebase -i`) để quản lý và chỉnh sửa lịch sử commit cục bộ trước khi push lên Remote Repository.
- Thực hiện gộp nhiều commit nhỏ lẻ, thử nghiệm (**squash**) thành một commit duy nhất có ý nghĩa.
- Đổi tên thông điệp commit (**reword**) rõ ràng theo chuẩn Conventional Commits.
- Xóa bỏ hoàn toàn commit rác không cần thiết (**drop**).

---

## 2. QUÁ TRÌNH THỰC HIỆN

### Bước 1: Khởi tạo các commit ban đầu (4 commit thử nghiệm)

Tạo lần lượt 4 commit trên nhánh `master` theo yêu cầu bài tập:

1. **Commit 1:** Tạo tệp `auth.js` với khung chức năng ban đầu.
   - Command: `git add auth.js && git commit -m "feat: khoi tao module auth"`
2. **Commit 2:** Chỉnh sửa tệp `auth.js` (sửa lỗi nhỏ).
   - Command: `git add auth.js && git commit -m "fix typo"`
3. **Commit 3:** Bổ sung hàm tiện ích vào `auth.js`.
   - Command: `git add auth.js && git commit -m "adds utility functions"`
4. **Commit 4:** Tạo tệp tạm `temp.txt` dùng để debug.
   - Command: `git add temp.txt && git commit -m "add temp file for debug"`

#### Lịch sử Commit ban đầu (`git log --oneline`):
```text
3f9c4da add temp file for debug
1c8c545 adds utility functions
04403d0 fix typo
e9bed59 feat: khoi tao module auth
```

---

### Bước 2: Thực hiện Interactive Rebase

Chạy lệnh Interactive Rebase để chỉnh sửa 4 commit gần nhất:
```bash
git rebase -i HEAD~4
```
*(hoặc `git rebase -i --root` đối với nhánh khởi tạo)*

#### Giao diện cấu hình Interactive Rebase (Trình soạn thảo Git Editor):
```text
pick e9bed59 feat: khoi tao module auth
squash 04403d0 fix typo
squash 1c8c545 adds utility functions
drop 3f9c4da add temp file for debug

# Rebase 0000000..3f9c4da onto 0000000 (4 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# d, drop <commit> = remove commit
```

**Giải thích cấu hình:**
- **Dòng 1 (`pick e9bed59`):** Giữ lại commit gốc khởi tạo module authentication.
- **Dòng 2 (`squash 04403d0`):** Gộp commit `fix typo` vào commit gốc trước đó.
- **Dòng 3 (`squash 1c8c545`):** Gộp commit `adds utility functions` vào commit gốc trước đó.
- **Dòng 4 (`drop 3f9c4da`):** Xóa bỏ hoàn toàn commit chứa file rác `temp.txt`.

---

### Bước 3: Đổi tên thông điệp commit sau khi gộp

Khi lưu và đóng trình soạn thảo Todo list, Git sẽ tự động mở màn hình chỉnh sửa thông điệp commit cho các commit đã gộp:

```text
# This is a combination of 3 commits.
# This is the 1st commit message:

feat: hoan thien module authentication

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
```

**Thông điệp commit mới sau khi chỉnh sửa:**
`feat: hoan thien module authentication`

---

## 3. KẾT QUẢ VÀ KIỂM TRA

### 1. Lịch sử commit sau khi hoàn tất (`git log --oneline`):
```text
bcfea89 feat: hoan thien module authentication
```
=> Lịch sử commit hoàn toàn sạch sẽ, 3 commit nhỏ lẻ đã được gộp thành 1 commit duy nhất có ý nghĩa.

### 2. Kiểm tra danh sách tệp tin trong thư mục làm việc:
```text
auth.js
```
=> Tệp `temp.txt` đã bị xóa bỏ hoàn toàn khỏi cây thư mục và lịch sử Git.

### 3. Nội dung hoàn chỉnh của `auth.js` sau khi gộp:
```javascript
// Authentication Module
// Initial setup for user authentication

function login(username, password) {
    if (!username || !password) {
        return { success: false, message: "Missing credentials" };
    }
    return { success: true, message: "Login successful" };
}

function logout(userId) {
    console.log(`User ${userId} logged out`);
    return { success: true };
}

function verifyToken(token) {
    if (!token) return false;
    return token.startsWith("Bearer ");
}

module.exports = { login, logout, verifyToken };
```

---

## 4. TỔNG KẾT BÀI HỌC

1. **Squash (`s`):** Giúp nén các commit nhỏ lẻ, commit sửa lỗi lặt vặt trong quá trình phát triển thành một commit tính năng hoàn chỉnh, giúp lịch sử git ngắn gọn và dễ theo dõi.
2. **Reword (`r`):** Giúp chuẩn hóa lại câu văn thông điệp commit chuyên nghiệp hơn.
3. **Drop (`d`):** Loại bỏ hoàn toàn các thay đổi hoặc file rác/file nhạy cảm lỡ commit trong quá trình debug.
4. **Quy tắc làm việc:** Chỉ áp dụng Interactive Rebase cho các commit **cục bộ (local)** chưa được push lên remote repo chung để tránh làm đứt gãy lịch sử của các thành viên khác trong nhóm.
