import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortId: { type: String, required: true },
});

const Url = mongoose.models.Url || mongoose.model('Url', urlSchema)
export default Url;
