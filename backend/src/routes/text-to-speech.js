import express from 'express'
import textToSpeech from '@google-cloud/text-to-speech';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const client = new textToSpeech.TextToSpeechClient();

router.post('/', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Text input is required."});
        };

        const request = {
            input: { text },
            voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
            audioConfig: { audioEncoding: 'MP3' }
        }

        const [response] = await client.synthesizeSpeech(request);

        res.set({ 'Content-Type': 'audio/mpeg' });

        return res.send(response.audioContent);
    } catch (error) {
        console.error('POST /text-to-speech failed:', error);
        return res.status(500).json({
            error: 'Could not turn text to speech'
        });
    }
});

export default router;