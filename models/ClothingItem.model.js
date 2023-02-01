const { model, Schema } = require('mongoose');

const clothingItemSchema = new Schema(
    {
        category: {
            type: String,
            required: true
        },
        type: {
            type: String
        },
        brand: String,
        occasions: [{
            type: String,
            enum: ['casual', 'business', 'formal', 'sportswear']
        }],
        imageUrl: {
            type: String
            // ,
            // required: true
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        outfits: [{
            type: Schema.Types.ObjectId,
            ref: 'Outfit'
        }]
    },
    {
        timestamps: true
    }
);

module.exports = model('ClothingItem', clothingItemSchema);