const express = require('express');
const multer = require('multer');
const path = require('path');

const transcribe = require('./utils/transcribe');
const translate = require('./utils/translate');
const convertToIraqi = require('./utils/iraqi-dialect');
const generateVoice = require('./utils/voice');
const mergeAudioVideo = require('./utils/merge');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use('/output', express.static('outputs'));

app.post('/process', upload.single('video'), async (req, res) => {
  try {
    const videoPath = req.file.path;
    const { targetDialect } = req.body;

    // 1. نسخ الكلام (سنستخدم محاكاة الآن)
    const transcript = "Hello, how are you?";

    // 2. ترجمة إلى العربية
    const arabicText = "مرحباً، كيف حالك؟";

    // 3. تحويل إلى لهجة عراقية
    const dialectMap = {
      'ar-iq-baghdadi': 'بغدادية',
      'ar-iq-southern': 'جنوبية',
      'ar-iq-moslawi': 'مسقلاوية'
    };
    const accent = dialectMap[targetDialect] || 'عراقية';
    const iraqiText = "هلا، شلونك؟ أنا تمام، تسلم";

    // 4. إنشاء صوت (محاكاة)
    const audioPath = 'outputs/audio.mp3'; // سنضع ملف صوتي هنا لاحقًا

    // 5. دمج (محاكاة)
    const outputPath = 'outputs/final.mp4';

    // 6. أعد رابط النتيجة
    res.json({ resultUrl: '/output/final.mp4' });
  } catch (error) {
    res.status(500).json({ error: 'فشل في المعالجة' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على http://localhost:${PORT}`);
});