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




==================== SEQuenlize ===========================
- chạy lại migrate:  npx sequenlize-cli db:migrate 
- chạy lại seed tất cả:  npx sequenlize-cli db:seed:all
- Tạo demo một seed:  npx sequelize-cli seed:generate --name demo-user
- init sequenlize:   node_modules/.bin/sequelize init
- Tạo một model:   npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string



==== set up sequelize

- npm install --save-dev sequelize-cli@6.2.0 
- npm install --save sequelize
- npx sequelize-cli init


