bash ```

npx sequelize-cli model:create --name User --attributes email:string,phone:integer,name:string,password:string,profile_picture:string

npx sequelize-cli model:create --name Admin --attributes email:string,phone:integer,name:string,password:string,profile_picture:string,role:string

npx sequelize-cli model:create --name Location --attributes name:string

npx sequelize-cli model:create --name Villa --attributes LocationId:integer,name:string,description:string,price:integer,map_url:string,image_name:string

npx sequelize-cli model:create --name VillaReview --attributes VillaId:integer,UserId:integer,rating:string,comment:string

npx sequelize-cli model:create --name VillaGalery --attributes VillaId:integer,image_name:string

npx sequelize-cli model:create --name Booking --attributes UserId:integer,VillaId:integer,total_price:integer,booking_start_date:integer,booking_end_date:integer,payment:string,status:string

npx sequelize-cli model:create --name Favorite --attributes UserId:integer,LocationId:integer,name:string,description:string,price:integer,map_url:string,image_name:string

```