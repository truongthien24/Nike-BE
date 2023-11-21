===============================
======== Cách fix lỗi =========
===============================
+ Trùng port: 
  == npx kill-port PORT
  == đổi port lại
  == chạy lại project



===============================
========= Thư viện ============
===============================
+ Nodemon: 
  == Phát hiện thay đổi code sẽ tự động chạy lại project chứ kh cần phải npm run dev lại
  == Khi thay đổi file .env thì phải run dev lại
+ mysql2:
  == Kết nối mySQL


===============================
========= Mô hình MVC =========  
===============================
- 3 thư mục chính của project
+ Models:
  == Các hàm xử lý DB
+ Views
  == Trả về hiển thị cho client
+ Controllers
  == Nhận các request từ client gửi lên







====================================
============= Docker ===============
====================================

+ docker run -d -p 80:81 docker/getting-started
-- kéo ứng dụng về docker ánh xạ 80 là port trên máy tính, 81 là port trên web

+ docker build -t getting-started .
-- build source (getting-started tên source)

+ docker ps
-- lệnh tương tự như ls trong cmd, check status image trong docker

+ docker stop ID
-- lệnh dừng chạy một image (ID là container ID)

+ docker rm ID
-- lệnh xóa một image ra khỏi docker (ID là container ID)

+ docker run -dp 3000:3000 steven24/getting-started 
-- chạy image docker từ docker hub trên cloud 
-- link: labs.play-with-docker.com

