// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const ClothingItemModel = require("../models/ClothingItem.model");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
    "mongodb+srv://bali:*balinette974@bali.57aozpt.mongodb.net/test";

const items =


    [
        {
            "brand": "Another Label",
            "occasions": [
                "casual",
                "formal",
                "business"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674852433/wardrobe-app/fssojzbxtg4uurwl64wp.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-27T20:47:33.106Z",
            "updatedAt": "2023-02-02T10:44:29.346Z",
            "__v": 0,
            "onePiece": false,
            "category": "Pants",
            "type": "Bottoms",
            "outfits": []
        },
        {
            "brand": "Another Label",
            "occasions": [
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674858205/wardrobe-app/ozlraltgh0wmp5ch56wy.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-27T22:23:42.851Z",
            "updatedAt": "2023-02-01T14:53:29.710Z",
            "__v": 0,
            "onePiece": true,
            "category": "Dress",
            "type": "One-Pieces",
            "outfits": []
        },
        {
            "brand": "A.P.C.",
            "occasions": [
                "formal",
                "business"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674860643/wardrobe-app/rgowak8ovdt4s6ptb9ac.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-27T23:04:14.751Z",
            "updatedAt": "2023-02-01T19:52:38.884Z",
            "__v": 0,
            "onePiece": false,
            "category": "Blouse",
            "type": "Tops",
            "outfits": [
                "63dac30667962c02c4cde0ae"
            ]
        },
        {
            "onePiece": true,
            "brand": "Another Label",
            "occasions": [
                "formal",
                "business"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674919478/wardrobe-app/e1ho9zqelwtyfmxastp9.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T15:24:51.412Z",
            "updatedAt": "2023-02-01T15:26:35.531Z",
            "__v": 0,
            "category": "Dress",
            "type": "One-Pieces",
            "outfits": []
        },
        {
            "onePiece": false,
            "brand": "Another Label",
            "occasions": [
                "formal",
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674919551/wardrobe-app/imng7su9j6lxledllcj5.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T15:26:05.416Z",
            "updatedAt": "2023-02-01T15:04:31.665Z",
            "__v": 0,
            "category": "Pants",
            "type": "Bottoms",
            "outfits": []
        },
        {
            "outfits": [],
            "onePiece": false,
            "brand": "Another Label",
            "occasions": [
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922022/wardrobe-app/g8spwsyppucyjsuozoys.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:07:13.658Z",
            "updatedAt": "2023-01-28T18:38:21.761Z",
            "__v": 0,
            "category": "Sweater",
            "type": "Layers"
        },
        {
            "outfits": [],
            "onePiece": false,
            "brand": "Another Label",
            "occasions": [
                "casual",
                "formal"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922047/wardrobe-app/txzno25hd0eyjaa6mc0r.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:07:36.238Z",
            "updatedAt": "2023-01-28T18:38:36.381Z",
            "__v": 0,
            "category": "Sweater",
            "type": "Layers"
        },
        {
            "outfits": [],
            "onePiece": false,
            "brand": "Another Label",
            "occasions": [
                "casual",
                "formal"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922078/wardrobe-app/udvimpw8ofzr6b8phu7t.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:08:07.719Z",
            "updatedAt": "2023-01-28T18:38:39.189Z",
            "__v": 0,
            "category": "Skirt",
            "type": "Bottoms"
        },
        {
            "onePiece": false,
            "brand": "adidas",
            "occasions": [
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922112/wardrobe-app/gjy3lbf0qued5odj00if.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:08:43.786Z",
            "updatedAt": "2023-02-01T15:04:30.203Z",
            "__v": 0,
            "category": "Blouse",
            "type": "Tops",
            "outfits": []
        },
        {
            "onePiece": false,
            "brand": "A|X Armani Exchange",
            "occasions": [
                "casual",
                "formal"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922144/wardrobe-app/nkt66hzyo4vcg3pugzln.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:09:24.877Z",
            "updatedAt": "2023-02-02T10:39:51.981Z",
            "__v": 0,
            "category": "T-shirt",
            "type": "Tops",
            "outfits": []
        },
        {
            "outfits": [],
            "onePiece": false,
            "brand": "A|X Armani Exchange",
            "occasions": [
                "sportswear",
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922180/wardrobe-app/ypf3xzkpzhvjvrzt8lnq.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:09:48.043Z",
            "updatedAt": "2023-01-28T18:39:17.646Z",
            "__v": 0,
            "category": "Sweater",
            "type": "Layers"
        },
        {
            "outfits": [],
            "onePiece": false,
            "brand": "Acne Studio",
            "occasions": [
                "casual",
                "sportswear"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922198/wardrobe-app/rm60xtutshrx2wbud2kp.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:10:08.906Z",
            "updatedAt": "2023-01-28T18:39:20.389Z",
            "__v": 0,
            "category": "Sweater",
            "type": "Layers"
        },
        {
            "outfits": [],
            "onePiece": true,
            "brand": "Acne Studio",
            "occasions": [
                "formal"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922306/wardrobe-app/jidoqskxpybql8shhqxy.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:11:54.890Z",
            "updatedAt": "2023-01-28T19:23:59.366Z",
            "__v": 0,
            "category": "Dress",
            "type": "One-Pieces"
        },
        {
            "outfits": [],
            "onePiece": false,
            "brand": "A|X Armani Exchange",
            "occasions": [
                "sportswear",
                "formal",
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922346/wardrobe-app/jwwxqc28ckesaynutq4b.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:12:32.343Z",
            "updatedAt": "2023-01-28T18:39:25.174Z",
            "__v": 0,
            "category": "Jacket | Vest",
            "type": "Layers"
        },
        {
            "outfits": [],
            "onePiece": false,
            "brand": "A|X Armani Exchange",
            "occasions": [
                "casual",
                "sportswear"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922387/wardrobe-app/ui75u6b78lrdzsfndmrn.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:13:16.965Z",
            "updatedAt": "2023-01-28T18:39:27.900Z",
            "__v": 0,
            "category": "Sweater",
            "type": "Layers"
        },
        {
            "outfits": [],
            "onePiece": false,
            "brand": "A|X Armani Exchange",
            "occasions": [
                "sportswear",
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922418/wardrobe-app/dja5eiu7loalk2u5ocrb.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:13:51.313Z",
            "updatedAt": "2023-01-28T18:39:31.276Z",
            "__v": 0,
            "category": "Jacket | Vest",
            "type": "Layers"
        },
        {
            "onePiece": false,
            "brand": "ACME",
            "occasions": [
                "formal",
                "business",
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922463/wardrobe-app/undmwnxmxwntiuxxjsdz.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:14:33.065Z",
            "updatedAt": "2023-02-01T15:11:00.456Z",
            "__v": 0,
            "category": "Pants",
            "type": "Bottoms",
            "outfits": []
        },
        {
            "onePiece": false,
            "brand": "adidas",
            "occasions": [
                "casual",
                "formal",
                "business"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922495/wardrobe-app/iguukqbkqr0r9tczjpk4.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:15:08.000Z",
            "updatedAt": "2023-02-01T15:02:00.477Z",
            "__v": 0,
            "category": "Pants",
            "type": "Bottoms",
            "outfits": []
        },
        {
            "onePiece": false,
            "brand": "ACME",
            "occasions": [
                "business",
                "formal",
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922535/wardrobe-app/w6uyrkhgsytmzhfffdhr.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:15:42.651Z",
            "updatedAt": "2023-02-01T19:52:38.886Z",
            "__v": 0,
            "category": "Skirt",
            "type": "Bottoms",
            "outfits": [
                "63dac30667962c02c4cde0ae"
            ]
        },
        {
            "onePiece": false,
            "brand": "ACME",
            "occasions": [
                "casual",
                "formal",
                "business"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674922556/wardrobe-app/qf74z5tui92sy5yyef3d.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:16:09.133Z",
            "updatedAt": "2023-02-01T14:57:54.161Z",
            "__v": 0,
            "category": "Skirt",
            "type": "Bottoms",
            "outfits": []
        },
        {
            "onePiece": false,
            "brand": "A|X Armani Exchange",
            "occasions": [
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674923963/wardrobe-app/hnhwbdzcd4xveitlixzg.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:39:33.188Z",
            "updatedAt": "2023-02-01T14:50:10.421Z",
            "__v": 0,
            "category": "Boots",
            "type": "Footwear",
            "outfits": []
        },
        {
            "onePiece": false,
            "brand": "ACME",
            "occasions": [
                "sportswear",
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674923989/wardrobe-app/jpz2mxxuhi8jim6xpnnn.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:40:31.525Z",
            "updatedAt": "2023-02-01T14:47:19.016Z",
            "__v": 0,
            "category": "Sneakers",
            "type": "Footwear",
            "outfits": []
        },
        {
            "onePiece": false,
            "brand": "A.P.C.",
            "occasions": [
                "business",
                "formal",
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674924057/wardrobe-app/erulglfwnksouot382hd.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:41:07.775Z",
            "updatedAt": "2023-02-01T15:12:34.166Z",
            "__v": 0,
            "category": "Heels",
            "type": "Footwear",
            "outfits": []
        },
        {
            "onePiece": false,
            "brand": "Acne Studio",
            "occasions": [
                "casual",
                "formal",
                "business"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674924081/wardrobe-app/hvcsbjgyd9hzfle4l2rj.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:41:33.248Z",
            "updatedAt": "2023-02-01T19:52:38.886Z",
            "__v": 0,
            "category": "Heels",
            "type": "Footwear",
            "outfits": [
                "63dac30667962c02c4cde0ae"
            ]
        },
        {
            "onePiece": false,
            "brand": "ACME",
            "occasions": [
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674924107/wardrobe-app/u4sw2jx4pmcjjx6ukslx.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T16:41:54.033Z",
            "updatedAt": "2023-02-02T10:39:51.981Z",
            "__v": 0,
            "category": "Heels",
            "type": "Footwear",
            "outfits": [
                "63da89a54310324a32c3e88b"
            ]
        },
        {
            "category": "Sneakers",
            "type": "Footwear",
            "brand": "adidas",
            "occasions": [
                "formal",
                "sportswear"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674938554/wardrobe-app/vdgtbrzahrfuk3cfedvi.jpg",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T20:42:44.938Z",
            "updatedAt": "2023-02-01T22:27:01.832Z",
            "__v": 0,
            "outfits": [
                "63dae735287f957acc9655b3"
            ]
        },
        {
            "category": "T-shirt",
            "type": "Tops",
            "brand": "adidas",
            "occasions": [
                "sportswear",
                "casual"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674939019/wardrobe-app/y2xkzxzk7jt55sr8z5ip.webp",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T20:50:21.128Z",
            "updatedAt": "2023-02-02T10:39:51.981Z",
            "__v": 0,
            "outfits": [
                "63dae735287f957acc9655b3",
                "63da89a54310324a32c3e88b"
            ]
        },
        {
            "category": "Dress",
            "type": "One-Pieces",
            "brand": "adidas",
            "occasions": [
                "casual",
                "sportswear"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674939025/wardrobe-app/ferzcl4neybibqvmxuws.webp",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T20:50:31.054Z",
            "updatedAt": "2023-02-01T14:42:26.619Z",
            "__v": 0,
            "outfits": []
        },
        {
            "category": "Pants",
            "type": "Bottoms",
            "brand": "Aldo",
            "occasions": [
                "casual",
                "sportswear"
            ],
            "imageUrl": "https://res.cloudinary.com/dxq1p2zrk/image/upload/v1674939034/wardrobe-app/wv4qsrqp0154xtkgtsio.webp",
            "ownerId": "63dbb43e518abff5263a52b1",
            "createdAt": "2023-01-28T20:50:43.543Z",
            "updatedAt": "2023-02-02T10:39:51.981Z",
            "__v": 0,
            "outfits": [
                "63dae735287f957acc9655b3",
                "63da89a54310324a32c3e88b"
            ]
        }
    ];


mongoose
    .connect(MONGO_URI)
    .then((x) => {
        ClothingItemModel.create(items);
    })