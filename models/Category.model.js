const { model, Schema } = require('mongoose');

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        items: [{
            type: Schema.Types.ObjectId,
            ref: 'ClothingItem'
        }],
        outfits: [{
            type: Schema.Types.ObjectId,
            ref: 'Outfit'
        }]
    },
    {
        timestamps: true
    }
);

module.exports = model('Category', categorySchema);