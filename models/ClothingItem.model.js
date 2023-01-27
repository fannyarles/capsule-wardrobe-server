const { model, Schema } = require('mongoose');

const clothingItemSchema = new Schema(
    {
        type: { 
            type: String,
            required: true
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
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('ClothingItem', clothingItemSchema);