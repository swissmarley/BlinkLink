const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const store = require('./store');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// API to create a short URL and generate QR code
app.post('/api/create', async (req, res) => {
  const { originalUrl, color, bgColor, logo, expiration } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required.' });
  }

  const id = uuidv4().slice(0, 8);
  const shortUrl = `${req.protocol}://${req.get('host')}/${id}`;

  // Store the mapping with expiration
  store.set(id, {
    originalUrl,
    expiresAt: expiration === 'unlimited' ? null : Date.now() + parseInt(expiration) * 24 * 60 * 60 * 1000,
  });

  // Generate QR code
  try {
    const qrOptions = {
      color: {
        dark: color || '#000000',
        light: bgColor || '#FFFFFF',
      },
    };

    const qrDataUrl = await QRCode.toDataURL(shortUrl, qrOptions);

    res.json({ shortUrl, qrCode: qrDataUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code.' });
  }
});

// Redirect short URL to original URL
app.get('/:id', (req, res) => {
  const { id } = req.params;
  const data = store.get(id);

  if (!data) {
    return res.status(404).send('URL not found.');
  }

  if (data.expiresAt && Date.now() > data.expiresAt) {
    store.delete(id);
    return res.status(410).send('URL has expired.');
  }

  res.redirect(data.originalUrl);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});