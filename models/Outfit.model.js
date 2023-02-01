const { model, Schema } = require('mongoose');

const outfitSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['1', '2'],
            required: true
        },
        occasion: {
            type: String,
            enum: ['casual', 'formal', 'business', 'sportswear'],
            required: true
        },
        top: {
            type: Schema.Types.ObjectId,
            ref: 'ClothingItem'
        },
        bottoms: {
            type: Schema.Types.ObjectId,
            ref: 'ClothingItem'
        },
        piece: {
            type: Schema.Types.ObjectId,
            ref: 'ClothingItem'
        },
        footwear: {
            type: Schema.Types.ObjectId,
            ref: 'ClothingItem'
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Outfit', outfitSchema);