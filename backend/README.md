# document
# [Hackmd](https://hackmd.io/tTEXse2QTdu5m0v7h0sJkQ?view)
# Run backend server and database with Docker
```bash=
docker-compose build 
docker-compose up -d 
# Backend server listens on localhost:8088
# Use MongoDB Compass GUI to look up DB data by connecting to mongodb://root:root@localhost:27017
docker-compose stop # To stop the containers
```
# API
Create a websocket connection with ``ws://<backend-server>/ws``.

Message is in the JSON format of:
```json=
{
    "task": <task_name>,
    "message": {
        //... specified by each task
    }
}
```
## Tasks
In this section, the title of each entry specifies the ``<task_name>``


### ``createShop``

```json=
{
    "task": "createShop"
    "message":{
        "new_shop": <shop_info>
    }
}
```
`shop_info`: The data of new [Shop](#Shop)

#### Return value:

```json=
{
    "status": <status>,
    "shop_info": <new_shop_info>,
    "message": <error_message>
}
```

`status`: 
* `success` - `shop_info` field would also be given, should be identical to the `shop_info` from front end, in addition with the `_id` field and maybe some other fields.
* `error` - `message` field is specified if status is `error`

### `getPosts`
```json=
{
    "task": "getPosts"
    "message":{
        "posts": [<post_id>...]
    }
}
```
`<post_id>`: ID of post want to retrieve information

#### Return value:

```json=
{
    "status": <status>,
    "posts": <posts_details>,
    "message": <error_message>
}
```

`status`: 
* `success` - `posts` field would also be given
* `error` - `message` field is specified if status is `error`

`posts` - Array of [Posts](#Post) according to the IDs sent in request


### `getShopDetail`
```json=
{
    "task": "getShopsBrief"
    "message":{
        "shop_id": <shop_id>
    }
}
```

#### Return value:
```json=
{
    "status": <status>,
    "shop_info": <shop_detail_info>,
    "message": <error_message>
}
```

`status`: 
* `success` - `shop_info` field would also be given
* `error` - `message` field is specified if status is `error`

`shop_info` - [Shop](#Shop) data

### `getShopsBrief`
```json=
{
    "task": "getShopsBrief"
    "message":{
        "shop_list": [<shop_id>...]
    }
}
```

#### Return value:
```json=
{
    "status": <status>,
    "shop_info": [<shop_brief>...],
    "message": <error_message>
}
```

`status`: 
* `success` - `shop_info` field would also be given
* `error` - `message` field is specified if status is `error`

`shop_info` - Array of `<shop_brief>`, which is shop data with only four fields: 
```json=
{
    "_id": <shop_id>,
    "name": <shop_name>,
    "profile_picture": <picture_url>,
    "recent_post": {
        //...fields in post
    }
}
```

### `getShopsInRegions`
```json=
{
    "task": "getShopsInRegions"
    "message":{
        "regions": <region_id> 
    }
}
```

#### Return value:
```json=
{
    "status": <status>,
    "shops_id": <shops_id>,
    "message": <error_message>
}
```

`status`: 
* `success` - `shops_id` field would also be given
* `error` - `message` field is specified if status is `error`

`shops_id` - All shops ID in the given regions

### ``login``
```json=
{
    "task": "login"
    "message":{
        "type": <login_type>,
        "access_token": <access_token>,
        "uid": <uid>
    }
}
```
`<login_type>`: Either ``line`` or ``uid``. Otherwise an error would be reported.

`<access_token>`: Need to be specified when `<login_type>` is `line`. Access token is a token yield from [LINE SDK](https://developers.line.biz/en/reference/line-login/#issue-access-token), which can further be used to identify the user in the backend.

`<uid>`: Need to be specified when `<login_type>` is `uid`
:::danger
This api should only be used in private testing phrase, and must be removed or be upgraded to a more secure one.
:::

#### Return value:
```json=
{
    "status": <status>,
    "user_info": <user_info>,
    "message": <error_message>
}
```
`status`: Could be one of below
* `new user` - The LINE user who is referred by `<access_token>` is first time visit our website, and have successfully logged in this time. May serve some welcome message in the front end. `<user_info>` is the [User](#User) data of him.
* `logged in` - The LINE user who is referred by `<access_token>` has logged in to our website before, and have successfully logged in this time. `<user_info>` is the [User](#User) data of him.
* `error` - `message` field is specified if status is `error`

### `post`
```json=
{
    "task": "post"
    "message":{
        "new_post": {
            // ... New post
        },
        "shop_id": <shop_id>
    }
}
```

#### Return value:
```json=
{
    "status": <status>,
    "post_id": <post_id>,
    "message": <error_message>
}
```

`status`: 
* `success` - `post_id` field would also be given
* `error` - `message` field is specified if status is `error`

`post_id` - The new post ID

### ``removeShop``

```json=
{
    "task": "removeShop"
    "message":{
        "shop_id": <shop_id>
    }
}
```
`shop_id`: The `_id` of shop to be removed

#### Return value:

```json=
{
    "status": <status>,
    "message": <error_message>
}
```

`status`: 
* `success` - `shop_info` field would also be given, should be identical to the `shop_info` from front end, in addition with the `_id` field and maybe some other fields.
* `nothing removed` - If `_id` not match any shop, and thus nothing is removed by this operation.
* `error` - `message` field is specified if status is `error`.

:::warning
The remove access should be implemented either in front-end (limit the api access) or back-end (further update in this API) in prevention of abuse.
:::


# Schemas
## User

#### `_id` string (required)
User's userId in [LINE login](https://developers.line.biz/en/reference/line-login/#get-user-profile).

#### `lineName` string (required)
User's ``displayName`` in [LINE login](https://developers.line.biz/en/reference/line-login/#get-user-profile).

#### `linePictureURL` string 
User's ``pictureUrl`` in [LINE login](https://developers.line.biz/en/reference/line-login/#get-user-profile).
If user has not uploaded any profile photo, this field should left blanked.

You can get a thumbnail version of a user's profile image by appending any of the following suffixes to their profile image URL.


|        |           |
| ------ | --------- |
| /large | 200 x 200 |
| /small | 51 x 51   |
 	
 	

Example: https://profile.line-scdn.net/abcdefghijklmn/large

#### `name` string 
User's custom display name in our website. If not specified, refer to field ``lineName`` instead. Otherwise, display this name in the first place.

#### `pictureURL` string
User's custom profile picture in our website. If not specified, refer to ``linePictureURL`` instead. Otherwise, display this picture in the first place.


#### `favoriteShops` array of string
A list of user's favorite ramen shop IDs. Order matters.

#### `preferRegion` array of int
A list of regions that user prefer. Regions could be 0 to 14  

0.  北北基
1. 	桃園
1. 新竹
1. 苗栗
1. 台中
1. 彰化
1. 南投
1. 雲林
1. 嘉義
1. 台南
1. 高雄
1. 屏東
1. 宜蘭
1. 花蓮
1. 台東

## Shop

#### ``_id`` string (required)

#### ``name`` string (required)
The name of a shop

#### ``position_x`` float (required)

#### ``position_y`` float (required)

#### ``region`` int (required)

#### ``profile_picture`` string

#### ``pictures`` array of string

#### ``description`` string

#### ``posts`` array of string 

## Post

#### ``_id`` string (required)

#### ``author`` string (required)

#### ``postTime`` timestamp (required)

#### ``report`` string (required)

#### ``description`` string

#### ``images`` array of string
