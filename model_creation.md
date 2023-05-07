bash ```

npx sequelize-cli model:create --name User --attributes email:string,phone:integer,name:string,password:string,profile_picture:string

npx sequelize-cli model:create --name Location --attributes name:string

npx sequelize-cli model:create --name Villa --attributes LocationId:integer,name:string,description:string,price:integer,map_url:string,image_name:string

npx sequelize-cli model:create --name VillaReview --attributes VillasId:integer,UsersId:integer,rating:string,comment:string

npx sequelize-cli model:create --name VillaGalery --attributes VillasId:integer,image_name:string

npx sequelize-cli model:create --name Booking --attributes UsersId:integer,VillasId:integer,total_price:integer,booking_start_date:integer,booking_end_date:integer,payment:string,status:string

npx sequelize-cli model:create --name Favorite --attributes UsersId:integer,LocationId:integer,name:string,description:string,price:integer,map_url:string,image_name:string

```